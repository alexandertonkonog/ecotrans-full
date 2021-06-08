const {IBlockElement, IBlock, IBlockElementProperty} = require('../models/models');
const validator = require('validator');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');
const { slugify } = require('transliteration');

class IBlockContoller {
    async getEntities (req, res) {
        if (!req.query.id) return res.status(400).json({message: 'Нет идентификатора'});
        try {
            let options = {
                where: {
                    iblockId: +req.query.id,
                    visible: true
                },
                limit: +req.query.limit,
                offset: +req.query.offset,
                include: ['smallImg', 'properties'],
                attributes: ['id', 'name', 'smallText', 'linkName', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ]
            }
            if (req.query.time) {
                options.where = {
                    ...options.where,
                    createdAt: {
                        [Op.gte]: new Date(+req.query.time)
                    }
                }
            }
            if (req.query.props) {
                let props = JSON.parse(req.query.props);
                options.attributes = [...options.attributes, ...props]
            }

            if (req.query.order) {
                let order = JSON.parse(req.query.order);
                options.order = order;
            }

            let countOptions = {where: options.where};

            if (req.query.type && req.query.fieldId) {
                options.include = ['smallImg', {
                    as: 'properties',
                    model: IBlockElementProperty,
                    where: {
                        userFieldId: +req.query.fieldId,
                        value: req.query.type
                    }
                }];
                countOptions.include = options.include
            }
            
            let [elements, count] = await Promise.all([
                IBlockElement.findAll(options),
                IBlockElement.count(countOptions)
            ])
            return res.json({elements, count});
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getEntity (req, res) {
        if (!req.query.link || !req.query.id) return res.status(400).json({message: 'Нет идентификатора'});
        let options = {
            where: {
                iblockId: +req.query.id,
                linkName: req.query.link
            },
            include: ['smallImg', 'properties', 'img', 'files', 'iblock'],
        }
        try {
            let [newItem, [nextItem]] = await Promise.all([
                IBlockElement.findOne(options),
                IBlockElement.findAll({
                    where: {
                        iblockId: +req.query.id,
                        linkName: {
                            [Op.ne]: req.query.link
                        }, 
                    },
                    limit: 1,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    attributes: ['name', 'linkName']
                })
            ]);
            if (newItem) {
                return res.json({data: newItem, next: nextItem});
            }
            return res.status(404).json('Нет такой страницы');
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async setEntity (req, res) {
        try {
            let element = await IBlockElement.findOne({
                where: {
                    linkName: req.body.linkName,
                    iblockId: req.body.iblockId
                }
            })
            if (element) {
                throw new Error('Элемент с такой ссылкой уже существует в данном информационном блоке');
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
        }
        let entityProps = {
            ...req.body
        };
        let include = [];
        if (req.files.img) {
            let img = req.files.img[0];
            entityProps.img = {
                type: 'iblock',
                link: img.filename,
                name: img.originalname
            }
            include = ['img'];
        }
        if (req.files.smallImg) {
            let img = req.files.smallImg[0];
            entityProps.smallImg = {
                type: 'iblock',
                link: img.filename,
                name: img.originalname
            }
            include = [...include, 'smallImg'];
        }
        if (req.files.files) {
            entityProps.files = req.files.files.map(item => ({
                type: 'iblock',
                link: item.filename,
                name: item.originalname
            }));
            include = [...include, 'files'];
        }
        if (req.body.properties) {
            entityProps.properties = JSON.parse(req.body.properties);
            include = [...include, 'properties'];
        }
        
        try {
            let result = await IBlockElement.create(
                entityProps,
                { include }
            );
            return res.json(result);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async setSomeEntity (req, res) {
        try {
            let element = await IBlockElement.findOne({
                where: {
                    linkName: req.body.linkName,
                    iblockId: req.body.iblockId
                }
            })
            if (element) {
                throw new Error('Элемент с такой ссылкой уже существует в данном информационном блоке');
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
        }
        let entityProps = {
            ...req.body
        };
        let include = [];
        if (req.files.img) {
            let img = req.files.img[0];
            entityProps.img = {
                type: 'iblock',
                link: img.filename,
                name: img.originalname
            }
            include = ['img'];
        }
        if (req.files.smallImg) {
            let img = req.files.smallImg[0];
            entityProps.smallImg = {
                type: 'iblock',
                link: img.filename,
                name: img.originalname
            }
            include = [...include, 'smallImg'];
        }
        if (req.files.files) {
            entityProps.files = req.files.files.map(item => ({
                type: 'iblock',
                link: item.filename,
                name: item.originalname
            }));
            include = [...include, 'files'];
        }
        if (req.body.properties) {
            entityProps.properties = JSON.parse(req.body.properties);
            include = [...include, 'properties'];
        }
        const createArray = [];
        for (let i = 0; i < +req.body.count; i++) {
            let obj = {...entityProps};
            obj.linkName = slugify(entityProps.linkName.replace(/\s+/g,"-")) + i
            createArray.push(obj);
        }
        try {
            let result = await IBlockElement.bulkCreate(
                createArray,
                { include }
            );
            return res.json(result);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getIBlocks (req, res) {
        try {   
            const result = await IBlock.findAll({
                where: {
                    visible: true,
                },
                attributes: ['id', 'name'],
                include: ['userFields'],
                order: [
                    ['id', 'ASC']
                ]
            });
            return res.json(result);
        } catch (e) {
            //log
            console.log(e)
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }
}   

module.exports = new IBlockContoller();