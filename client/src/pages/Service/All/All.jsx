import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import logo1 from '../../../images/home/Union.svg';
import logo2 from '../../../images/home/Union-1.svg';
import logo3 from '../../../images/home/Union-2.svg';
import logo4 from '../../../images/home/Union-3.svg';
import logo5 from '../../../images/home/Other.svg';
import Sign from '../../Home/Sign/Sign';
import '../../../css/components/allGrid.css';

const All = () => {
    const menu = useSelector(state => state.main.menu);
    const data = menu.find(item => item.id === 1);
    const icons = [logo1,logo2,logo3,logo4,logo5];
    let [seoText, setSeoText] = useState(false)
    
    return (
        <div className="all block">
            <div className="section-nav-container grid">
                <h1 className="main-title all__title">Услуги</h1>
                <button className="btn btn_white nav__more-btn">
                    <p className="nav__more-btn-text">Экотранс-про</p>
                    <svg className="nav__more-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 16V7H8" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <section className="all__list average-padding">
                    {data.data.map((item, index) => {
                        return (
                            <Link key={item.id} to={item.link} className="home-service__card all__card">
                                <div className="home-service__card-img-container" style={{backgroundImage: 'url(' + icons[index] + ')'}}></div>  
                                <p className="home-service__card-title">{item.name}</p>
                            </Link>
                        );
                    })}
                    
            </section>
            <p className={seoText ? "all__seo-text all__seo-text_full" : 'all__seo-text'}>
                Сео текст. Казалось бы, ответ на этот вопрос прост: он нужен для того, чтобы на улицах было чисто. Но это только внешняя сторона такого вопроса, как вывоз мусора, ведь от него зависит гораздо больше, чем чистота и порядок. В первую очередь, своевременный вывоз бытовых, строительных и промышленных отходов на свалку позволяет избежать ухудшения экологической обстановки, которая и без того оставляет желать лучшего – особенно это касается крупных городов. Кроме того, регулярный вывоз мусора позволяет избежать распространения опасных болезней – ведь несанкционированные свалки привлекают большое количество бездомных животных и птиц, являющихся переносчиками различных заболеваний.
            </p>
            <div 
                className={seoText ? "all__seo-more all__seo-more_disable" : 'all__seo-more'} 
                onClick={() => setSeoText(true)}>
                Показать все 
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.70711 0.792893C1.31658 0.402369 0.683418 0.402369 0.292893 0.792893C-0.097631 1.18342 -0.0976311 1.81658 0.292893 2.20711L1.70711 0.792893ZM5 5.5L4.29289 6.20711C4.68342 6.59763 5.31658 6.59763 5.70711 6.20711L5 5.5ZM9.70711 2.20711C10.0976 1.81658 10.0976 1.18342 9.70711 0.792894C9.31658 0.402369 8.68342 0.402369 8.29289 0.792893L9.70711 2.20711ZM0.292893 2.20711L4.29289 6.20711L5.70711 4.79289L1.70711 0.792893L0.292893 2.20711ZM5.70711 6.20711L9.70711 2.20711L8.29289 0.792893L4.29289 4.79289L5.70711 6.20711Z" fill="#556A3B"/>
                </svg>
            </div>
            <section className="all__mail middle-padding">
                <Sign />
            </section>
        </div>
    );
}

export default All;