import React from 'react';
import image from '../../../images/default-image.png';

const Partner = (props) => {
    const img = props.smallImg ? props.smallImg.fullLink : image;
    return (
        <div className="home-partners__item">
            <img className="home-partners__img" src={img} alt={props.name} title={props.name} />
            <div className="home-partners__back"></div>
        </div>
    );
}

export default Partner;