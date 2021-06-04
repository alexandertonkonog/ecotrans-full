import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';

const Right = () => {
    const dispatch = useDispatch();
    const rights = useSelector(state => state.iblock.partnerRights);

    useEffect(() => {
        dispatch(getEntities({id: 20, limit: 7, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!rights) {
        return <section className="partner-right-container main-padding">
            <Loader />
        </section>
    }

    if (!rights.count) {
        return <section className="partner-right-container main-padding pb0"></section>
    }

    const lastItem = rights.list.length && rights.list[6];
    return (
        <section className="partner-right-container container_grey average-padding">
            <div className="partner-right block">
                <h3 className="micro-title mb-large">Имеющиеся компетенции и мощности:</h3>
                <div className="partner-right__list mb-small">
                    {rights.list.slice(0,6).map(item => {
                        return (
                            <div key={item.id} className="partner-right__item">
                                <img src={item.smallImg.fullLink} alt={item.name} className="partner-right__img" />
                                <p className="main-text">{item.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div key={lastItem.id} className="partner-right__item">
                    <img src={lastItem.smallImg.fullLink} alt={lastItem.name} className="partner-right__img" />
                    <p className="main-text">{lastItem.name}</p>
                </div>
            </div>
        </section>
    );
}

export default Right;