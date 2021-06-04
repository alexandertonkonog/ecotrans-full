import React from 'react';
import { Helmet } from 'react-helmet';
import Info from './Info/Info';
import Agreement from './Agreement/Agreement';

import '../../../css/lk/main.css';

const Main = ({user, selectedAgree, setAgree}) => {
    
    return (
        <div className="lk-main">
            <Helmet>
                <title>Личный кабинет</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Info user={user} selectedAgree={selectedAgree} />
            <Agreement user={user} selectedAgree={selectedAgree} setAgree={setAgree} />
        </div>
    );
}

export default Main;