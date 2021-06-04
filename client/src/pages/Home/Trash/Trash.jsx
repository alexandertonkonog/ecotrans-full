import React from 'react';
import logo from '../../../images/home/trash.svg';

const Trash = (props) => {
    return (
        <section className="home-trash block">
            <div className="home-trash__inside call-block">
                <img 
                    src={logo} 
                    alt="Увидели несанкционированную свалку?"
                    title="Увидели несанкционированную свалку?"
                    className="home-trash__icon call-block__icon"/>
                <div className="call-block__text-area">
                    <h2 className="home-trash__title call-block__title">Увидели несанкционированную свалку?</h2>
                    <p className="home-trash__text call-block__text">Сообщите нашим специалистам!</p>
                </div>
                <button className="btn home-trash__btn btn_white call-block__btn btn_main" onClick={props.openModal}>Сообщить о свалке</button>
            </div>
        </section>
    );
}

export default Trash;