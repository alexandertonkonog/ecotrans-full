import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input/Input';
import InputList from '../components/Input/InputList';
import InputRange from '../components/Input/InputRange';
import TextArea from '../components/TextArea/TextArea';
import Radio from '../components/Radio/Radio';
import Select from '../components/Select/FormSelect';
import File from '../components/File/File';
import { setEntity, getIBlocks } from '../redux/iblockReducer';
import LoadButton from '../components/LoadButton/LoadButton';
import Loader from '../components/Loader/Loader';
import '../css/admin.css';

const Create = () => {
    const dispatch = useDispatch();
    const iblocks = useSelector(state => state.iblock.iblocks)
    const mapValuesHandle = (values) => {
        let body = {...values};
        let iblock = iblocks.find(item => item.id === body.iblockId);
        let resultArray = [];
        for (let key in body) {
            let field = iblock.userFields.find(item => item.serviceName === key);
            if (field) {
                let obj = {userFieldId: field.id, value: body[key]}
                resultArray.push(obj);
                delete body[key];
            }
        }
        body.properties = JSON.stringify(resultArray);
        return body;
    }
    const onSubmit = async (values, form) => {
        let body = mapValuesHandle(values);
        let result = await dispatch(setEntity(body));
        if (result.success) {
            form.restart();
        }
    }
    const radioData =  [
        {id: 1, name: 'Виден'},
        {id: 0, name: 'Скрыт'},
    ];
    
    useEffect(() => {
        dispatch(getIBlocks());
    }, []);

    return (
        <Form
            onSubmit={onSubmit}
        >
            {(formProps) => {
                const field = formProps.form.getFieldState('iblockId');
                const iblockId = field && field.value;
                const activeIBlock = iblocks && iblocks.find(item => item.id === iblockId);
                return (
                    <form className="block average-padding" onSubmit={formProps.handleSubmit}>
                        <h1 className="main-title mb-middle">Создать элемент инфоблока</h1>
                        {iblocks 
                            ? <Field name="iblockId">
                                {fieldProps => (<Select 
                                    req={true} 
                                    type={1} 
                                    addClass="mb-middle" 
                                    text="Выбор информационного блока" 
                                    input={fieldProps.input} 
                                    meta={fieldProps.meta} 
                                    data={iblocks} />)}
                            </Field>
                            : <Loader />}
                        <Field name="count">
                            {(props) => (
                                <Input req={true} input={props.input} meta={props.meta} addClass="mb-middle" text="Количество повторений" type={1} />
                            )}
                        </Field>
                        <Field name="name">
                            {(props) => (
                                <Input req={true} input={props.input} meta={props.meta} addClass="mb-middle" text="Имя" type={1} />
                            )}
                        </Field>
                        <Field name="linkName">
                            {(props) => (
                                <Input req={true} input={props.input} meta={props.meta} addClass="mb-middle" text="Ссылка" type={1} />
                            )}
                        </Field>
                        <Field name="text">
                            {(props) => (
                                <TextArea input={props.input} meta={props.meta} addClass="mb-middle" text="Текст" type={1} />
                            )}
                        </Field>
                        <Field name="smallText">
                            {(props) => (
                                <Input input={props.input} meta={props.meta} addClass="mb-middle" text="Краткий текст (превью)" type={1} />
                            )}
                        </Field>
                        <Field name='visible' defaultValue={1}>
                            {fieldProps => (<Radio
                                addClass="mb-middle"
                                type={1}
                                text="Видимость"
                                data={radioData}
                                input={fieldProps.input} 
                                meta={fieldProps.meta}  />)}
                        </Field>
                        <Field name="seoTitle">
                            {(props) => (
                                <Input input={props.input} meta={props.meta} addClass="mb-middle" text="Заголовок для поисковых роботов" type={1} />
                            )}
                        </Field>
                        <Field name="seoDescription">
                            {(props) => (
                                <Input input={props.input} meta={props.meta} addClass="mb-middle" text="Описание для поисковых роботов" type={1} />
                            )}
                        </Field>
                        <Field name="seoKeywords">
                            {(props) => (
                                <Input input={props.input} meta={props.meta} addClass="mb-middle" text="Ключевые слова для поисковых роботов" type={1} />
                            )}
                        </Field>
                        <Field name="img">
                            {fieldProps => (<File type={1} inputId="img" addClass="mb-middle" text="Основная картинка" input={fieldProps.input} meta={fieldProps.meta} />)}
                        </Field>
                        <Field name="smallImg">
                            {fieldProps => (<File type={1} inputId="smallImg" addClass="mb-middle" text="Маленькая картинка" input={fieldProps.input} meta={fieldProps.meta} />)}
                        </Field>
                        <Field name="files">
                            {fieldProps => (<File type={1} inputId="files" addClass="mb-middle" multiple={true} text="Дополнительные файлы" input={fieldProps.input} meta={fieldProps.meta} />)}
                        </Field>
                        {activeIBlock && <section className="short-padding">
                                <h2 className="macro-title mb-middle">Дополнительные поля</h2>
                                { activeIBlock.userFields.map(item => {
                                    if (item.type === "RADIO") {
                                        return (
                                            <Field name={item.serviceName}>
                                                {fieldProps => (<Radio
                                                    addClass="mb-middle"
                                                    data={item.props}
                                                    input={fieldProps.input} 
                                                    meta={fieldProps.meta}  />)}
                                            </Field>
                                        )
                                    }
                                    else if (item.type === "STRING") {
                                        return (
                                            <Field name={item.serviceName}>
                                                {fieldProps => (<Input
                                                    addClass="mb-middle"
                                                    type={1}
                                                    text={item.name}
                                                    input={fieldProps.input} 
                                                    meta={fieldProps.meta}  />)}
                                            </Field>
                                        )
                                    } else if (item.type === "LIST") {
                                        return (
                                            <Field name={item.serviceName}>
                                                {fieldProps => (<InputList
                                                    addClass="mb-middle"
                                                    type={1}
                                                    text={item.name}
                                                    input={fieldProps.input} 
                                                    meta={fieldProps.meta}  />)}
                                            </Field>
                                        )
                                    } else if (item.type === "RANGE" || item.type === "GEO") {
                                        return (
                                            <Field name={item.serviceName}>
                                                {fieldProps => (<InputRange
                                                    addClass="mb-middle"
                                                    type={1}
                                                    contentType={item.type}
                                                    text={item.name}
                                                    input={fieldProps.input} 
                                                    meta={fieldProps.meta}  />)}
                                            </Field>
                                        )
                                    } 
                                })}
                        </section>}

                        <LoadButton text="Создать" />
                    </form>
                )
            }}
        </Form>
    )
}

export default Create;