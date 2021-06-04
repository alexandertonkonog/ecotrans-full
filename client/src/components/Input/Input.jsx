import React, {useState, useEffect} from 'react';
import IMask from 'imask';
import {getInputMask} from '../../dev/functions';

const Input = (props) => {   
    const meta = props.meta;
    
    return (
        <div className={"input-container " + props.addClass}>
            {props.type === 1 && 
                <label 
                    className="label" 
                    htmlFor={props.inputId}>
                    <span className="label__text">{ props.text } {props.req  && <span className="input_req">*</span>}</span>
                    {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
                </label>}
            <input
                {...props.input}
                name={props.name}
                placeholder={props.placeHolder}
                id={props.inputId} 
                type={props.inputType || "text"}
                className={(meta && meta.touched && meta.error) ? "input input_error" : 'input'}/>
        </div>
    );
}

export default Input;