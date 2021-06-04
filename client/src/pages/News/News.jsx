import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Select from '../../components/Select/Select';
import { getEntities } from '../../redux/iblockReducer';
import NewsItem from './NewsItem';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import '../../css/news/news.css';
import news1 from '../../images/home/news1.png';
import news2 from '../../images/home/news2.png';
import news3 from '../../images/home/news3.png';

const News = () => {
    const screenWidth = useSelector(state => state.main.screenWidth);
    const news = useSelector(state => state.iblock.news);
    const dispatch = useDispatch();
    const newsListLength = news && news.list.length;
    let [activeTag, setActiveTag] = useState({id: 1});
    let [activeSelect, setActiveSelect] = useState({id: 1});
    let [loading, setLoading] = useState(false);
    let [loadingError, setLoadingError] = useState(false);
    let [activePage, setActivePage] = useState(1);
    const getSmallArray = (arr) => {
        let need = [];
        arr.forEach((item, index) => {
            if (index !== 0 && index % 5 === 0) {
                let elem = [arr[index - 1], item];
                need.push(elem);
            } else if (index !== 0 && index % 5 === 4) {
                
            } else {
                need.push(item);
            }
        })
        return need;
    }
    const dropFilters = () => {
        setActiveSelect({id: 1});
        setActiveTag({id: 1});
    }
    const showAll = async () => {
        setLoading(true);
        await dispatch(getEntities({limit: 1000000, page: 1, id: 1}));
        setLoading(false);
    }
    const tags = {
        data: [
            {id: 1, name: 'Все', code: '0', type: 0},
            {id: 2, name: 'Новости', code: 'new', type: 1},
            {id: 3, name: 'Статьи', code: 'article', type: 2},
        ],
        title: "Категория",
        id: 1,
        value: activeTag.id,
        clickItem (id, valueId) {
            setActiveTag(this.data.find(item => item.id === valueId));
        }
    }
    const selectData = {
        data: [
            {id: 1, name: 'Все годы', type: 0},
            {id: 2, name: 'Последний год', type: 1},
            {id: 3, name: 'Последний месяц', type: 2},
        ],
        id: 1,
        value: activeSelect.id,
        addClass: 'news-filter__select',
        clickItem (id, valueId) {
            setActiveSelect(this.data.find(item => item.id === valueId));
        }
    }
    const renderNews = news && getSmallArray(news.list);

    useEffect(() => {
        const getNewsFunction = async () => {
            setLoading(true);
            await dispatch(getEntities({
                id: 1, 
                limit: 14, 
                page: activePage, 
                type: activeTag.type,
                time: activeSelect.type, 
                fieldId: 2
            }));
            setLoading(false);
        }
        getNewsFunction();
    }, [activePage, activeTag.type, activeSelect.type])
    return (
        <>
            <Helmet>
                <title>Новости</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <div className="section-nav-container block">
                <h1 className="main-title">Новости</h1>
            </div>
            
                <div className="news-filter block grid">
                    <Select 
                        placeHolder="Все годы"
                        {...selectData} />
                    {screenWidth > 1024
                        ? <p className="tags">
                                {tags.data.map(item => <span
                                    onClick={() => setActiveTag(item)}
                                    key={item.id} 
                                    className={activeTag.id === item.id ? 'tag tag_active' : 'tag'}>{item.name}</span>)}
                            </p>
                        : <Select {...tags} />
                    }
                    <p className="tag tag_disable news-filter__disable" onClick={dropFilters}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6279 1.31261C14.0432 0.912725 14.7165 0.912725 15.1318 1.31261C15.5471 1.71249 15.5471 2.36082 15.1318 2.7607L9.50385 8.17978L15.1552 13.6214C15.5705 14.0213 15.5705 14.6696 15.1552 15.0695C14.7399 15.4694 14.0666 15.4694 13.6513 15.0695L7.99994 9.62788L2.34858 15.0695C1.93329 15.4694 1.25997 15.4694 0.844673 15.0695C0.42938 14.6696 0.42938 14.0213 0.844673 13.6214L6.49603 8.17978L0.868071 2.7607C0.452778 2.36082 0.452778 1.71249 0.868071 1.31261C1.28336 0.912725 1.95669 0.912726 2.37198 1.31261L7.99994 6.73169L13.6279 1.31261Z" fill="#859299"/>
                        </svg>
                        <span>Сбросить фильтры</span>
                    </p>
                </div>
            {!loading 
                ? 
                <>
                    <section className="news-list average-padding block">
                        {renderNews && renderNews.length ?
                            renderNews.map((item, index) => {
                                if (Array.isArray(item)) {
                                    return <div key={'index' + index} className="news-list__container">
                                        {item.map(elem => <NewsItem 
                                            key={elem.id} 
                                            {...elem}
                                            addClass={screenWidth > 700 ? "news-list__item_small" : ''} />)}
                                    </div>
                                } else {
                                    return <NewsItem 
                                        key={item.id} 
                                        {...item} />
                                }
                            })
                            : <p className="main-text short-padding">Нет новостей</p>
                        }
                    </section>
                    {newsListLength && news.count > newsListLength ?
                        <div className="news-list__pagination block">
                            <Pagination
                                active={activePage} 
                                max={Math.ceil(news.count / 14)} 
                                clickItem={setActivePage}
                                showAll={showAll}
                            />
                        </div>
                        : <></>
                    }
                </>
            : <div className="block short-padding"><Loader /></div> 
            }
            <section className="news-list__seo-text block middle-padding">
                <p className="news-list__text-area">
                    Сео-текст. Современная трактовка понятия экология намного шире, чем в первые десятилетия развития этой науки. В настоящее время чаще всего под экологическими вопросами ошибочно понимаются, прежде всего, вопросы охраны окружающей среды. Во многом такое смещение смысла произошло благодаря всё более ощутимым последствиям влияния человека на окружающую среду, однако необходимо разделять понятия ecological («относящееся к науке экологии») и environmental («относящееся к окружающей среде»). Всеобщее внимание к экологии повлекло за собой расширение первоначально довольно чётко обозначенной Эрнстом Геккелем области знаний (исключительно биологических) на другие естественные, а также гуманитарные науки.
                </p> 
            </section>       
        </>
    );
}

export default News;