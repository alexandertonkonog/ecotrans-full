import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';

const Tech = () => {
    const dispatch = useDispatch();
    const techs = useSelector(state => state.iblock.techs);

    useEffect(() => {
        dispatch(getEntities({id: 11, limit: 4, page: 1}))
    }, []);

    if (!techs) return <section className="action-tech block main-padding"><Loader /></section>

    if (!techs.count) return <></>;

    return (
        <section className="action-tech block main-padding">
            <div className="title-area">
                <h2 className="section-title">Наши технологии</h2>
            </div>
            <div className="action-tech__list">
                {techs.list.map(item => {
                    return (
                        <article key={item.id} className="action-tech__item grid">
                            <h2 className="action-tech__title action-title">{item.name}</h2>
                            <div className="action-tech__text">
                                <p className="main-text">{item.smallText}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Tech;