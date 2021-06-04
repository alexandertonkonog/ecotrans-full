import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntities } from '../../../redux/iblockReducer';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import marker from '../../../images/contact/map/marker.svg';
import bmarker from '../../../images/contact/map/bigMarker.svg';
import Loader from '../../../components/Loader/Loader';

const MapArea = () => {
    let [activeOffice, setActiveOffice] = useState(null);
    let [officeClicked, setOfficeClicked] = useState(false);

    const dispatch = useDispatch();
    const offices = useSelector(state => state.iblock.offices);

    const pointOptions = {
        options: {
            iconLayout: 'default#image',
            iconImageHref: marker,
            iconImageSize: [26, 40],
            iconImageOffset: [-5, -38],
        }
    };
    const mainPointOptions = {
        options: {
            iconLayout: 'default#image',    
            iconImageHref: bmarker,
            iconImageSize: [33, 51],
            iconImageOffset: [-5, -38],
        }
    }
    const state = {
        center: officeClicked || [47.23148097918086, 39.71167423343753],
        zoom: 10,
    }
    const clickOffice = (item) => {
        setActiveOffice(item.id);
        setOfficeClicked(item.coor);
    }

    useEffect(() => {
        const getEntitiesFunction = async () => {
            
            await dispatch(getEntities({
                id: 16, 
                limit: 10, 
                page: 1, 
            }))
            
        }
        getEntitiesFunction()
    }, []);

    if (!offices) return <section className="contact-map main-padding"><Loader /></section>

    return (
        <section className="contact-map middle-padding">
            <YMaps>
                <Map 
                    // onLoad={ymaps => setMap(ymaps)}
                    // instanceRef={ref => map = ref}
                    className="contact-map__map"
                    state={state} >
                    {offices.count && offices.list.map(item => {
                        let coorObj = item.properties.find(item => item.userFieldId === 25);
                        let coor = coorObj && JSON.parse(coorObj.value);
                        let geo = [coor.start, coor.end];
                        if (item.id === activeOffice) {
                            return <Placemark
                                    key={item.id}
                                    {...mainPointOptions}
                                    geometry={geo}
                                    
                                />
                        }
                        return <Placemark
                                key={item.id}
                                {...pointOptions}
                                geometry={geo}
                            
                            />
                    })}
                </Map>
            </YMaps>
            <div className="contact-map__list">
                {offices.count && offices.list.map(item => {
                    let addressObj = item.properties.find(item => item.userFieldId === 22);
                    let numberObj = item.properties.find(item => item.userFieldId === 23);
                    let workTimeObj = item.properties.find(item => item.userFieldId === 24);
                    let address = addressObj && addressObj.value;
                    let number = numberObj && numberObj.value;
                    let workTime = workTimeObj && workTimeObj.value;
                    return (
                        <div className="contact-map__item" key={item.id}>
                            <h3 className="contact-map__item-title">{item.name}</h3>
                            {address && <p className="small-text contact-map__item-text">{address}</p>}
                            {number && <a href={'tel:' + number} className="small-text contact-map__item-text">{number}</a>}
                            {workTime && <p className="small-text contact-map__item-text">{workTime}</p>}
                            <button
                                onClick={() => clickOffice(item)}
                                className={activeOffice === item.id 
                                    ? "btn contact-map__btn btn_white contact-map__btn_active" 
                                    : "btn contact-map__btn btn_white"}>на карте</button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default MapArea;