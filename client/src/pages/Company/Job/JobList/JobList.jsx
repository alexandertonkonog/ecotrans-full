import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';
import { Link } from 'react-router-dom';
import Pagination from '../../../../components/Pagination/Pagination';

const JobList = (props) => {
    let [activePage, setActivePage] = useState(1);
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.iblock.jobs);
    const xpArray = [
        {id: 1, name: 'Полная занятость, полный день'},
        {id: 2, name: 'Неполная занятость, неполный день'},
    ];
    const showAll = async () => {
        await dispatch(getEntities({id: 13, limit: 100, page: activePage}))
    }
    useEffect(() => {
        dispatch(getEntities({id: 13, limit: 10, page: activePage}))
    }, []);

    if (!jobs) return <section className="action-tech block main-padding"><Loader /></section>

    const jobsLength = jobs.list.length;

    return (
        <section className="job-list">
            {jobs.count ? jobs.list.map(item => {
                const xp = item.properties.find(elem => elem.userFieldId === 13);
                const salaryObj = item.properties.find(elem => elem.userFieldId === 12);
                const salary = salaryObj && JSON.parse(salaryObj.value);
                const city = item.properties.find(elem => elem.userFieldId === 14);
                const busyId = item.properties.find(elem => elem.userFieldId === 15);
                const busy = busyId && xpArray.find(elem => elem.id == busyId.value);
                const hh = item.properties.find(elem => elem.userFieldId === 16);
                return (
                    <article key={item.id} className="job__item grid">
                        <Link to={'/o-kompanii/vakansii/' + item.linkName} className="job__title-container"><h3 className="job__title">{item.name}</h3></Link>
                        <p className="job__info">
                            {xp && <span className="job__xp job-text">
                                Опыт работы: {xp.value}
                            </span>}
                            {busy && <span className="job__busy job-text">{busy.name}</span>} 
                            {city && <span className="job__city job-text">{city.value}</span>}
                        </p>
                        <Link to={'/o-kompanii/vakansii/' + item.id} className="job__text-container"><p className="job__text">{item.smallText}</p></Link>
                        <div className="job__hh">
                            <p className="job__hh-modal-open" onClick={props.openModal} >Откликнуться</p> 
                            {hh && <a href={hh.value}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.0106 -0.000976562C21.7376 0.00496944 28.0321 6.33916 27.9999 14.052C27.9693 21.8293 21.5797 28.0489 13.9257 28.0004C6.19873 27.9512 -0.0355108 21.6544 0.000152248 13.9339C0.0358153 6.26526 6.28789 -0.000976562 14.0106 -0.000976562ZM5.73426 7.70334V20.0201C6.37704 20.0201 6.98416 20.0039 7.59043 20.0269C7.89527 20.0379 7.96999 19.9351 7.96659 19.6429C7.95386 18.2566 7.93942 16.8687 7.97424 15.4807C7.9802 14.9454 8.06606 14.4141 8.22897 13.9042C8.47692 13.1771 9.28188 12.7897 10.0537 12.9197C10.7797 13.0429 11.0922 13.4344 11.1729 14.3331C11.189 14.5158 11.1916 14.7009 11.1924 14.8844C11.1924 16.4406 11.1941 17.9979 11.1975 19.5563V19.9929H13.4171C13.4343 19.946 13.446 19.8972 13.4519 19.8476C13.429 17.741 13.4222 15.6336 13.3712 13.527C13.3517 12.7039 12.9535 12.0397 12.2428 11.6056C11.0438 10.8734 9.49671 11.0314 8.42172 11.9734C8.28162 12.0966 8.14576 12.2282 7.94027 12.416V7.70334H5.73426ZM16.8127 7.71439H14.5829V8.07454C14.5829 10.5509 14.5829 13.027 14.5829 15.5028C14.5829 16.8891 14.577 18.2753 14.5923 19.665C14.5923 19.7839 14.7247 20.0048 14.8029 20.0048C15.4626 20.032 16.1232 20.0201 16.8229 20.0201C16.8229 19.4934 16.817 19.0152 16.8229 18.5378C16.8407 17.2637 16.8297 15.9895 16.8951 14.7205C16.952 13.6077 17.6024 12.9605 18.5933 12.9044C19.3711 12.8611 19.9579 13.3291 20.0054 14.0477C20.047 14.6644 20.0759 15.2836 20.081 15.902C20.0912 17.1609 20.081 18.4206 20.081 19.6794C20.081 19.7882 20.0988 19.8969 20.1082 19.9954H22.2794C22.2794 17.877 22.3116 15.7857 22.2641 13.6969C22.2445 12.8398 21.904 12.0703 21.1076 11.598C19.8339 10.8403 18.2409 11.0518 17.1261 12.1246C17.0411 12.2036 16.9562 12.2775 16.8102 12.4126L16.8127 7.71439Z" fill="#EB5757"/>
                                </svg>
                            </a>}
                        </div>
                        {salary && salary.start && salary.end ? <p className="job__pay">
                            {salary.start} - {salary.end} &#8381;
                        </p> : ''}
                        {salary && salary.start && !salary.end ? <p className="job__pay">
                            от {salary.start} &#8381;
                        </p> : ''}
                        {salary && !salary.start && salary.end ? <p className="job__pay">
                            до {salary.end} &#8381;
                        </p> : ''}
                    </article>
                );
            }) : <p className="main-text main-padding">Еще нет вакансий</p> }
            {jobs && jobs.count > jobsLength ? <Pagination 
                active={activePage} 
                max={Math.ceil(jobs.count / 10)} 
                clickItem={setActivePage}
                showAll={showAll} /> : <></>}
        </section>
    );
}

export default JobList;