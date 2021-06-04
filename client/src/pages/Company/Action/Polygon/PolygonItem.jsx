import React from 'react';
import news1 from '../../../../images/home/news1.png';

const PolygonItem = (props) => {
    const img = props.smallImg ? props.smallImg.fullLink : news1;
    return (
        <article className="action-polygons__item grid">
            <img src={img} alt={props.name} title={props.name} className="action-polygons__img"/>
            <div className="action-polygons__body">
                <h3 className="action-polygons__title action-title">{props.name}</h3>
                <p className="action-polygons__text main-text">{props.smallText}</p>
            </div>
        </article>
    );
}

export default PolygonItem;