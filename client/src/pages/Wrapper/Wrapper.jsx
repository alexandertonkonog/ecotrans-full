import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { saveAuthPath } from '../../redux/authReducer';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Common/Error/Error';
import Home from '../Home/Home';
import Company from '../Company/Company';
import News from '../News/News';
import New from '../News/New';
import Forgot from '../Forgot/Forgot';
import PromoDetail from '../Home/Promo/PromoDetail';
import Service from '../Service/Service';
import Partner from '../Partner/Partner';
import Doc from '../Document/Document';
import Cost from '../Cost/Cost';
import Que from '../Question/Question';
import Contact from '../Contact/Contact';
import Message from '../Message/Message';
import Bread from '../../components/Bread/Bread';
import LK from '../LK/LK';
import Privacy from '../Privacy/Privacy';
import Create from '../Create';

const getRedirectBlock = (Node) => (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthChecked = useSelector(state => state.auth.isAuthChecked);
    const auth = useSelector(state => state.auth.auth);
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!auth) {
                history.push('/not-authorized');
            }
        }, 7000)
        return () => {
            clearTimeout(timeout);
        }
    }, [auth])
    
    if (!auth && !isAuthChecked) {
        return  <div className="block main-padding">
                    <Loader addClass="loader_big" />
                </div>
    }

    return auth ? <Node {...props} /> : <Redirect to="/not-authorized" />;
}

const LKBlock = getRedirectBlock(LK);
const MessageBlock = getRedirectBlock(Message);

const Wrapper = (props) => {
    return (
        <div className="wrapper">
            <Bread />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/o-kompanii">
                    <Company  />  
                </Route>
                <Route exact path="/novosti">
                    <News  />  
                </Route>
                <Route exact path="/novosti/:id">
                    <New  />  
                </Route>
                <Route exact path="/akcii/:id">
                    <PromoDetail  />  
                </Route>
                <Route path="/uslugi">
                    <Service  />  
                </Route>
                <Route path="/partneram">
                    <Partner  />  
                </Route>
                <Route path="/dokumenti">
                    <Doc  />  
                </Route>
                <Route path="/otveti-na-voprosi">
                    <Que  /> 
                </Route>
                <Route path="/kontakti">
                    <Contact  /> 
                </Route>
                <Route path="/personal/messages">
                    <MessageBlock />
                </Route>
                <Route path="/personal">
                    <LKBlock />
                </Route>
                <Route path="/tarifi">
                    <Cost />
                </Route>
                <Route path="/politika-konfidencialnosti">
                    <Privacy />
                </Route>
                <Route path="/forgot-password">
                    <Forgot />
                </Route>

                <Route path="/create">
                    <Create />
                </Route>

                <Route path="/not-authorized">
                    <Error 
                        name="Вы не авторизованы" 
                        code={401}
                        text="Чтобы просматривать страницы Личного кабинета, авторизуйтесь, кликнув по кнопке в верхнем правом углу" />
                </Route>
                <Route path="/success">
                    <Error 
                        name="Вы подтвердили электронную почту" 
                        code="Успешно"
                        text="Чтобы просматривать страницы Личного кабинета, авторизуйтесь, кликнув по кнопке в верхнем правом углу" />
                </Route>
                <Route path="*">
                    <Error 
                        name="Страница не найдена" 
                        code={404}
                        text="Страница удалена или указан неправильный адрес" />
                </Route>

            </Switch>
        </div>
    );
}

export default Wrapper;