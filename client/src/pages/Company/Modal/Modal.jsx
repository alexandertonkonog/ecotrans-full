import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { composeValidators, isLength, isNumeric, isHidden, isEmail, isRequired } from '../../../dev/validate';
import {sendResume} from '../../../redux/formReducer';
import Input from '../../../components/Input/Input';
import LoadButton from '../../../components/LoadButton/LoadButton';
import File from '../../../components/File/File';
import '../../../css/form/jobForm.css';

const Modal = (props) => {
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setFormLoading(true);
        let res = await dispatch(sendResume(values));
        if (res.success) {
            props.setModalResult(1)
        } else {
            props.setModalResult(2);
        }
        setFormLoading(false);
    }
    let [formLoading, setFormLoading] = useState(false);
    return (
        <Form
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="main-title mb-small">Откликнуться на вакансию</h2>
                    <p className="main-text-text-grey mb-max">В резюме обязательно должно быть указано имя, возраст, смейное положение, образование,опыт работы, личные качества, должность, на которую претендуете.</p>
                    <div className="job-modal__body mb-max">
                        <Field name="name" validate={isLength(2, 50)}>
                            {props => (<Input name="name" input={props.input} meta={props.meta} placeHolder="Имя" type={1} text="Ваше имя" req={true} />)}
                        </Field>
                        <Field name="email" validate={isEmail}>
                            {props => (<Input name="email" input={props.input} meta={props.meta} placeHolder="Ваш E-mail" type={1} text="E-mail" req={true} />)}
                        </Field>
                        <Field name="number" validate={composeValidators(isNumeric, isLength(10,20))}>
                            {props => (<Input name="number" input={props.input} meta={props.meta} placeHolder="+7 (___) ___ - __ - __" type={1} text="Телефон" req={true} />)}
                        </Field>
                        <Field name="file" validate={isRequired}>
                            {props => (<File accept=".pdf, .doc, .dox, .txt, .rtf" name="file" inputId="resume" input={props.input} meta={props.meta} type={1} text="Прикрепить резюме" req={true} />)}
                        </Field>
                        <Field name="surname" validate={isHidden}>
                            {props => (<Input name="surname" input={props.input} addClass="input-container_hidden" meta={props.meta} type={1} text="Прикрепить резюме" req={true} />)}
                        </Field>
                        <p className="text-grey small-text">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                        <LoadButton loading={formLoading} />
                    </div>
                    <p className="text-grey small-text">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                </form>
            )}
        </Form>
    );
}

export default Modal;