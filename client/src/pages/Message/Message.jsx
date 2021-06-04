import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Aside from './Aside/Aside';
import Modal from './Modal/Modal';
import MessageRouter from './MessageRouter';
import { wrapModal } from '../../components/Modal/Modal';
import { getDialogs } from '../../redux/messageReducer';
import'../../css/lk/lk.css';
import'../../css/lk/aside.css';
import'../../css/lk/message.css';

const Message = (props) => {
    let [modalVisible, setModalVisible] = useState({visible: false, result: 0, error: null});
    const screenWidth = useSelector(state => state.main.screenWidth);
    const dialogs = useSelector(state => state.message.dialogs);
    
    const ModalBlock = wrapModal(Modal, {
        visible: modalVisible.visible,
        callback: () => setModalVisible({visible: false, result: 0, error: null}),
        result: modalVisible.result,
        addClass: 'lk-messages__modal',
        successTitle: 'Ваше обращение успешно отправлено',
        successText: 'Ответ администратора, а так же историю сообщений вы можете просматривать в разделе личного кабинета «История обращений»',
        errorTitle: 'Ваше обращение не отправлено',
        errorText: 'Произошла ошибка по причине: ' + modalVisible.error,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDialogs());
    }, [])
    return (
        <div className="lk-container lk-messages-container container_grey lk-breads__margin">
            <div className="block lk grid">
                {screenWidth >= 1280 && <Aside data={dialogs} openModal={setModalVisible} screenWidth={screenWidth} />}
                <MessageRouter setModalVisible={setModalVisible} dialogs={dialogs} />
                <ModalBlock getDialogs={getDialogs} openModal={setModalVisible} />
            </div>
        </div>
    );
}

export default Message;