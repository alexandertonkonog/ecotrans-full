import React from 'react';
import { Link } from 'react-router-dom';

const More = (props) => {
    return (
        <section className="company-more main-padding">
            <div className="call-block">
                <div className="call-block__text-area">
                    <h2 className="call-block__title">{props.text}</h2>
                </div>
                <Link to={props.link} className="btn btn_white call-block__btn btn_main company-more__btn">
                    <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16.5C18 15.6716 17.3284 15 16.5 15C15.6716 15 15 15.6716 15 16.5V35C15 37.8511 16.1326 40.5854 18.1486 42.6014C20.1646 44.6174 22.8989 45.75 25.75 45.75H43.712L33.9393 55.5227C33.3536 56.1085 33.3536 57.0582 33.9393 57.644C34.5251 58.2298 35.4749 58.2298 36.0607 57.644L48.394 45.3107C48.408 45.2967 48.4217 45.2824 48.4352 45.2678C48.6753 45.008 48.8247 44.6629 48.833 44.2831C48.8332 44.2721 48.8333 44.2611 48.8333 44.25C48.8333 44.2229 48.8326 44.196 48.8312 44.1693C48.8119 43.805 48.6626 43.4753 48.4289 43.2255C48.4175 43.2133 48.4059 43.2012 48.394 43.1893L36.0607 30.856C35.4749 30.2702 34.5251 30.2702 33.9393 30.856C33.3536 31.4418 33.3536 32.3915 33.9393 32.9773L43.712 42.75H25.75C23.6946 42.75 21.7233 41.9335 20.2699 40.4801C18.8165 39.0267 18 37.0554 18 35V16.5Z" fill="#98A782"/>
                        <path d="M51.4773 30.856C50.8915 30.2702 49.9418 30.2702 49.356 30.856C48.7702 31.4418 48.7702 32.3915 49.356 32.9773L60.6287 44.25L49.356 55.5227C48.7702 56.1085 48.7702 57.0582 49.356 57.644C49.9418 58.2298 50.8915 58.2298 51.4773 57.644L63.8107 45.3107C64.092 45.0294 64.25 44.6478 64.25 44.25C64.25 43.8522 64.092 43.4706 63.8107 43.1893L51.4773 30.856Z" fill="#98A782"/>
                    </svg>
                </Link>
            </div>
        </section>
    );
}

export default More;