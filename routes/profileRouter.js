const Router = require('express');
const profileController = require('../controllers/profileController');
const {tokenMiddleware} = require('../middlewares/authMiddleware');
const {check} = require("express-validator");
const multer  = require("multer");

const profileRouter = Router();

profileRouter.get('/', [
    tokenMiddleware
], profileController.getProfile);

profileRouter.post('/', [
    tokenMiddleware
], profileController.saveNewProfile);

profileRouter.post('/password', [
    tokenMiddleware,
    check("password", "invalid password")
        .isLength({ min: 8, max: 20 })
        .custom((value, { req }) => {
            if (value !== req.body.repeatPassword) {
                throw new Error("Пароли не совпадают");
            } else {
                return value;
            }
        })
], profileController.saveNewPassword);

profileRouter.post('/password/forgot', [
    check("password", "invalid password")
        .isLength({ min: 8, max: 20 })
        .custom((value, { req }) => {
            if (value !== req.body.repeatPassword) {
                throw new Error("Пароли не совпадают");
            } else {
                return value;
            }
        })
], profileController.forgotNewPassword);

profileRouter.get('/payments', [
    tokenMiddleware,
], profileController.getPayments);

profileRouter.get('/accounts', [
    tokenMiddleware,
], profileController.getAccounts);

profileRouter.get('/services', profileController.getServices);

module.exports = {
    profileRouter
}
