import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { saveNewProfileData, saveNewPassword } from '../../../redux/authReducer';
import Info from './Info/Info';
import FormBlock from './Form/Form';
import ChangePassword from './ChangePassword/ChangePassword';
import '../../../css/lk/personal.css';

const Personal = (props) => {
    let [formLoading, setFormLoading] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        let requestBody = {};
        for (let key in values) {
            if (values[key] && values[key] !== props.user[key]) {
                requestBody[key] = values[key]
            }
        }
        if (!Object.keys(requestBody).length) {
            props.openModal({visible: true, result: 2, error: 'Данные не были изменены'});
            return false;
        }
        setFormLoading(true);
        let result = await dispatch(saveNewProfileData(requestBody));
        if (result.success) {
            props.openModal({visible: true, result: 1, error: null});
        } else {
            props.openModal({visible: true, result: 2, error: result.message});
        }
        setFormLoading(false);
    }
    const submitPassword = async (values, form) => {
        setFormLoading(true);
        let result = await dispatch(saveNewPassword(values));
        if (result.success) {
            props.openModal({visible: true, result: 1, error: null});
            form.restart();
        } else {
            props.openModal({visible: true, result: 2, error: result.message});
        }
        setFormLoading(false);
    }

    const initialValues = {
        email: props.user.email,
        contactName: props.user.contactName,
        name: props.user.name,
        number: props.user.number
    }

    let userType = props.selectedAgree && props.selectedAgree.userType;

    return (
        <div className="lk-personal">
            <Helmet>
                <title>Личный кабинет - личные данные</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}>
                    {(formProps) => {
                        return (
                            <form onSubmit={formProps.handleSubmit}>
                                <Info userType={userType} />
                                <FormBlock formLoading={formLoading} userType={userType} />
                            </form>
                        )
                    }}
            </Form>
            <Form
                onSubmit={submitPassword}>
                    {(formProps) => {
                        return (
                            <form onSubmit={formProps.handleSubmit}>
                                <ChangePassword formLoading={formLoading} />
                            </form>
                        )
                    }}
            </Form>
        </div>
    );
}

export default Personal;