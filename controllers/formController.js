const {TrashPlace, User, UserData, Follower, MessageTheme, Message, Account, File} = require('../models/models');
const validator = require('validator');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {makeFilesJSONForDb} = require('../utils/files');
const {checkToken} = require('../middlewares/authMiddleware');
const {mailTrashPlace, usualMail, resumeMail} = require('../utils/mail');
require('dotenv').config();

const _trashPlaceLoginedPerson = async (req, res) => {
    const { id } = jwt.verify(req.accessToken, process.env.SERVER_SECRET_KEY);
    const userData = await UserData.findByPk(id);
    const data = {
        email: userData.email,
        number: userData.number,
        address: req.body.address,
        text: req.body.text,
    };
    
    if (req.files && req.files.length) {
        data.files = req.files.map(item => ({link: item.filename, type: 'other'}));
    }
    const newTrashPlace = await _createNewTrashPlace(data);
    
    const info = await mailTrashPlace(data);
    if (info) {
        return res.sendStatus(200);
    } else {
        await newTrashPlace.destroy();
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
}

const _trashPlaceNotLoginedPerson = async (req, res) => {
    const {number} = req.body;
    const condition = number && validator.isNumeric(number);
    if (condition) {
        let body = req.body;
        if (req.files && req.files.length) {
            body.files = req.files.map(item => ({link: item.filename, type: 'other'}))
        }
        try {
            const result = await _createNewTrashPlace(body);
            const info = await mailTrashPlace(body);
            if (info) {
                return res.sendStatus(200);
            } else {
                await result.destroy();
                return res.status(500).json({message: 'Не удалось отправить сообщение'})
            }
        } catch (e) {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'})
        } 
    } else {
        return res.status(400).json({message: 'Не заполнена электронная почта'})
    }
}

const _makeNewQuestionLoginedPerson = async (req, res) => {
    try {
        let user = await User.findOne({where: {login: req.tokenInfo.login}});
        let userData = await UserData.findOne({where: {id: user.id}});
        let text = `Пользователь сайта задал вопрос. Номер его лицевого счета: ${user.login}. Его телефон: ${userData.number}. Его электронная почта: ${userData.email}. \n Его вопрос: ${req.body.text}`;
        let result = await usualMail(text, 'Вопрос на сайте ООО ЭКОТРАНС');
        if (result) return res.json({success: true});
        else return res.status(500).json({message: 'Внутренняя ошибка сервера'}); 
    } catch (e) {
        //log
        console.log(e)
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
}

const _makeNewQuestionNotLoginedPerson = async (req, res) => {
    try {
        let number = validator.isNumeric(req.body.number) && validator.isLength(req.body.number, {min: 10, max: 20});
        let email = validator.isEmail(req.body.email);
        if (!number || !email) return res.status(400).json({message: 'Неправильно заполнены обязательные поля'});
        let text = `Пользователь сайта задал вопрос. Его телефон: ${req.body.number}. Его электронная почта: ${req.body.email}. \n Его вопрос: ${req.body.text}`;
        let result = await usualMail(text, 'Вопрос на сайте ООО ЭКОТРАНС');
        if (result) return res.json({success: true});
        else return res.status(500).json({message: 'Внутренняя ошибка сервера'}); 
    } catch (e) {
        //log
        console.log(e)
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
}

const _createNewTrashPlace = async (body) => {
    const newTrashPlace = await TrashPlace.create(
        body, 
        {
            include: ['files']
        }
    );
    return newTrashPlace;
}

class FormContoller {
    async savetrashPlace(req, res) {
        const errors = validationResult(req);
        if (req.multerFileError) return res.status(400).json({message: req.multerFileError});
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнен адрес свалки', error: errors[0]});
        let token = req.cookies && req.cookies.token;
        if (token) {
            try {
                req.accessToken = token;
                _trashPlaceLoginedPerson(req, res);
            } catch (e) {
                _trashPlaceNotLoginedPerson(req, res);
            }
        } else {
            _trashPlaceNotLoginedPerson(req, res);
        }
    }  
    async signMessageSending(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Неправильный формат электронной почты', error: errors[0]});
        try {
            let oldFollower = await Follower.findOne({where: {email: req.body.email}});
            if (oldFollower) return res.status(400).json({message: 'Вы уже подписаны на наши новости'});
            let follower = await Follower.create(req.body);
            return res.json({success: !!follower});
        } catch (e) {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
    async helpTrashPasport(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Неправильно заполнен номер телефона', error: errors[0]})
        let text = `Пользователь запросил помощь на сайте, его номер ${req.body.number}`;
        let result = await usualMail(text, 'Запрос на помощь с оформлением паспорта отходов');
        if (result) return res.json({success: true});
        else {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'})
        }
    }
    async callOrder(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Неправильно заполнен номер телефона', error: errors[0]});
        let text = `Пользователь сайта запросил обратный звонок, его номер: ${req.body.number}.`;
        if (req.body.name) text += ` Его имя: ${req.body.name}.`;
        let result = await usualMail(text, 'Запрос на обратный звонок');
        if (result) return res.json({success: true});
        else {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'})
        }
    }
    async resume(req, res) {
        const errors = validationResult(req);
        if (req.multerFileError) return res.status(400).json({message: req.multerFileError});
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'})
        if (!req.files || !req.files.length) {
            return res.status(400).json({message: 'Не прикреплено резюме'})
        }
        let body = {...req.body, files: makeFilesJSONForDb(req)};
        let info = await resumeMail(body);
        if (info) {
            return res.json({success: true});
        } else {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
    async becomePartner(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        let text = `Поступил новый запрос на партнерство с сайта ООО ЭКОТРАНС. Организация: ${req.body.name}. Контактное лицо: ${req.body.fio}. Номер телефона: ${req.body.number}. Адрес электронной почты: ${req.body.email}`;
        let result = await usualMail(text, 'Запрос на партнерство');
        if (result) return res.json({success: true});
        else {
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'})
        }
    }
    async makeNewQuestion(req, res) {
        //можно предусмотреть добавление вопросов в базу, добавление этих вопросов и ответов админом на страницу
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        let token = req.cookies && req.cookies.token;
        let tokenInfo = token && checkToken(token);
        if (tokenInfo) {
            req.tokenInfo = tokenInfo;
            _makeNewQuestionLoginedPerson(req, res);
        } else {
            _makeNewQuestionNotLoginedPerson(req, res);
        }
    }
    async makeNewMessageTheme(req, res) {
        const errors = validationResult(req);
        if (req.multerFileError) return res.status(400).json({message: req.multerFileError});
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            let [user, theme] = await Promise.all([
                UserData.findOne({where: {id: req.tokenUser.id}}),
                MessageTheme.findOne({where: {creatorId: req.tokenUser.id, name: req.body.theme, closed: false}})
            ])
            if (theme) return res.status(400).json({message: 'Обращение по этой теме уже существует'});
            let newMessageTheme = await MessageTheme.create({
                name: req.body.theme,
                creatorId: user.id,
                closed: false,
                participantId: user.role === 1 ? req.body.participantId : 1
            });
            let newMessage = await Message.create({
                text: req.body.text,
                themeId: newMessageTheme.id,
                creatorId: user.id,
                read: false,
                files: req.files 
                    && req.files.length 
                    && req.files.map(item => ({link: item.filename, type: 'message'})),
            }, {include: req.files && req.files.length ? ['files'] : []})
            
            return res.sendStatus(200);
        } catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
    async makeNewAgreement(req, res) {
        const errors = validationResult(req);
        if (req.multerFileError) return res.status(400).json({message: req.multerFileError});
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        //save into db or send to 1s
        return res.sendStatus(200);
    }
    async getOriginalAccount(req, res) {
        let { accounts } = req.body;
        if (accounts.length) {
            try {
                let userData = await UserData.findOne({
                    where: {id: req.tokenUser.id},
                    include: ['agreements']
                })
                let accountsModels = await Account.findAll({
                    where: {
                        id: accounts,
                        agreementId: userData.agreements.map(item => item.id)
                    }
                })
                let text = `Пользователь ${userData.name} запросил оригиналы взаиморасчетов.\n Номер его лицевого счета: ${userData.ls}.\n Указанные документы прикреплены к сообщению. \n Имя пользователя или наименование организации может отличаться от хранящегося в 1с.`;
                let attachments = accountsModels.map(item => ({path: item.link}));
                let result = await usualMail(text, 'Запрос на выдачу оригиналов взаиморасчетов', attachments);
                if(result) {
                    return res.sendStatus(200);
                }
                return res.status(500).json({message: 'Файлы взаиморасчетов отсутствуют на сайте, обратитесь в организацию за оригиналами'});
                
            } catch (e) {
                //log
                console.log(e)
                return res.status(500).json({message: 'Внутренняя ошибка сервера'});
            }
        } else {
            return res.status(400).json({message: 'Не выбраны необходимые документы'});
        }
    }
}

export default new FormContoller();