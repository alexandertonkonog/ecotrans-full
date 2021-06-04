import React from 'react';
import {Helmet} from 'react-helmet';
import Info from './Info/Info';
import More from '../../../components/More/More';

const Other = (props) => {
    return (
        <div className="block tko">
            <Helmet>
                <title>Транспортировка прочих отходов</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info />
            <section className="tko__btn-area short-padding">
                <p className="tko__btn-text tko__text text-grey">Таким образом реализация намеченных плановых заданий позволяет оценить значение дальнейших направлений развития.</p>
                <button className="btn btn_white nav__more-btn">
                    <div className="nav__more-btn-text">Заказать спецтехнику</div>
                    <svg className="nav__more-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinecap="round"/>
                        <path d="M17 16V7H8" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinecap="round"/>
                    </svg>
                </button>
            </section>
            <p className="tko__text tko-slider__seo text-grey">Особое внимание мы уделяем качеству оказания коммунальной услуги, поэтому график вывоза Твердых коммунальных отходов находится под постоянным контролем. Каждый автомобиль оснащен аппаратурой спутниковой навигации, что позволяет оперативно реагировать на каждое обращение и держать ситуацию под контролем. </p>
            <More text="Паспортизация отходов" link="/uslugi/pasportizaciya-othodov" />
        </div>
    );
}

export default Other;