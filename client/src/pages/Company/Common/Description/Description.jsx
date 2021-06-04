import React from 'react';
import { useSelector } from 'react-redux';
import img from '../../../../images/company/info.jpg';

const Description = (props) => {
    const areas = useSelector(state => state.main.serviceAreas);
    return (
        <>
            <section className="company-des grid">
                <h2 className="small-title">{props.data['1']}</h2>
                <p className="main-text">{props.data['2']}</p>
                <img src={img} className="company__img" alt=""/>
            </section>
            <section className="company-elems grid">
                <h2 className="small-title">В зону Неклиновского МЭОКа входят: </h2>
                <ul className="main-list main-list_icon">
                    {areas.map((item) => {
                        return (
                            <li key={item.id} className="main-list__text-item main-text">
                                {item.text}
                            </li>
                        );
                    })}
                </ul>
                <p className="main-text">Соглашение об организации деятельности по обращению с твердыми коммунальными отходами в зоне деятельности Неклиновского МЭОКа подписано с Министерством жилищно-коммунального хозяйства Ростовской области 15 мая 2018 года.</p>
                <p className="main-text">Организация обращения с отходами в соответствии с законодательством Российской Федерации, соблюдение схемы потоков отходов, ликвидация мест несанкционированного размещения отходов, внедрение раздельного сбора отходов и постоянное совершенствование качества оказываемых услуг - ключевые приоритеты деятельности регионального оператора.</p>
                <p className="main-text">Также наша компания предлагает комплекс услуг по транспортированию, обработке, утилизации, обезвреживанию, размещению отходов, не относящихся к твердым коммунальным отходам.</p>
            </section>
        </>
    );
}
Description.defaultProps = {
    data: {
        '1': 'ООО «Экотранс» — профессиональное обращение с отходами',
        '2': 'Общество с ограниченной ответственностью «Экотранс» является региональным оператором по обращению с твердыми коммунальными отходами на территории Неклиновского МЭОКа.',
    }
};
export default Description;