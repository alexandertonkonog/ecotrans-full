import React from 'react';
import icon1 from '../../../images/contact/icon1.svg';
import icon2 from '../../../images/contact/icon2.svg';
import icon3 from '../../../images/contact/icon3.svg';
import icon4 from '../../../images/contact/icon4.svg';

const ContactList = () => {
    const data = [
        {id: 1, img: icon1, name: '344011,  Ростов-на-Дону, пр. Сиверса, д. 1-3, 12 этаж, офис 13'},
        {id: 2, img: icon2, name: 'пн-пт: 8:00 –17:00'},
        {id: 3, img: icon3, name: '+7 (863) 221-24-76', type: 1, tel: '88005553535'},
        {id: 4, img: icon4, name: 'info@ekotrans-rnd.ru'},
    ]
    let firstCol = data.slice(0,2);
    let secondCol = data.slice(2,4);
    return (
        <section className="contact-con grid">
            <h3 className="micro-title contact-con__title">Главный офис и центр обслуживания клиентов</h3>
            <div className="contact-con__col contact-con__col1">
                {firstCol.map(item => {
                    return (
                        <div key={item.id} className="contact-con__item mb-small">
                            <img src={item.img} className="contact-con__item-icon" alt={item.img} />
                            <p className="main-text contact-con__item-text">{item.name}</p>
                        </div>
                    );
                })}
            </div>
            <div className="contact-con__col contact-con__col2">
                {secondCol.map(item => {
                    return (
                        <div key={item.id} className="contact-con__item mb-small">
                            <img src={item.img} className="contact-con__item-icon" alt={item.img} />
                            {item.type === 1
                                ? <a href={"tel:" + item.tel} className="main-text contact-con__item-text contact-con__item-number">{item.name}</a>
                                : <p className="contact-con__item-text main-text">{item.name}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ContactList;