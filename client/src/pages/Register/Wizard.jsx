import React, { useState } from 'react';
import { Form } from 'react-final-form';
import LoadButton from '../../components/LoadButton/LoadButton';

const Wizard = (props) => {

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

    const prev = (values) => {
        setState({
            page: Math.max(state.page - 1, 0),
            values
        })
    }

    const handleSubmit = (values) => {
        const { children, onSubmit } = props
        const { page } = state
        const isLastPage = page === React.Children.count(children) - 1
        if (isLastPage) {
            return onSubmit(values)
        } else {
            next(values)
        }
    }

    const { children } = props
    const { page, values } = state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
        <Form
            initialValues={values}
            onSubmit={handleSubmit}
        >   
            {({ handleSubmit, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="main-title mb-small">Регистрация</h2>
                    {activePage}
                    {props.regError && <p className="error mb-middle">{props.regError}</p>}
                    {page > 0 && (
                        <button onClick={() => prev(values)} className="btn btn_white mb-middle btn_border">
                            Предыдущий шаг
                        </button>
                    )}
                    {!isLastPage && <button className="btn btn_green mb-middle" type="submit">Следующий шаг</button>}
                    {isLastPage && <LoadButton addClass="mb-middle" text="Зарегистрироваться" loading={props.isLoading} />}
                    <p className="main-text enter-text mb-middle" onClick={props.changeToEnter}>Уже есть аккаунт? Войдите</p>
                </form>
            )}
        </Form>
    )
}

Wizard.Page = ({ children }) => children

export default Wizard;