import React from 'react';
import { Field } from 'react-final-form';
import Input from '../../../../components/Input/Input';
import Password from '../../../../components/Password/Password';
import LoadButton from '../../../../components/LoadButton/LoadButton';
import { isEmptyOrEmail, formatNumber, isEmptyOrRight } from '../../../../dev/validate';

const Form = ({userType, formLoading}) => {
    let contact = [
        {id: 1, req: true, placeHolder:"Введите ФИО", type:1, text:"ФИО контактного лица", name: "contactName", validate: isEmptyOrRight(10, 50)},
        {id: 2, req: true, placeHolder:"Mail@mail.com", type:1, text:"Ваш E-mail", name: "email", validate: isEmptyOrEmail},
        {id: 3, req: true, placeHolder:"Введите название", type:1, text:"Название организации", name: "name", validate: isEmptyOrRight(10, 50)},
        {id: 4, req: true, placeHolder:"+7 (999) 999 - 99 - 99", type:1, text:"Телефон", name: "number", validate: isEmptyOrRight(10, 20)},
    ];
    

    if (userType === 0) {
        contact = contact.filter(item => item.name !== 'name');
        contact[0].name = 'name';
        contact[0].text = 'Ваше имя';
    }
    
    return (
        <>
            <section className="personal-con short-padding lk-col personal-password">
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
            <section className="personal-btns short-padding pt0 bb-grey">
                <p className="small-text text-grey">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                <LoadButton text="Сохранить" loading={formLoading} />
            </section>
        </>
    );
}

export default Form;