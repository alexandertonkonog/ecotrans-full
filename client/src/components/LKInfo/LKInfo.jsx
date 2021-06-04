import React from 'react';

const LKInfo = (props) => {
    return <p className={"lk-info " + props.addClass}>
        <svg className="lk-info__icon" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 4C3.79666 4 0 7.79666 0 12.5C0 17.2033 3.79666 21 8.5 21C13.2033 21 17 17.2033 17 12.5C17 7.79666 13.2033 4 8.5 4ZM9.30895 11.0127V17.1364H7.66766V11.0127H9.30895ZM7.57144 9.42796C7.57144 9.18271 7.65257 8.98085 7.81481 8.82238C7.98082 8.66391 8.20532 8.58467 8.4883 8.58467C8.76751 8.58467 8.99012 8.66391 9.15614 8.82238C9.32215 8.98085 9.40516 9.18271 9.40516 9.42796C9.40516 9.67698 9.32027 9.88073 9.15048 10.0392C8.98446 10.1977 8.76374 10.2769 8.4883 10.2769C8.21287 10.2769 7.99026 10.1977 7.82047 10.0392C7.65445 9.88073 7.57144 9.67698 7.57144 9.42796Z" fill="#EB5757"/>
        </svg>
        {props.text}
    </p>
}

export default LKInfo;