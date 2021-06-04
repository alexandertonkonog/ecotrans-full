import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import Aside from './Aside/Aside';
import Title from './Title/Title';
import Messages from './Messages/Messages';
import Form from './Form/Form';

const MessageRouter = ({setModalVisible, dialogs}) => {
    const dialogLoading = useSelector(state => state.message.dialogLoading);
    const user = useSelector(state => state.auth.user);
    const screenWidth = useSelector(state => state.main.screenWidth);
    return (
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
            <Route path="/personal/messages/id:id">
                <Title openModal={setModalVisible} />
                <div className="lk-messages-messages">
                    <Messages user={user} dialogs={dialogs} />
                    <Form userProfile={user} />
                </div>
            </Route>
        </main>
    )
}

export default MessageRouter;