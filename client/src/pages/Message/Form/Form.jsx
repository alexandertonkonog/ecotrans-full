import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { isLength } from '../../../dev/validate';
import { newMessage } from '../../../redux/messageReducer';
import TextArea from '../../../components/TextArea/TextArea';
import File from '../../../components/File/File';
import LoadButton from '../../../components/LoadButton/LoadButton';
import userImg from '../../../images/message/user.png';
import { useDispatch } from 'react-redux';

const FormBlock = ({themeId, userProfile}) => {
    let [messageLoading, setMessageLoading] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const onSubmit = async (values, form) => {
        setMessageLoading(true);
        let body = {...values, id: +params.id}
        await dispatch(newMessage(body));
        form.restart();
        setMessageLoading(false);
    }
    const ref = React.createRef();
    return (
        <Form
            onSubmit={onSubmit}>
                {({handleSubmit, form}) => {
                    useEffect(() => {
                        form.restart();
                        let coor = ref.current.getBoundingClientRect();
                        let y = coor.top + coor.height - document.documentElement.clientHeight
                        window.scrollTo(0, y);
                    }, [themeId])
                    return (
                        <form ref={ref} onSubmit={handleSubmit} className="sign-border mt-middle">
                            <div className="lk-messages-sign short-padding">
                                <p className="small-text lk-messages-sign-des">Текст сообщения*</p>
                                <img src={userProfile.img || userImg} alt="" className="lk-messages-sign-img"/>
                                <Field name="message" validate={isLength(5,250)}>
                                    {props => (<TextArea name="message" input={props.input} meta={props.meta} type={0} addClass="lk-messages-sign-text" placeHolder="Сообщение" />)}
                                </Field>
                                <Field name="file">
                                    {props => (<File accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .rtf, .txt" input={props.input} meta={props.meta} addClass="lk-messages-sign-file" />)}
                                </Field>
                                <LoadButton loading={messageLoading} />
                            </div>
                        </form>
                    )
                }}
        </Form>
    )
}

export default FormBlock;