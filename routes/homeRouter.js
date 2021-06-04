import Router from 'express';
import homeContoller from '../controllers/homeContoller';

export const homeRouter = Router();

homeRouter.post('/news', homeContoller.getNews);
homeRouter.post('/partners', homeContoller.getPartners);