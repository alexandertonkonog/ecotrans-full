import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntities } from '../../../redux/iblockReducer';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sign from '../../Home/Sign/Sign';
import Pagination from '../../../components/Pagination/Pagination';
import Loader from '../../../components/Loader/Loader';

const QueList = (props) => {
    let [open, setOpen] = useState([]);
    let [pageLoading, setPageLoading] = useState(false);
    let [activePage, setActivePage] = useState(1);

    const types = [
        {id: 1, name: 'ul'},
        {id: 2, name: 'ip'},
        {id: 3, name: 'fizicheskie-litsa'},
        {id: 4, name: 'zakluchenie-dogovora'},
    ]

    const dispatch = useDispatch();
    const que = useSelector(state => state.iblock.questions);
    const location = useLocation();
    const pathnameArray = location.pathname.split('/');
    const linkId = pathnameArray.length < 3 ? 'ul' : pathnameArray[2];
    const type = types.find(item => item.name === linkId);

    const openAnswer = (id) => {
        if (open.includes(id)) {
            setOpen(open.filter(item => item !== id));
        } else {
            setOpen([...open, id]);
        }
    }

    const showAll = async () => {
        setPageLoading(true)
        await dispatch(getEntities({
            id: 15, 
            limit: 100, 
            page: activePage, 
            type: type.id, 
            fieldId: 21,
            props: ['text']
        }))
        setPageLoading(false)
    }

    useEffect(() => {
        const getEntitiesFunction = async () => {
            setPageLoading(true)
            await dispatch(getEntities({
                id: 15, 
                limit: 10, 
                page: activePage, 
                type: type.id, 
                fieldId: 21,
                props: ['text']
            }))
            setPageLoading(false)
        }
        getEntitiesFunction()
    }, [type.id, activePage]);

    if (!que || pageLoading) return <section className="container_grey average-padding"><Loader /></section>

    const queLength = que.length;

    return (
        <section className="container_grey">
            <Helmet>
                <title>Ответы на вопросы</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <ul className="que__list block average-padding">
                {que.count ? que.list.map(item => {
                    return (
                        <li 
                            key={item.id} 
                            className="que__item mb-small grid short-padding" 
                            >
                            <h3 className="que__item-title micro-title" onClick={() => openAnswer(item.id)}>{item.smallText}</h3>
                            <div onClick={() => openAnswer(item.id)} className={item.show ? "que__item-icon-container que__item-icon-container_open" : "que__item-icon-container"}>
                                <svg className="que__item-icon" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7628 10.3243C19.136 9.91716 19.7686 9.88965 20.1757 10.2628C20.5828 10.636 20.6103 11.2686 20.2372 11.6757L18.7628 10.3243ZM14 17L14.7372 17.6757C14.5477 17.8824 14.2803 18 14 18C13.7197 18 13.4523 17.8824 13.2628 17.6757L14 17ZM7.76285 11.6757C7.38965 11.2686 7.41716 10.636 7.82428 10.2628C8.23139 9.88965 8.86396 9.91716 9.23715 10.3243L7.76285 11.6757ZM20.2372 11.6757L14.7372 17.6757L13.2628 16.3243L18.7628 10.3243L20.2372 11.6757ZM13.2628 17.6757L7.76285 11.6757L9.23715 10.3243L14.7372 16.3243L13.2628 17.6757Z" fill="#859299"/>
                                </svg>
                            </div>
                            {open.includes(item.id) && <p className="main-text text-grey que__item-text">{item.text}</p>}
                        </li>
                    );
                })
                : <p className="main-text main-padding">Еще нет вопросов данной категории</p> }
            </ul>
            {que.count > queLength && <div className="block">
                <Pagination 
                    active={activePage} 
                    max={Math.ceil(que.count / 10)} 
                    clickItem={setActivePage}
                    showAll={showAll} />
            </div>}
            <div className="block middle-padding">
                <Sign />
            </div>
            
        </section>
    );
}

export default QueList;