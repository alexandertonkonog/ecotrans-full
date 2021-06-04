import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createNewAgreement } from '../../../redux/formReducer';
import { getServices } from '../../../redux/authReducer';
import Info from './Info/Info';
import FormBlock from './Form/Form';
import Fields from './Fields/Fields';
import Account from './Account/Account';
import ButtonArea from './ButtonArea/ButtonArea';
import '../../../css/lk/personal.css';

const Agreement = (props) => {
    let [formLoading, setFormLoading] = useState(false);
    const dispatch = useDispatch();
    const services = useSelector(state => state.auth.services);
    const adresses = [
        {colname: 'Юридический', id: 1, addInputClass: "personal-address__input1", req: true, placeHolderInput:"Введите адрес", 
        type: 1, inputText:"Адрес", name: "lawAddress", 
        addSelectClass:"personal-address__select", type:1, selectText:"Совпадает с",
        data: [
            {id: 2, name: 'Фактический'},
            {id: 3, name: 'Почтовый'},
        ]},
        { colname: 'Фактический', id: 2, addInputClass: "personal-address__input1", req: true, placeHolderInput:"Введите адрес", 
        type: 1, inputText:"Адрес", name: "factAddress", 
        addSelectClass:"personal-address__select", type:1, selectText:"Совпадает с",
        data: [
            {id: 1, name: 'Юридический'},
            {id: 3, name: 'Почтовый'},
        ]
        },
        { colname: 'Почтовый', id: 3, addInputClass: "personal-address__input1", req: true, placeHolderInput:"Введите адрес", 
        type: 1, inputText:"Адрес", name: "postAddress", 
        addSelectClass:"personal-address__select", type:1, selectText:"Совпадает с",
        data: [
            {id: 2, name: 'Фактический'},
            {id: 1, name: 'Юридический'},
        ]
        },
    ]
    const onSubmit = async (values) => {
        setFormLoading(true);
        let body = {...values, ...checkAddress(values)};
        let result = await dispatch(createNewAgreement(body));
        if (result.success) {
            props.openModal({visible: true, result: 1, error: null});
        } else {
            props.openModal({visible: true, result: 2, error: result.message});
        }
        setFormLoading(false);
    }

    const checkAddress = (body) => {
        const checkAddressInside = (item) => {
            if (typeof item[1] === 'number') {
                let elem = adresses.find(adress => adress.id === item[1]);
                let bodyValue = body[elem.name];
                if (typeof bodyValue === 'number') {
                    return checkAddressInside([item[0], bodyValue]);
                }
                return [item[0], bodyValue];
            }
            return item;
        }
        let need = Object.entries(body);
        need = need.filter(item => item[0].includes('Address')).map(checkAddressInside);
        return Object.fromEntries(need);
    }
    const initialValues = {
        personType: props.user.type,
        ...props.user.reqs,
        ...props.user.address,
        email: props.user.email,
        contactName: props.user.contactName,
        name: props.user.name,
        number: props.user.number
    }
    
    useEffect(() => {
        dispatch(getServices());
    }, [])

    return (
        <div className="lk-agree">
            <Helmet>
                <title>Личный кабинет - заключение договора</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}>
                    {(formProps) => {
                        return (
                            <form onSubmit={formProps.handleSubmit}>
                                <Info services={services} />
                                <FormBlock adresses={adresses} />
                                <Fields />
                                <Account />
                                <ButtonArea formLoading={formLoading} />
                            </form>
                        )
                    }}
            </Form>
        </div>
    );
}

export default Agreement;