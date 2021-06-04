import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapSlider } from '../../../components/Slider/Slider';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import Partner from './Partner';

const Partners = () => {
    const partners = useSelector(state => state.iblock.partners);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEntities({id: 3, limit: 10, page: 1}));
    }, [])

    const data = {
        data: partners && partners.list,
        settings: {
            slidesPerView: 2,
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 4,            
                },
                1920: {
                    slidesPerView: 5,
                }
            }
        }
    };

    if (!partners) {
        return <section className="home-partners block"><Loader /></section>
    } 

    if (partners.list.length) {
        const Slider = wrapSlider(Partner, data);
        return (
            <section className="home-partners block">
                <div className="title-area">
                    <h2 className="section-title">Партнеры</h2>
                </div>
                <Slider />
            </section>
        )
    } else {
        return <></>
    }
}

export default Partners;