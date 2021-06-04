import React from 'react';
import Loader from '../../../../components/Loader/Loader';
import '../../../../css/components/tabs.css';

const Info = ({userType}) => {
    const data = {
        name: 'person',
        data: [
            {id: 0, name: 'Физ. лицо'},
            {id: 1, name: 'ИП'},
            {id: 2, name: 'Юр. лицо'},
            {id: 3, name: 'Упр. ком.'},
            {id: 4, name: 'ТСЖ, ЖК, ЖСК'},
            {id: 5, name: 'СНТ, ДНТ, НСТ'},
        ]
    }
    if (!userType && userType !== 0) {
        return <section className="personal-per short-padding lk-col"><Loader /></section>
    }
    let tag = data.data.find(item => userType === item.id);
    return (
        <>
            <section className="personal-per short-padding lk-col">
                <h1 className="small-title personal-info__title mb-large">Личные данные</h1>
                <div className="personal-per__body">
                    <p className="tabs">
                        <span className="tab tab_active">
                            {tag?.name}
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Info;