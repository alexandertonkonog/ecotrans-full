import React, {useState, useEffect} from 'react';

const InputRange = (props) => {
    const meta = props.meta;
    const value = props.input.value && JSON.parse(props.input.value);
    const saveInputState = (type, val) => {
        let state = {...value};
        state[type] = +val;
        props.input.onChange(JSON.stringify(state));
    }
    const contentType = props.contentType || 'RANGE';
    let [startText, endText] = ['от', 'до']
    if (contentType === 'GEO') {
        [startText, endText] = ['широта', 'долгота']
    }
    return (
        <div className={"input-container " + props.addClass}>
            {props.type === 1 && 
                <label 
                    className="label" 
                    htmlFor={props.inputId}>
                    <span className="label__text">{ props.text } {props.req  && <span className="input_req">*</span>}</span>
                    {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
                </label>}
            <div className="input-range__container">
                <div className="input-range">
                    {startText}:
                    <input
                        onFocus={props.input.onFocus}
                        onBlur={props.input.onBlur}
                        value={value.start}
                        onChange={(e) => saveInputState('start', e.target.value)}
                        name='start'
                        type={"number"}
                        className={(meta && meta.touched && meta.error) ? "input input_error" : 'input'}/>
                </div>
                <div className="input-range">
                    {endText}: 
                    <input
                        onFocus={props.input.onFocus}
                        onBlur={props.input.onBlur}
                        value={value.end}
                        onChange={(e) => saveInputState('end', e.target.value)}
                        name='end'
                        type={"number"}
                        className={(meta && meta.touched && meta.error) ? "input input_error" : 'input'}/>
                </div>
            </div>
        </div>
    );
}

export default InputRange;