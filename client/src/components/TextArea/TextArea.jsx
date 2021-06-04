import React, {useState} from 'react';

const TextArea = (props) => {
    const meta = props.meta;
    return (
        <div className={"input-container " + props.addClass}>
            {(props.type === 1 || meta && meta.touched && meta.error) && 
                <label 
                    className="label" 
                    htmlFor={props.inputId}>
                    <span className="label__text">{props.text} {props.req && <span className="input_req">*</span>}</span>
                    {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
                </label>}
            {props.type === 2 && 
                <label 
                    className={labelClass + ' label_translate'} 
                    htmlFor={props.inputId}>
                    <span className="label__text">{props.text}</span>
                </label>}
            <textarea
                {...props.input}
                placeholder={props.placeHolder && props.placeHolder}
                id={props.inputId} 
                className={(meta && meta.touched && meta.error) ? "input input_textarea input_error" : "input input_textarea"}/>
        </div>
    );
}

export default TextArea;