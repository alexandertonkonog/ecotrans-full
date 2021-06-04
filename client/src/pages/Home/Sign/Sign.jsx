import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {signMessagesSending} from '../../../redux/formReducer';
import logo from '../../../images/home/mail.svg';
import Input from '../../../components/Input/Input';
import { isEmail, isHidden } from '../../../dev/validate';

const Sign = (props) => {
    let dispatch = useDispatch();
    let [error, setError] = useState(null);
    let [success, setSuccess] = useState(false);
    const onSubmit = async (values) => {
        let errorText = values.email && isEmail(values.email);
        if (!errorText) {
            let result = await dispatch(signMessagesSending(values));
            if (result.success) {
                setSuccess(true);
                setError(null);
            } else {
                setError(result?.message);
            }  
        } else {
            setError(errorText);
        }
    }
    return (
        <Form 
            onSubmit={onSubmit}
        >   
        
            {props => (
                <form onSubmit={props.handleSubmit} className="call-block home-mail">
                    {success 
                    ? <h2 className="small-title call-block__success-text">Вы подписались на рассылку новостей!</h2>
                    : <>
                        <img 
                            src={logo} 
                            alt="Будьте в курсе событий"
                            title="Будьте в курсе событий"
                            className="call-block__icon home-mail__icon"/>
                        <div className="call-block__text-area home-mail__text-area">
                            <h2 className="call-block__title">Будьте в курсе событий</h2>
                            <p className="call-block__text home-mail__subtitle">Подпишитесь на наши новости</p>
                        </div>
                        <div className="call-block__form home-mail__form">
                            <div className="call-block__form-area home-mail__form-area">
                                <Field name="email" >
                                    {props => (<Input addClass="home-mail__form-area-input" input={props.input} meta={props.meta} placeHolder="Ваш E-mail" name="email" inputId="email" type={0} />)}
                                </Field>
                                <Field name="name" validate={isHidden}>
                                    {props => (<Input name="name" addClass="input-container_hidden" input={props.input} meta={props.meta} />)}
                                </Field>
                                <button
                                    type="submit"
                                    className="btn btn_white call-block__btn btn_main">Подписаться</button>
                            </div>
                            {error 
                                ? <p className="call-block__privacy home-mail__privacy">{error}</p>
                                : <p className="call-block__privacy home-mail__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>}
                        </div>
                    </>}
                </form>
            )}
        </Form>
    );
}

export default Sign;