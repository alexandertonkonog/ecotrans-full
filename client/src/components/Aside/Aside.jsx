import React, {useEffect} from 'react';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import arrow from '../../images/lk/arrowRight.svg';
import { exitFromLK } from '../../redux/authReducer';
import '../../css/lk/aside.css';

const Aside = (props) => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    const exitHandle = () => {
        history.push('/');
        dispatch(exitFromLK());
    }
    useEffect(() => {
        let header = document.querySelector('.header-container');
        if (location.pathname === '/personal/personal-data' || location.pathname === '/personal/agreement') {
            header.addEventListener('click', () => {
                props.openModal();
            }, {capture: true})
        } else {

        }
        return () => {
            header.removeEventListener('click', () => {
                props.openModal();
            }, {capture: true})
        }
    }, [])
    return (
        <aside className="aside">
            <NavLink className="aside__link" exact='true' to="/personal" activeClassName="aside__link_active" >
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3239 2.93018C9.13105 2.93018 7.3534 4.73518 7.3534 6.96177C7.3534 9.18836 9.13105 10.9934 11.3239 10.9934C13.5168 10.9934 15.2944 9.18836 15.2944 6.96177C15.2944 4.73518 13.5168 2.93018 11.3239 2.93018ZM8.9416 6.96177C8.9416 5.62582 10.0082 4.54281 11.3239 4.54281C12.6396 4.54281 13.7062 5.62582 13.7062 6.96177C13.7062 8.29773 12.6396 9.38073 11.3239 9.38073C10.0082 9.38073 8.9416 8.29773 8.9416 6.96177Z" fill="#98A782"/>
                    <path d="M8.67669 12.3371C6.48384 12.3371 4.70618 14.1421 4.70618 16.3686V17.9813C4.70618 18.4266 5.06171 18.7876 5.50028 18.7876C5.93885 18.7876 6.29438 18.4266 6.29438 17.9813V16.3686C6.29438 15.0327 7.36098 13.9497 8.67669 13.9497H15.0295C16.3452 13.9497 17.4118 15.0327 17.4118 16.3686V17.9813C17.4118 18.4266 17.7673 18.7876 18.2059 18.7876C18.6445 18.7876 19 18.4266 19 17.9813V16.3686C19 14.1421 17.2224 12.3371 15.0295 12.3371H8.67669Z" fill="#98A782"/>
                </svg>
                <p className="aside__link-title">Главная</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
                </NavLink>
            <NavLink className="aside__link" to="/personal/agreement" activeClassName="aside__link_active" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3.5V7.5C14 7.76522 14.1054 8.01957 14.2929 8.20711C14.4804 8.39464 14.7348 8.5 15 8.5H19M14 3.5H7C6.46957 3.5 5.96086 3.71071 5.58579 4.08579C5.21071 4.46086 5 4.96957 5 5.5V19.5C5 20.0304 5.21071 20.5391 5.58579 20.9142C5.96086 21.2893 6.46957 21.5 7 21.5H17C17.5304 21.5 18.0391 21.2893 18.4142 20.9142C18.7893 20.5391 19 20.0304 19 19.5V8.5M14 3.5L19 8.5M12 11.5V17.5M9 14.5H15" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Заключить договор</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
            </NavLink>
            <NavLink className="aside__link" to="/personal/operations" activeClassName="aside__link_active" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3.5V7.5C14 7.76522 14.1054 8.01957 14.2929 8.20711C14.4804 8.39464 14.7348 8.5 15 8.5H19" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21.5H7C6.46957 21.5 5.96086 21.2893 5.58579 20.9142C5.21071 20.5391 5 20.0304 5 19.5V5.5C5 4.96957 5.21071 4.46086 5.58579 4.08579C5.96086 3.71071 6.46957 3.5 7 3.5H14L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5Z" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15.5L11 17.5L15 13.5" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Сверка взаиморасчетов</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
            </NavLink>
            <NavLink className="aside__link" to="/personal/documents" activeClassName="aside__link_active" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 15.5H15M5 21.5V5.5C5 4.96957 5.21071 4.46086 5.58579 4.08579C5.96086 3.71071 6.46957 3.5 7 3.5H17C17.5304 3.5 18.0391 3.71071 18.4142 4.08579C18.7893 4.46086 19 4.96957 19 5.5V21.5L16 19.5L14 21.5L12 19.5L10 21.5L8 19.5L5 21.5ZM9 7.5H15H9ZM9 11.5H15H9Z" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Платежные документы</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
            </NavLink>
            <NavLink className="aside__link" to="/personal/personal-data" activeClassName="aside__link_active" >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.325 4.817C10.751 3.061 13.249 3.061 13.675 4.817C13.7389 5.0808 13.8642 5.32578 14.0407 5.532C14.2172 5.73822 14.4399 5.89985 14.6907 6.00375C14.9414 6.10764 15.2132 6.15085 15.4838 6.12987C15.7544 6.10889 16.0162 6.0243 16.248 5.883C17.791 4.943 19.558 6.709 18.618 8.253C18.4769 8.48466 18.3924 8.74634 18.3715 9.01677C18.3506 9.28721 18.3938 9.55877 18.4975 9.80938C18.6013 10.06 18.7627 10.2826 18.9687 10.4591C19.1747 10.6355 19.4194 10.7609 19.683 10.825C21.439 11.251 21.439 13.749 19.683 14.175C19.4192 14.2389 19.1742 14.3642 18.968 14.5407C18.7618 14.7172 18.6001 14.9399 18.4963 15.1907C18.3924 15.4414 18.3491 15.7132 18.3701 15.9838C18.3911 16.2544 18.4757 16.5162 18.617 16.748C19.557 18.291 17.791 20.058 16.247 19.118C16.0153 18.9769 15.7537 18.8924 15.4832 18.8715C15.2128 18.8506 14.9412 18.8938 14.6906 18.9975C14.44 19.1013 14.2174 19.2627 14.0409 19.4687C13.8645 19.6747 13.7391 19.9194 13.675 20.183C13.249 21.939 10.751 21.939 10.325 20.183C10.2611 19.9192 10.1358 19.6742 9.95929 19.468C9.7828 19.2618 9.56011 19.1001 9.30935 18.9963C9.05859 18.8924 8.78683 18.8491 8.51621 18.8701C8.24559 18.8911 7.98375 18.9757 7.752 19.117C6.209 20.057 4.442 18.291 5.382 16.747C5.5231 16.5153 5.60755 16.2537 5.62848 15.9832C5.64942 15.7128 5.60624 15.4412 5.50247 15.1906C5.3987 14.94 5.23726 14.7174 5.03127 14.5409C4.82529 14.3645 4.58056 14.2391 4.317 14.175C2.561 13.749 2.561 11.251 4.317 10.825C4.5808 10.7611 4.82578 10.6358 5.032 10.4593C5.23822 10.2828 5.39985 10.0601 5.50375 9.80935C5.60764 9.55859 5.65085 9.28683 5.62987 9.01621C5.60889 8.74559 5.5243 8.48375 5.383 8.252C4.443 6.709 6.209 4.942 7.753 5.882C8.753 6.49 10.049 5.952 10.325 4.817Z" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5Z" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Личные данные</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
            </NavLink>
            <NavLink className="aside__link" to={props.screenWidth >= 1280 ? "/personal/messages" : "/personal/messages/menu"} activeClassName="aside__link_active" >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 21V8C4 7.20435 4.31607 6.44129 4.87868 5.87868C5.44129 5.31607 6.20435 5 7 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V14C20 14.7956 19.6839 15.5587 19.1213 16.1213C18.5587 16.6839 17.7956 17 17 17H8L4 21Z" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11V11.01" stroke="#98A782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11V11.01" stroke="#98A782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11V11.01" stroke="#98A782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Обращения</p>
                <img src={arrow} className="aside__link-arrow" alt=""/>
            </NavLink>
            <div className="aside__link" onClick={exitHandle} >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.5V6.5C10 5.96957 10.2107 5.46086 10.5858 5.08579C10.9609 4.71071 11.4696 4.5 12 4.5H19C19.5304 4.5 20.0391 4.71071 20.4142 5.08579C20.7893 5.46086 21 5.96957 21 6.5V18.5C21 19.0304 20.7893 19.5391 20.4142 19.9142C20.0391 20.2893 19.5304 20.5 19 20.5H12C11.4696 20.5 10.9609 20.2893 10.5858 19.9142C10.2107 19.5391 10 19.0304 10 18.5V16.5" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 12.5H3M3 12.5L6 9.5M3 12.5L6 15.5" stroke="#98A782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="aside__link-title">Выйти</p>
            </div>
        </aside>
    );
}

export default Aside;