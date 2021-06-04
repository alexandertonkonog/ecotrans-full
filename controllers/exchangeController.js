require('dotenv').config()
const { mailRegistration, getMailHTML } = require('../utils/mail');
const { UserData, User, Agreement, Test, Payment, Account } = require('../models/models');
/**
 * [cutArray Делит большой массив на массивы указанной длины]
 * @param  {[array]} [big array for spliting on defined length]
 * @param  {[number]} [length of final arrays]
 * @return {[array]}  [array of arrays defined length]
*/
const cutArray = (array, max) => {
    
    let resultArray = [];
    let arr = [...array];
    if (!arr.length) return resultArray;
    if (arr.length <= max) {
        resultArray.push(arr);
    } else {
        while (arr.length > max) {
            resultArray.push(arr.slice(0, max));
            arr = arr.slice(max);
        }
        if (arr.length) {
            resultArray.push(arr);
        }
    }
    return resultArray;
}   

class ExchangeController {
    async setData(req, res) {
        const {agreements, payments, accounts} = req.body;
        const response = {
            messages: []
        };
        try {
            if (agreements.length) {
                await Agreement.bulkCreate(
                    agreements,
                    {
                        updateOnDuplicate: ['date', 'balance', 'ls', 'inn', 
                            'rs', 'kpp', 'ks', 'ogrn', 'bik', 'bank', 
                            'lawAddress', 'postAddress', 'factAddress', 'userType']
                    }
                );   
            } else {
                response.messages.push({message: 'Нет договоров'});
            }
            if (payments.length) {
                await Payment.bulkCreate(
                    payments,
                    { updateOnDuplicate: ['date', 'status', 'name', 'link', 'cost'] }
                );  
            } else {
                response.messages.push({message: 'Нет платежных документов'});
            }
            if (accounts.length) {
                await Account.bulkCreate(
                    accounts,
                    { updateOnDuplicate: ['name', 'date', 'link'] }
                ); 
            } else {
                response.messages.push({message: 'Нет документов взаиморасчетов'});
            }
            return res.json(response);
            
        } catch (e) {
            console.log(e)
            //log
            return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

    async getTest(req, res) {
        // const tests = [];
        // for (let i = 0; i < 200; i++) {
        //     tests.push({name: 'name' + i, id: i});
        // }
        
        // await Test.bulkCreate(
        //     tests,
        //     {updateOnDuplicate: ['name']}
        // )
        return res.status(204).json('tests');
    }
}

export default new ExchangeController();