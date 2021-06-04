import React, {useState} from 'react';
import { Field, useField } from 'react-final-form';
import Radio from '../../../../components/Radio/Radio';
import File from '../../../../components/File/File';
import Input from '../../../../components/Input/Input';
import { composeValidators, isLength, isNumeric, isRequired } from '../../../../dev/validate';

const Account = (props) => {
    let radioData =  [
        {id: 1, name: 'Норматив'},
        {id: 2, name: 'Контейнер'},
    ]
    let accountType = useField('accountType').input.value;

    return (
        <section className="short-padding lk-agree-account">
            <h2 className="micro-title mb-middle">Осуществление расчета</h2>
            <div className="lk-grid mb-middle lk-agree-account__radio">
                <Field name='accountType' validate={isRequired} defaultValue={1}>
                    {fieldProps => (<Radio 
                        data={radioData}
                        input={fieldProps.input} 
                        meta={fieldProps.meta}  />)}
                </Field>
            </div>
            {accountType === 2 && <>
                <div className="lk-agree-field mb-middle lk-grid">
                    <p className="main-text mb-small lk-agree-field__text">Чек/товарная накладная о приобретении контейнера</p>
                    <Field name="check">
                        {fieldProps => (<File 
                            input={fieldProps.input} 
                            meta={fieldProps.meta} 
                            inputId={'chek'} 
                            addClass="lk-agree-field__file" />)}
                    </Field>
                </div>
                <div className="lk-agree-field mb-middle lk-grid">
                    <Field name="size" validate={composeValidators(isNumeric, isLength(1, 10))}>
                        {fieldProps => (<Input 
                            input={fieldProps.input} 
                            placeHolder="_ _" 
                            meta={fieldProps.meta}
                            type={1}
                            text="Укажите объем в литрах"
                            addClass="lk-agree-field__input" />)}
                    </Field>
                </div>
                <div className="lk-agree-field lk-grid">
                    <p className="main-text mb-small lk-agree-field__text">Фотография установленного контейнера с фиксацией подъезда для автомобиля к нему (если отсутствует чек)</p>
                    <Field name="photo">
                        {fieldProps => (<File 
                            input={fieldProps.input} 
                            meta={fieldProps.meta} 
                            inputId={'photo'} 
                            addClass="lk-agree-field__file" />)}
                    </Field>
                </div>
            </>}
        </section>
    );
}

export default Account;