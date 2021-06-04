import React, {useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Action from './Action/Action';
import Common from './Common/Common';
import Info from './Info/Info';
import Modal from './Modal/Modal';
import Job from './Job/Job';
import JobDetail from './JobDetail/JobDetail';
import SectionNav from '../../components/SectionNav/SectionNav';
import {wrapModal} from '../../components/Modal/Modal';
import '../../css/company/company.css';

const Company = (props) => {   
    const menu = useSelector(state => state.main.menu);
    const elem = menu.find(item => item.id === 2); 
    let [modalVisible, setModalVisible] = useState(false);
    let [modalResult, setModalResult] = useState(false);
    let ModalBlock = wrapModal(Modal, {
        visible: modalVisible,
        callback: () => setModalVisible(false),
        repeat: () => setModalResult(false),
        result: modalResult,
        errorTitle: 'Ваше резюме не отправлено!',
        errorText: 'Произошла ошибка, попробуйте еще раз или зайдите позднее',
        successTitle: 'Ваше резюме отправлено',
        successText: 'Спасибо за обращение'
    })
    let activeLink = useLocation();
    let linkArr = activeLink.pathname.split('/').length;
    return (
        <div className="company">
            {linkArr < 4 && <div className="block"><SectionNav {...elem} /> </div>}
            <Switch>
                <Route exact path="/o-kompanii">
                    <Common  />
                </Route>
                <Route path="/o-kompanii/deyatelnost">
                    <Action  />
                </Route>
                <Route path="/o-kompanii/raskritie-informatchii">
                    <Info  />
                </Route>
                <Route exact path="/o-kompanii/vakansii">
                    <Job  openModal={() => setModalVisible(true)} />
                </Route>
                <Route path="/o-kompanii/vakansii/:id">
                    <JobDetail  openModal={() => setModalVisible(true)} />
                </Route>
            </Switch>
            <ModalBlock setModalResult={setModalResult}/>
        </div>
    );
}

export default Company;