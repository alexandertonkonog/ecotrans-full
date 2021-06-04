const {NewItem, Partner} = require('../models/models');

class HomeContoller {
    async getNews(req, res) {
        const news = await NewItem.findAll({ limit: 6 });
        console.log(news);
        return res.json(news);
    }

    async getPartners(req, res) {
        const partners = await NewItem.findAll({ limit: 10 });
        console.log(partners);
        return res.json(partners);
    }
}

export default new HomeContoller();