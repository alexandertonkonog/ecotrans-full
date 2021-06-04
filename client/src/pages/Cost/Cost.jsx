import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEntities } from '../../redux/iblockReducer';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation } from 'react-router-dom';
import SectionNav from '../../components/SectionNav/SectionNav';
import Law from './Law/Law';
import '../../css/que/que.css';

const Que = () => {
    let [pageLoading, setPageLoading] = useState(false);
    const types = [
        {id: 1, name: 'ul'},
        {id: 2, name: 'ip'},
        {id: 3, name: 'fizicheskie-litsa'},
    ]

    const dispatch = useDispatch();
    const costs = useSelector(state => state.iblock.costs);
    const location = useLocation();
    const pathnameArray = location.pathname.split('/');
    const linkId = pathnameArray.length < 3 ? 'ul' : pathnameArray[2];
    const type = types.find(item => item.name === linkId);
    
    const menu = useSelector(state => state.main.menu);
    const elem = menu.find(item => item.id === 7); 

    useEffect(() => {
        const getEntitiesFunction = async () => {
            setPageLoading(true)
            await dispatch(getEntities({
                id: 14, 
                limit: 100, 
                page: 1, 
                type: type.id, 
                fieldId: 20,
                
            }))
            setPageLoading(false)
        }
        getEntitiesFunction()
    }, [type.id]);

    return (
        <div className="que">
            <Helmet>
                <title>Тарифы</title>
                <meta name="description" content="Региональный оператор ООО «ЭКОТРАНС» обеспечивает вывоз отходов и экологически безопасную утилизацию твердых коммунальных отходов (ТКО) в зоне Неклиновского МЭОК." />
                <meta name="keywords" content="вывоз отходов, вывоз мусора, вывоз строительного мусора" />
            </Helmet>
            <div className="que-header block">
                <SectionNav {...elem} />
            </div> 
            <Switch>
                <Route path="/tarifi">
                    <Law costs={costs} pageLoading={pageLoading} />
                </Route>
                <Route path="/tarifi/ip">
                    <Law costs={costs} pageLoading={pageLoading} />
                </Route>
                <Route path="/tarifi/fizicheskie-litsa">
                    <Law costs={costs} pageLoading={pageLoading} />
                </Route>
            </Switch>
        </div>
    );
}

export default Que;