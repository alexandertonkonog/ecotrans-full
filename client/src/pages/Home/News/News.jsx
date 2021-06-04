import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEntities } from '../../../redux/iblockReducer';
import { wrapSlider } from '../../../components/Slider/Slider';
import Loader from '../../../components/Loader/Loader';
import New from './New';

const News = () => {
    const news = useSelector(state => state.iblock.news);
    const dispatch = useDispatch();
    const data = {
        data: news && news.list,
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
        
    };

    useEffect(() => {
        const getNewsFunction = async () => {
            await dispatch(getEntities({id: 1, limit: 10, page: 1}));
        }
        getNewsFunction();
    }, [])

    if (!news) {
        return (
            <section className="home-news main-padding container container_grey">
                <Loader />
            </section>
        )
    }

    const Slider = wrapSlider(New, data);
    if (news.list.length) {
        return (
            <section className="home-news main-padding container container_grey">
                <div className="home-news__inside block">
                    <div className="title-area">
                        <h2 className="section-title">Новости</h2>
                        <Link to="/novosti" className="title-link">все</Link>
                    </div>
                    <Slider />
                </div>
            </section>
        );
    }
    return <></>;
}

export default News;