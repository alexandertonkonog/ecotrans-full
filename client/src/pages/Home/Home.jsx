import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Slider from './Slider/Slider';
import Services from './Services/Services';
import Trash from './Trash/Trash';
import News from './News/News';
import Promo from './Promo/Promo';
import Sign from './Sign/Sign';
import About from './About/About';
import Partners from './Partners/Partners';
import Modal from './Modal/Modal';
import {wrapModal} from '../../components/Modal/Modal';
import '../../css/home/home.css';

const Home = (props) => {
    let [modalVisible, setModalVisible] = useState({visible: false, result: false});
    let ModalBlock = wrapModal(Modal, {
        visible: modalVisible.visible,
        result: modalVisible.result,
        callback: () => setModalVisible({visible: false, result: false}),
        successTitle: 'Ваше обращение отправлено',
        successText: 'Обращаем внимание, что компания не обязана отвечать на данные обращения',
        errorTitle: 'Ваше обращение не отправлено',
        errorText: 'Произошла ошибка, попробуйте отправить обращение еще раз или зайдите позже',
    });
    const resultModalHandle = (result) => {
        setModalVisible({visible: true, result})
    }
    return (
        <>
            <Helmet>
                <title>Экотранс - лицензированный региональный оператор</title>
                <meta name="description" content="Оформление обязательных договоров по обращению с ТКО для организаций и ИП" />
                <meta name="keywords" content="Экотранс, лицензированный региональный оператор, обращение с ТКО, заключение договора" />
            </Helmet>
            <Slider />
            <Services />
            <Trash openModal={() => setModalVisible({visible: true, result: false})} />
            <News />
            <Promo />
            <div className="block">
                <Sign />
            </div>
            <About />
            <Partners />
            <ModalBlock resultModalHandle={resultModalHandle} />
        </>
    );
}

export default Home;