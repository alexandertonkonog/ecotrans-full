import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import Aside from './Aside/Aside';
import Title from './Title/Title';
import Messages from './Messages/Messages';
import Modal from './Modal/Modal';
import Form from './Form/Form';
import { wrapModal } from '../../components/Modal/Modal';
import { getDialogs } from '../../redux/messageReducer';
import'../../css/lk/lk.css';
import'../../css/lk/aside.css';
import'../../css/lk/message.css';

const Message = (props) => {
    let screenWidth = useSelector(state => state.main.screenWidth);
    let dialogs = useSelector(state => state.message.dialogs);
    let dialogLoading = useSelector(state => state.message.dialogLoading);
    let user = useSelector(state => state.auth.user);
    let [modalVisible, setModalVisible] = useState({visible: false, result: 0, error: null});
    let ModalBlock = wrapModal(Modal, {
        visible: modalVisible.visible,
        callback: () => setModalVisible({visible: false, result: 0, error: null}),
        result: modalVisible.result,
        addClass: 'lk-messages__modal',
        successTitle: 'Ваше обращение успешно отправлено',
        successText: 'Ответ администратора, а так же историю сообщений вы можете просматривать в разделе личного кабинета «История обращений»',
        errorTitle: 'Ваше обращение не отправлено',
        errorText: 'Произошла ошибка по причине: ' + modalVisible.error,
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDialogs());
    }, [])
    return (
        <div className="lk-container lk-messages-container container_grey lk-breads__margin">
            <div className="block lk grid">
                {screenWidth >= 1280 && <Aside data={dialogs} openModal={setModalVisible} screenWidth={screenWidth} />}
                <main className="main">
                    <Route path="/personal/messages/menu">
                        <Helmet>
                            <title>Личный кабинет - меню</title>
                            <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                            <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
                        </Helmet>
                        {screenWidth < 1280 
                            ? <Aside 
                                data={dialogs} 
                                openModal={setModalVisible} 
                                screenWidth={screenWidth} 
                                dialogLoading={dialogLoading} /> 
                            : <Redirect to="/personal/messages" />}
                    </Route>
                    <Route exact path="/personal/messages">
                        {screenWidth < 1280 
                            ?   <Redirect to="/personal/messages/menu" />
                            :   <>
                                    <Title openModal={setModalVisible} />
                                    <div className="lk-messages-messages">
                                        <p className="main-text text-center middle-padding low-height__stop">Для отображения сообщений выберите обращение</p>
                                    </div>
                                </>
                        }
                    </Route>
                    {/* новый компонент для сообщений */}
                    <Route path="/personal/messages/id:id">
                        <Title openModal={setModalVisible} />
                        <div className="lk-messages-messages">
                            <Messages user={user} dialogs={dialogs} />
                            <Form userProfile={user} />
                        </div>
                    </Route>
                </main>
                <ModalBlock getDialogs={getDialogs} dispatch={dispatch} openModal={setModalVisible} />
            </div>
        </div>
    );
}

export default Message;