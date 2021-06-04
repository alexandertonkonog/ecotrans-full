import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/Input/Input';
import LoadButton from '../../../components/LoadButton/LoadButton';
import File from '../../../components/File/File';
import Loader from '../../../components/Loader/Loader';
import TextArea from '../../../components/TextArea/TextArea';
import {sendTrashPlaceData} from '../../../redux/formReducer';
import {isLength, isNumeric, composeValidators, isHidden} from '../../../dev/validate';
import '../../../css/form/trashForm.css';

const Modal = (props) => {
    let isAuth = useSelector(state => state.auth.auth);
    let formInputs = [
        {id: 1, type: 1, text: "Ваш E-mail", placeHolder: "Mail@mail.com", name: "email"},
        {id: 2, type: 1, text: "Прикрепить фото свалки", inputId: "home-trash__file", name: "file", inputType: 'file', multiple: true},
        {id: 3, type: 1, placeHolder: "+7 (___) ___ - __ - __", text: "Телефон", name: "number", addClass: "trash-modal__number", req: true, validate: composeValidators(isNumeric, isLength(10, 20))},
        {id: 4, type: 1, placeHolder: "Дополнительные сведения", text: "Текст сообщения", name: "text", addClass: "trash-modal__textarea", inputType: 'textarea'},
        {id: 5, type: 1, placeHolder: "Адрес свалки", req: true, text: "Адрес", name: "address", addClass: "trash-modal__address", validate: isLength(5, 100)}
    ];

    formInputs = isAuth ? formInputs.filter(item => item.name !== 'email' && item.name !== 'number') : formInputs;
    
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setLoading(true);
        let result = await dispatch(sendTrashPlaceData(values));
        setLoading(false);
        if (result.success) props.resultModalHandle(1);
        else props.resultModalHandle(2);
    }
    return (
        <>
            <h2 className="main-title mb-small">Сообщить о свалке</h2>
            <p className="main-text text-grey mb-max">Компания не обязана отвечать на данные сообщения</p>
            <Form 
                onSubmit={onSubmit}
            >
                {props => {
                    return (
                        <form onSubmit={props.handleSubmit} className="trash-modal__body mb-max">
                            {formInputs.map(item => {
                                if (item.inputType === 'file') {
                                    return (
                                        <Field name={item.name} key={item.id}>
                                            {props => (<File accept=".jpg, .jpeg, .png" input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                } else if (item.inputType === 'textarea') {
                                    return (
                                        <Field name={item.name} key={item.id} validate={item.validate}>
                                            {props => (<TextArea input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                } else {
                                    return (
                                        <Field name={item.name} key={item.id} validate={item.validate}>
                                            {props => (<Input input={props.input} meta={props.meta} {...item} />)}
                                        </Field>
                                    )
                                }
                            })}
                            <Field name="name" validate={isHidden}>
                                {props => (<Input name="name" addClass="input-container_hidden" input={props.input} meta={props.meta} />)}
                            </Field>
                            <p className="trash-modal__privacy text-grey small-text">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                            <LoadButton loading={loading} />
                        </form>
                    )}}
            </Form>
            <p className="trash-modal__privacy text-grey small-text">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
        </>
    );
}

export default Modal;