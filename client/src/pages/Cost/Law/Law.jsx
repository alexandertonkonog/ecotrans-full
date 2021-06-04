import React from 'react';
import '../../../css/components/doc.css';
import pdf from '../../../images/company/pdf.svg';
import More from '../../../components/More/More';
import Loader from '../../../components/Loader/Loader';

const Law = ({costs, pageLoading}) => {
    
    if (!costs || pageLoading) return <div className="law block short-padding pb0"><Loader /></div>

    return (
        <div className="law block short-padding pb0">
            <section className="law-list">
                {costs.count ? costs.list
                    .filter(item => item.smallImg)
                    .map(item => {
                        return (
                            <a href={item.smallImg.fullLink} download key={item.id} className="doc__item">
                                <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                <p className="doc__title">{item.name}</p>
                            </a>
                        );
                    }) : <p className="main-text main-padding">Тарифов еще нет на сайте</p> }
            </section>
            <More text="Заключение договора" link="/dokumenti/zakluchenie-dogovora" />
        </div>
    );
}

export default Law;