import React, { useState } from 'react';
import { Field, useField, useForm } from 'react-final-form';
import Input from '../../../../components/Input/Input';
import { getPlaceholder } from '../../../../dev/functions';
import AddressField from './AddressField';
import { composeValidators, isEmail, isLength, isNumeric, isAdressRequired, formatNumber } from '../../../../dev/validate';

const Form = (props) => {
    let userType = useField('userType').input.value;
    let formData = useForm();
    let contact = [
        {id: 1, req: true, placeHolder:"Введите ФИО", type:1, text:"ФИО контактного лица", name: "contactName", validate: isLength(10, 50)},
        {id: 2, req: true, placeHolder:"Mail@mail.com", type:1, text:"Ваш E-mail", name: "email", validate: isEmail},
        {id: 3, req: true, placeHolder:"Введите название", type:1, text:"Название организации", name: "name", validate: isLength(10, 50)},
        {id: 4, req: true, placeHolder:"+7 (999) 999 - 99 - 99", type:1, text:"Телефон", name: "number", validate: composeValidators(isLength(10, 20), isNumeric)},
    ];
    
    let rec = [
        {id: 1, placeHolder: getPlaceholder(10), type:1, text:"ИНН", req:true, name: 'inn', validate: composeValidators(isLength(5, 20), isNumeric)},
        {id: 2, placeHolder: getPlaceholder(10), type:1, text:"Р/с", req:true, name: 'rs', validate: composeValidators(isLength(10, 20), isNumeric)},
        {id: 3, placeHolder: getPlaceholder(10), type:1, text:"КПП", req:false, name: 'kpp',},
        {id: 4, placeHolder: getPlaceholder(10), type:1, text:"Корр/с", req:true, name: 'ks', validate: composeValidators(isLength(10, 20), isNumeric)},
        {id: 5, placeHolder: getPlaceholder(10), type:1, text:"ОГРН", req:true, name: 'ogrn', validate: composeValidators(isLength(5, 20), isNumeric)},
        {id: 6, placeHolder: getPlaceholder(10), type:1, text:"БИК", req:true, name: 'bik', validate: composeValidators(isLength(5, 20), isNumeric)},
        {id: 7, placeHolder: 'Название банка', mask:"text", type:1, text:"Банк", req:true, name: 'bank', validate: isLength(10, 100)},
    ];
    

    if (userType === 0) {
        contact = contact.filter(item => item.name !== 'name');
        contact[0].name = 'name';
        contact[0].text = 'Ваше имя';
    }
    
    let adresses = userType === 0 ? props.adresses.slice(0,1) : props.adresses;
    return (
        <>
            <section className="personal-con short-padding lk-col">
                <h2 className="micro-title mb-middle">Контактные данные</h2>
                <div className="personal-con__body">
                    {contact.map(item => {
                        if (item.name === 'phone') {
                            return (
                                <Field name={item.name} format={formatNumber} formatOnBlur={true} validate={item.validate} key={item.id} >
                                    {fieldProps => (<Input input={fieldProps.input} meta={fieldProps.meta} {...item} />)}
                                </Field> 
                            );
                        } else {
                            return (
                                <Field name={item.name} validate={item.validate} key={item.id} >
                                    {fieldProps => (<Input input={fieldProps.input} meta={fieldProps.meta} {...item} />)}
                                </Field> 
                            );
                        }
                    })}        
                </div>
            </section>
            <section className="personal-address short-padding lk-col">
                {userType >= 2 
                    ? <h2 className="micro-title mb-middle">Адрес организации</h2>
                    : <h2 className="micro-title mb-middle">Ваш адрес</h2>}
                
                {
                    adresses.map(item => {
                        return (
                            <div key={item.id}>
                                {userType !== 0 && <h3 className="inside-title mb-middle">{item.colname}</h3>}
                                <div className="personal-address__row mb-middle">
                                    <Field name={item.name} validate={isAdressRequired(adresses, formData)}>
                                            {fieldProps => (<AddressField  input={fieldProps.input} meta={fieldProps.meta} {...item} />)}
                                    </Field>          
                                </div>
                            </div>
                        )
                    })
                }
                
            </section>
            <section className="personal-rek short-padding">
                <h2 className="micro-title mb-middle">Укажите реквизиты</h2>
                <div className="personal-rek__row mb-middle">
                    {rec.slice(0,6).map(item => {
                        return (
                            <Field name={item.name} validate={item.validate} key={item.id}>
                                {fieldProps => (<Input input={fieldProps.input} meta={fieldProps.meta} {...item} />)}
                            </Field>   
                        );
                    })}       
                </div>
                <Field name={rec[6].name} validate={rec[6].validate} key={rec[6].id}>
                    {fieldProps => (<Input input={fieldProps.input} meta={fieldProps.meta} {...rec[6]} />)}
                </Field>
            </section>
        </>
    );
}

export default Form;