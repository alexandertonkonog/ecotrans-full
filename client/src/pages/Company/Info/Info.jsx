import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import { Helmet } from 'react-helmet';
import pdf from '../../../images/company/pdf.svg';
import link from '../../../images/company/link.svg';
import More from '../../../components/More/More';
import '../../../css/company/info.css';
import '../../../css/components/doc.css';

const Info = (props) => {
    const dispatch = useDispatch();
    const companyInfoDocs = useSelector(state => state.iblock.companyInfoDocs);
    const offices = useSelector(state => state.iblock.offices);

    useEffect(() => {
        dispatch(getEntities({id: 12, limit: 10, page: 1}));
        dispatch(getEntities({id: 16, limit: 2, page: 1}));
    }, []);
    

    return (
        <div className="block company-info">
            <Helmet>
                <title>Раскрытие информации</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            {companyInfoDocs 
                ? <section className="doc">
                    { companyInfoDocs.count ? companyInfoDocs.list.map(item => {
                        let needProperty = item.properties && item.properties.find(elem => elem.userFieldId === 11);
                        if (needProperty) {
                            return (
                                <a href={needProperty.value} key={item.id} className="doc__item">
                                    <div className="doc__icon" style={{backgroundImage: 'url(' + link + ')'}}></div>
                                    <p className="doc__title">{item.name}</p>
                                </a>
                            );
                        } else if (item.smallImg) {
                            return (
                                <a href={item.smallImg.fullLink} key={item.id} className="doc__item">
                                    <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                    <p className="doc__title">{item.name}</p>
                                </a>
                            );
                        }                    
                    }) : <></>}
                </section>
                :   <section className="doc main-padding"><Loader /></section>}
            <section className="info-shedule main-padding">
                <div className="title-area">
                    <h2 className="section-title">График оказания услуг</h2>
                </div>
                <div className="info-shedule__block grid">
                    <p className="info-shedule__text main-text">График оказания услуг. Не следует, однако забывать, что реализация намеченных плановых заданий позволяет оценить значение систем массового участия. Разнообразный и богатый опыт сложившаяся структура организации требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. </p>
                </div>
            </section>
            <section className="info-contact">
                <div className="title-area">
                    <h2 className="section-title">Контакты абонентских отделов</h2>
                </div>
                {offices ? <div className="info-contact__list">
                    {offices.list.map(item => {
                        let addressObj = item.properties.find(item => item.userFieldId === 22);
                        let numberObj = item.properties.find(item => item.userFieldId === 23);
                        let address = addressObj && addressObj.value;
                        let number = numberObj && numberObj.value;
                        return (
                            <div key={item.id} className={"info-contact__item info-contact__item" + item.id}>
                                <h3 className="info-contact__title">{item.name}</h3>
                                <div className="info-contact__body">
                                    {address && <p className="info-contact__address info-contact__item-text">
                                        <svg className="info-contact__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.11105 5.17969C9.26219 4.41053 10.6156 4 12 4C13.3845 4 14.7378 4.41053 15.889 5.17969C17.0401 5.94884 17.9373 7.04207 18.4671 8.32113C18.997 9.60019 19.1356 11.0076 18.8655 12.3655C18.5955 13.7233 17.9288 14.9706 16.9499 15.9496L16.9499 15.9496L12.7073 20.1922C12.5197 20.3796 12.2655 20.4848 12.0005 20.4848C11.7355 20.4848 11.4813 20.3796 11.2938 20.1922L7.05013 15.9496C6.0712 14.9706 5.40455 13.7234 5.13448 12.3655C4.86441 11.0076 5.00306 9.60019 5.53288 8.32113C6.06271 7.04207 6.95991 5.94884 8.11105 5.17969ZM18.3641 17.3638L17.6478 16.6475L18.3641 17.3638L14.1211 21.6068L14.1208 21.6072C13.5582 22.1691 12.7956 22.4848 12.0005 22.4848C11.2054 22.4848 10.4428 22.1691 9.88025 21.6072L9.87998 21.6069L5.63598 17.3639L5.63588 17.3638C4.37725 16.1051 3.52013 14.5015 3.1729 12.7556C2.82567 11.0098 3.00393 9.20025 3.68513 7.55574C4.36633 5.91123 5.51989 4.50565 6.99992 3.51674C8.47995 2.52783 10.22 2 12 2C13.78 2 15.5201 2.52783 17.0001 3.51674C18.4801 4.50565 19.6337 5.91123 20.3149 7.55574C20.9961 9.20025 21.1743 11.0098 20.8271 12.7556C20.4799 14.5015 19.6228 16.1051 18.3641 17.3638ZM10.0002 10.9997C10.0002 9.89513 10.8957 8.99969 12.0002 8.99969C13.1048 8.99969 14.0002 9.89513 14.0002 10.9997C14.0002 12.1043 13.1048 12.9997 12.0002 12.9997C10.8957 12.9997 10.0002 12.1043 10.0002 10.9997ZM12.0002 6.99969C9.79111 6.99969 8.00024 8.79056 8.00024 10.9997C8.00024 13.2088 9.79111 14.9997 12.0002 14.9997C14.2094 14.9997 16.0002 13.2088 16.0002 10.9997C16.0002 8.79056 14.2094 6.99969 12.0002 6.99969Z" fill="#98A782"/>
                                        </svg>
                                        {address}
                                    </p>}
                                    {number && <a href={'tel:' + number} className="info-contact__number info-contact__item-text">
                                        <svg className="info-contact__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.89508 4H8.81023L10.7678 9L8.32083 10.5C9.36907 12.6715 11.0893 14.429 13.2148 15.5L14.683 13L19.5769 15V19C19.5769 19.5304 19.3706 20.0391 19.0035 20.4142C18.6364 20.7893 18.1385 21 17.6193 21C13.8013 20.7629 10.2003 19.1065 7.49555 16.3432C4.79084 13.5798 3.16952 9.90074 2.9375 6C2.9375 5.46957 3.14374 4.96086 3.51086 4.58579C3.87798 4.21071 4.37589 4 4.89508 4Z" stroke="#98A782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {number}
                                    </a>}
                                    <a href={'mailto:info@ekotrans-rnd.ru'} className="info-contact__email info-contact__item-text">
                                        <svg className="info-contact__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.11224 6.53945C4.27884 6.21893 4.61391 6 5.00011 6H19.0001C19.3863 6 19.7214 6.21893 19.888 6.53945L12.0001 11.798L4.11224 6.53945ZM2.00017 6.98065C1.99997 6.99162 1.99995 7.00259 2.00011 7.01355V17C2.00011 18.6569 3.34325 20 5.00011 20H19.0001C20.657 20 22.0001 18.6569 22.0001 17V7.01356C22.0003 7.00259 22.0002 6.99162 22 6.98064C21.9896 5.3327 20.6505 4 19.0001 4H5.00011C3.34971 4 2.01058 5.3327 2.00017 6.98065ZM20.0001 8.8684V17C20.0001 17.5523 19.5524 18 19.0001 18H5.00011C4.44782 18 4.00011 17.5523 4.00011 17V8.86839L11.4454 13.8319C11.7813 14.0559 12.2189 14.0559 12.5548 13.8319L20.0001 8.8684Z" fill="#98A782"/>
                                        </svg>
                                        info@ekotrans-rnd.ru
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div> : <section className="doc main-padding"><Loader /></section>}
            </section>
            <More text="Узнайте больше о вакансиях компании" link="/o-kompanii/vakansii" />
        </div>           
    );
}

export default Info;