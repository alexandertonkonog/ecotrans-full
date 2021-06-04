import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import logo from '../../../../images/company/Union.svg';
import { getWialonData } from '../../../../redux/mainReducer';

const MapArea = () => {
    const dispatch = useDispatch();
    const pointOptions = {
        modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
        options: {
            balloonPanelMaxMapArea: 0,
            iconLayout: 'islands#circleIcon',
            iconImageHref: 'bus',
            iconImageSize: [60, 60],
            iconImageOffset: [-5, -38],
        }
    };

    useEffect(() => {
        dispatch(getWialonData())
    }, [])
    return (
        <section className="action-map block">
            <h2 className="small-title">Местоположение машин в реальном времени</h2>
            
            <div className="action-map__area">
                <div className="action-map__des">
                    <img src={logo} alt="Грузовик" title="Грузовик" className="action-map__des-icon"/>
                    <div className="action-map__des-body">
                        <p className="action-map__des-count">516</p>
                        <p className="action-map__des-text">машин на линии</p>
                    </div>
                </div>
                <YMaps>
                    <Map 
                        className="action-map__map"
                        defaultState={{
                            center: [47.23148097918086, 39.71167423343753],
                            zoom: 10,
                        }} >
                        {/* <Placemark
                        
                            options={{preset: 'islands#greenCircleDotIcon'}}
                            geometry={[47.23148097918086, 39.71167423343753]}
                            {...pointOptions}
                        /> */}
                    </Map>
                </YMaps>
            </div>
            
        </section>
    );
}

export default MapArea;