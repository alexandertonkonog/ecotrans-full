import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/components/pagination/pagination.scss';
import {getSliderPagination} from '../../dev/functions';
import 'swiper/swiper.scss';

export const wrapSlider = (Node, props) => {
    return () => {
        let [slide, setSlide] = useState(0);      
        const pagination = props.data.map((item, index) => index);
        let [slider, setSlider] = useState(null);
        let settings = {
            ...props.settings,
            onInit: (swiper) => {
                setSlider(swiper)
            },
            onActiveIndexChange: (swiper) => {
                setSlide(swiper.realIndex)
            },
            
        }
    
        return (
            <>
                <Swiper {...settings} className="card-list">
                    {props.data.map((item) => <SwiperSlide key={item.id}><Node {...item} /></SwiperSlide>)}
                </Swiper>
                <div className="card-manager">
                    <div className="card-manager__pagination">
                        {pagination.map((item) => {
                            let itemClass = item === slide ? "card-manager__pagination-item card-manager__pagination-item_active" : "card-manager__pagination-item";
                            return (
                                <div 
                                    key={item} 
                                    className={itemClass}></div>
                            );
                        })}
                    </div>
                    <div className="card-manager_btn-area slider__btn-area">
                        <button className="slider__btn home-first__right-btn_prev slider__btn_prev" onClick={() => slider.slidePrev()}>
                            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.68045 2.23279C9.08516 1.85699 9.1086 1.22426 8.73279 0.819549C8.35699 0.414838 7.72426 0.391404 7.31955 0.767206L8.68045 2.23279ZM1 8L0.319549 7.26721C0.115782 7.45642 0 7.72193 0 8C0 8.27807 0.115782 8.54358 0.319549 8.73279L1 8ZM7.31955 15.2328C7.72426 15.6086 8.35699 15.5852 8.73279 15.1805C9.1086 14.7757 9.08516 14.143 8.68045 13.7672L7.31955 15.2328ZM7.31955 0.767206L0.319549 7.26721L1.68045 8.73279L8.68045 2.23279L7.31955 0.767206ZM0.319549 8.73279L7.31955 15.2328L8.68045 13.7672L1.68045 7.26721L0.319549 8.73279Z" fill="#859299"/>
                            </svg>
                        </button>
                        <button className="slider__btn slider__btn_next" onClick={() => slider.slideNext()}>
                            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.68045 2.23279C9.08516 1.85699 9.1086 1.22426 8.73279 0.819549C8.35699 0.414838 7.72426 0.391404 7.31955 0.767206L8.68045 2.23279ZM1 8L0.319549 7.26721C0.115782 7.45642 0 7.72193 0 8C0 8.27807 0.115782 8.54358 0.319549 8.73279L1 8ZM7.31955 15.2328C7.72426 15.6086 8.35699 15.5852 8.73279 15.1805C9.1086 14.7757 9.08516 14.143 8.68045 13.7672L7.31955 15.2328ZM7.31955 0.767206L0.319549 7.26721L1.68045 8.73279L8.68045 2.23279L7.31955 0.767206ZM0.319549 8.73279L7.31955 15.2328L8.68045 13.7672L1.68045 7.26721L0.319549 8.73279Z" fill="#859299"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
