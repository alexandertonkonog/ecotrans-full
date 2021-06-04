import React from 'react';
import {Helmet} from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import '../../css/document/document.css';
import All from './All/All';
import Law from './Law/Law';
import Contract from './Contract/Contract';
import User from './User/User';
import Ban from './Ban/Ban';

const Doc = () => {
    return (
        <>
        <Helmet>
            <title>Документы</title>
            <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
            <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
        </Helmet>
        <Switch>
            <Route exact path="/dokumenti">
                <All />
            </Route>
            <Route path="/dokumenti/zakonodatelstvo">
                <Law />
            </Route>
            <Route path="/dokumenti/zakluchenie-dogovora">
                <Contract />
            </Route>
            <Route path="/dokumenti/dokumenti-potrebitelyam">
                <User />
            </Route>
            <Route path="/dokumenti/zapreschaetsya">
                <Ban />
            </Route>
        </Switch>
        </>
    );
}

export default Doc;