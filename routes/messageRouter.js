const Router = require('express');
const messageController = require('../controllers/messageController');
const { slugify } = require('transliteration');
const path = require('path');
const { tokenMiddleware } = require('../middlewares/authMiddleware');
const multer  = require("multer");

const messageRouter = Router();

const imagesDocs = [
    "image/jpeg", 
    "image/jpg", 
    "image/png",
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingm", 
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

messageRouter.get('/dialogs', [
    tokenMiddleware
], messageController.getDialogs);

messageRouter.get('/messages', [
    tokenMiddleware
], messageController.getMessages);

messageRouter.post('/read', [
    tokenMiddleware
], messageController.readMessage);

messageRouter.post('/new-message', [
    tokenMiddleware,
    multer({
        storage: storageConfig, 
        fileFilter: getMulterWithCustomFilter(imagesDocs),
        limits: {
            fileSize: 1000000
        }}).array('file', 3)
], messageController.setNewMessage);

module.exports = {
    messageRouter
}