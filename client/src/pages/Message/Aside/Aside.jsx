import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {cutText} from '../../../dev/functions';
import {setBreadcrumbs} from '../../../redux/mainReducer';
import {DateFormat} from '../../../dev/functions';
import Title from '../Title/Title';

const Aside = (props) => {
    let dispatch = useDispatch();
    useEffect(() => {
        let breads = [
            {id: 1, name: 'Главная', link: '/'},
            {id: 2, name: 'Личный кабинет', link: '/personal'},
            {id: 3, name: 'Обращения', link: '/personal/messages'},
        ];
        dispatch(setBreadcrumbs(breads));
        return () => {
            dispatch(setBreadcrumbs(null));
        }
    }, [])
    if (props.dialogLoading) {
        return (
            <div className="aside aside_messages">
                {[1,2,3].map(item => (
                    <div key={item} className="aside__dialog">
                        <div className="sheen-wrapper"><span className="sheen"></span></div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className="aside aside_messages">
            {props.screenWidth < 1280 && <Title openModal={props.openModal} />}
            {props?.data?.length 
                ? props.data.map(item => {
                    return (
                        <NavLink key={item.id} className="aside__dialog" activeClassName="aside__dialog_active" to={"/personal/messages/id" + item.id}>
                            <div className="aside__dialog-top aside__dialog-flex">
                                {item.closed  === 1 
                                    ? <p className="aside__dialog-status text-grey small-text">
                                        <span className="aside__dialog-icon"></span>
                                        Обращение закрыто
                                    </p>
                                    : <p className="aside__dialog-status text-grey small-text">
                                        <span className="aside__dialog-icon aside__dialog-icon_active"></span>
                                        Обращение в работе
                                    </p>}
                                <p className="aside__dialog-date text-grey small-text">{DateFormat.getTodayTimeOrDate(item.lastMessage.createdAt)}</p>
                            </div>
                            <div className="aside__dialog-bottom aside__dialog-flex">
                                <p className={item.unread !== 0
                                    ? "aside__dialog-name aside__dialog-name_active small-text" 
                                    : "aside__dialog-name small-text"}>{cutText(item.name, 26)}</p>
                                {item.unread !== 0 && <p className="aside__dialog-message-count small-text">{item.unread}</p>}
                            </div>
                        </NavLink>
                    );
                })
                : <div className="aside__dialog">
                    <p className="main-text text-center">У Вас нет обращений</p>
                </div>
            }
        </div>
    );
}

Aside.defaultProps = {
    
}

export default Aside;