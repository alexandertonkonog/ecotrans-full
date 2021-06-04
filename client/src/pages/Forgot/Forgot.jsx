import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'react-final-form';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { setBreadcrumbs } from '../../redux/mainReducer';
import { ForgotPassword } from '../../redux/authReducer';
import Input from '../../components/Input/Input';
import Password from '../../components/Password/Password';
import Wizard from './Wizard';
import { composeValidators, isEmail, isLength, isNumeric, isPassword } from '../../dev/validate';
import '../../css/components/forgot.css';

const Forgot = () => {
    let [regError, setRegError] = useState(null);
    let [formLoading, setFormLoading] = useState(false); 
    const dispatch = useDispatch();
    const forgot = useSelector(state => state.auth.forgot);
    useEffect(() => {
        let breads = [
            {id: 1, name: 'Главная', link: '/'},
            {id: 2, name: 'Восстановление пароля', link: '/forgot-password'}
        ];
        dispatch(setBreadcrumbs(breads));
        return () => {
            dispatch(setBreadcrumbs(null));
        }
    }, []);

    const onSubmit = async (values) => {
        setFormLoading(true);
        let result = await dispatch(ForgotPassword.refreshPassword(values));
        if (!result.success) {
            setRegError(result.message);
            setFormLoading(false);
            return false;
        } else {
            setRegError(false);
            setFormLoading(false);
            return true;
        }
    }

    const firstStageSubmit = async (values) => {
        setFormLoading(true);
        let result = await dispatch(ForgotPassword.checkEmail(values));
        if (!result.success) {
            setRegError(result.message);
        } else {
            setRegError(false);
        }
        setFormLoading(false);
        return result.success;
    }

    const secondStageSubmit = async (values) => {
        return ForgotPassword.checkCode(forgot.code, values.code);
    }

    const stageHandlers = [firstStageSubmit, secondStageSubmit];

    return (
        <section className="forgot-container">
            <Helmet>
                <title>Восстановление пароля</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Wizard stageHandlers={stageHandlers} onSubmit={onSubmit} regError={regError} formLoading={formLoading} >
                <Wizard.Page>
                    <div className="forgot__list mb-middle">
                        <Field name="ls" validate={composeValidators(isLength(5, 20), isNumeric)}>
                                {props => (<Input type={1} text="Лицевой счет" name="ls" input={props.input} meta={props.meta} placeHolder="Введите номер лицевого счета" />)}
                        </Field>
                        <Field name="email" validate={isEmail}>
                            {props => (<Input type={1}  text="Электронная почта" name="email" input={props.input} meta={props.meta} placeHolder="Введите почту, привязанную к аккаунту" />)}
                        </Field>
                    </div>
                </Wizard.Page>
                <Wizard.Page>
                    <h2 className="macro-title mb-middle">На Вашу почту придет письмо с кодом для подтверждения владельца</h2>
                    <div className="forgot__list mb-middle">
                        <Field name="code" validate={isLength(4, 8)}>
                            {props => (<Input type={1} text="Код из письма" name="code" input={props.input} meta={props.meta} placeHolder="Введите код" />)}
                        </Field>
                    </div>
                </Wizard.Page>
                <Wizard.Page>
                    <div className="forgot__list mb-middle">
                        <Field name="password" validate={composeValidators(isPassword, isLength(10, 20))}>
                                {props => (<Password type={1} text="Введите пароль" name="password" input={props.input} meta={props.meta} placeHolder="Введите пароль" />)}
                        </Field>
                        <Field name="repeatPassword" validate={composeValidators(isPassword, isLength(10, 20))}>
                            {props => (<Password type={1} text="Повторите пароль" name="repeatPassword" input={props.input} meta={props.meta} placeHolder="Повторите пароль" />)}
                        </Field>
                    </div>
                </Wizard.Page>
                <Wizard.Page>
                    <div className="forgot__success">
                        <h2 className="macro-title mb-middle">Вы успешно сменили пароль</h2>
                        <Link className="btn btn_green" to="/">На главную</Link>
                    </div>
                </Wizard.Page>
            </Wizard>
                   
        </section>
    );
}

export default Forgot;