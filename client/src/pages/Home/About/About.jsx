import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import img from '../../../images/home/map.svg';

const About = () => {
    const areas = useSelector(state => state.main.serviceAreas);
    return (
        <section className="block home-about main-padding">
            <div className="title-area">
                <h2 className="section-title">О компании  ООО «Экотранс»</h2>
                <p className="title-text">«Экотранс» является региональным оператором по обращению с твердыми коммунальными отходами на территории Неклиновского МЭОКа.</p>
            </div>
            <div className="home-about__map">
                <div className="home-about__body">
                    <h3 className="home-about__title">В зону Неклиновского МЭОКа входят: </h3>
                    <ul className="home-about__list">
                        {areas.map((item) => {
                            return (
                                <li key={item.id} className="home-about__list-item main-list">
                                    {item.text}
                                </li>
                            );
                        })}
                    </ul>
                    <Link to="/o-kompanii" className="btn btn_green btn_main home-about__btn">Подробнее</Link>
                </div>
                <img src={img} className="home-about__img" alt="Карта" title="Карта" />
            </div>
        </section>
    );
}

export default About;