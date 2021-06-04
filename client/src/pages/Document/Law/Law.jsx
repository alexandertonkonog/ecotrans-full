import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import pdf from '../../../images/company/pdf.svg';
import More from '../../../components/More/More';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import '../../../css/components/doc.css';

const Law = () => {
    const dispatch = useDispatch();
    const docs = useSelector(state => state.iblock.lawDocs);
    useEffect(() => {
        dispatch(getEntities({id: 5, limit: 100, page: 1}));
    }, [])
    return (
        <div className="law block title-padding">
            <Helmet>
                <title>Законодательство</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <h1 className="main-title page-title">Законодательство</h1>
            {docs 
                ? <section className="law-list">
                    {docs.count 
                        ? docs.list
                            .filter(item => item.smallImg)
                            .map(item => {
                                return (
                                    <a download href={item.smallImg.fullLink} key={item.id} className="doc__item">
                                        <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                        <p className="doc__title">{item.name}</p>
                                    </a>
                                );
                            })
                        : <p className="main-text average-padding">Еще нет загруженных документов</p>
                }
                </section>
                : <Loader />}
            <More text="Заключение договора" link="/dokumenti/zakluchenie-dogovora" />
        </div>
    );
}

export default Law;