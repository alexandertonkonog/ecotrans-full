import React from 'react';
import Input from '../../../../components/Input/Input';
import docs from '../../../../images/service/docs.svg';

const Sign = () => {
    return (
        <section className="pasport-sign-container middle-padding">
            <div className="sign-border">
                <div className="pasport-sign grid">
                    <h2 className="dec-title pasport-sign__title">Профессиональная поддежка в оформлении паспортов отходов по I - IV классу опасности</h2>
                    <div className="pasport-sign__icon" style={{backgroundImage: 'url(' + docs + ')'}}></div>
                    <p className="tko__text text-grey pasport-sign__subtitle">Наши специалисты окажут профессиональную поддержку в оформление паспортов отходов по I - IV классу опасности по новым правилам</p>
                    <Input type={1} text="Телефон" />
                    <button className="btn btn_green">Отправить</button>
                    <p className="pasport-sign__small-text text-grey pasport-sign__privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности</p>
                    <p className="pasport-sign__small-text text-grey pasport-sign__stars">Поля, отмеченные <span className="input_req">*</span> обязательны к заполнению</p>
                </div>
            </div>
        </section>
    );
}

export default Sign;