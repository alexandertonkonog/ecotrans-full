import React from 'react';
import '../../../css/form/personalForm.css';
import { useHistory } from 'react-router';

const Modal = (props) => {
    let history = useHistory();
    const exit = () => {
        props.callback();
        history.push(props.link);
    }
    return (
        <>
            <h2 className="main-title mb-small">Вы точно хотите покинуть страницу?</h2>
            <p className="text-grey main-text mb-large">Эти данные  будут использоваться при заключении договора</p>
            <div className="personal-data__modal-body">
                <button className="btn btn_white personal-data__modal-btn" onClick={exit}>Заполнить позже</button>
                <button className="btn btn_green" onClick={props.callback}>Вернуться</button>
            </div>
        </>
    );
}

export default Modal;