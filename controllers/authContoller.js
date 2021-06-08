const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const url = require('url');
require('dotenv').config()
const { mailRegistration, getMailHTML, mailTo } = require('../utils/mail');
const { TempUser, User, UserData, Agreement, Setting } = require('../models/models');

const generateWebToken = (login, role, id) => {
    const payload = {login, role, id};
    return jwt.sign(payload, process.env.SERVER_SECRET_KEY, {expiresIn: '7d'});
}

const generateCode = (len) => {
    let str = '';
    for (let i = 0; i<len; i++) {
        str += Math.random().toFixed(1) * 10;
    }
    return str;
}

class AuthContoller {
    async registration(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty() || (req.body.password !== req.body.repeatPassword)) {
            return res.status(400).json({message: 'Не все поля заполнены правильно', errors})
        }
        try {
            const [user, tempUser, agree] = await Promise.all([
                User.findOne({where: {login: req.body.login}}),
                TempUser.findOne({where: {login: req.body.login}}),
                Agreement.findOne({
                    where: {
                        email: req.body.email.toLowerCase(), 
                        ls: req.body.login
                    }
                })
            ]);

            if (user || tempUser) {
                return res.status(400).json({message: 'Аккаунт для данного лицевого счета уже создан'});
            };
            if (!agree) {
                return res.status(400).json({message: 'Почта не привязана к данному лицевому счету. Обратитесь в контактный центр для изменения данных в системе.'});
            }

            const hashPassword = bcrypt.hashSync(req.body.password, Number(process.env.SERVER_SOLT));
            const userHash = Buffer.from(req.body.login).toString('base64');
            const userHashEncoded = encodeURIComponent(userHash);

            const [text, newUser] = await Promise.all([
                getMailHTML('http://localhost:8000/api/auth/verify/' + userHashEncoded),
                TempUser.create({
                    login: req.body.login,
                    password: hashPassword,
                    number: req.body.phone,
                    email: req.body.email.toLowerCase(),
                    hash: userHash
                })
            ])     
            
            if (newUser) {
                let mailResult = await mailRegistration(req.body.email, text, true, 'Подтверждение регистрации на сайте');
                if (mailResult) {
                    return res.json({success: true});
                } else {
                    await newUser.destroy();
                    //log
                    return res.status(500).json({message: 'Аккаунт не создан. Попробуйте еще раз или зайдите позже'});
                }
            } else {
                return res.status(401).json({message: 'Данная почта не привязана к лицевому счету. Чтобы привязать почту, обратитесь к специалисту по номеру, расположенному вверху экрана или запросите обратный звонок. Через некоторое время почта будет привязана к лицевому счету и Вы сможете войти в систему по указанным Вами данным.'})
            }
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async login(req, res) {
        if (!req.body.login || !req.body.password) {
            return res.status(400).json({message: 'Неправильный логин или пароль'});
        }
        try {
            let user = await User.findOne({where: {login: req.body.login}});
            let validPassword;
            if (user) {
                validPassword = bcrypt.compareSync(req.body.password, user.password);
                if (validPassword) {
                    let token = generateWebToken(user.login, user.roleId, user.id);
                    let userData = await UserData.findByPk(user.id);
                    return res.json({token, user: userData});
                } else {
                    return res.status(400).json({message: 'Неправильный логин или пароль'});
                }
            } else {
                return res.status(400).json({message: 'Неправильный логин или пароль'});
            }
        } catch (e) {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async verify(req, res) {
        if (req.params && req.params.hash) {
            let hash = req.params.hash;
            try {
                let tempUser = await TempUser.findOne({where: {hash}});
                if (tempUser) {
                    const newUser = await User.create({
                        login: tempUser.login,
                        password: tempUser.password,
                    });
                    const resultUserCreating = await Promise.all([
                        UserData.create({
                            id: newUser.id,
                            number: tempUser.number,
                            email: tempUser.email.toLowerCase(),
                            roleId: 4
                        }),
                        TempUser.destroy({where: {id: tempUser.id}}),
                        Agreement.update(
                            {userId: newUser.id},
                            {where: {ls: newUser.login}}
                        ),
                        Setting.findOne({where: {serviceName: 'siteAddress'}})
                    ]);

                    //заменить ссылку
                    const fullSiteUrl = resultUserCreating[3].value + 'success';
                    res.redirect('http://localhost:3000/success');  
                } else {
                    return res.status(404).json({message: 'Страница не найдена'});
                }
            } catch (e) {
                //log
                return res.status(500).json({message: 'Внутренняя ошибка сервера'});
            }   
        } else {
            return res.status(404).json({message: 'Страница не найдена'});
        }
    }

    async auth(req, res) {
        try {
            let userData = await UserData.findOne({where: {id: req.tokenUser.id}});
            return res.json({user: userData});
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async forgot(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Не все поля заполнены правильно', errors})
        }
        try {
            let user = await  User.findOne({
                where: {login: req.body.ls},
                include: [{
                    as: 'personal',
                    model: UserData,
                    where: {
                        email: req.body.email
                    }
                }]
            });
            if (user) {
                const code = generateCode(5);
                const hashCode = bcrypt.hashSync(code, Number(process.env.REFRESH_SALT));
                const text = 'Ваш код подтверждения: ' + code + '. \nЕсли Вы не обращались за сменой пароля, обратитесь в обслуживающую организацию или смените электронную почту в личном кабинете на сайте.';
                let mailResult = await mailTo(text, req.body.email, 'Подтверждение принадлежности почты');
                if (mailResult) {
                    return res.json({id: user.id, code: hashCode});
                } else {
                    //log
                    return res.status(500).json({message: 'Почта привязана к данному лицевому счету, но отправить код не удалось, попробуйте еще раз или зайдите позже'});
                }
            } else {
                return res.status(401).json({message: 'Почта не привязана к данному лицевому счету. Обратитесь в контактный центр для сброса пароля'});
            }
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
}

export default new AuthContoller();