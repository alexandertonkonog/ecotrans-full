import React, {useState} from 'react';
import Select from '../../../../components/Select/Select';
import { useSelector } from 'react-redux';

const Stream = () => {
    let [inputs, setInputs] = useState([
        {
            id: 1,
            data: [
            {id: 1, name: 'Ростов'},
            {id: 2, name: 'Таганрог'},
            {id: 3, name: 'Краснодар'},
            {id: 4, name: 'Ейск'},
            ],
            title: 'Город',
            value: 1,
        },
        {
            id: 2,
            data: [
            {id: 1, name: 'Пушкина'},
            {id: 2, name: 'Мира'},
            {id: 3, name: 'Есенина'},
            {id: 4, name: 'Горького'},
            ],
            title: 'Улица',
            value: 1,
        },
        {
            id: 3,
            data: [
            {id: 1, name: '1'},
            {id: 2, name: '2'},
            {id: 3, name: '3'},
            {id: 4, name: '4'},
            ],
            title: 'Камера',
            value: 1,
        },
    ])
    let screenWidth = useSelector(state => state.main.screenWidth);
    const changeInputsValue = (id, valueId) => {
        let newInputs = inputs.map((item) => {
            if (id === item.id) {
                return {
                    ...item,
                    value: valueId,
                };
            }
            return item;
        })
        setInputs(newInputs);
    }
    return (
        <section className="action-stream">
            <div className="action-stream__grey container">
                <div className="action-stream__inside block">
                    <div className="title-area">
                        <h2 className="section-title">Трансляция нашей работы</h2>
                        <p className="title-text">Работа нашей компании на улицах города в режиме реального времени</p>
                    </div>
                    <div className="action-stream__form">
                        {inputs.map((item) => <Select key={item.id} {...item} clickItem={changeInputsValue} />)}
                        <button className="btn btn_green action-stream__btn">
                            {screenWidth > 1280 
                                ? 'Показать'
                                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.50702 2.88648C5.84039 2.49435 5 2.975 5 3.74842V20.2516C5 21.025 5.84039 21.5057 6.50702 21.1135L20.5347 12.8619C21.192 12.4753 21.192 11.5247 20.5347 11.1381L6.50702 2.88648Z" fill="white"/>
                                    </svg>
                            }
                            
                        </button>
                    </div>
                    <iframe className="action-stream__iframe" src="https://www.youtube.com/embed/YtZZ-hxz9TI" frameBorder="0" allow="accelerometer" allowFullScreen></iframe>
                </div>
            </div>
        </section>
    );
}

export default Stream;