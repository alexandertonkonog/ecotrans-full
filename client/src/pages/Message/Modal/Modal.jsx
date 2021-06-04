import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Input from '../../../components/Input/Input';
import TextArea from '../../../components/TextArea/TextArea';
import File from '../../../components/File/File';
import LoadButton from '../../../components/LoadButton/LoadButton';
import { makeNewMessageTheme } from '../../../redux/formReducer';
import { isLength } from '../../../dev/validate';
import '../../../css/form/messageForm.css';

const Modal = (props) => {
    let [data, setData] = useState([
        {id: 1, value: null, type: 1, name: 'theme', text: 'Тема', placeHolder: 'Тема', req: true, addClass: 'message-modal__theme', inputType: 'text'},
        {id: 2, value: null, type: 1, name: 'text', text: 'Текст сообщения', placeHolder: 'Сообщение', req: true, inputType: 'textarea', addClass: 'message-modal__textarea'},
        {id: 3, value: null, type: 1, name: 'file', text: 'Прикрепить фото или документ', inputType: 'file', inputId: 'file' + 3},
    ]);
    let [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setBtnLoading(true);
        let result = await dispatch(makeNewMessageTheme(values));
        if (result.success) {
            props.openModal({visible: true, result: 1, error: null});
            dispatch(props.getDialogs());
        } else {
            props.openModal({visible: true, result: 2, error: result.message});
        }
        setBtnLoading(false);
    }
    
    return (
        <Form
            onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <h2 className="main-title mb-small">Новое обращение</h2>
                        <p className="main-text text-grey mb-large">Диалог с компанией будет отображаться в разделе «Обращения»</p>
                        <div className="message-modal__body">
                            {data.map(item => {
                                if (item.inputType === 'textarea') {
                                    return (
                                        <Field key={item.id} name={item.name} validate={isLength(10,100)}>
                                            {props => (<TextArea input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                } else if (item.inputType === 'file') {
                                    return (
                                        <Field key={item.id} name={item.name}>
                                            {props => (<File input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                } else {
                                    return (
                                        <Field key={item.id} name={item.name} validate={isLength(10,100)}>
                                            {props => (<Input input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                }
                            })}
                            <p className="small-text text-grey">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                            <LoadButton loading={btnLoading} />
                        </div>
                    </form>
                )}
        </Form>
    );
}

export default Modal;