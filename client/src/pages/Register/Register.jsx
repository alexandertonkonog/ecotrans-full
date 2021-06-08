import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import Input from '../../components/Input/Input';
import LoadButton from '../../components/LoadButton/LoadButton';
import Password from '../../components/Password/Password';
import { getRegister, getLogin } from '../../redux/authReducer';
import Wizard from './Wizard';
import '../../css/form/regForm.css';
import { composeValidators, isEmail, isHidden, isLength, isNumeric, isPassword } from '../../dev/validate';

const Register = (props) => {
    let history = useHistory();
    let dispatch = useDispatch();
    let isLoading = useSelector(state => state.auth.loading);
    let [enterError, setEnterError] = useState(null);
    let [regError, setRegError] = useState(null);

    let stages = [
        {id: 1, inputs: [
            {id: 1, name:"login", addClass: "mb-middle", type: 1, placeHolder: "_ _ _ _ _", text: "Номер лицевого счета", req: true, validate: composeValidators(isLength(5, 20), isNumeric)},
            {id: 2, name:"email", addClass: "mb-middle", type: 1, placeHolder: "E-mail", text: "E-mail", req: true, validate: isEmail},
            {id: 3, name:"phone", addClass: "mb-middle", type: 1, placeHolder: "+7 (___) ___ - __ - __", text: "Телефон", req: true, validate: composeValidators(isLength(10, 20), isNumeric)},
        ]},
        {id: 2, inputs: [
            {id: 1, name:"password", addClass: "mb-middle", type: 1, placeHolder: "", text: "Пароль", req: true, inputType:"password", validate: composeValidators(isPassword, isLength(10, 20))},
            {id: 2, name:"repeatPassword", addClass: "mb-middle", type: 1, placeHolder: "", text: "Повторите пароль", req: true, inputType:"password", validate: composeValidators(isPassword, isLength(10, 20))},
            {id: 3, name:"name", addClass: "input-container_hidden", validate: isHidden},
        ]},
    ];

    let enterFields = [
        {id: 1, name:"login", addClass: "mb-middle", type: 1, placeHolder: "Введите номер лицевого счета", text: "Номер лицевого счета", req: true, validate: composeValidators(isLength(5, 20), isNumeric)},
        {id: 2, name:"password", addClass: "mb-middle", type: 1, placeHolder: "Введите пароль", text: "Пароль", req: true, inputType:"password", validate: isLength(5, 20)},
        {id: 3, name:"name", addClass: "input-container_hidden", validate: isHidden},
    ];

    let stage1 = stages[0];
    let stage2 = stages[1];

    const enterSubmit = async (values) => {
        setEnterError(null);
        let res = await dispatch(getLogin(values));
        if (res.success) {
            history.push('/personal');
            props.changeRegisterModal(false);
        } else {
            setEnterError(res.message);
        }
    }

    const onSubmit = async (values) => {
        if (values.password !== values.repeatPassword) {
            setRegError("Введенные пароли отличаются");
            return;
        }
        setRegError(null);
        let res = await dispatch(getRegister(values));
        if (res.success) {
            props.changeRegisterModal(3);
        } else {
            setRegError(res.message)
        }
    }

    return (
        <>              
            {props.moduleType === 1 && <Form
                onSubmit={enterSubmit}
            >
                {({ handleSubmit }) => (
                    <>
                    <h2 className="main-title mb-large">Войти</h2>
                    <form onSubmit={handleSubmit} className="enter mb-large">
                        {enterFields.map(item => {
                            if (item.inputType === 'password') {
                                return (
                                    <Field name={item.name} key={item.id} validate={item.validate}>
                                        {props => (<Password input={props.input} meta={props.meta} {...item} />)}
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
                        {enterError && <p className="error mb-middle">{enterError}</p>}
                        <LoadButton addClass="mb-middle" loading={isLoading} text="Войти" />
                        <p className="main-text enter-text mb-small" onClick={() => props.changeRegisterModal(2)}>Нет аккаунта? Зарегистрируйтесь</p>
                        <p className="main-text enter-text"><Link onClick={() => props.changeRegisterModal(false)} to="/forgot-password" className="text-center enter-text">Забыли пароль?</Link></p>
                    </form>
                    </>
                )}
            </Form>}
            
            {props.moduleType === 2 && <Wizard
                onSubmit={onSubmit}
                isLoading={isLoading}
                changeToEnter={() => props.changeRegisterModal(1)}
                regError={regError}
            >
                <Wizard.Page>
                    <p className="main-text mb-large text-grey">Шаг 1/2</p>
                    <div className="register mb-large">
                        {stage1.inputs.map(item => {
                            return (
                                <Field name={item.name} key={item.id} validate={item.validate}>
                                    {props => (<Input input={props.input} meta={props.meta} {...item} />)}
                                </Field>
                            )
                        })}
                    </div>
                </Wizard.Page>
                <Wizard.Page>
                    <p className="main-text mb-large text-grey">Шаг 2/2</p>
                    <div className="register mb-large">
                        {stage2.inputs.map(item => {
                            return (
                                <Field name={item.name} key={item.id} validate={item.validate}>
                                    {props => (<Password input={props.input} meta={props.meta} {...item} />)}
                                </Field>
                            ) 
                        })}
                    </div>
                </Wizard.Page>
            </Wizard>}

            {props.moduleType === 3
                &&  <>
                        <h2 className="main-title mb-small">Регистрация прошла успешно!</h2>
                        <div className="register">
                            <p className="main-text text-grey mb-middle">На вашу почту было отправленно письмо для подтверждения электронного адреса. Не забудьте прочитать его и следовать указаниям</p>
                            <button onClick={() => props.changeRegisterModal(false)} className="btn btn_green">Понятно</button>
                        </div>
                    </>
                }
            {(props.moduleType === 1 || props.moduleType === 2) && <p className="text-grey small-text">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>}
        </>
    );
}

export default Register;