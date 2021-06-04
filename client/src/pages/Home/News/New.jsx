import React from 'react';
import {Link} from 'react-router-dom';
import {DateFormat, cutText} from '../../../dev/functions';
import image from '../../../images/default-image.png';

const New = (item) => {
    let img = item.smallImg && item.smallImg.fullLink ? item.smallImg.fullLink : image;
    let type = item.properties && item.properties.length && item.properties.find(elem => elem.userFieldId === 2);
    return (
        <article key={item.id} className="card">
            <Link to={"/novosti/" + item.linkName} className="card__img-container">
                <img src={img} alt={item.name} title={item.name} className="card__img"/>
            </Link>
            <div className="card__body">
                <Link to={"/novosti/" + item.id}>
                    <h3 className="card__title">{cutText(item.name)}</h3>
                </Link>
                {item.smallText && <p className="card__text">{cutText(item.smallText, 110)}</p>}
                <div className="card__footer">
                    {
                        type.value == 1
                            ? <p className="card__type card__text_green">Новость</p>
                            : <p className="card__type card__text_orange">Статья</p>
                    }
                    <p className="card__date">{DateFormat.backTimeFormat(item.createdAt)}</p>
                </div>
            </div>
           
        </article>
    );
}

export default New;