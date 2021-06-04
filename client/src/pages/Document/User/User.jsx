import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import '../../../css/components/doc.css';
import pdf from '../../../images/company/pdf.svg';
import More from '../../../components/More/More';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';

const User = () => {
    const dispatch = useDispatch();
    const docs = useSelector(state => state.iblock.userDocs);
    useEffect(() => {
        dispatch(getEntities({id: 6, limit: 100, page: 1}));
    }, [])
    return (
        <div className="law block">
            <Helmet>
                <title>Документы потребителям</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <h1 className="main-title page-title title-padding">Документы потребителям</h1>
            {docs 
                ? <section className="law-list">
                    {docs.count
                        ? docs.list.map(item => {
                            return (
                                <a href="" key={item.id} className="doc__item">
                                    <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                    <p className="doc__title">{item.name}</p>
                                </a>
                            );
                        })
                    : <p className="main-text average-padding">Еще нет документов для потребителей</p>}
                </section>
                : <Loader />}
            <More text="Запрещается" link="/dokumenti/zapreschaetsya" />
        </div>
    );
}

export default User;