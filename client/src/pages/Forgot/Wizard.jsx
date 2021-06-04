import React, { useState, useEffect } from 'react';
import { Form } from 'react-final-form';
import LoadButton from '../../components/LoadButton/LoadButton';

const Wizard = (props) => {
    let [timer, setTimer] = useState(60);
    let [state, setState] = useState({
        page: 0,
        values: props.initialValues || {}
    })

    const next = (values) => {
        setState({
            page: Math.min(state.page + 1, props.children.length - 1),
            values
        })
    }

    const changePage = async (values) => {
        let result = await props.stageHandlers[page](values);
        if (result) {
            next(values);
        }
    }

    const handleSubmit = async (values) => {
        const { children, onSubmit } = props;
        const { page } = state
        if (page === 2) {
            let result = await onSubmit(values);
            if (result) {
                next(values);
            } 
        } else {
            changePage(values)
        }
    }

    const { children } = props;
    const { page, values } = state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    useEffect(() => {
        if (page === 1) {
            const timeout = setTimeout(() => {
                if(timer > 0) {
                    setTimer(timer - 1);
                }
            }, 1000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [timer, page])
    return (
        <Form
            initialValues={values}
            onSubmit={handleSubmit}
        >   
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className="block forgot average-padding">
                    <h1 className="main-title mb-large">Восстановление пароля</h1>
                    {activePage}
                    {page === 1 && (
                        <div className="mb-middle">
                            {timer > 0 
                                ? <p className="main-text text-grey">Повторно отправить код через {timer} секунд</p>
                                : <p className="main-text text-grey mb-small">Повторно отправить код</p>}
                            {timer <= 0 && <LoadButton addClass="forgot__more-btn" onClick={() => {
                                    props.stageHandlers[0](values);
                                    setTimer(60);
                                }} text="Отправить код еще раз" loading={props.formLoading} type="button" />}
                        </div>
                    )}
                    {props.regError && <p className="error main-text mb-middle">{props.regError}</p>}
                    {page < 2 && <LoadButton addClass="mb-middle" text="Следующий шаг" loading={props.formLoading} />}
                    {page === 2 && <LoadButton addClass="mb-middle" text="Обновить пароль" loading={props.formLoading} />}
                </form>
            )}
        </Form>
    )
}

Wizard.Page = ({ children }) => children;

export default Wizard;