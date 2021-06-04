import React from 'react';
import {isObjValide} from '../../../../dev/functions';
import LoadButton from '../../../../components/LoadButton/LoadButton';

const ButtonArea = (props) => {
    return (
        <section className="lk-agree-btns middle-padding lk-grid">
            <p className="small-text text-grey lk-agree-btns__text">Поля, отмеченные <span class="input_req">*</span> обязательны к заполнению</p>
            <LoadButton addClass="lk-agree-btns__btn" loading={props.formLoading} />
        </section>
    );
}

export default ButtonArea;