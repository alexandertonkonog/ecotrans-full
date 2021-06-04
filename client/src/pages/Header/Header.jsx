import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import logo from '../../images/Logo.svg';
import '../../css/header.css';
import Nav from './Nav';
import Shadow from '../../components/Shadow/Shadow';

const Header = (props) => {
    let [menuHover, setMenuHover] = useState(false);
    let [menuType, setMenuType] = useState(null);
    let screenWidth = useSelector(state => state.main.screenWidth);
    let menuData = useSelector(state => state.main.menu);
    let isAuth = useSelector(state => state.auth.auth);
    
    let [menu, setMenu] = useState(menuData);
    const navLinkHover = (hover = true, type) => {
        if (type) {
            setMenuType(type);
        }
        setMenuHover(hover);
    }
    const mobileHover = () => {
        if (!menuHover) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        setMenuHover(!menuHover)
    }
    const clickMenu = () => {
        setMenuHover(false);
        document.body.style.overflow = 'auto';
    }

    return (
        <>
        <header className="header-container" onMouseLeave={() => navLinkHover(false, null)} >
            <div className="header block">
                <Link to="/" className="logo header__logo">
                    <img src={logo} className="logo__logo" alt="Экотранс - Лицензированный региональный оператор" 
                        title="Экотранс - Лицензированный региональный оператор" />
                    
                    {screenWidth > 1279 && <svg className="logo__separator" width="1" height="37" viewBox="0 0 1 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="0.5" x2="0.500002" y2="36.5" stroke="#828282"/>
                    </svg>}
                    {screenWidth > 1279 && <p className="logo__text">Лицензированный региональный оператор</p>}
                </Link>
                {screenWidth <= 1279 && 
                    <div onClick={mobileHover} className={menuHover ? "nav-selector nav-selector_hover" : "nav-selector"}>
                        <div 
                            
                            className="nav-selector__toggle">
                            <div className="nav-selector__item"></div>
                            <div className="nav-selector__item nav-selector__item_center"></div>
                            <div className="nav-selector__item"></div>
                        </div>
                        <p className="nav-selector__text">Меню</p>
                    </div>
                }
                {screenWidth > 1279 && <nav className="nav header__nav">
                    {menu.map((item) => {
                        if (item.showInMenu) {
                            return (
                                <Link
                                    onClick={clickMenu}
                                    key={item.id} 
                                    to={item.link} 
                                    className={menuType === item.code && menuHover ? 'nav__link nav__link_active' : 'nav__link'}
                                    onMouseOver={() => {
                                        if ('code' in item && item.hasChildren) {
                                            navLinkHover(true, item.code)
                                        } else {
                                            navLinkHover(false);
                                        }
                                    }} >
                                    {item.title} 
                                    <br/> 
                                    {menuType === item.code && menuHover && <hr className="nav__link-hr"/>}
                                
                                </Link>
                            );
                        }
                    })}
                </nav>}
                <p className="header__number" onClick={props.openModal}>88005553535</p>
                {isAuth 
                ? <Link className="header__btn btn btn_green" to={screenWidth > 1279 ? "/personal" : "/personal/menu"}>
                    <svg className="header__btn-icon btn__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.3453 3.75C10.118 3.75 8.3125 5.58331 8.3125 7.84482C8.3125 10.1063 10.118 11.9396 12.3453 11.9396C14.5725 11.9396 16.378 10.1063 16.378 7.84482C16.378 5.58331 14.5725 3.75 12.3453 3.75ZM9.92561 7.84482C9.92561 6.48791 11.0089 5.38793 12.3453 5.38793C13.6816 5.38793 14.7649 6.48791 14.7649 7.84482C14.7649 9.20172 13.6816 10.3017 12.3453 10.3017C11.0089 10.3017 9.92561 9.20172 9.92561 7.84482ZM9.65777 13.3048C7.43053 13.3048 5.625 15.1381 5.625 17.3996V19.0375C5.625 19.4898 5.98611 19.8565 6.43155 19.8565C6.877 19.8565 7.23811 19.4898 7.23811 19.0375V17.3996C7.23811 16.0427 8.32143 14.9427 9.65777 14.9427H16.1102C17.4466 14.9427 18.5299 16.0427 18.5299 17.3996V19.0375C18.5299 19.4898 18.891 19.8565 19.3364 19.8565C19.7819 19.8565 20.143 19.4898 20.143 19.0375V17.3996C20.143 15.1381 18.3375 13.3048 16.1102 13.3048H9.65777Z" fill="#556A3B"/>
                    </svg>
                    {screenWidth > 1279 && <p className="header__btn-text btn__text">Личный кабинет</p>}
                </Link>
                : <div className="header__btn btn btn_green" onClick={props.openRegisterModal}>
                    <svg className="header__btn-icon btn__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.3453 3.75C10.118 3.75 8.3125 5.58331 8.3125 7.84482C8.3125 10.1063 10.118 11.9396 12.3453 11.9396C14.5725 11.9396 16.378 10.1063 16.378 7.84482C16.378 5.58331 14.5725 3.75 12.3453 3.75ZM9.92561 7.84482C9.92561 6.48791 11.0089 5.38793 12.3453 5.38793C13.6816 5.38793 14.7649 6.48791 14.7649 7.84482C14.7649 9.20172 13.6816 10.3017 12.3453 10.3017C11.0089 10.3017 9.92561 9.20172 9.92561 7.84482ZM9.65777 13.3048C7.43053 13.3048 5.625 15.1381 5.625 17.3996V19.0375C5.625 19.4898 5.98611 19.8565 6.43155 19.8565C6.877 19.8565 7.23811 19.4898 7.23811 19.0375V17.3996C7.23811 16.0427 8.32143 14.9427 9.65777 14.9427H16.1102C17.4466 14.9427 18.5299 16.0427 18.5299 17.3996V19.0375C18.5299 19.4898 18.891 19.8565 19.3364 19.8565C19.7819 19.8565 20.143 19.4898 20.143 19.0375V17.3996C20.143 15.1381 18.3375 13.3048 16.1102 13.3048H9.65777Z" fill="#556A3B"/>
                    </svg>
                    {screenWidth > 1279 && <p className="header__btn-text btn__text">Личный кабинет</p>}
                </div>}
            </div>
            <Nav
                isAuth={isAuth}
                openRegisterModal={props.openRegisterModal}
                openModal={props.openModal}
                data={menu}
                clickMenu={clickMenu}
                menuHover={menuHover} 
                setMenuHover={setMenuHover}
                menuType={menuType}
                screenWidth={screenWidth}
                setMenu={setMenu} />
        </header>
        {menuHover && <Shadow />}
        </>
    )
}

export default Header;