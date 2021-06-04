import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import Input from '../../../../components/Input/Input';
import LoadButton from '../../../../components/LoadButton/LoadButton';
import { composeValidators, isLength, isNumeric } from '../../../../dev/validate';
import { helpTrashPasport } from '../../../../redux/formReducer';
import docs from '../../../../images/service/docs.svg';
import { useDispatch } from 'react-redux';

const Sign = () => {
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setFormLoading(true)
        let res = await dispatch(helpTrashPasport(values));
        if (res.success) {
            setStatus({complete: true, error: false, text: 'Ваше обращение было отправлено! В ближайшее время с Вами свяжется наш специалист.'});
        } else {
            setStatus({complete: true, error: true, text: res.message});
        }
        setFormLoading(false)
    };
    let [status, setStatus] = useState({complete: false, error: false, text: null});
    let [formLoading, setFormLoading] = useState(false);
    return (
        <section className="pasport-sign-container middle-padding">
            <div className="sign-border">
                {status.complete 
                ? <div className="sign-border__complete middle-padding">
                    <h2 className="small-title mb-small">{status.text}</h2>
                    {status.error && <button
                        onClick={() => setStatus({complete: false, error: false, text: null})}
                        className="btn btn_green sign-border__complete-btn">Попробовать еще раз</button>}
                </div>
                : <Form 
                    onSubmit={onSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} className="pasport-sign grid">
                            <h2 className="dec-title pasport-sign__title">Профессиональная поддежка в оформлении паспортов отходов по I - IV классу опасности</h2>
                            <div className="pasport-sign__icon" style={{backgroundImage: 'url(' + docs + ')'}}></div>
                            <p className="tko__text text-grey pasport-sign__subtitle">Наши специалисты окажут профессиональную поддержку в оформление паспортов отходов по I - IV классу опасности по новым правилам</p>
                            <Field name="number" validate={composeValidators(isLength(10,20), isNumeric)}>
                                {props => (<Input name="number" req={true} input={props.input} meta={props.meta} type={1} text="Телефон" placeHolder="+7 (_ _ _) _ _ _  _ _  _ _" />)}
                            </Field>
                            <LoadButton loading={formLoading} />
                            <p className="pasport-sign__small-text text-grey pasport-sign__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                            <p className="pasport-sign__small-text text-grey pasport-sign__stars">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                        </form>
                    )}
                </Form>}
            </div>
        </section>
    );
}

export default Sign;