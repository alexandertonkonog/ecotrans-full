import React, {useEffect, useState} from 'react';
import IMask from 'imask';
import { DateFormat } from '../../dev/functions';
import icon from '../../images/lk/operation/icon.svg';
import '../../css/components/date.css';

const DateInput = (props) => {
    let input = React.createRef();
    let options = {
        mask: Date,
        max: new Date(2100, 0, 1),
    }
    let [inputMask, setInputMask] = useState(null);
    let [calendarVisible, setCalendarVisible] = useState(false);
    
    const changeCallback = () => {
        props.getInputValue(inputMask.unmaskedValue);
    }
    const visibleDateHandler = (date) => {
        return DateFormat.getFormatStr(date.getDate()) + '.' + DateFormat.getFormatStr(date.getMonth() + 1) + '.' + date.getFullYear();
    }
    const getTime = (str) => {
        let arr = str.split('.');
        let date = new Date();
        if (arr[0] && arr[0].length === 2) date.setDate(Number(arr[0]));
        if (arr[1] && arr[1].length === 2) date.setMonth(Number(arr[1]) - 1);
        if (arr[2] && arr[2].length === 4) date.setFullYear(Number(arr[2]));
        return date;
    }
    const closeCalendar = (e) => {
        let dateElem = document.querySelector('.date');
        if (dateElem) {
            let targetElem = e.target.classList.length ? dateElem.querySelector('.' + e.target.classList[0]) : null;
            if (dateElem !== e.target && !targetElem) {
                setCalendarVisible(false);
            }
        } else {
            setCalendarVisible(false);
        }
    }
    useEffect(() => {
        setInputMask(IMask(input.current, options));
    }, []);
    useEffect(() => {
        document.documentElement.addEventListener('click', closeCalendar);
        () => {
            document.documentElement.removeEventListener('click', closeCalendar);
        }
    }, []);
    return (
        <div className={"date " + props.addClass} onFocus={() => setCalendarVisible(true)} >
            <p className="date__label">{props.type === 1 && props.text} <span className="label__error">{props.error}</span></p>
            <div className="date__input-container">
                <input placeholder={props.placeHolder} ref={input} type="text" onChange={changeCallback} className="date__input input"/>
                <img src={icon} alt="Дата" className="date__icon" onClick={() => setCalendarVisible(true)} />
            </div>
            <Calendar
                onBlur={() => setCalendarVisible(false)}
                calendarVisible={calendarVisible}
                clickItem={(date) => {
                    let visibleDate = visibleDateHandler(date);
                    input.current.value = visibleDate;
                    inputMask.updateValue();
                    props.getInputValue(visibleDate);
                }} />
        </div>
    );
}

const Calendar = (props) => {

    let [date, setStateDate] = useState(new Date())

    const getCalendarData = (propsDate) => {
        const monthDict = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let date = new Date(propsDate);
        date.setDate(1);
        let month = date.getMonth();
        let year = date.getFullYear();
        let list = [];
        while(date.getMonth() === month) {
            list.push({day: date.getDate(), dateStamp: date.getTime()});
            date.setDate(date.getDate() + 1);
        }
        return {list, month: monthDict[month], year};
    }
    
    const clickDateItem = (obj) => {
        let date = new Date(obj.dateStamp);
        props.clickItem(date);
        props.onBlur();
    }

    const clickArrow = (vector) => {
        let newDate = new Date(date);
        if (vector) {
            newDate.setMonth(date.getMonth() + 1);
        } else {
            newDate.setMonth(date.getMonth() - 1);
        }
        setStateDate(newDate);
    }

    const {list, month, year} = getCalendarData(date);
    const today = new Date();
    
    return (
        <div className={props.calendarVisible ? "calendar": "calendar calendar_hidden"}>
            <div className="calendar__manager">
                <button className="btn calendar__arrow" onClick={() => clickArrow(false)}>
                    <svg class="calendar__arrow-svg" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="calendar__arrow-svg-path" d="M0.147915 6.15474L6.30789 0.143181C6.50511 -0.0477269 6.82402 -0.0477269 7.02124 0.143181L7.85209 0.94743C8.0493 1.13834 8.0493 1.44704 7.85209 1.63795L2.87962 6.5L7.85209 11.3621C8.0493 11.553 8.0493 11.8617 7.85209 12.0526L7.02124 12.8568C6.82402 13.0477 6.50511 13.0477 6.30789 12.8568L0.147915 6.84526C-0.049305 6.65435 -0.049305 6.34565 0.147915 6.15474Z" fill="#859299"/>
                    </svg>
                </button>
                <p className="small-text calendar__title">
                    {month} {year}
                </p>
                <button className="btn calendar__arrow calendar__arrow_next" onClick={() => clickArrow(true)}>
                    <svg class="calendar__arrow-svg" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="calendar__arrow-svg-path" d="M0.147915 6.15474L6.30789 0.143181C6.50511 -0.0477269 6.82402 -0.0477269 7.02124 0.143181L7.85209 0.94743C8.0493 1.13834 8.0493 1.44704 7.85209 1.63795L2.87962 6.5L7.85209 11.3621C8.0493 11.553 8.0493 11.8617 7.85209 12.0526L7.02124 12.8568C6.82402 13.0477 6.50511 13.0477 6.30789 12.8568L0.147915 6.84526C-0.049305 6.65435 -0.049305 6.34565 0.147915 6.15474Z" fill="#859299"/>
                    </svg>
                </button>
            </div>
            <div className="calendar__list">
                {list.map(item => {
                    let className = today.getTime() === item.dateStamp
                        ? "calendar__item calendar__item_today"
                        : "calendar__item";           
                    return (
                        <div 
                            className={className} 
                            onClick={() => clickDateItem(item)}>
                                {item.day}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

DateInput.defaultProps = {
    getInputValue: () => {}
}

export default DateInput;