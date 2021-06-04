import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resizeScreen} from './redux/mainReducer';
import {checkAuth} from './redux/authReducer';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Wrapper from './pages/Wrapper/Wrapper';
import Modal from './pages/Modal/Modal';
import Register from './pages/Register/Register';
import {wrapModal} from './components/Modal/Modal';
import { useHistory } from 'react-router-dom';

const App = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const setVersion = () => {
		dispatch(resizeScreen(document.documentElement.offsetWidth));
	}
	const callBackListen = () => {
		window.scrollTo(0, 0);
    }

	let isAuth = useSelector(state => state.auth.auth);

	let [modalVisible, setModalVisible] = useState(false);
	let [modalResult, setModalResult] = useState(false);
	let [registerVisible, setRegisterVisible] = useState(false);

    let ModalBlock = wrapModal(Modal, {
        visible: modalVisible,
		result: modalResult,
		errorTitle: 'Данные не отправлены!',
		errorText: 'Произошла ошибка, попробуйте еще раз или зайдите позже',
		successTitle: 'Ваша заявка отправлена!',
		successText: 'В ближайшее время с вами свяжется менеджер',
        callback: () => {
			setModalVisible(false);
			setModalResult(false);
		},
    });
    let RegisterBlock = wrapModal(Register, {
        visible: registerVisible,
        callback: () => {
			setRegisterVisible(false);
		},
    });
    
	history.listen(callBackListen);
	
	useEffect(() => {
		window.addEventListener('resize', () => {
			setVersion();
		});
		setVersion();
		return () => {
			window.removeEventListener('resize', () => {
				setVersion();
			});
		}
	}, []);

	useEffect(() => {
		dispatch(checkAuth());
	}, [isAuth]);

  	return (
		<>
			<Header openModal={() => setModalVisible(true)} openRegisterModal={() => setRegisterVisible(1)} />
			<Wrapper isAuth={isAuth} />
			<Footer />
			<ModalBlock setModalResult={setModalResult} />
			<div className="reg-block" >
				<RegisterBlock moduleType={registerVisible} changeRegisterModal={setRegisterVisible} />
			</div>
		</>
  	);
};

let mapStateToProps = state => {
	
}

export default App;
