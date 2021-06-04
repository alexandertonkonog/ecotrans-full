import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';
import '../../../../css/components/tabs.css';
import '../../../../css/components/orderedList.css';

const Docs = () => {
    

    const docs = [
        {
            id: 1,
            name: 'Для юр.лиц',
            code: 'company',
            data: [
                {id: 1, name: 'Копия Свидетельства о постановке на учет российской организации в налоговом органе по месту ее нахождения/ или Свидетельство о постановке на учет в налоговом органе юридического лица, образованного в соответствии с законодательством РФ по месту нахождения на территории РФ до 2000 года. (Если организация образовалась до 2000 года, то будет предоставлено второе свидетельство)'},
                {id: 2, name: 'Копия Свидетельства о государственной регистрации юридического лица'},
                {id: 3, name: 'Копия приказа на руководителя о вступлении в должность'},
                {id: 4, name: 'Копия решения общего собрания участников Общества или протокол заседания совета директоров Общества о назначении на должность руководителя организации'},
                {id: 5, name: 'Доверенность (заверенная копия) на уполномоченное лицо, имеющее право подписи и представление интересов Потребителя'},
                {id: 6, name: 'Копия Свидетельства на право собственности помещения или копия договора аренды'},
                {id: 7, name: 'Копия документа об утверждении нормативов образования отходов и лимитов на их размещение, выданного Департаментом Федеральной службы по надзору в сфере природопользования по ЮФО, либо Министерством природных ресурсов и экологии по Ростовской области;'},
            ]
        },
        {
            id: 2,
            name: 'Для ИП',
            code: 'employer',
            data: [
                {id: 1, name: 'Копия 2 Свидетельства о постановке на учет российской организации в налоговом органе по месту ее нахождения/ или Свидетельство о постановке на учет в налоговом органе юридического лица, образованного в соответствии с законодательством РФ по месту нахождения на территории РФ до 2000 года. (Если организация образовалась до 2000 года, то будет предоставлено второе свидетельство)'},
                {id: 2, name: 'Копия Свидетельства о государственной регистрации юридического лица'},
                {id: 3, name: 'Копия приказа на руководителя о вступлении в должность'},
                {id: 4, name: 'Копия решения общего собрания участников Общества или протокол заседания совета директоров Общества о назначении на должность руководителя организации'},
                {id: 5, name: 'Доверенность (заверенная копия) на уполномоченное лицо, имеющее право подписи и представление интересов Потребителя'},
                {id: 6, name: 'Копия Свидетельства на право собственности помещения или копия договора аренды'},
                {id: 7, name: 'Копия документа об утверждении нормативов образования отходов и лимитов на их размещение, выданного Департаментом Федеральной службы по надзору в сфере природопользования по ЮФО, либо Министерством природных ресурсов и экологии по Ростовской области;'},
            ]
        },
        {
            id: 3,
            name: 'Для физ. лиц',
            code: 'civil',
            data: [
                {id: 1, name: 'Копия 3 Свидетельства о постановке на учет российской организации в налоговом органе по месту ее нахождения/ или Свидетельство о постановке на учет в налоговом органе юридического лица, образованного в соответствии с законодательством РФ по месту нахождения на территории РФ до 2000 года. (Если организация образовалась до 2000 года, то будет предоставлено второе свидетельство)'},
                {id: 2, name: 'Копия Свидетельства о государственной регистрации юридического лица'},
                {id: 3, name: 'Копия приказа на руководителя о вступлении в должность'},
                {id: 4, name: 'Копия решения общего собрания участников Общества или протокол заседания совета директоров Общества о назначении на должность руководителя организации'},
                {id: 5, name: 'Доверенность (заверенная копия) на уполномоченное лицо, имеющее право подписи и представление интересов Потребителя'},
                {id: 6, name: 'Копия Свидетельства на право собственности помещения или копия договора аренды'},
                {id: 7, name: 'Копия документа об утверждении нормативов образования отходов и лимитов на их размещение, выданного Департаментом Федеральной службы по надзору в сфере природопользования по ЮФО, либо Министерством природных ресурсов и экологии по Ростовской области;'},
            ]
        },
    ]
    let [userType, setUserType] = useState('company');
    let data = docs.find(item => item.code === userType);
    return (
        <>
            <Helmet>
                <title>Заключение договора</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                {data.id === 1 
                    ? <meta name="keywords" content="вывоз мусора официально, договор на вывоз мусора " />
                    : <meta name="keywords" content="частный вывоз мусора" />}
            </Helmet>
            <section className="text-col contract-docs__top">
                <h2 className="small-title mb-middle">Перечень документов для заключения договора</h2>
                <p className="main-text text-grey mb-middle">Для заключения договора с региональным оператором по обращению с ТКО необходимо заполнить заявку и приложить документы, заверенные печатью организации и подписью руководителя или иного уполномоченного лица.</p>
                <div className="tabs">
                    {docs.map(item => <span 
                        key={item.id} 
                        onClick={() => 
                        setUserType(item.code)} 
                        className={item.code === userType ? "tab tab_active" : "tab"}>{item.name}</span>)}
                </div>
            </section>
            <section className="text-col mt-middle">
                <ol className="ordered-list">
                    {data.data.map(item => <li key={item.id} className="ordered-list__item"><span>{item.name}</span></li>)}
                </ol>
            </section>
        </>
    );
}

export default Docs;