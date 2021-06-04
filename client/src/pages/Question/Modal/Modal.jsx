import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { composeValidators, isLength, isNumeric, isHidden, isEmail } from '../../../dev/validate';
import { makeNewQuestion } from '../../../redux/formReducer';
import Input from '../../../components/Input/Input';
import TextArea from '../../../components/TextArea/TextArea';
import '../../../css/form/queForm.css';

const Modal = (props) => {
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        let res = await dispatch(makeNewQuestion(values));
        if (res.success) props.setResult(1);
        else props.setResult(2);
    }
    return (
        <Form
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="main-title mb-small">Задайте вопрос</h2>
                    <p className="main-text text-grey mb-max">Оставьте ваши контактные данные и опишите вопрос, и наш менеджер свяжется с вами в ближайшее время</p>
                    <div className={props.isAuth ? "que-modal__body_auth mb-max" : "que-modal__body mb-max"}>
                        {!props.isAuth && <Field name="number" validate={composeValidators(isLength(10, 20), isNumeric)}>
                            {props => (<Input name="number" req={true} input={props.input} meta={props.meta} type={1} text="Телефон" placeHolder="+7 (_ _ _) _ _ _  _ _  _ _" />)}
                        </Field>}
                        {props.isAuth 
                        ? <Field name="text" validate={isLength(15, 200)}>
                            {props => (<TextArea name="text" input={props.input} meta={props.meta} type={1} text="Текст сообщения" placeHolder="Ваш вопрос" req={true} />)}
                        </Field>
                        : <Field name="text" validate={isLength(15, 200)}>
                            {props => (<TextArea name="text" input={props.input} meta={props.meta} addClass="que-modal__textarea" type={1} text="Текст сообщения" placeHolder="Ваш вопрос" req={true} />)}
                        </Field>}
                        {!props.isAuth && <Field name="email" validate={isEmail}>
                            {props => (<Input name="email" req={true} input={props.input} meta={props.meta} type={1} text="E-mail" placeHolder="Mail@mail.com" />)}
                        </Field>}
                        <Field name="surname" validate={isHidden}>
                            {props => (<Input name="surname" input={props.input} meta={props.meta} addClass="input-container_hidden"/>)}
                        </Field>
                        <p className="small-text text-grey">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                        <button type="submit" className="btn btn_green">Отправить</button>
                    </div>
                    <p className="small-text text-grey">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                </form>
            )}
        </Form>
    );
}

export default Modal;