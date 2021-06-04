import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import Select from '../../../../components/Select/Select';
import LoadButton from '../../../../components/LoadButton/LoadButton';
import Input from '../../../../components/Input/Input';
import Loader from '../../../../components/Loader/Loader';
import { createPayment } from '../../../../redux/authReducer';
import { composeValidators, isLength, isNumeric } from '../../../../dev/validate';

const Agreement = ({user, selectedAgree, setAgree}) => {
    let [formLoading, setFormLoading] = useState(false);

    if (!selectedAgree) {
        return (
            <div className="lk-main__agree short-padding lk-grid">
                <div className="lk-block">
                    <Loader addClass="lk-main__agree-loader" />
                </div>
            </div>
        )
    }
    
    const data = [
        {id: 1, name: 'Баланс', value: selectedAgree.balance + ' ₽' || 'Подождите пожалуйста'},
        {id: 2, name: '№ Лицевого счета', value: selectedAgree.ls},
        {id: 3, name: 'Адрес', value: user.lawAddress || 'Не указан'},
    ];
    const clickSelect = (id, valueId) => {
        if (selectedAgree.id !== valueId) {
            setAgree(valueId);
        }
    }
    const onSubmit = (values) => {
        console.log(values);
        createPayment(values.summ);
    }

    return (
        <div className="lk-main__agree short-padding lk-grid">
            <div className="lk-block">
                <h2 className="micro-title lk-main__agree-title mb-middle">Выберите договор</h2>
                <div className="lk-main__agree-area lk-grid">
                    <Select 
                        addClass="lk-main__agree-select" 
                        data={user.agreements.map(item => ({...item, name: 'Л/с ' + item.ls}))} 
                        value={selectedAgree.id}
                        clickItem={clickSelect} />
                </div>
                <div className="lk-main__agree-pay short-padding">
                    {data.map(item => {
                        return (
                            <div key={item.id} className={"lk-main__agree-pay-item-container lk-main__agree-pay-item-container" + item.id}>
                                <div className="lk-main__agree-pay-item-label text-grey small-text">{item.name}</div>
                                <div className="lk-main__agree-pay-item main-text">{item.value}</div>
                            </div>
                        );
                    })}
                </div>
                <Form
                onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={selectedAgree.userType === 0 
                        ? "lk-main__agree-btns short-padding pb0 lk-main__agree-btns-grid" 
                        : "lk-main__agree-btns short-padding pb0 lk-grid"}>
                            {selectedAgree.userType === 0
                                ? <>
                                    <p className="main-text text-grey">Внесите средства на баланс счета на сайте</p>
                                    <Field name="summ" validate={composeValidators(isNumeric, isLength(3, 6))}>
                                        {fieldProps => (<Input placeHolder="Введите сумму" input={fieldProps.input} meta={fieldProps.meta} req={true} />)}
                                    </Field>
                                    <LoadButton text="Оплатить" loading={formLoading} />
                                </> 
                                : <button className="btn btn_green lk-main__agree-btn">Скачать платежный документ</button>}
                    </form>
                )}
                </Form>
            </div>
        </div>
    );
}

Agreement.defaultProps = {
    person: 1,
}

export default Agreement;