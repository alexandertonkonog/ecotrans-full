import React from 'react';
import '../../css/components/radio.css';

const Radio = (props) => {
    const {value, onChange} = props.input;
    const clickHandle = (id) => {
        onChange(id);
    }
    return (
        <div className={"radio-container " + props.addClass}>
            {props.data.map(item => {
                return (
                    <div onClick={() => clickHandle(item.id)} className={item.id === value ? "radio radio_active" : "radio"} key={item.id}>
                        <div className="radio__icon"><div className="radio__icon-inside"></div></div>
                        <p className="radio__text">{item.name}</p>
                    </div>
                );
            })}
        </div>
    );
}

Radio.defaultProps = {
    data: [
        {id: 1, name: 'Норматив'},
        {id: 2, name: 'Контейнер'},
    ],
}

export default Radio;