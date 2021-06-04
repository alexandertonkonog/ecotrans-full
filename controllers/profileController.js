const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
require('dotenv').config()
const { UserData, User, Account, Payment, Service } = require('../models/models');

const checkSavingObject = (req) => {
    const checkObject = {
        personal: ['contactName', 'email', 'number', 'name'],
    }
    const updateObject = {
        personal: {},
    };
    const data = req.body;
    for (let key in data) {
        if (data[key]) {
            if (checkObject.personal.includes(key)) {
                updateObject.personal[key] = data[key];
            }
        } 
    }
    
    let passwordData = Object.values(updateObject.personal);
    if (passwordData.length) {
        return updateObject;
    } else {
        return null;
    }
}

class ProfileController {
    async getProfile(req, res) {
        try {
            let userData = await UserData.findOne({
                where: {
                    id: req.tokenUser.id
                }, 
                include: ['agreements']
            });
            return res.json(userData);
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async saveNewProfile(req, res) {
        try {
            let updateObject = checkSavingObject(req);
            if (!updateObject) return res.status(400).json({message: 'Нет данных для обновления'})
            let updateResultArray = await Promise.all([
                UserData.update(
                    updateObject.personal,
                    {where: {id: req.tokenUser.id}}
                )
            ])
            let userData = await UserData.findOne({
                where: {
                    id: req.tokenUser.id
                }, 
                include: ['agreements'],
            });
            return res.json(userData);
        } catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async saveNewPassword(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Пароли не совпадают'});
        try {
            const user = await User.findByPk(req.tokenUser.id);
            const validPassword = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (validPassword) {
                const hashPassword = bcrypt.hashSync(req.body.password, Number(process.env.SERVER_SOLT));
                await User.update(
                    {password: hashPassword},
                    {where: {id: req.tokenUser.id}}
                )
                return res.sendStatus(200);
            } 
            return res.status(400).json({message: 'Неправильный старый пароль'});
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async forgotNewPassword(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Пароли не совпадают'});
        try {   
            const hashPassword = bcrypt.hashSync(req.body.password, Number(process.env.SERVER_SOLT));
            const user = await User.update(
                {password: hashPassword},
                {where: {id: req.body.id}}
            )
            return res.sendStatus(200);
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getAccounts(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не переданы необходимые данные'});
        try {
            let options = {
                where: {agreementId: req.query.id}, 
                limit: +req.query.limit || 10,
                order: [
                    ['date', 'DESC'] 
                ],
            };
            if (req.query.offset) {
                options.offset = +req.query.offset;
            }
            if (req.query.start) {
                let date = new Date(+req.query.start);
                options.where = {...options.where, date: {[Op.gte]: date}};
            }
            if (req.query.end) {
                let date = new Date(+req.query.end);
                options.where = {...options.where, date: {[Op.lte]: date}};
            }

            let countOptions = {...options, limit: undefined};
            let [accounts, count] = await Promise.all([
                Account.findAll(options),
                Account.count(countOptions)
            ])
            return res.json({accounts, count});
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getPayments(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не переданы необходимые данные'});
        try {
            let options = {
                where: {agreementId: req.query.id}, 
                limit: +req.query.limit || 10,
                order: [
                    ['status', 'ASC'],
                    ['date', 'DESC'] 
                ],
            };
            if (req.query.offset) {
                options.offset = +req.query.offset;
            }
            if (req.query.start) {
                let date = new Date(+req.query.start);
                options.where = {...options.where, date: {[Op.gte]: date}};
            }
            if (req.query.end) {
                let date = new Date(+req.query.end);
                options.where = {...options.where, date: {[Op.lte]: date}};
            }

            let countOptions = {...options, limit: undefined};

            let [payments, count] = await Promise.all([
                Payment.findAll(options),
                Payment.count(countOptions)
            ])
            return res.json({payments, count});
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getServices(req, res) {
        try {
            const services = await Service.findAll();
            return res.json(services);
        } catch (e) {
            //log
            console.log(e);
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
}

export default new ProfileController();