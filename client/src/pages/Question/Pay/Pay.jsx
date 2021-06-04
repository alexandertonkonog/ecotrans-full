import React from 'react';
import {Helmet} from 'react-helmet';
import Sign from '../../Home/Sign/Sign';
import reg from '../../../images/que/reg.jpg';
import lk from '../../../images/que/lk.jpg';

const Pay = () => {
    const data = [
        {id: 1, img: reg, name: 'Чтобы оплатить услуги, зарегистрируйтесь или авторизуйтесь в личном кабинете на сайте'},
        {id: 2, img: lk, name: 'Совершить оплату по нужному договору можно с главной страницы личного кабинета'}
    ];
    return (
        <section className="que-pay average-padding pb0">
            <Helmet>
                <title>Оплата на сайте</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <div className="block">
                <h2 className="small-title mb-large que-pay__title">Физические лица могут оплатить услуги без комиссии на сайте</h2>
                <div className="que-pay__list">
                    {data.map(item => {
                        return (
                            <div key={item.id} className="que-pay__item grid mb-large">
                                <img src={item.img} alt={item.name} title={item.name} className="que-pay__img"/>
                                <div className="que-pay__text main-text">
                                    <p className="que-pay__text-number">{item.id}</p>
                                    {item.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="block middle-padding">
                <Sign />
            </div>
        </section>
    );
}

export default Pay;