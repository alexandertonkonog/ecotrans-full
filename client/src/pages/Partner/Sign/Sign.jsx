import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { composeValidators, isLength, isNumeric, isHidden, isEmail } from '../../../dev/validate';
import { becomePartner } from '../../../redux/formReducer';
import Input from '../../../components/Input/Input';
import LoadButton from '../../../components/LoadButton/LoadButton';

const Sign = (props) => {
    let [status, setStatus] = useState({complete: false, error: false, text: null});
    let [formLoading, setFormLoading] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setFormLoading(true)
        let res = await dispatch(becomePartner(values));
        if (res.success) setStatus({complete: true, error: false, text: 'Ваше обращение было отправлено! В ближайшее время с Вами свяжется наш специалист.'});
        else setStatus({complete: true, error: true, text: res.message});
        setFormLoading(false)
    }
    return (
        <section className="partner-sign-container block  middle-padding pt0">
            <div className="partner-sign sign-border">
                {status.complete
                ? <div className="sign-border__complete middle-padding">
                    <h2 className="small-title mb-small">{status.text}</h2>
                    {status.error && <button
                        onClick={() => setStatus({complete: false, error: false, text: null})}
                        className="btn btn_green sign-border__complete-btn">Попробовать еще раз</button>}
                </div>
                : <Form
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="partner-sign__form container_grey average-padding grid">
                            <h2 className="dec-title partner-sign__title">Станьте нашим партнером</h2>
                            <Field name="name" validate={isLength(2, 30)}>
                                {props => (<Input name="name" req={true} input={props.input} meta={props.meta} type={1} text="Название организации" addClass="partner-sign__name" placeHolder="Введите название" />)}
                            </Field>
                            <Field name="number" validate={composeValidators(isLength(10, 20), isNumeric)}>
                                {props => (<Input name="number" req={true} input={props.input} meta={props.meta} type={1} text="Телефон" addClass="partner-sign__number" placeHolder="+7 (_ _ _) _ _ _  _ _  _ _" />)}
                            </Field>
                            <p className="main-text partner-sign__subtitle text-grey">Отправьте свои контактные данныеи наш менеджер свяжется с вами</p>
                            <Field name="fio" validate={isLength(5, 40)}>
                                {props => (<Input name="fio" req={true} input={props.input} meta={props.meta} type={1} text="ФИО контактного лица" addClass="partner-sign__fio" placeHolder="Введите ФИО" />)}
                            </Field>
                            <Field name="email" validate={isEmail}>
                                {props => (<Input name="email" req={true} input={props.input} meta={props.meta} type={1} text="E-mail" addClass="partner-sign__email" placeHolder="Mail@mail.com" />)}
                            </Field>
                            <Field name="surname" validate={isHidden}>
                                {props => (<Input name="surname" input={props.input} meta={props.meta} addClass="input-container_hidden"/>)}
                            </Field>
                            <p className="small-text text-grey partner-sign__stars">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                            <p className="small-text text-grey partner-sign__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                            <LoadButton loading={formLoading} />
                        </form>
                    )}
                </Form>}
            </div>
        </section>
    );
}

export default Sign;