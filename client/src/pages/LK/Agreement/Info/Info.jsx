import React from 'react';
import { Field, useForm } from 'react-final-form';
import LKInfo from '../../../../components/LKInfo/LKInfo';
import Select from '../../../../components/Select/FormSelect';
import Loader from '../../../../components/Loader/Loader';
import '../../../../css/components/tabs.css';
import { isRequired } from '../../../../dev/validate';

const Info = (props) => {
    const data = {
        person: {
            name: 'person',
            data: [
                {id: 0, name: 'Физ. лицо'},
                {id: 1, name: 'ИП'},
                {id: 2, name: 'Юр. лицо'},
                {id: 3, name: 'Упр. ком.'},
                {id: 4, name: 'ТСЖ, ЖК, ЖСК'},
                {id: 5, name: 'СНТ, ДНТ, НСТ'},
            ]
        },
        service: {
            name: "service", 
            req: true, 
            data: props.services
        },
        
        
    };
    const form = useForm();
    const refreshFiles = () => {
        let state = form.getState().values;
        for (let key in state) {
            if (state[key] instanceof FileList) {
                form.change(key, null)
            }
        }
    }
    return (
        <>
            <section className="personal-per short-padding lk-col">
                <h1 className="small-title personal-info__title mb-large">Заключить договор</h1>
                <h2 className="micro-title personal-per__title mb-middle">Выберите тип плательщика</h2>
                <div className="personal-per__body">
                    <Field name="personType" defaultValue={0} validate={isRequired}>
                        {fieldProps => (
                            <p className="tabs">
                                {data.person.data.map(item => <span 
                                    key={item.id}
                                    onClick={() => {
                                        fieldProps.input.onChange(item.id);
                                        refreshFiles();
                                    }}
                                    className={fieldProps.input.value === item.id ? "tab tab_active" : "tab"}>
                                        {item.name}</span>)}
                            </p>
                        )}
                    </Field>
                    <LKInfo 
                        text="После оформления договора тип плательщика нельзя будет изменить"
                        addClass="small-text" />
                </div>
            </section>
            <section className="lk-agree-service short-padding lk-col lk-grid">
                <h2 className="micro-title personal-per__title mb-middle">Выберите услугу</h2>
                {data.service.data 
                    ? <Field name="service" validate={isRequired}>
                        {fieldProps => (<Select name="service" input={fieldProps.input} meta={fieldProps.meta} addClass="lk-agree-service__item" {...data.service} />)}
                    </Field>
                    : <Loader />}
            </section>
        </>
    );
}

export default Info;