const Router = require('express');
const iblockContoller = require('../controllers/iblockContoller');
const {tokenMiddleware} = require('../middlewares/authMiddleware');
const { slugify } = require('transliteration');
const multer  = require("multer");
const path = require("path");

const iblockRouter = Router();

const images = [
    "image/jpeg", 
    "image/jpg", 
    "image/png",
    "image/svg+xml",
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
    "image/svg+xml",
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

    if(!filterArray.includes(file.mimetype)) {
        
        error = 'Неправильный формат файла';
    } 
    if (!error) {
        cb(null, true);
    } else {
        req.multerFileError = error;
        cb(null, false);
    }
}

const upload = multer({
    storage: storageConfig, 
    fileFilter: getMulterWithCustomFilter(imagesDocs),
    limits: {
        fileSize: 10000000
    }
});

iblockRouter.get('/', iblockContoller.getIBlocks);

iblockRouter.get('/entities', iblockContoller.getEntities);

iblockRouter.get('/entity', iblockContoller.getEntity);

iblockRouter.post('/entity/set', [
    upload.fields([{
        name: 'img', maxCount: 1
    }, {
        name: 'smallImg', maxCount: 1
    }, {
        name: 'files', maxCount: 10
    }])
], iblockContoller.setEntity);

iblockRouter.post('/entity/manyset', [
    upload.fields([{
        name: 'img', maxCount: 1
    }, {
        name: 'smallImg', maxCount: 1
    }, {
        name: 'files', maxCount: 10
    }])
], iblockContoller.setSomeEntity);

module.exports = {
    iblockRouter
}