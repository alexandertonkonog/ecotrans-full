import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/footer.css';
import logo from '../../images/logo-white.svg';
import firstbit from '../../images/firstbit.png';
import Social from '../../components/Common/Social/Social';

const Footer = () => {
    const social = [
        
    ];
    return (
        <div className="footer-container">
            <footer className="footer">
                <div className="footer__inside block">
                    <div className="footer__top">
                        <Link to="/" className="footer__logo">
                            <img 
                                src={logo}
                                className="footer__logo-logo"
                                alt="Экотранс - Лицензированный региональный оператор" 
                                title="Экотранс - Лицензированный региональный оператор" />
                                <svg className="footer__logo-separator" width="1" height="37" viewBox="0 0 1 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0.5" y1="0.5" x2="0.500002" y2="36.5" stroke="#828282"/>
                                </svg>
                                <p className="footer__logo-text">Лицензированный региональный оператор</p>
                        </Link>
                        <nav className="footer__nav">
                            <Link to="/uslugi" className="footer__nav-link footer__nav-link_left">Услуги</Link>
                            <Link to="/partneram" className="footer__nav-link footer__nav-link_right">Партнерам</Link>
                            <Link to="/dokumenti" className="footer__nav-link footer__nav-link_left">Документы</Link>
                            <Link to="/o-kompanii" className="footer__nav-link footer__nav-link_right">О компании</Link>
                            <Link to="/tarifi" className="footer__nav-link footer__nav-link_left">Тарифы</Link>
                            <Link to="/otveti-na-voprosi" className="footer__nav-link footer__nav-link_right">Ответы на вопросы</Link>
                            
                        </nav>
                        <div className="footer__contact">
                            <a href="tel:88005553535" className="footer__number">88005553535</a>
                            <Link to="/kontakti" className="footer__contact-link">Адрес на карте</Link>
                        </div>
                    </div>
                    <hr className="footer__separator"/>
                    <div className="footer__bottom">
                        <div className="footer__social">
                            <p className="footer__copyright">©  2020, ООО «Экотранс»</p>
                            <Social />
                        </div>
                        <nav className="footer__sec-nav">
                            <Link to="/politika-konfidencialnosti" className="footer__nav-link">Политика конфиденциальности</Link>
                            {/* <Link to="/karta-sayta" className="footer__nav-link">Карта сайта</Link>
                            <Link to="/publichnaya-oferta" className="footer__nav-link">Публичная оферта</Link> */}
                        </nav>
                        <div className="footer__firstbit">
                            <p className="footer__firstbit-text">дизайн и разработка</p>
                            <img src={firstbit} alt="Первый Бит/digital" className="footer__firstbit-logo" title="Первый Бит/digital" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;