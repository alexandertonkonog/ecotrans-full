import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { isNumeric, isRequired, composeValidators, isLength} from '../../../../dev/validate';
import Input from '../../../../components/Input/Input';
import File from '../../../../components/File/File';
import LoadButton from '../../../../components/LoadButton/LoadButton';

const FormBlock = () => {
    let [formLoading, setFormLoading] = useState(false);
    const onSubmit = (values) => {

    }
    return (
        <section className="job-form-container">
            <Form 
                onSubmit={onSubmit}
            >
                {props => (
                    <form onSubmit={props.handleSubmit} className="job-form grid">
                        <h2 className="job-form__title">Не нашли подходящую вакансию?</h2>
                        <p className="job-form__text">Отправьте нам свое резюме и наш менеджер свяжется с вами</p>
                        <Field name="number" validate={composeValidators(isNumeric, isLength(10,20))}>
                            {props => (<Input name="number" type={1} text="Телефон" req={true} placeHolder="Введите телефон" input={props.input} meta={props.meta} />)}
                        </Field>
                        <Field name="file" validate={isRequired}>
                            {props => (<File name="file" type={1} text="Резюме" req={true} input={props.input} meta={props.meta} />)}
                        </Field>
                        <p className="job-form__light job-form__fields-text">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                        <p className="job-form__light job-form__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                        <LoadButton loading={formLoading} />
                    </form>
                )}
            </Form>
        </section>
    );
}

export default FormBlock;