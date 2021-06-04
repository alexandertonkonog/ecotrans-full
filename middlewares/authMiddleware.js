const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/models');
require('dotenv').config()

const checkToken = (token) => {
    try {
        let user = jwt.verify(token, process.env.SERVER_SECRET_KEY);
        return user;
    } catch {
        return false;
    }
}

const tokenMiddleware = (req, res, next) => {
    let token = req.cookies && req.cookies.token;
    if (!token) return res.status(401).json({message: 'Вы не авторизованы'});
    try {
        req.tokenUser = jwt.verify(token, process.env.SERVER_SECRET_KEY);
        next();
    } catch {
        return res.status(401).json({message: 'Вы не авторизованы'});
    }
}

const exchangeAuthMiddleware =  async (req, res, next) => {
    if (req.headers.authorization) {
        let [type, base64String] = req.headers.authorization.split(' ');
        let buff = new Buffer.from(base64String, 'base64');
        let text = buff.toString('ascii');
        let [login, password] = text.split(':');
        try {
            let user = await User.findOne({where: {login}});
            if (user) {
                let validPassword = bcrypt.compareSync(password, user.password);
                if (validPassword) {
                    next();
                    return;
                }
                return res.status(401).json({message: 'Неправильный логин или пароль'});
            }
            return res.status(401).json({message: 'Неправильный логин или пароль'});
        } catch (e) {
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
    return res.status(401).json({message: 'Неправильный логин или пароль'});
}

module.exports = {
    checkToken,
    tokenMiddleware,
    exchangeAuthMiddleware
}