const {check} = require('express-validator');
const multer  = require("multer");
const path = require("path");
const {tokenMiddleware} = require('../middlewares/authMiddleware');
const Router = require('express');
const { slugify } = require('transliteration');
const formContoller = require('../controllers/formController');

const formRouter = Router();

const images = [
    "image/jpeg", 
    "image/jpg", 
    "image/png"
];
const docs = [
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingm",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/rtf",
    "text/plain",
    "text/rtf",
];
const imagesDocs = [
    "image/jpeg", 
    "image/jpg", 
    "image/png",
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingm", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/rtf",
    "text/plain",
    "text/rtf",
];

const stripPath = (str) => {
    return path.normalize(str).replace(/^(\.\.(\/|\\|$))+/, '');
}

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./client/public/upload");
    },
    filename: (req, file, cb) =>{
        cb(null, slugify(stripPath(Date.now() + '.' + file.originalname)));
    }
})

const getMulterWithCustomFilter = (filterArray) => (req, file, cb) => {
    let error = false;
    if(!filterArray.includes(file.mimetype)){
        error = 'Неправильный формат файла';
    } 
    if (!error) {
        cb(null, true);
    } else {
        req.multerFileError = error;
        cb(null, false);
    }
}

formRouter.post('/trash-place', [
    multer({
        storage: storageConfig, 
        fileFilter: getMulterWithCustomFilter(images),
        limits: {
            fileSize: 1000000
        }
    }).array('file', 3),
    check('address', 'Не заполнен адрес свалки').isLength({min: 5, max: 100})
], formContoller.savetrashPlace);

formRouter.post('/sign-sending', [
    check('email', 'Неправильный формат электронной почты').isEmail()
], formContoller.signMessageSending);

formRouter.post('/trash-pasport', [
    check('number', 'Неправильный формат номера телефона').isNumeric().isLength({min: 10, max: 20})
], formContoller.helpTrashPasport);

formRouter.post('/call-order', [
    check('number', 'Неправильный формат номера телефона').isNumeric().isLength({min: 10, max: 20})
], formContoller.callOrder);

formRouter.post('/resume', [
    multer({
        storage: storageConfig, 
        fileFilter: getMulterWithCustomFilter(docs),
        limits: {
            fileSize: 1000000
        }
    }).array('file', 3),
    check('number', 'Неправильный формат номера телефона').isNumeric().isLength({min: 10, max: 20}),
    check('email', 'Неправильный формат электронной почты').isEmail(),
    check('name', 'Не введено имя').isLength({min: 1, max: 40})
], formContoller.resume);

formRouter.post('/partner', [
    check('number', 'Неправильный формат номера телефона').isNumeric().isLength({min: 10, max: 20}),
    check('email', 'Неправильный формат электронной почты').isEmail(),
    check('name', 'Не введено название организации').isLength({min: 1, max: 40}),
    check('fio', 'Не введено имя ответственного лица').isLength({min: 5, max: 40})
], formContoller.becomePartner);

formRouter.post('/question', [
    check('text', 'Ошибка длины текста').isLength({min: 15, max: 200}),
], formContoller.makeNewQuestion);

formRouter.post('/new-message-theme', [
    multer({
        storage: storageConfig, 
        fileFilter: getMulterWithCustomFilter(imagesDocs),
        limits: {
            fileSize: 1000000
        }
    }).array('file', 3),
    tokenMiddleware,
    check('text', 'Неправильная длина текста').isLength({min: 10, max: 3000}),
    check('theme', 'Неправильная длина темы').isLength({min: 10, max: 100}),
], formContoller.makeNewMessageTheme);

formRouter.post('/new-agreement', [
    multer({
        storage: storageConfig, 
        fileFilter: getMulterWithCustomFilter(imagesDocs),
        limits: {
            fileSize: 10000000
        }
    }).array('file', 20),
    tokenMiddleware,
], formContoller.makeNewMessageTheme);

formRouter.post('/account', [
    tokenMiddleware,
], formContoller.getOriginalAccount);

module.exports = {
    formRouter
}