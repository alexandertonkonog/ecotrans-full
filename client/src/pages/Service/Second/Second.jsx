import React from 'react';
import {Helmet} from 'react-helmet';
import Info from './Info/Info';
import Sign from './Sign/Sign';
import Trash from './Trash/Trash';
import More from '../../../components/More/More';

const Second = (props) => {
    return (
        <div className="block">
            <Helmet>
                <title>Сбор вторсырья</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info />
            <Trash />
            <More text="Партнерам" link="/partneram" />
        </div>
    );
}

export default Second;