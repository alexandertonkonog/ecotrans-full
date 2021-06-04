import React from 'react';
import partner from '../../../images/partner/partner.jpg';

const Info = () => {
    return (
        <section className="partner-info block title-padding">
            <h1 className="main-title page-title">Партнерам</h1>
            <div className="text-col">
                <h2 className="small-title mb-small">Компания «Экотранс» подбирает партнеров для глубокой переработки вторичного сырья, медицинских и опасных отходов</h2>
                <p className="main-text text-grey">Резидентами экотехнопарка «Экотранс» могут стать производители или эксплуатанты оборудования по переработке промышленных и бытовых отходов, производители продукции из вторичного сырья.</p>
            </div>
            <img src={partner} alt="Партнерам" title="Партнерам" className="partner-info__img mt-max"/>
            <div className="text-col average-padding">
                <h2 className="small-title mb-small">Строительство экотехнопарка «Экотранс» </h2>
                <p className="main-text text-grey mb-small">Технопарк планируется создать в сотрудничестве с региональным оператором ТКО «Экотранс» на территории в 4,25 ГА в Неклиновском районе Ростовской области.</p>
                <p className="main-text text-grey">За период деятельности региональный оператор «Экотранс»  оптимизировал систему сортировки и сбора вторичного сырья из всех доступных источников (от населения, сбор мест накопления, собственные пункты приема), что обеспечивает постоянное поступление сырья для переработки.</p>
            </div>
            <div className="partner-info__ecopark-list text-col average-padding pt0">
                <h3 className="micro-title ">В зону деятельности регионального оператора по обращению с ТКО входят:</h3>
                <ul className="main-list main-list_icon">
                    <li className="main-list__item text-grey"><span>МО «город Таганрог»</span></li>
                    <li className="main-list__item text-grey"><span>МО «Куйбышевский район»</span></li>
                    <li className="main-list__item text-grey"><span>МО «Матвеево-Курганский район»</span></li>
                    <li className="main-list__item text-grey"><span>МО «Неклиновский район»</span></li>
                </ul>
            </div>
        </section>
    );
}

export default Info;