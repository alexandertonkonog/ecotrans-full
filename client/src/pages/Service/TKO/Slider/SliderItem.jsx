import React from 'react';
import image from '../../../../images/default-image.png';

const TKOSliderItem = (props) => {
    const img = props.smallImg ? props.smallImg.fullLink : image;
    return (
        <div className="tko-slider__item">
            <img src={img} alt={props.name} title={props.name} className="tko-slider__img"/>
            <h3 className="tko-slider__title">{props.name}</h3>
            <p className="tko-slider__text text-grey">{props.smallText}</p>
        </div>
    );
}

export default TKOSliderItem;