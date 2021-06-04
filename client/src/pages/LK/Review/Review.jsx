import React from 'react';
import { Form, Field } from 'react-final-form';
import { isLength } from '../../../dev/validate';
import Input from '../../../components/Input/Input';
import TextArea from '../../../components/TextArea/TextArea';
import LoadButton from '../../../components/LoadButton/LoadButton';

const Review = (props) => {
    return (
        <section className="lk-review-container average-padding">
            <div className="lk-review sign-border ">
            <Form
                onSubmit={props.onSubmit}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="lk-review__inside">
                            <div className="lk-review__col1">
                                <h2 className="small-title lk-review__title mb-small">Оставьте отзыв о работе нашей компании</h2>
                                <p className="main-text text-grey lk-review__subtitle">Диалог с компанией будет отображаться в разделе «Обращения»</p>
                            </div>
                            
                            <div className="lk-review__col2">
                                <Field name="theme" validate={isLength(10,50)}>
                                    {props => (<Input name="theme" input={props.input} meta={props.meta} type={1} addClass="lk-review__input mb-small" text="Тема" req={true} placeHolder="Тема" />)}
                                </Field>
                                <Field name="text" validate={isLength(10,3000)}>
                                    {props => (<TextArea name="text" input={props.input} meta={props.meta} type={1} addClass="lk-review__textarea mb-small" text="Текст сообщения" req={true} placeHolder="Сообщение" />)}
                                </Field>
                                <LoadButton addClass="lk-review__btn" loading={props.formLoading} />
                            </div>
                            <p className="small-text text-grey lk-review__privacy">Диалог с компанией будет отображаться в разделе «Обращения»</p>
                        </form>
                    )}
                </Form>
            </div>
        </section>
    );
}

export default Review;