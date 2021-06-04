import React, {useState, useEffect} from 'react';

const InputList = (props) => {
    let [input, setInput] = useState('');
    const meta = props.meta;
    const list = props.input.value && JSON.parse(props.input.value);
    const saveInputState = () => {
        let obj = {
            id: list && list.length ? list.length + 1 : 1,
            text: input
        };
        let state = []
        if (list && list.length) {
            state = [...list, obj]
        } else {
            state = [obj]
        }
        setInput('');
        props.input.onChange(JSON.stringify(state));
    }
    const removeItem = (id) => {
        let state = list.filter(item => item.id !== id);
        props.input.onChange(JSON.stringify(state));
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
            <div className="input-list__container">
                <input
                    onFocus={props.input.onFocus}
                    onBlur={props.input.onBlur}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    name={props.name}
                    placeholder={props.placeHolder}
                    id={props.inputId} 
                    type={"text"}
                    className={(meta && meta.touched && meta.error) ? "input input_error" : 'input'}/>
                <button className="btn btn_green" type="button" onClick={saveInputState} >Добавить</button>
            </div>
            {list && <ul className="main-list mt-small">
                {list.map(item => <li key={item.id} className="main-list__item">
                    <span>{item.text}</span>
                    <span onClick={() => removeItem(item.id)} className="input-list__remove">&times;</span></li>)}
            </ul>}
        </div>
    );
}

export default InputList;