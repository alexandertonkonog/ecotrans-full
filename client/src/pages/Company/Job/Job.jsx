import React from 'react';
import {Helmet} from 'react-helmet';
import JobList from './JobList/JobList';
import Form from './Form/Form';
import More from '../../../components/More/More';
import '../../../css/company/job.css';

const Job = (props) => {
    return (
        <div className="job block">
            <Helmet>
                <title>Вакансии</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <JobList openModal={props.openModal} />
            <Form />
            <More text="Узнайте больше об услугах компании" link="/uslugi" />
        </div>
    );
}

export default Job;