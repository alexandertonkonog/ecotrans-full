import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntities } from '../../../../redux/iblockReducer';
import { wrapSlider } from '../../../../components/Slider/Slider';
import SliderItem from './SliderItem';
import logo from '../../../../images/service/bus.jpg';
import Loader from '../../../../components/Loader/Loader';

const TKOSlider = (props) => {
    const dispatch = useDispatch();
    const auto = useSelector(state => state.iblock.auto);
    const data = {
        data: auto && auto.list,
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
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,                
                },
            }
        }
    };
    useEffect(() => {
        dispatch(getEntities({id: 4, limit: 10, page: 1}))
    }, [])

    if (!auto) {
        return <section className="tko-slider middle-padding"><Loader /></section>
    }

    if (auto.count) {
        const Slider = wrapSlider(SliderItem, data);
        return (
            <section className="tko-slider middle-padding">
                <h2 className="dec-title">Используемый транспорт</h2>
                <p className="tko__text text-grey tko__subtitle">Всего компания использует более 80-ти единиц спецтехники</p>
                <Slider />
            </section>
        );
    } else {
        return <></>;
    }
    
}

export default TKOSlider;