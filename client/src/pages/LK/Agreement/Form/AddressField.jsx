import React, { useState } from 'react';

const AddressField = (props) => {
    const meta = props.meta;
    let { value, onChange, onFocus, onBlur, ...input } = props.input;
    const name = value && props.data.find(item => item.id === value)?.name;
    let [open, setOpen] = useState(false);
    let [selected, setSelected] = useState(false);
    let selectClass = open ? 'select select_open' : 'select';
    let data = [{id: 0, name: 'Выберите из списка'}, ...props.data]
    if (meta && meta.touched && meta.error) {
        selectClass += ' select_error';
    }
    let inputChangeHanlde = (e) => {
        if (!value || typeof value !== 'number' || value === 0) {
            onChange(e.target.value);
        }
    }
    let clickHeaderCallback = () => {
        setOpen(!open);
    }
    let clickItemCallback = (id, valueID) => {
        if (valueID === 0) {
            setSelected(false);
            onChange('');
        } else {
            onChange(valueID);
        }
        onBlur(); 
        setOpen(false);
    }
    return (
        <>
            <div className={"input-container " + props.addInputClass}>
                <label 
                    className="label" 
                    htmlFor={props.inputId}>
                    <span className="label__text">{ props.inputText } {props.req  && <span className="input_req">*</span>}</span>
                    {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
                </label>
                <input
                    onBlur={onBlur}
                    onFocus={onFocus}
                    value={typeof value === 'string' ? value : ''}
                    onChange={inputChangeHanlde}
                    name={props.inputName}
                    placeholder={props.placeHolderInput}
                    id={props.inputId} 
                    type="text"
                    className={(meta && meta.touched && meta.error) ? "input input_error" : 'input'}/>
            </div>
            <div className={props.type === 1 ? "input-container select-container " + props.addSelectClass : "input-container select-container select-container_without-label " + props.addClass}>
            <div className="select__label">{ props.selectText }</div>
                <div className={selectClass}>
                    <div className={value && selected ? "select__header select__header_selected" : "select__header"} onClick={clickHeaderCallback}>
                        <p className="select__title select__text">{name || 'Выберите из списка'}</p>
                        <svg className="select__selector" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                        </svg>
                    </div>
                    <ul className="select__list">
                        {data.map((item) => <li 
                            key={item.id}
                            onClick={() => clickItemCallback(props.id, item.id)}
                            className="select__list-item select__text">{item.name}</li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AddressField;