import React, {useState} from 'react';
import '../../css/components/file.css';

const File = (props) => {
    if (!props.input) return <></>;
    let { value, onChange, ...input } = props.input;
    const meta = props.meta;
    let fileName;
    if (value && value.length) {
        let name = '';
        if (props.multiple) {
            for (let i = 0; i < value.length; i++) {
                name += value[i].name + ', ';
            }
        } else {
            name = value[0].name;
        }
        fileName = name.length > 18 ? name.slice(0, 18) + '...' : name;
    }
    return (
        <div className={"file-area " + props.addClass}>
            {props.type === 1 && <label className="label" htmlFor={props.inputId}>
                <span className="label__text">{ props.text } {props.req  && <span className="input_req">*</span>}</span>
                {meta && meta.touched && meta.error && <span className="label__error">{meta.error}</span>}
            </label>}
            <div className="file-container">
                <input
                    {...input}
                    type="file"
                    accept={props.accept}
                    multiple={props.multiple}
                    placeholder={props.placeHolder}
                    onChange={({target}) => {
                        let files = target.files;
                        onChange(files);
                    }}
                    id={props.inputId}
                    className="file" />
                <label htmlFor={props.inputId} className={(meta && meta.touched && meta.error) ? "file-visible file-visible_error" : "file-visible"}>
                    <span className="file__left">{fileName ? fileName : (props.placeHolder || 'Файл не выбран')}</span>
                    <span className="file__right">Выбрать</span>
                </label>
            </div>
        </div>
    );
}

File.defaultProps = {
    inputId: 'id' + Math.random()
}

export default File;