import React from 'react';
import { Field } from 'react-final-form';
import Password from '../../../../components/Password/Password';
import LoadButton from '../../../../components/LoadButton/LoadButton';
import { isPassword, isLength, isOldPassword, composeValidators } from '../../../../dev/validate';

const ChangePassword = ({formLoading}) => {
    let password = [
        {id: 1, req: true, placeHolder:"Введите старый пароль", type:1, text:"Старый пароль", name: "oldPassword", validate: composeValidators(isLength(8, 20), isOldPassword)},
        {id: 2, req: true, placeHolder:"Введите новый пароль", type:1, text:"Новый пароль", name: "password", validate: composeValidators(isLength(8, 20), isPassword)},
        {id: 3, req: true, placeHolder:"Повторите новый пароль", type:1, text:"Повторите пароль", name: "repeatPassword", validate: composeValidators(isLength(8, 20), isPassword)}  
    ]
    return (
        <>
            <section className="personal-con short-padding lk-col personal-password">
                <h2 className="micro-title mb-middle">Смена пароля</h2>
                <div className="personal-con__body">
                    {password.map(item => {
                        return (
                            <Field name={item.name} validate={item.validate} key={item.id} >
                                {fieldProps => (<Password input={fieldProps.input} meta={fieldProps.meta} {...item} />)}
                            </Field> 
                        );
                    })}        
                </div>
            </section>
            
            <section className="personal-btns short-padding pt0">
                <p className="small-text text-grey">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                <LoadButton text="Сохранить" loading={formLoading} />
            </section>
        </>
    )
}

export default ChangePassword;