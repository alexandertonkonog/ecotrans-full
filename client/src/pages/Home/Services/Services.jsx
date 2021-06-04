import React from 'react';
import {wrapSlider} from '../../../components/Slider/Slider';
import Service from './Service';
import logo1 from '../../../images/home/Union.svg';
import logo2 from '../../../images/home/Union-1.svg';
import logo3 from '../../../images/home/Union-2.svg';
import logo4 from '../../../images/home/Union-3.svg';
import logo5 from '../../../images/home/Union-4.svg';

const Services = () => {
    const data = {
        data: [
            {id: 1, name: 'Транспортировка ТКО', logo: logo1, link: '/uslugi/transportirovka-tko'},
            {id: 2, name: 'Транспортировка  прочих отходов', logo: logo2, link: '/uslugi/prochie-othodi'},
            {id: 3, name: 'Сбор вторсырья', logo: logo3, link: '/uslugi/sbor-vtorsirya'},
            {id: 4, name: 'Паспортизация отходов', logo: logo4, link: '/uslugi/pasportizaciya-othodov'},
            {id: 5, name: 'Все услуги', logo: logo5, link: '/uslugi'},
        ],
        settings: {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination:{ 
                clickable: true 
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                },
                1280: {
                    slidesPerView: 5,
                    spaceBetween: 29,
                },
                1920: {
                    spaceBetween: 38,
                },
            }
        }
    }
    let Slider = wrapSlider(Service, data);
    return (
        <section className="home-service__container">
            <div className="home-service block main-padding">
                <div className="title-area">
                    <h2 className="section-title">Наши услуги</h2>
                </div>
                <Slider />
            </div>
        </section>
    );
}

export default Services;