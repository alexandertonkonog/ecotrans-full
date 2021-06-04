import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SectionNav from '../../components/SectionNav/SectionNav';
import QueList from './QueList/QueList';
import Modal from './Modal/Modal';
import {wrapModal} from '../../components/Modal/Modal';
import Pay from './Pay/Pay';
import '../../css/que/que.css';

const Que = () => {
    const menu = useSelector(state => state.main.menu);
    const screenWidth = useSelector(state => state.main.screenWidth);
    const isAuth = useSelector(state => state.auth.auth);
    const elem = menu.find(item => item.id === 6); 
    let [modalVisible, setModalVisible] = useState(false);
    let [modalResult, setModalResult] = useState(null);
    let ModalBlock = wrapModal(Modal, {
        visible: modalVisible,
        result: modalResult,
        callback: () => {
            setModalResult(null)
            setModalVisible(false)
        },
        successTitle: 'Ваш вопрос успешно отправлен',
        successText: 'Наш менеджер свяжется с вами в случае необходимости',
        errorTitle: 'Ошибка отправки запроса',
        errorText: 'Попробуйте отправить запрос еще раз или зайдите позднее',
        repeat: () => setModalResult(null)
    })
    return (
        <div className="que">
            <Helmet>
                <title>Ответы на вопросы</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <div className="que-header block">
                <SectionNav {...elem} />
                <button 
                    onClick={() => setModalVisible(true)}
                    className="btn btn_white que-header__btn">{screenWidth > 767 ? 'Задать вопрос' : '?'}</button>
            </div>  
            <Switch>
                <Route exact path="/otveti-na-voprosi">
                    <QueList />
                </Route>
                <Route path="/otveti-na-voprosi/oplata-na-saite">
                    <Pay />
                </Route>
                <Route>
                    <QueList />
                </Route>
            </Switch>
            <ModalBlock isAuth={isAuth} setResult={setModalResult} />
        </div>
    );
}

export default Que;