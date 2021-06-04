import React from 'react';
import { Switch, Route } from 'react-router';
import {Helmet} from 'react-helmet';
import All from './All/All';
import TKO from './TKO/TKO';
import Other from './Other/Other';
import Pasport from './Pasport/Pasport';
import Second from './Second/Second';
import '../../css/service/service.css';

const Service = () => {
    return (
        <div className="service">
            <Helmet>
                <title>Услуги</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="демонтаж, снос зданий, вывоз мусора, вывоз строительного мусора, оформить паспорта отходов, сдать вторичное сырье, региональный оператор" />
            </Helmet>
            <Switch>
                <Route exact path="/uslugi">
                    <All />
                </Route>
                <Route path="/uslugi/transportirovka-tko">
                    <TKO />
                </Route>
                <Route path="/uslugi/prochie-othodi">
                    <Other />
                </Route>
                <Route path="/uslugi/pasportizaciya-othodov">
                    <Pasport />
                </Route>
                <Route path="/uslugi/sbor-vtorsirya">
                    <Second />
                </Route>
            </Switch>
        </div>
    );
}

export default Service;