import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {setBreadcrumbs} from '../../../redux/mainReducer';
import {getMessages, readMessage, getMoreMessages} from '../../../redux/messageReducer';
import {DateFormat} from '../../../dev/functions';
import LoadButton from '../../../components/LoadButton/LoadButton'
import user from '../../../images/message/user.png';
import admin from '../../../images/message/admin.png';
import skrepka from '../../../images/message/skrepka.svg';

const Messages = (props) => {
    let dispatch = useDispatch();
    let params = useParams();
    let [moreLoading, setMoreLoading] = useState(false);
    let id = params.id;
    let messages = useSelector(state => state.message.messages[id]);
    let messageLoading = useSelector(state => state.message.messageLoading);
    let dialog = props.dialogs.find(item => item.id === +id);
    const getMoreMessageHandle = async () => {
        setMoreLoading(true);
        let offset = messages?.list?.length || 0;
        await dispatch(getMoreMessages(id, offset));
        setMoreLoading(false);
    }
    useEffect(() => {
        let breads = [
            {id: 1, name: 'Главная', link: '/'},
            {id: 2, name: 'Личный кабинет', link: '/personal'},
            {id: 3, name: 'Обращения', link: '/personal/messages'},
            {id: 4, name: props.name, withoutLink: true},
        ];
        dispatch(setBreadcrumbs(breads));
        return () => {
            dispatch(setBreadcrumbs(null));
        }
    }, []);
    useEffect(() => {
        dispatch(getMessages(id));
    }, [id])
    useEffect(() => {
        if (dialog?.unread !== 0) {
            dispatch(readMessage(+id))
        }
    }, [id, dialog?.unread])
    useEffect(() => {
        let timer = setInterval(() => {
            let messageCount = messages?.list?.length;
            if (messageCount) {
                dispatch(getMessages(id, messageCount));
            }
        }, 20000)
        return () => {
            clearInterval(timer);
        }
    }, [id, messages?.list?.length])
    return (
        <>
            {dialog && <>
                <Helmet>
                    <title>Личный кабинет - {dialog.name}</title>
                    <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                    <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
                </Helmet>
                <section className="lk-messages-messages__title-sec mb-middle">
                    <h2 className="micro-title">{dialog.name}</h2>
                    {dialog.closed 
                        ? <p className="lk-messages-messages__title-text">
                            <span className="aside__dialog-icon"></span>
                            Обращение закрыто
                        </p>
                        : <p className="lk-messages-messages__title-text">
                            <span className="aside__dialog-icon aside__dialog-icon_active"></span>
                            Обращение в работе
                        </p>}
                </section>
            </>}
            <section className="lk-messages-messages__list">
                {messageLoading 
                    ? ( messages?.count 
                        ? <>
                            {messages.count > messages.list.length 
                                && <LoadButton loading={moreLoading} addClass="lk-messages-messages__list-more" onClick={getMoreMessageHandle} text="Показать еще" /> }
                            {messages.list.map(item => {
                                let img, name;
                                if (item.creator.role.id === 1) {
                                    img = item.creator.img || admin;
                                    name = item.creator.name || 'Администратор'
                                } else {
                                    img = item.creator.img || user;
                                    name = item.creator.name || 'Автор сообщения'
                                }
                                const visibleDate = DateFormat.getTodayTimeOrDateTime(item.createdAt);
                                return (
                                    <div key={item.id} className={item.creator.isAdmin ? "lk-messages-messages__item lk-messages-messages__item_admin" : "lk-messages-messages__item"}>
                                        <h3 className="main-text lk-messages-messages__item-title">{name + ' (' + item.creator.contactName})</h3>
                                        <p className="small-text text-grey lk-messages-messages__item-text">{item.text}</p>
                                        <img src={img} alt={name} title={name} className="lk-messages-messages__item-img"/>
                                        {item?.files?.length ? 
                                            <div className="lk-messages-messages__item-files">
                                                <div className="lk-messages-messages__item-file_icon" style={{backgroundImage: 'url(' + skrepka + ')'}}></div>
                                                {item.files.map((file, index) => <a key={index+1} className="lk-messages-messages__item-file small-text text-grey" download={true} href={file.fullLink}>
                                                    <span className="lk-messages-messages__item-file_icon" style={{backgroundImage: 'url(' + skrepka + ')'}}>
                                                    </span>{file.link}
                                                </a>)}
                                            </div>
                                            : <></>
                                        }
                                        <time className={item?.files?.length ? "lk-messages-messages__item-date lk-messages-messages__item-date_three text-grey" : "text-grey lk-messages-messages__item-date"} dateTime={item.createdAt}>{visibleDate}</time>
                                    </div>
                                );
                            })}
                        </>
                        : <p className="text-center main-text">У Вас еще нет сообщений</p>
                    )
                    : [1,2,3].map(item => (
                        <div key={item} className={"lk-messages-messages__item lk-messages-messages__item_empty"}>
                            <div className="sheen-wrapper"><span className="sheen"></span></div>
                        </div>
                    ))
                }
            </section>
        </>
    );
}

export default Messages;