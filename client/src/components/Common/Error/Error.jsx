import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/components/errors.css';

const NotAuthorized = (props) => {
    return (
        <section className="block main-padding">
            <h1 className="main-title text-center mb-large">
                <span class="error__code">{props.code}</span>
                <br />
                {props.name}
            </h1>
            <p className="main-text text-center mb-large">{props.text}</p>
            <p className="text-center"><Link to="/" className="btn btn_green text-center error__btn">На главную</Link></p>
        </section>
    )
}

export default NotAuthorized;