import React from 'react';

const Title = (props) => {
    return (
        <div className="lk-messages-title">
            <h1 className="small-title lk-messages-title__title">Обращения</h1>
            <button 
                onClick={() => props.openModal({visible: true, result: 0})}
                className="btn btn_white lk-messages-title__btn">+  Создать обращение</button>
        </div>
    );
}

export default Title;