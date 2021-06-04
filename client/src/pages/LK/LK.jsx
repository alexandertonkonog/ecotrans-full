import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import Aside from '../../components/Aside/Aside';
import { useSelector, useDispatch } from 'react-redux';
import Personal from './Personal/Personal';
import Review from './Review/Review';
import Agreement from './Agreement/Agreement';
import Operation from './Operation/Operation';
import Document from './Document/Document';
import Main from './Main/Main';
import { wrapModal } from '../../components/Modal/Modal';
import { makeNewMessageTheme } from '../../redux/formReducer';
import { getUserData } from '../../redux/authReducer';
import PersonalModal from './Modal/Personal';
import '../../css/lk/lk.css';

const LK = () => {
    let screenWidth = useSelector(state => state.main.screenWidth);
    let user = useSelector(state => state.auth.user);
    let payments = useSelector(state => state.auth.payments);
    let accounts = useSelector(state => state.auth.accounts);
    let [personalDataModal, setPersonalDataModal] = useState({visible: false, link: null});
    let [successAgreeModal, setSuccessAgreeModal] = useState({visible: false, result: null, error: null});
    let [successReviewModal, setSuccessReviewModal] = useState({visible: false, result: null, error: null});
    let [successDataModal, setSuccessDataModal] = useState({visible: false, result: null, error: null});
    let [getOriginalModal, setGetOriginalModal] = useState({visible: false, result: null, error: null});
    let [formLoading, setFormLoading] = useState(false);
    let [agree, setAgree] = useState(null);
    let PersonalModalBlock = wrapModal(PersonalModal, {
        visible: personalDataModal.visible,
        callback: () => setPersonalDataModal({visible: false, link: null}),
        addClass: 'personal-data__modal',
    });
    let SuccessAgreeBlock = wrapModal(PersonalModal, {
        visible: successAgreeModal.visible,
        callback: () => setSuccessAgreeModal({visible: false, result: null, error: null}),
        result: successAgreeModal.result,
        addClass: 'agreement__modal',
        successTitle: 'Данные успешно отправлены',
		successText: 'В ближайшее время с вами свяжется менеджер, для уточнения деталей',
        addSuccessText: 'После подписания договора информация отобразится на главной странице личного кабинета',
        addButton: 'Понятно',
        errorText: 'Произошла ошибка по причине ' + successAgreeModal.error,
        errorTitle: 'Данные не отправлены'
    });
    let SuccessDataBlock = wrapModal(PersonalModal, {
        visible: successDataModal.visible,
        callback: () => setSuccessDataModal({visible: false, result: null, error: null}),
        result: successDataModal.result,
        addClass: 'agreement__modal',
        successTitle: 'Данные успешно сохранены',
		successText: 'Данные могут быть использованы Вами для заключения договора',
        addButton: 'Понятно',
        errorText: 'Произошла ошибка по причине: ' + successDataModal.error,
        errorTitle: 'Данные не сохранены',
    });
    let SuccessReviewBlock = wrapModal(PersonalModal, {
        visible: successReviewModal.visible,
        callback: () => setSuccessReviewModal({visible: false, result: null, error: null}),
        result: successReviewModal.result,
        addLinkButton: '/personal/messages',
        addLinkButtonText: 'Перейти в раздел «История обращений»',
        addClass: 'review__modal',
        successTitle: 'Ваше обращение успешно отправлено',
		successText: 'Ответ администратора, а так же историю сообщений, вы можете просматривать в разделе личного кабинета «История обращений»',
        errorTitle: 'Ваше обращение не отправлено',
        errorText: 'Причина ошибки: ' + successReviewModal.error
    });
    let GetOriginalModalBlock = wrapModal(PersonalModal, {
        visible: getOriginalModal.visible,
        callback: () => setGetOriginalModal({visible: false, result: null, error: null}),
        result: getOriginalModal.result,
        addClass: 'review__modal',
        successTitle: 'Ваш запрос успешно отправлен',
		successText: 'Результат запроса будет отправлен на почту, или с Вами свяжутся',
        errorTitle: 'Ваше обращение не отправлено',
        errorText: 'Причина ошибки: ' + getOriginalModal.error
    });
    let selectedAgree; 
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        setFormLoading(true);
        let res = await dispatch(makeNewMessageTheme(values));
        if (res.success) {
            setSuccessReviewModal({visible: true, result: 1, error: null});
        } else {
            setSuccessReviewModal({visible: true, result: 2, error: res.message});
        }
        setFormLoading(false);
    }
    useEffect(() => {
        dispatch(getUserData());
    }, [])
    if (user.agreements && user.agreements.length) {
        selectedAgree = agree ? user.agreements.find(item => item.id === agree) : user.agreements[0];
    }
    return (
        <div className="lk-container lk-breads__margin container_grey">
           <Helmet>
                <title>Личный кабинет</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <div className="block lk grid">
                {screenWidth >= 1280 && <Aside screenWidth={screenWidth} openModal={setPersonalDataModal} />}
                <main className="main">
                    <Switch>
                        <Route path="/personal/menu">
                            {screenWidth < 1280 
                                ? <Aside screenWidth={screenWidth} openModal={setPersonalDataModal} /> 
                                : <Redirect to="/personal" />}
                        </Route>
                        <Route path="/personal/personal-data">
                            <Personal user={user} openModal={setSuccessDataModal} selectedAgree={selectedAgree} />
                        </Route>
                        <Route path="/personal/agreement">
                            <Agreement user={user} openModal={setSuccessAgreeModal} selectedAgree={selectedAgree} />
                        </Route>
                        <Route path="/personal/operations">
                            <Operation 
                                openModal={setGetOriginalModal}       
                                selectedAgree={selectedAgree} 
                                accounts={accounts} 
                                setAgree={setAgree}
                                agreements={user.agreements} />
                        </Route>
                        <Route path="/personal/documents">
                            <Document 
                                selectedAgree={selectedAgree} 
                                payments={payments} 
                                setAgree={setAgree}
                                agreements={user.agreements} />
                        </Route>
                        <Route path="/personal">
                            <Main user={user} selectedAgree={selectedAgree} setAgree={setAgree} />
                        </Route>
                    </Switch>
                </main>
                <Review formLoading={formLoading} onSubmit={onSubmit} />
                <SuccessAgreeBlock />
                <SuccessReviewBlock />
                <SuccessDataBlock />
                <GetOriginalModalBlock />
                <PersonalModalBlock 
                    link={personalDataModal.link} 
                    callback={() => setPersonalDataModal({visible: false, link: null})} />
            </div>
        </div>
    );
}

export default LK;