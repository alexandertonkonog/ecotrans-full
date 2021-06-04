import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import '../../../css/document/ban.css';
import More from '../../../components/More/More';

const Ban = () => {
    const dispatch = useDispatch();
    const bans = useSelector(state => state.iblock.bans);
    useEffect(() => {
        dispatch(getEntities({id: 17, limit: 100, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!bans) {
        return <div className="ban title-padding">
            <h1 className="main-title page-title block">Запрещается</h1>
            <section className="container_grey main-padding">
                <Loader />
            </section>
        </div>
    }

    if (!bans.count) {
        return <div className="ban title-padding">
            <h1 className="main-title page-title block">Запрещается</h1>
            <section className="container_grey main-padding">
                <p className="main-text">Здесь еще нет информации</p>
            </section>
        </div>
    }

    const firstArray = bans.count && bans.list.slice(0,8);
    const secondArray = bans.count && bans.list.slice(8,14);

    return (
        <div className="ban title-padding">
            <Helmet>
                <title>Запрещается</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <h1 className="main-title page-title block">Запрещается</h1>
            <section className="ban-first container_grey short-padding pb0">
                <div className="ban__list block">
                    {firstArray.map(item => {
                        return (
                            <div key={item.id} className="ban__item">
                                {item.smallImg && <img src={item.smallImg.fullLink} alt={item.smallText} title={item.name} className="ban__item-img"/>}
                                <p className="ban__item-text main-text">{item.smallText}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="middle-padding pb0 container_grey">
                <h2 className="small-title mb-large block">В контейнерах запрещается складировать:</h2>
                <div className="ban__list_second block">
                    {secondArray.map(item => {
                        return (
                            <div key={item.id} className="ban__item">
                                {item.smallImg && <img src={item.smallImg.fullLink} alt={item.name} title={item.smallText} className="ban__item-img"/>}
                                <p className="ban__item-text main-text">{item.smallText}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="container_grey">
                <div className="block">
                    <More text="Законодательство" link="/dokumenti/zakonodatelstvo" />
                </div>
            </section>
        </div>
    );
}

export default Ban;
