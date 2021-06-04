import React from 'react';
import tko from '../../../../images/service/tko.jpg';
import '../../../../css/service/tko.css';

const Info = (props) => {
    return (
        <section className="tko-info">
            <h1 className="main-title all__title title-padding">{props.title}</h1>
            <div className="tko-info__img-container average-padding">
                <img src={props.img} alt="ТКО" title="ТКО" className="tko-info__img"/>
            </div>
            <div className="tko-info__des">
                <div className="tko-info__des-left">
                    <p className="tko__text text-grey">{props.firstText}</p>
                    <p className="tko__text text-grey">{props.secondText}</p>
                </div>
                <div className="tko-info__des-right">
                    <p className="tko-info__des-title">КОД ФККО: {props.code}</p>
                    <p className="tko__text text-grey">{props.codeName}</p>
                </div>
            </div>
           {props.addInfo && <div className="tko-info__kgo">
                <h2 className="dec-title">{props.addInfo.title}</h2>
                <div className="tko-info__des">
                    <div className="tko-info__des-left">
                        <p className="tko__text text-grey">{props.addInfo.firstText}</p>
                    </div>
                    <div className="tko-info__des-right">
                        <p className="tko-info__des-title">КОД ФККО: {props.addInfo.code}</p>
                        <p className="tko__text text-grey">{props.addInfo.codeName}</p>
                    </div>
                </div>
            </div>}
        </section>
    );
}

Info.defaultProps = {
    title: 'Транспортировка ТКО',
    img: tko,
    firstText: 'Твердые коммунальные отходы - отходы, образующиеся в жилых помещениях в процессе потребления физическими лицами, а также товары, утратившие свои потребительские свойства в процессе их использования физическими лицами в жилых помещениях в целях удовлетворения личных и бытовых нужд.',
    secondText: 'К твердым коммунальным отходам также относятся отходы, образующиеся в процессе деятельности юридических лиц, индивидуальных предпринимателей и подобные по составу отходам, образующимся в жилых помещениях в процессе потребления физическими лицами.',
    code: '7 31 000 00 00 0',
    codeName: 'Отходы коммунальные твердые',
    addInfo: {
        title: 'Транспортировка КГО',
        code: '7 31 110 02 21 5',
        codeName: 'Отходы из жилищ крупногабаритные',
        firstText: 'Крупногабаритные отходы - твердые коммунальные отходы (мебель, бытовая техника, отходы от текущего ремонта жилых помещений и др.), размер которых не позволяет осуществить их складирование в контейнер.',
    }        
}

export default Info;