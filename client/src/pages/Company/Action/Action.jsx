import React from 'react';
import { Helmet } from 'react-helmet';
import MapArea from './Map/Map';
import Stream from './Stream/Stream';
import Projects from './Projects/Projects';
import Polygon from './Polygon/Polygon';
import Tech from './Tech/Tech';
import More from '../../../components/More/More';

const Action = (props) => {
    return (
        <>
            <Helmet>
                <title>Деятельность компании</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <MapArea />            
            <Stream />            
            <Projects />            
            <Polygon />            
            <Tech />
            <div className="block">
                <More text="Узнайте больше информации о компании" link="/o-kompanii/raskritie-informatchii" />
            </div>                   
        </>
    );
}

export default Action;