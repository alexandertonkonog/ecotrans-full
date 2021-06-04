import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import LoadButton from '../../components/LoadButton/LoadButton';
import { composeValidators, isLength, isNumeric, isHidden } from '../../dev/validate';
import {callOrder} from '../../redux/formReducer';

const Modal = (props) => {
    const dispatch = useDispatch()
    const onSubmit = async (values) => {
        setFormLoading(true);
        let res = await dispatch(callOrder(values));
        if (res.success) {
            props.setModalResult(1);
        } else {
            props.setModalResult(2);
        }
        setFormLoading(false);
    }
    let [formLoading, setFormLoading] = useState(false);
    return (
        <Form
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="main-title header-modal__title mb-small">Заказать звонок</h2>
                    <p className="main-text text-grey mb-max">Оставьте ваши контактные данные, и наш менеджер свяжется с вами в ближайшее время</p>
                    <div className="header-modal__body mb-max">
                        <Field name="name">
                            {props => (<Input name="name" input={props.input} meta={props.meta} type={1} placeHolder="Имя" text="Ваше имя" />)}
                        </Field>
                        <Field name="email" validate={isHidden}>
                            {props => (<Input name="email" addClass="input-container_hidden" input={props.input} meta={props.meta} />)}
                        </Field>
                        <Field name="number" validate={composeValidators(isNumeric, isLength(10,20))}>
                            {props => (<Input req={true} name="number" input={props.input} meta={props.meta} type={1} placeHolder="Телефон" text="Ваш телефон" />)}
                        </Field>
                        <p className="small-text text-grey header-modal__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                        <LoadButton loading={formLoading} />
                    </div>
                    <p className="small-text text-grey">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                </form>
            )}
        </Form>
    );
}

export default Modal;