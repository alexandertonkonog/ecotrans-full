import React from 'react';
import load from '../../images/load.gif';

const Loader = (props) => {
    let addClass = props.addClass || '';
    return (
        <img src={load} className={"loader " + addClass} alt="Загрузка"/>
    )
}

export default Loader;