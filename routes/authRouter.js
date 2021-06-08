const {check} = require('express-validator');
const {tokenMiddleware} = require('../middlewares/authMiddleware');
const Router = require('express');
const authContoller = require('../controllers/authContoller');

const authRouter = Router();

authRouter.post('/registration', [
    check('email', 'Неправильный формат электронной почты').isEmail(),
    check('login', 'Неправильный формат лицевого счета').isLength({min: 3, max: 20}),
    check('password', 'Пароль должен быть больше 6 символов').isLength({min: 6, max: 20})
], authContoller.registration);

authRouter.post('/login', authContoller.login);

authRouter.get('/verify/:hash', authContoller.verify);

authRouter.post('/forgot', [
    check('email', 'Неправильный формат электронной почты').isEmail(),
    check('ls', 'Неправильный формат лицевого счета').isLength({min: 5, max: 20}),
], authContoller.forgot)

authRouter.post('/', [ tokenMiddleware ], authContoller.auth);

module.exports = {
    authRouter
}