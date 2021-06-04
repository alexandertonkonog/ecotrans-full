import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPayments } from '../../../redux/authReducer';
import { DateFormat } from '../../../dev/functions';
import Select from '../../../components/Select/Select';
import Loader from '../../../components/Loader/Loader';
import DateInput from '../../../components/DateInput/DateInput';
import Pagination from '../../../components/Pagination/Pagination';
import icon from '../../../images/pdf.svg';
import ok from '../../../images/ok.svg';
import '../../../css/lk/oper.css';

const Document = ({selectedAgree, payments, setAgree, agreements}) => {
    const dispatch = useDispatch();
    const idAgree = selectedAgree ? selectedAgree.id : null;
    const paymentsListLength = payments && payments.list.length;
    const formatDateForRequest = (date) => {
        return date.getTime();
    }
    const clickSelect = (id, valueId) => {
        if (selectedAgree.id !== valueId) {
            setAgree(valueId);
        }
    }

    let [activePage, setActivePage] = useState(1);
    let [pageLoading, setPageLoading] = useState(false);
    let [date1, setDate1] = useState(null);
    let [date2, setDate2] = useState(null);
    let [dateError, setDateError] = useState(null);

    const submit = async () => {
        setDateError(null);
        if (!date1 && !date2) {
            setDateError('Неправильно заполнены поля для дат');
            return;
        }
        let start = date1 && formatDateForRequest(date1);
        let end = date2 && formatDateForRequest(date2);
        setPageLoading(true);
        await dispatch(getPayments({id: idAgree, page: 1, start, end}));
        setPageLoading(false);
    }

    const showAll = async () => {
        setDateError(null);
        setPageLoading(true);
        await dispatch(getPayments({id: idAgree, page: 1, limit: payments?.count || 10000}));
        setPageLoading(false);
    }
    
    const getInputValue = (hook) => (str) => {
        setDateError(null);
        let [date, month, year] = str.split('.')
        let newDate = new Date(year, month - 1, date);
        if (!Number.isNaN(Date.parse(newDate))) {
            hook(newDate)
        }
    }

    useEffect(() => {
        const getPaymentsFunction = async () => {
            setPageLoading(true);
            let options = {id: idAgree, page: activePage}
            if (date1) options.start = formatDateForRequest(date1);
            if (date2) options.end = formatDateForRequest(date2);
            await dispatch(getPayments(options));
            setPageLoading(false);
        }   
        if (idAgree) {
            getPaymentsFunction();
        }
    }, [idAgree, activePage])

    return (
        <div className="lk-doc">
            <Helmet>
                <title>Личный кабинет - платежные документы</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <h1 className="small-title short-padding">Платежные документы</h1>
            {payments && agreements ? <>
                {paymentsListLength
                    ? <>
                        <section className="lk-grid">  
                            <Select 
                                type={1} 
                                text="Договор"
                                addClass="lk-oper__agree"
                                data={agreements.map(item => ({...item, name: 'Л/с ' + item.ls}))} 
                                value={selectedAgree.id}
                                clickItem={clickSelect} />
                        </section>
                        <section className="lk-oper__period short-padding">  
                            <DateInput 
                                placeHolder="дд.мм.гггг" 
                                addClass="lk-oper__period-item1" 
                                text="Выберите интервал" 
                                type={1}
                                getInputValue={getInputValue(setDate1)} />
                            <DateInput 
                                placeHolder="дд.мм.гггг"
                                error={dateError} 
                                addClass="lk-oper__period-item2"
                                getInputValue={getInputValue(setDate2)} />
                            <button className="btn btn_green" onClick={submit}>Применить</button>
                        </section>
                        <section className="lk-oper__list-container short-padding pt0">
                            <div className="lk-doc__item-grid mb-small lk-doc__item-header">
                                <p className="lk-doc__item-number small-text text-grey">№</p>
                                <p className="lk-doc__item-date small-text text-grey">Дата</p>
                                <p className="lk-doc__item-cost small-text text-grey">Сумма</p>
                                <p className="lk-doc__item-status small-text text-grey">Статус</p>
                                <p className="lk-doc__item-pay small-text text-grey">Оплатить</p>
                            </div>
                            <div className="lk-oper__list">
                                {pageLoading 
                                    ? <div className="loader-container"><Loader /></div>
                                    : payments.list.map(item => {
                                        return (
                                            <div key={item.id} className="lk-doc__item lk-doc__item-grid">
                                                <a href={item.link} download className="lk-doc__item-number small-text">
                                                    <img className="lk-doc__item-icon" src={icon} alt={item.name}/>
                                                    {item.name}
                                                </a>
                                                <time className="lk-doc__item-date small-text" datetime={item.date}>{DateFormat.getTodayTimeOrDate(item.date)}</time>
                                                <p className="lk-doc__item-cost small-text">{item.cost} &#8381;</p>
                                                {item.status 
                                                    ? <p className="lk-doc__item-status small-text lk-doc__item-status_paid">
                                                        <span className="lk-doc__item-status-icon lk-doc__item-status-icon_paid"></span>
                                                        Оплачен
                                                    </p>
                                                    : <p className="lk-doc__item-status small-text">
                                                        <span className="lk-doc__item-status-icon"></span>
                                                        Не оплачен
                                                    </p>}
                                                {!item.status && <Link to="/" className="lk-doc__item-pay "><span className="small-text">Оплатить</span></Link>}
                                            </div>
                                        );
                                })}
                            </div>
                        </section>
                    </>
                    : <p className="main-text main-padding text-center">У Вас еще нет платежных документов</p>
                }
                {paymentsListLength < payments.count && <section className="average-padding pt0">
                    <Pagination 
                        active={activePage} 
                        max={Math.ceil(payments.count / 10)} 
                        clickItem={setActivePage}
                        showAll={showAll} />
                </section>}
            </>
            : <div className="loader-container"><Loader /></div>}
        </div>
    );
}

export default Document;