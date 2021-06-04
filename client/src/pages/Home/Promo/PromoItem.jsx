import React from 'react';
import {Link} from 'react-router-dom';
import { DateFormat } from '../../../dev/functions';
import image from '../../../images/default-image.png';

const PromoItem = (item) => {
    const cutText = (text, len = 50) => {
        return text.length > len
            ? text.slice(0, len - 3) + '...'
            : text
    }

    let img = item.smallImg && item.smallImg.fullLink ? item.smallImg.fullLink : image;
    let type = item.userFields && item.userFields.length && item.userFields.find(elem => elem.name === 'newsType');
    return (
        <article key={item.id} className="card">
            
            <Link to={"/akcii/" + item.linkName} className="card__img-container">
                <img src={img} alt={item.name} title={item.name} className="card__img"/>
            </Link>
            <div className="card__body">
                <p className="card__type card__text_orange">началась {DateFormat.backTimeFormat(item.createdAt)}</p>
                <Link to={"/akcii/" + item.linkName}>
                    <h3 className="card__title">{cutText(item.name)}</h3>
                </Link>
            </div>
            
        </article>
    );
}

export default PromoItem;