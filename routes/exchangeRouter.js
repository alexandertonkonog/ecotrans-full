const {exchangeAuthMiddleware} = require('../middlewares/authMiddleware');
const Router = require('express');
const exchangeController = require('../controllers/exchangeController');

export const exchangeRouter = Router();

exchangeRouter.post('/', [exchangeAuthMiddleware], exchangeController.setData);

// exchangeRouter.get('/get', exchangeController.getTest);

module.exports = {
    exchangeRouter
}