import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import Select from '../../../components/Select/Select';
import DateInput from '../../../components/DateInput/DateInput';
import Pagination from '../../../components/Pagination/Pagination';
import Loader from '../../../components/Loader/Loader';
import { getAccounts } from '../../../redux/authReducer';
import { getOriginalAccount } from '../../../redux/formReducer';
import icon from '../../../images/pdf.svg';
import ok from '../../../images/ok.svg';
import '../../../css/lk/oper.css';

const Operation = ({selectedAgree, accounts, setAgree, agreements, openModal}) => {
    const dispatch = useDispatch();
    const idAgree = selectedAgree ? selectedAgree.id : null;
    const accountsListLength = accounts && accounts.list.length;
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
    let [selectArray, setSelectArray] = useState([]);

    const selectDoc = (id) => {
        if (selectArray.includes(id)) {
            setSelectArray(selectArray.filter(item => item !== id));
        } else {
            setSelectArray([...selectArray, id]);
        }
    }

    const submitOriginalRequest = async (array = selectArray) => {
        if (array.length) {
            let result = await dispatch(getOriginalAccount(array))
            if (result.success) {
                openModal({visible: true, result: 1, error: null});
            } else {
                openModal({visible: true, result: 2, error: result.message});
            }
        }
    }

    const submit = async () => {
        setDateError(null);
        if (!date1 && !date2) {
            setDateError('Неправильно заполнены поля для дат');
            return;
        }
        let start = date1 && formatDateForRequest(date1);
        let end = date2 && formatDateForRequest(date2);
        setPageLoading(true);
        await dispatch(getAccounts({id: idAgree, page: 1, start, end}));
        setPageLoading(false);
    }

    const showAll = async () => {
        setDateError(null);
        setPageLoading(true);
        await dispatch(getAccounts({id: idAgree, page: 1, limit: accounts?.count || 10000}));
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
            await dispatch(getAccounts(options));
            setPageLoading(false);
        }   
        if (idAgree) {
            getPaymentsFunction();
        }
    }, [idAgree, activePage])

    return (
        <div className="lk-oper">
            <Helmet>
                <title>Личный кабинет - сверка взаиморасчетов</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <h1 className="small-title short-padding">Сверка взаиморасчетов</h1>
            {accounts && agreements ? <>
                {accountsListLength
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
                            <p className="small-text lk-oper__list-title mb-small" onClick={submitOriginalRequest}>
                                Запросить оригиналы
                            </p>
                            <div className="lk-oper__list">
                                {pageLoading 
                                    ? <div className="loader-container"><Loader /></div>
                                    : accounts.list.map(item => {
                                        return (
                                            <div key={item.id} className="lk-oper__list-item">
                                                <a href={item.link} className="lk-oper__list-item-content" title="Скачать">
                                                    <img className="small-text lk-oper__list-item-icon" src={icon} alt={item.name} title={item.name} />
                                                    <p className="small-text lk-oper__list-item-title">{item.name}</p>
                                                </a>
                                                <div className="lk-oper__list-item-manage">
                                                    <p 
                                                        className="lk-oper__list-item-ask small-text" 
                                                        onClick={() => submitOriginalRequest([item.id])} >Запросить оригинал</p>
                                                    <div 
                                                        onClick={() => selectDoc(item.id)}
                                                        style={{backgroundImage: selectArray.includes(item.id) ? 'url(' + ok + ')' : 'none'}}
                                                        className={selectArray.includes(item.id) ? "checkbox_active checkbox" : "checkbox"}></div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </section>
                    </>
                    : <p className="main-text main-padding text-center">У Вас еще нет платежных документов</p>
                }
                {accountsListLength < accounts.count && <section className="average-padding pt0">
                    <Pagination 
                        active={activePage} 
                        max={Math.ceil(accounts.count / 10)} 
                        clickItem={setActivePage}
                        showAll={showAll} />
                </section>}
            </>
            : <div className="loader-container"><Loader /></div>}
        </div>
    );
}

export default Operation;