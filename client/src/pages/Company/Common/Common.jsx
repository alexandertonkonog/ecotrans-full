import React from 'react';
import {Helmet} from 'react-helmet';
import Description from './Description/Description';
import Partners from './Partners/Partners';
import More from '../../../components/More/More';

const Common = (props) => {
    return (
        <div className="block">
            <Helmet>
                <title>О компании</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Description />
            <Partners />
            <More text="Узнайте больше о деятельности компании" link="/o-kompanii/deyatelnost" />
        </div>
    );
}

export default Common;