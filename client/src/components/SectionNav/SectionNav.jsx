import React, {useState, useEffect} from 'react';
import SectionNavItem from './SectionNavItem';
import {useLocation, Link} from 'react-router-dom';


const SectionNav = (props) => {

    let activeLink = useLocation();
    let elem = props.data.find(item => item.link === activeLink.pathname);

    const getNextLink = () => {
        
        if (elem.id === props.data.length) {
            return props.data[0].link;
        } else {
            let nextElem = props.data.find(item => item.id === (elem.id + 1));
            return nextElem.link;
        }
        
    }
    const getPrevLink = () => {
        
        if (elem.id === 1) {
            return props.data[props.data.length - 1].link;
        } else {
            let prevElem = props.data.find(item => item.id === (elem.id - 1));
            return prevElem.link;
        }
        
    }
    return (
        <section className="section-nav-container">
            <h1 className="page-title main-title">{props.title}</h1>
            
            <div className="section-nav__manager">
                <Link to={getPrevLink} className="slider__btn home-first__right-btn_prev slider__btn_prev">
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.68045 2.23279C9.08516 1.85699 9.1086 1.22426 8.73279 0.819549C8.35699 0.414838 7.72426 0.391404 7.31955 0.767206L8.68045 2.23279ZM1 8L0.319549 7.26721C0.115782 7.45642 0 7.72193 0 8C0 8.27807 0.115782 8.54358 0.319549 8.73279L1 8ZM7.31955 15.2328C7.72426 15.6086 8.35699 15.5852 8.73279 15.1805C9.1086 14.7757 9.08516 14.143 8.68045 13.7672L7.31955 15.2328ZM7.31955 0.767206L0.319549 7.26721L1.68045 8.73279L8.68045 2.23279L7.31955 0.767206ZM0.319549 8.73279L7.31955 15.2328L8.68045 13.7672L1.68045 7.26721L0.319549 8.73279Z" fill="#859299"/>
                    </svg>
                </Link>
                <Link to={getNextLink} className="slider__btn slider__btn_next" >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.68045 2.23279C9.08516 1.85699 9.1086 1.22426 8.73279 0.819549C8.35699 0.414838 7.72426 0.391404 7.31955 0.767206L8.68045 2.23279ZM1 8L0.319549 7.26721C0.115782 7.45642 0 7.72193 0 8C0 8.27807 0.115782 8.54358 0.319549 8.73279L1 8ZM7.31955 15.2328C7.72426 15.6086 8.35699 15.5852 8.73279 15.1805C9.1086 14.7757 9.08516 14.143 8.68045 13.7672L7.31955 15.2328ZM7.31955 0.767206L0.319549 7.26721L1.68045 8.73279L8.68045 2.23279L7.31955 0.767206ZM0.319549 8.73279L7.31955 15.2328L8.68045 13.7672L1.68045 7.26721L0.319549 8.73279Z" fill="#859299"/>
                    </svg>
                </Link>
            </div>
            <div className="section-nav">
                {props.data.map((item) => <SectionNavItem key={item.id} {...item} />)}
            </div>
            
        </section>
    );
}

export default SectionNav;