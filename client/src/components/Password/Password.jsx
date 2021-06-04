import React, {useState} from 'react';
import open from '../../images/reg/open.svg';
import closed from '../../images/reg/closed.svg';

const Password = (props) => {
    const meta = props.meta;
    let [visible, setVisible] = useState(false);
    return (
        <div className={"date " + props.addClass}>
           {props.type === 1 && 
                <label 
                    className="label">
                    <span className="label__text">{ props.text } {props.req  && <span className="input_req">*</span>}</span>
                    {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
                </label>}
            <div className="date__input-container">
                <input
                    name={props.name}
                    {...props.input}
                    placeholder={props.placeHolder} 
                    type={visible ? "text" : "password"} 
                    className={(meta && meta.touched && meta.error) ? "date__input input input_error" : "date__input input"}/>
                {visible ? <img src={closed} alt="Пароль" className="date__icon" onClick={() => setVisible(false)} />
                : <img src={open} alt="Пароль" className="date__icon" onClick={() => setVisible(true)} />}
            </div>
        </div>
    );
}

export default Password;