const {exchangeAuthMiddleware} = require('../middlewares/authMiddleware');
import Router from 'express';
import exchangeController from '../controllers/exchangeController';

export const exchangeRouter = Router();

exchangeRouter.post('/set', [exchangeAuthMiddleware], exchangeController.setData);

exchangeRouter.get('/get', exchangeController.getTest);