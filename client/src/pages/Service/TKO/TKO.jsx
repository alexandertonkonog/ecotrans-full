import React from 'react';
import {Helmet} from 'react-helmet';
import Info from './Info/Info';
import Slider from './Slider/Slider';
import More from '../../../components/More/More';

const TKO = () => {
    return (
        <div className="block tko">
            <Helmet>
                <title>Транспортировка ТКО</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info />
            <Slider />
            <p className="tko__text tko-slider__seo text-grey">Особое внимание мы уделяем качеству оказания коммунальной услуги, поэтому график вывоза Твердых коммунальных отходов находится под постоянным контролем. Каждый автомобиль оснащен аппаратурой спутниковой навигации, что позволяет оперативно реагировать на каждое обращение и держать ситуацию под контролем. </p>
            <More text="Транспортировка  прочих отходов" link="/uslugi/prochie-othodi" />
        </div>
    );
}

export default TKO;