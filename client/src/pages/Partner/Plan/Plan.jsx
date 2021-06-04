import React from 'react';
import stock1 from '../../../images/partner/stock1.jpg';
import stock2 from '../../../images/partner/stock2.jpg';
import stock3 from '../../../images/partner/stock3.jpg';
import plan from '../../../images/partner/plan.jpg';

const Plan = () => {
    const gallery = [
        {id: 1, img: stock1},
        {id: 2, img: stock2},
        {id: 3, img: stock3},
    ];
    return (
        <section className="block partner-plan middle-padding">
            <div className="partner-plan__des grid">
                <img src={plan} alt="План" title="План" className="partner-plan__img"/>
                <h2 className="small-title  partner-plan__text ">Строительство экотехнопарка «Экотранс» </h2>
                <p className=" main-text text-grey partner-plan__text1 partner-plan__text">Территория административно-производственной зоны имеет твердое асфальтобетонное и бетонное покрытие</p>
                <p className=" main-text text-grey partner-plan__text2 partner-plan__text">С целью предотвращения смыва грунта с прилегающей территории твердые покрытия отделяются бортовым камнем от газонов. Подъезд к участку захоронения ТКО АН с твердым (асфальтобетонным) покрытием, наружным освещением и видеонаблюдением</p>
                <p className="main-text text-grey partner-plan__text3 partner-plan__text">По периметру территории объекта запроектировано ограждение высотой 2 метра</p>
            </div>
            <div className="partner-plan__list middle-padding pb0">
                {gallery.map(item => <img key={item.id} src={item.img} alt={item.img} className="partner-plan__list-img"/>)}
            </div>
        </section>
    );
}

export default Plan;