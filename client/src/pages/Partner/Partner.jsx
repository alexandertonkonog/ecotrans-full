import React from 'react';
import {Helmet} from 'react-helmet';
import Info from './Info/Info';
import Right from './Right/Right';
import Plan from './Plan/Plan';
import Eq from './Eq/Eq';
import Resident from './Resident/Resident';
import Sign from './Sign/Sign';
import '../../css/partner/partner.css';

const Partner = () => {
    return (
        <div className="partner">
            <Helmet>
                <title>Партнерам</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info />
            <Right />
            <Plan />
            <Eq />
            <Resident />
            <Sign />
        </div>
    );
}

export default Partner;