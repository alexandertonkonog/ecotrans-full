import React from 'react';
import {Link} from 'react-router-dom';
import {cutText, DateFormat} from '../../dev/functions';
import image from '../../images/default-image.png';

const NewsItem = (props) => {
    const types = [
        {id: 1, name: 'Новость'},
        {id: 2, name: 'Статья'},
    ]
    let img = props.smallImg && props.smallImg.fullLink ? props.smallImg.fullLink : image;
    let type = props.userFields && props.userFields.length && props.userFields.find(item => item.name === 'newsType');
    let typeValue = type && types.find(item => item.id == type.value);
    return (
        <article className={props.addClass ? "news-list__item " + props.addClass : "news-list__item "}>
            <Link to={"/novosti/" + props.linkName} className="news-list__img-container">
                <img src={img} alt={props.name} title={props.name} className="news-list__img"/>
            </Link>
            <div className="card__footer">
                { typeValue && <p className="card__type card__text_green">{typeValue.name}</p> }
                <p className="card__date">{DateFormat.backTimeFormat(props.createdAt)}</p>
            </div>
            <Link to={"/novosti/" + props.linkName} className="news-list__title-container">
                <h3 className="card__title">{cutText(props.name)}</h3>
            </Link>
        </article>
    );
}

export default NewsItem;