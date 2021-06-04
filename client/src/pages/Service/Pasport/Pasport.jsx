import React from 'react';
import {Helmet} from 'react-helmet';
import Info from './Info/Info';
import Sign from './Sign/Sign';
import Trash from './Trash/Trash';
import More from '../../../components/More/More';

const Pasport = (props) => {
    return (
        <div className="block">
            <Helmet>
                <title>Паспортизация отходов</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info />
            <Sign />
            <Trash />
            <More text="Сбор вторсырья" link="/uslugi/sbor-vtorsirya" />
        </div>
    );
}

export default Pasport;