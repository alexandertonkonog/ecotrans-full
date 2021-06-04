import React from 'react';
import {NavLink} from 'react-router-dom';

const SectionNavItem = (props) => {
    return (
        <NavLink 
            exact={props.exact} 
            to={props.link} 
            activeClassName="section-nav__item_active" 
            className="section-nav__item">
                <p className="section-nav__item-text">{props.name}</p>
                <hr className="section-nav__item-border"/>
        </NavLink>
    );
}
SectionNavItem.defaultProps = {
    link: '/obschaya'
};
export default SectionNavItem;