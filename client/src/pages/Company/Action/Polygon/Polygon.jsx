import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {wrapSlider} from '../../../../components/Slider/Slider';
import PolygonItem from './PolygonItem';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';

const Polygon = () => {
    const dispatch = useDispatch();
    const polygons = useSelector(state => state.iblock.polygons);

    const data = {
        data: polygons && polygons.list,
        settings: {
            slidesPerView: 1,
            loop: true,                
        }
    };

    useEffect(() => {
        dispatch(getEntities({id: 10, limit: 10, page: 1}));
    }, [])

    if (!polygons) {
        return <section className="action-polygon short-padding"><Loader /></section>
    }

    if (!polygons.count) return <></>;

    let Slider = wrapSlider(PolygonItem, data);

    return (
        <section className="action-polygon short-padding">
            <div className="action-polygon__inside block">
                <div className="title-area">
                    <h2 className="section-title">Полигоны</h2>
                </div>
                <Slider />
            </div>
        </section>
    );
}

export default Polygon;