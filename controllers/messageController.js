const {Message, MessageTheme, User, UserData, Role, File} = require('../models/models');
const validator = require('validator');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {makeFilesJSONForDb} = require('../utils/files');

const sortHandle = (prev, next) => {
    let unreadSort = prev.unread - next.unread;
    if (unreadSort > 0) {
        return -1;
    } else if (unreadSort === 0) {
        return (new Date(next.lastMessage.createdAt)) - (new Date(prev.lastMessage.createdAt));
    } else {
        return 1;
    }
}

class MessageController {
    async getMessages(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty() || !req.query.id || !req.query.count) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            let theme = await MessageTheme.findOne({where: {id: req.query.id}});
            if (theme.creatorId === req.tokenUser.id || theme.participantId === req.tokenUser.id) {
                let options = {
                    where: {themeId: theme.id}, 
                    order: [['createdAt',  'DESC']], 
                    limit: +req.query.count || 10,
                    include: [
                        {model: UserData, as: 'creator', include: ['role']},
                        {model: File, as: 'files'},
                    ]
                };
                if (req.query.offset) {
                    options.offset = +req.query.offset;
                }
                let [messages, messageCount] = await Promise.all([
                    Message.findAll(options),
                    Message.count({where: {themeId: theme.id}})
                ]);
                return res.json({messages, messageCount});
            } 
            return res.status(401).json({message: 'Вы не авторизованы'});
            
        } catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getMoreMessages(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            let theme = await MessageTheme.findOne({where: {id: req.query.id}});
            if (theme.creatorId === req.tokenUser.id || theme.participantId === req.tokenUser.id) {
                let [messages, messageCount] = await Promise.all([
                    Message.findAll({
                        where: {themeId: theme.id}, 
                        order: [['createdAt',  'DESC']], 
                        limit: 10,
                        include: [
                            {model: UserData, as: 'creator', include: ['role']},
                            {model: File, as: 'files'},
                        ]
                    }),
                    Message.count({where: {themeId: theme.id}})
                ]);
                return res.json({messages, messageCount});
            } else {
                return res.status(401).json({message: 'Вы не авторизованы'});
            }
        } catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getDialogs(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            let themes = await MessageTheme.findAll(
                {where: {[Op.or]: [{creatorId: req.tokenUser.id}, {participantId: req.tokenUser.id}]}, order: [ ['createdAt',  'DESC'] ]
            });
            let messages, messageCount;
            if (themes.length) {
                //create arrays for using in Promise.all
                let themeSearchArray = themes.map(item => Message.findAll({
                    where: {themeId: item.id},
                    limit: 1,
                    order: [[ 'createdAt', 'DESC' ]], 
                    attributes: ['createdAt', 'themeId']})
                );
                let themeCountArray = themes.map(item => Message.count({
                    where: {themeId: item.id, read: false, creatorId: {[Op.ne]: req.tokenUser.id}}
                }));
                //create arrays for using in Promise.all

                let lastDialogsMessages = await Promise.all(themeSearchArray);
                let unreadMessages = await Promise.all(themeCountArray);
                
                //create common array from sequalize theme instance, insert last message and unread message count in every theme
                let mutableThemes = themes.map((item, index) => {
                    let lastMessage = lastDialogsMessages[index][0];
                    let unread = unreadMessages[index];
                    return {...item.dataValues, lastMessage, unread};
                });
                
                //get 10 messages for first theme
                [messages, messageCount] = await Promise.all([
                    Message.findAll({where: 
                        {themeId: themes[0].id}, 
                        limit: 10, 
                        include: [
                            {model: UserData, as: 'creator', include: ['role']},
                            {model: File, as: 'files'},
                        ]
                    }),
                    Message.count({where: {themeId: themes[0].id}})
                ])
                
                //sort items by read status then by date
                mutableThemes = mutableThemes.sort(sortHandle);
                return res.json({themes: mutableThemes, messages, messageCount, count: themes.length});
            } else {
                return res.json({count: 0});
            }}
        catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        } 
    }

    async readMessage(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            if (req.body.id) {
                let messages = await Message.findAll({
                    where: {
                        themeId: req.body.id,
                        read: false,
                        creatorId: {[Op.ne]: req.tokenUser.id}
                    }
                });

                if (messages.length) {
                    let messageUpdateArray = messages.map(item => Message.update({read: true}, {
                        where: {
                            id: item.id
                        }
                    }))
                    let result = await Promise.all(messageUpdateArray);
                }
                return res.sendStatus(200);
            }
            return res.status(400).json({message: 'Не присланы обязательные параметры'});
        } catch (e) {
            //log
            console.error(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }        
    }

    async setNewMessage(req, res) {
        const errors = validationResult(req);
        if (req.multerFileError) return res.status(400).json({message: req.multerFileError});
        if (!errors.isEmpty()) return res.status(400).json({message: 'Не заполнены обязательные поля'});
        try {
            if (!req.body.message || !req.body.id) return res.status(400).json({message: 'Нет необходимых данных'})
            let theme = await MessageTheme.findByPk(req.body.id);
            if (req.tokenUser.id === theme.creatorId || req.tokenUser.id === theme.participantId) {
                let newMessageArray = [
                    Message.create({
                        text: req.body.message,
                        themeId: req.body.id,
                        creatorId: req.tokenUser.id,
                        read: false,
                        files: req.files 
                            && req.files.length 
                            && req.files.map(item => ({link: item.filename, type: 'message'}))
                    }, {include: req.files && req.files.length ? ['files'] : []}), 
                    UserData.findOne({where: {id: req.tokenUser.id}, include: ['role']}),
                    Message.count({where: {themeId: theme.id}})
                ];
                let [newMessage, userData, messageCount] = await Promise.all(newMessageArray);
                newMessage = {...newMessage.dataValues, creator: userData};
                return res.json({message: newMessage, messageCount});
            } 
            return res.status(401).json({message: 'Вы не авторизованы'});
        } catch(e) {
            //log
            console.log(e);
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
}

module.exports = new MessageController();