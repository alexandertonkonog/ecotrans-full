import Router from 'express';
const {mail, getMailHTML} = require('../utils/mail');

export const testRouter = Router();

testRouter.get('/', async (req, res) => {
    // let text = getMailHTML('http://localhost:3000/');
    // let result = await mail('AATonkonog@1cbit.ru', text, true, 'Тема');
    res.send(getFullStaticUrl(req, 'dwqjeiowqiej'))
})

