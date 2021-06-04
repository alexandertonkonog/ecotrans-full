import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from '../../../../components/Select/Select';
import Pagination from '../../../../components/Pagination/Pagination';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';
import logo from '../../../../images/company/project.jpg';

const Projects = () => {
    const dispatch = useDispatch();
    const screenWidth = useSelector(state => state.main.screenWidth);
    const projects = useSelector(state => state.iblock.projects);
    
    const showAll = () => {
        dispatch(getEntities({id: 9, limit: 100, page: 1, type: activeTag, fieldId: 10}));
    }
    const tags = {
        data: [
            {id: 0, name: 'Все'},
            {id: 1, name: 'Воспитание молодежи'},
            {id: 2, name: 'Благотворительная деятельность'},
        ],
        title: "Категория",
        id: 1,
        value: 1,
        clickItem (id, valueId) {
            setActiveTag(valueId);
        }
    } 
    let [activePage, setActivePage] = useState(1);
    let [activeTag, setActiveTag] = useState(0);

    useEffect(() => {
        dispatch(getEntities({id: 9, limit: 3, page: activePage, type: activeTag, fieldId: 10}))
    }, [activePage, activeTag]);

    if (!projects) {
        return <section className="main-padding"><Loader /></section>
    }

    let pagination = {
        max: Math.ceil(projects.count / 3),
        active: activePage,
        clickItem: setActivePage,
        showAll
    };

    const projectsLength = projects.list.length;

    return (
        <section className="action-projects main-padding block">
            <div className="title-area">
                <h2 className="section-title">Проекты компании</h2>
            </div>
            {screenWidth > 767
                ? <p className="tags">
                        {tags.data.map(item => <span 
                            key={item.id}
                            onClick={() => setActiveTag(item.id)} 
                            className={activeTag === item.id ? 'tag tag_active' : 'tag'}>{item.name}</span>)}
                    </p>
                : <Select {...tags} />
            }
            <div className="action-projects__list">
                {projects.count ? 
                    projects.list.map(item => {
                        let img = item.smallImg ? item.smallImg.fullLink : logo;
                        return (
                            <article className="action-projects__item grid" key={item.id}>
                                <Link to={'/projects/' + item.linkName} className="action-projects__img-container">
                                    <img src={img} className="action-projects__img" title={item.name} alt={item.name} />
                                </Link>
                                <div className="action-projects__body">
                                    <Link to={'/projects/' + item.linkName}><h3 className="action-projects__title action-title">{item.name}</h3></Link>
                                    <p className="action-projects__text main-text">{item.smallText}</p>
                                    <Link to={'/projects/' + item.linkName} className="action-projects__more">Подробнее</Link>
                                </div>
                            </article>    
                        );
                    })
                    : <p className="main-text">Еще нет таких проектов</p> }
            </div>
            {projects.count > projectsLength && <div className="action__projects-footer">
                <Pagination {...pagination} />
            </div>}
        </section>
    );
}

export default Projects;