import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { wrapSlider } from '../../../components/Slider/Slider';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import PromoItem from './PromoItem';

const Promo = () => {
    const sales = useSelector(state => state.iblock.sales);
    const dispatch = useDispatch();
    const salesLength = sales && sales.list.length;
    const data = {
        data: sales && sales.list,
        settings: {
            slidesPerView: 2,
            spaceBetween: 28,
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
                    slidesPerView: 3,
                    spaceBetween: 28,                  
                },
            }
        }
    }

    useEffect(() => {
        dispatch(getEntities({id: 2, limit: 10, page: 1}));
    }, [])
    
    if (!sales) {
        return (
            <section className="home-promo main-padding block">
                <Loader />
            </section>
        )
    }
    
    const Slider = wrapSlider(PromoItem, data);
    if (sales.list.length) {
        return (
            <section className="home-promo main-padding block">
                <div className="title-area">
                    <h2 className="section-title">Акции</h2>
                    {/* <Link to="/akcii" className="title-link">все</Link> */}
                </div>
                <Slider />
            </section>
        );
    }
    return <></>;
}

export default Promo;