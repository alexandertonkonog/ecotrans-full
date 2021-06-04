import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Bread = () => {
    let location = useLocation();
    let stateBread = useSelector(state => state.main.breads);
    let screenWidth = useSelector(state => state.main.screenWidth);
    let menu = useSelector(state => state.main.menu);
    let pathname = location.pathname.split('/').slice(1);
    let breads = [{id: 1, name: 'Главная', link: '/'}];
    const insertInBreads = (item, index) => {
        breads.push({id: breads.length + 1, name: index === 0 ? item.title : item.name, link: item.link});
    };
    let menuElem, menuElemInside;
    if (pathname[0]) {
        menuElem = menu.find(item => item.link.includes(pathname[0]));
        if (menuElem) {
            insertInBreads(menuElem, 0);
        }
    } 
    if (pathname[1] && menuElem) {
        menuElemInside = menuElem.data && menuElem.data.find(item => item.link.includes(pathname[1]));
        if (menuElemInside) {
            insertInBreads(menuElemInside, 1);
        }
    }
    if (pathname.length === breads.length) {
        breads = stateBread;
    }
    if (breads?.length > 1) {
        if (screenWidth > 767) {
            return (
                <section className="block breads">
                    {
                        breads.map((item, index) => {
                            if (index === breads.length - 1) {
                                return <span key={item.id} className="bread">{item.name}</span>;
                            }
                            return <Link key={item.id} to={item.link} className="bread">{item.name}</Link>;
                        })
                    }
                </section>
            );
        } else {
            let last = breads.length > 2 ? breads[breads.length - 2] : breads[0];
            return ( 
                <section className="block breads">
                    <Link key={last.id} to={last.link} className="bread bread_flex">
                        <svg className="bread__icon" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.35127 0.893913C4.54778 0.699915 4.54983 0.383339 4.35583 0.186821C4.16183 -0.00969686 3.84525 -0.0117393 3.64874 0.182259L4.35127 0.893913ZM1 3.49962L0.648735 3.1438C0.553568 3.23774 0.5 3.3659 0.5 3.49962C0.5 3.63335 0.553568 3.7615 0.648735 3.85545L1 3.49962ZM3.64874 6.81699C3.84525 7.01099 4.16183 7.00895 4.35583 6.81243C4.54983 6.61591 4.54778 6.29933 4.35127 6.10534L3.64874 6.81699ZM3.64874 0.182259L0.648735 3.1438L1.35126 3.85545L4.35127 0.893913L3.64874 0.182259ZM0.648735 3.85545L3.64874 6.81699L4.35127 6.10534L1.35126 3.1438L0.648735 3.85545Z" fill="#859299"/>
                        </svg>
                        {last.name}
                    </Link>
                </section>
            )
        }
        
    }
    return <></>;
}

export default Bread;