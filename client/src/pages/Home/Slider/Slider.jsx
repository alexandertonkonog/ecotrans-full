import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide from '../../../images/home/slide.png';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';

const SliderArea = () => {
    let [slider, setSlider] = useState(null);
    const dispatch = useDispatch();
    const slides = useSelector(state => state.iblock.mainPageSlides);
    const settings = {
        slidesPerView: 1,
        loop: true,
        onInit: (swiper) => {
            setSlider(swiper)
        }
    };

    useEffect(() => {
        dispatch(getEntities({id: 8, limit: 10, page: 1}))
    }, [])

    const filteredSlides =  slides && slides.list.filter(item => item.smallImg);
    return (
        <section className="home-first block">
            <div className="home-first__left">
                <div className="home-first__text-area">
                    <h1 className="home-first__title">Оформление <br/> обязательных договоров по обращению с ТКО</h1>
                    <p className="home-first__subtitle">Для организаций и ИП</p>
                </div>
                <div className="home-first__btn-area">
                    <Link to="/otveti-na-voprosi/zakluchenie-dogovora" className="home-first__btn btn btn_green home-first__btn_left">
                        <svg className="btn__icon home-first__btn-icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.56237 0.996431C4.23988 0.330809 5.15507 -0.0400391 6.10571 -0.0400391H15.2257C15.4879 -0.0400391 15.7395 0.0629032 15.9265 0.246625L22.4408 6.64663C22.6322 6.83464 22.74 7.09168 22.74 7.35996V21.44C22.74 22.3899 22.3557 23.2973 21.6776 23.9635C21.0001 24.6291 20.0849 25 19.1343 25H6.10571C5.15507 25 4.23988 24.6291 3.56237 23.9635C2.88427 23.2973 2.5 22.3899 2.5 21.44V3.51996C2.5 2.57002 2.88427 1.66264 3.56237 0.996431ZM14.8947 2L19.621 6.68004H15.0467C15.0064 6.68004 14.9677 6.66403 14.9392 6.63552C14.9107 6.60702 14.8947 6.56836 14.8947 6.52804V2ZM12.54 12C12.8713 12 13.14 12.2686 13.14 12.6V14.4H14.94C15.2713 14.4 15.54 14.6686 15.54 15C15.54 15.3314 15.2713 15.6 14.94 15.6H13.14V17.4C13.14 17.7314 12.8713 18 12.54 18C12.2086 18 11.94 17.7314 11.94 17.4V15.6H10.14C9.80861 15.6 9.53998 15.3314 9.53998 15C9.53998 14.6686 9.80861 14.4 10.14 14.4H11.94V12.6C11.94 12.2686 12.2086 12 12.54 12Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="24" height="25" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="btn__text home-first__btn-text">Заключение договора</p>
                    </Link>
                    <Link to="/otveti-na-voprosi" className="home-first__btn btn btn_grey home-first__btn_right">
                        <svg className="btn__icon home-first__btn-icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.0119 -0.00878906C9.39624 -0.00878906 8.03238 1.06928 7.60043 2.54531H5.9037C4.9611 2.54531 4.0571 2.91976 3.39058 3.58628C2.72406 4.2528 2.34961 5.1568 2.34961 6.0994V21.424C2.34961 22.3666 2.72406 23.2706 3.39058 23.9371C4.0571 24.6036 4.9611 24.9781 5.9037 24.9781H18.6742C19.6168 24.9781 20.5208 24.6036 21.1873 23.9371C21.8538 23.2706 22.2283 22.3666 22.2283 21.424V6.0994C22.2283 5.1568 21.8538 4.2528 21.1873 3.58628C20.5208 2.91976 19.6168 2.54531 18.6742 2.54531H16.9775C16.5455 1.06928 15.1817 -0.00878906 13.566 -0.00878906H11.0119ZM11.0119 1.99121C10.1536 1.99121 9.45781 2.687 9.45781 3.5453C9.45781 4.40361 10.1536 5.0994 11.0119 5.0994H13.566C14.4228 5.0994 15.1177 4.40596 15.1201 3.54966L15.1201 3.54531L15.1201 3.54095C15.1177 2.68465 14.4228 1.99121 13.566 1.99121H11.0119ZM12.1989 11.2491C11.7739 11.2491 11.3815 11.4006 11.1049 11.6476C10.8312 11.8919 10.6996 12.2008 10.6996 12.4983C10.6996 12.8433 10.4311 13.1229 10.0999 13.1229C9.76865 13.1229 9.50015 12.8433 9.50015 12.4983C9.50015 11.8019 9.8108 11.1575 10.3244 10.6991C10.8351 10.2432 11.5104 9.99988 12.1989 9.99988H12.7986C13.487 9.99988 14.1624 10.2432 14.6731 10.6991C15.1822 11.1536 15.4919 11.7909 15.4972 12.4804C15.5227 13.0152 15.3826 13.5445 15.0973 13.9903C14.8155 14.4305 14.407 14.766 13.9309 14.9487C13.7144 15.0617 13.4968 15.2842 13.3344 15.6226C13.1669 15.9714 13.0798 16.4011 13.0979 16.844C13.112 17.1887 12.8551 17.48 12.5242 17.4946C12.1933 17.5093 11.9136 17.2418 11.8995 16.8971C11.8735 16.2587 11.9964 15.6163 12.2616 15.0639C12.5263 14.5124 12.9313 14.0567 13.4435 13.8066C13.4617 13.7977 13.4803 13.7898 13.4992 13.7829C13.7445 13.6931 13.9551 13.5227 14.0993 13.2974C14.2435 13.0721 14.3135 12.804 14.2988 12.5337C14.2982 12.5219 14.2978 12.5101 14.2978 12.4983C14.2978 12.2008 14.1662 11.8919 13.8925 11.6476C13.6159 11.4006 13.2235 11.2491 12.7986 11.2491H12.1989ZM12.4987 18.7444C12.8299 18.7444 13.0984 19.0241 13.0984 19.369V19.3753C13.0984 19.7202 12.8299 19.9999 12.4987 19.9999C12.1675 19.9999 11.899 19.7202 11.899 19.3753V19.369C11.899 19.0241 12.1675 18.7444 12.4987 18.7444Z" fill="#556A3B"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="24" height="25" fill="white" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="btn__text home-first__btn-text">Популярные вопросы</p>
                    </Link>
                </div>
            </div>
            {slides 
                ? <div className="home-first__right">
                    <Swiper {...settings} className="home-first__slider" ref={c => slider = c}>
                        {filteredSlides.map(item => {
                            return <SwiperSlide key={item.id}><div className="slide-container" ><img src={item.smallImg.fullLink} className="home-first__slide" /></div></SwiperSlide>
                        })}
                    </Swiper>
                    <div className="home-first__right-btn-area slider__btn-area">
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
                : <div className="home-first__right"><div className="home-first__loader"><Loader /></div></div>}
        </section>
    );
}

export default SliderArea;