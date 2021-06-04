import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Social from '../../components/Common/Social/Social';


const Nav = (props) => {
    const openMenu = (id) => {
        let data = props.data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    openMobile: !item.openMobile
                }
            }
            return item;
        })
        props.setMenu(data);
    }
    let menuData = props.menuType && props.screenWidth > 1279 && props.data.find(item => item.code === props.menuType);
    return (
        <CSSTransition 
            in={props.menuHover} 
            timeout={300} 
            classNames="nav__more-container"
            unmountOnExit
            >
            <div className="nav__more">
                {props.menuType && props.screenWidth > 1279 && <div className="nav__more-inside block">
                    <div className="nav__more-left">
                        <h3 className="nav__more-title">{menuData.title}</h3>
                        <nav className="nav__more-nav">
                            {menuData.data.map((item) => {
                                return (
                                    <Link onClick={props.clickMenu} key={item.id} to={item.link} className="nav__more-item">{item.name}</Link>
                                );
                            })}
                            {menuData.ecotrans && <button className="btn btn_white nav__more-btn">
                                <div className="nav__more-btn-text">Экотранс-про</div>
                                <svg className="nav__more-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 17L17 7" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 16V7H8" stroke="#556A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>}
                        </nav>
                    </div>
                    <img src={menuData.img} alt={menuData.title} title={menuData.title} className="nav__more-img"/>
                    
                </div>}
                {props.screenWidth < 1280 &&
                    <>
                    <div className="nav__more-mobile block">
                    {props.screenWidth < 768 && <p className="header__number mb-small" onClick={props.openModal}>88005553535</p>}
                    {props.isAuth 
                        ? <Link className="nav__more-btn-header btn btn_green" to="/personal/menu">
                            <svg className="header__btn-icon btn__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3453 3.75C10.118 3.75 8.3125 5.58331 8.3125 7.84482C8.3125 10.1063 10.118 11.9396 12.3453 11.9396C14.5725 11.9396 16.378 10.1063 16.378 7.84482C16.378 5.58331 14.5725 3.75 12.3453 3.75ZM9.92561 7.84482C9.92561 6.48791 11.0089 5.38793 12.3453 5.38793C13.6816 5.38793 14.7649 6.48791 14.7649 7.84482C14.7649 9.20172 13.6816 10.3017 12.3453 10.3017C11.0089 10.3017 9.92561 9.20172 9.92561 7.84482ZM9.65777 13.3048C7.43053 13.3048 5.625 15.1381 5.625 17.3996V19.0375C5.625 19.4898 5.98611 19.8565 6.43155 19.8565C6.877 19.8565 7.23811 19.4898 7.23811 19.0375V17.3996C7.23811 16.0427 8.32143 14.9427 9.65777 14.9427H16.1102C17.4466 14.9427 18.5299 16.0427 18.5299 17.3996V19.0375C18.5299 19.4898 18.891 19.8565 19.3364 19.8565C19.7819 19.8565 20.143 19.4898 20.143 19.0375V17.3996C20.143 15.1381 18.3375 13.3048 16.1102 13.3048H9.65777Z" fill="#556A3B"/>
                            </svg>
                            <p className="header__btn-text btn__text">Личный кабинет</p>
                        </Link>
                        : <div className="nav__more-btn-header btn btn_green" onClick={props.openRegisterModal}>
                            <svg className="header__btn-icon btn__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3453 3.75C10.118 3.75 8.3125 5.58331 8.3125 7.84482C8.3125 10.1063 10.118 11.9396 12.3453 11.9396C14.5725 11.9396 16.378 10.1063 16.378 7.84482C16.378 5.58331 14.5725 3.75 12.3453 3.75ZM9.92561 7.84482C9.92561 6.48791 11.0089 5.38793 12.3453 5.38793C13.6816 5.38793 14.7649 6.48791 14.7649 7.84482C14.7649 9.20172 13.6816 10.3017 12.3453 10.3017C11.0089 10.3017 9.92561 9.20172 9.92561 7.84482ZM9.65777 13.3048C7.43053 13.3048 5.625 15.1381 5.625 17.3996V19.0375C5.625 19.4898 5.98611 19.8565 6.43155 19.8565C6.877 19.8565 7.23811 19.4898 7.23811 19.0375V17.3996C7.23811 16.0427 8.32143 14.9427 9.65777 14.9427H16.1102C17.4466 14.9427 18.5299 16.0427 18.5299 17.3996V19.0375C18.5299 19.4898 18.891 19.8565 19.3364 19.8565C19.7819 19.8565 20.143 19.4898 20.143 19.0375V17.3996C20.143 15.1381 18.3375 13.3048 16.1102 13.3048H9.65777Z" fill="#556A3B"/>
                            </svg>
                            <p className="header__btn-text btn__text">Личный кабинет</p>
                        </div>}
                        {
                            props.data.map((item) => {
                                if (item.showInMobileMenu) {
                                    let blockClass = item.openMobile ? "nav__more-mobile-block nav__more-mobile-block_open" : "nav__more-mobile-block";
                                    return (
                                        <div key={item.id} className={blockClass}>
                                            {item.hasChildren 
                                                ?   <div className="nav__more-mobile-header" onClick={() => openMenu(item.id)}>
                                            
                                                        <h3 className="nav__more-mobile-title">{item.title}</h3>
                                                        <div className="nav__more-mobile-toggler">
                                                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1.73715 7.67572C1.36396 8.08284 0.731394 8.11035 0.324275 7.73715C-0.0828436 7.36396 -0.110346 6.73139 0.262846 6.32428L1.73715 7.67572ZM6.5 1L5.76285 0.324275C5.95226 0.117646 6.21969 -6.22442e-08 6.5 -6.55868e-08C6.78031 -6.89295e-08 7.04774 0.117646 7.23715 0.324275L6.5 1ZM12.7372 6.32428C13.1103 6.73139 13.0828 7.36396 12.6757 7.73715C12.2686 8.11035 11.636 8.08284 11.2628 7.67572L12.7372 6.32428ZM0.262846 6.32428L5.76285 0.324275L7.23715 1.67572L1.73715 7.67572L0.262846 6.32428ZM7.23715 0.324275L12.7372 6.32428L11.2628 7.67572L5.76285 1.67572L7.23715 0.324275Z"/>
                                                            </svg>
                                                        </div> 
                                                    </div>
                                                : <Link onClick={props.clickMenu} to={item.link} className="nav__more-mobile-header"><h3 className="nav__more-mobile-title">{item.title}</h3></Link>}
                                            
                                            {item.hasChildren && <CSSTransition in={item.openMobile} 
                                                    timeout={300} 
                                                    classNames="nav__more-mobile-list-container"
                                                    unmountOnExit>
                                                <ul className="nav__more-mobile-list">
                                                    {item.data.map((elem) => <Link onClick={props.clickMenu} key={elem.id} to={elem.link} className="nav__more-mobile-item"><li>{elem.name}</li></Link>)}   
                                                </ul>
                                            </CSSTransition>}
                                            
                                            
                                        </div>    
                                    );
                                }
                            })
                        
                        }
                        <Social />
                    </div>
                    </>
                    }
            </div>
        </CSSTransition>
    );
}

export default Nav;