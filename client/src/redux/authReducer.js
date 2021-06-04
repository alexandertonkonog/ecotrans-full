import api from '../api/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SET_AUTH = 'SET_AUTH';
const SET_AUTH_CHECKED_STATUS = 'SET_AUTH_CHECKED_STATUS';
const DISABLE_AUTH = 'DISABLE_AUTH';
const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
const SAVE_AUTH_PATH = 'SAVE_AUTH_PATH';
const REFRESH_USER = 'REFRESH_USER';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_PAYMENTS = 'SET_PAYMENTS';
const SET_SERVICES = 'SET_SERVICES';
const SET_FORGOT_DATA = 'SET_FORGOT_ID';

const setCookieToken = (token) => {
    Cookies.set('token', encodeURIComponent(token), { expires: 7 });
}

export class ForgotPassword {
    static checkEmail(data) {
        return async (dispatch) => {
            try {
                let result = await api.post('/auth/forgot', data);
                dispatch({type: SET_FORGOT_DATA, data: result.data});
                return {success: true};
            } catch (e) {
                return {success: false, message: e?.response?.data?.message};
            } 
        }
    }
    
    static refreshPassword(data) {
        return async (dispatch, getState) => {
            try {
                const id = getState().auth.forgot.id;
                let result = await api.post('/profile/password/forgot', {...data, id});
                dispatch({type: SET_FORGOT_DATA, data: null});
                return {success: true};
            } catch (e) {
                return {success: false, message: e?.response?.data?.message};
            } 
        }
    }

    static checkCode(forgot, code) {
        return bcrypt.compareSync(code, forgot);
    }
} 

export const getRegister = (data) => async (dispatch) => {
    try {
        dispatch({type: SET_AUTH_LOADING, loading: true});
        let result = await api.post('/auth/registration', data);
        dispatch({type: SET_AUTH_LOADING, loading: false});
        return {success: true};
    } catch (e) {
        dispatch({type: SET_AUTH_LOADING, loading: false});
        return {success: false, message: e?.response?.data?.message};
    } 
}

export const getLogin = (data) => async (dispatch) => {
    try {
        dispatch({type: SET_AUTH_LOADING, loading: true});
        let result = await api.post('/auth/login', data);
        dispatch({type: SET_AUTH, data: result.data.token, user: result.data.user});
        setCookieToken(result.data.token); 
        dispatch({type: SET_AUTH_LOADING, loading: false});
        return {success: true};
    } catch (e) {
        dispatch({type: SET_AUTH_LOADING, loading: false});
        return {success: false, message: e?.response?.data?.message};
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        let result = await api.post('/auth');
        dispatch({type: SET_AUTH, data: result.data.token, user: result.data.user});
    } catch (e) {
        dispatch({type: SET_AUTH_CHECKED_STATUS});
        return {success: false, message: e?.response?.data?.message};
    }   
}

export const getUserData = () => async (dispatch) => {
    try {
        let result = await api.get('/profile');
        dispatch({type: REFRESH_USER, user: result.data});
        return {success: true};
    } catch (e) {
        return {success: false};
    }
}

export const saveNewProfileData = (data) => async (dispatch) => {
    try {
        let result = await api.post('/profile', data);
        dispatch({type: REFRESH_USER, user: result.data});
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const saveNewPassword = (data) => async (dispatch) => {
    try {
        let result = await api.post('/profile/password', data);
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const exitFromLK = () => async (dispatch) => {
    dispatch({type: DISABLE_AUTH});
    Cookies.remove('token');
}

export const makeLoadingStatus = (loading) => (dispatch) => {
    dispatch({type: SET_AUTH_LOADING, loading});
}

export const saveAuthPath = (path) => (dispatch) => {
    dispatch({type: SAVE_AUTH_PATH, path})
}

export const getAccounts = (options) => async (dispatch) => {
    let {id, limit, page, start, end} = options;
    limit = limit || 10;
    start = start || '';
    end = end || '';
    let offset = (page - 1) * limit;
    try {
        let result = await api.get(`/profile/accounts?id=${id}&limit=${limit}&offset=${offset}&start=${start}&end=${end}`);
        dispatch({type: SET_ACCOUNTS, data: result.data.accounts, count: result.data.count});
        return {success: true};
    } catch (e) {
        
        return {success: false, message: e?.response?.data?.message};
    }
}   

export const getPayments = (options) => async (dispatch) => {
    let {id, limit, page, start, end} = options;
    limit = limit || 10;
    start = start || '';
    end = end || '';
    let offset = (page - 1) * limit;
    try {
        let result = await api.get(`/profile/payments?id=${id}&limit=${limit}&offset=${offset}&start=${start}&end=${end}`);
        dispatch({type: SET_PAYMENTS, data: result.data.payments, count: result.data.count});
        return {success: true};
    } catch (e) {
        
        return {success: false, message: e?.response?.data?.message};
    }
}   

export const getServices = () => async (dispatch) => {
    try {
        let result = await api.get(`/profile/services`);
        dispatch({type: SET_SERVICES, data: result.data});
        return {success: true};
    } catch (e) {
        
        return {success: false, message: e?.response?.data?.message};
    }
}

export const createPayment = async (summ) => {
    let result = await axios.post('https://api.yookassa.ru/v3/payments', {
        amount: {
            value: summ,
            currency: "RUB"
        },
        capture: true,
        confirmation: {
            type: "redirect",
            return_url: "http://localhost:3000/personal"
        },
        description: "Заказ №1"
    }, {
        headers: {
            // 'Authorization': '810049:test_rWA3Aqg8ZM5AhJUDiGXPrP0lXe9xbp-MgBN9skqJllE',
            'Idempotence-Key': String(Date.now()),
            'Content-Type': 'application/json'
        },
        auth: {
            username: '810049',
            password: 'test_rWA3Aqg8ZM5AhJUDiGXPrP0lXe9xbp-MgBN9skqJllE'
        },
    })
    console.log(result)
} 


const initial = {
    auth: false,
    isAuthChecked: false,
    token: null,
    role: 2,
    loading: false,
    user: null,
    savedPath: null,
    accounts: null,
    payments: null,
    services: null,
    forgot: null,
}

export const authReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_AUTH: 
            return {
                ...state,
                auth: true,
                token: action.data,
                user: action.user,
                isAuthChecked: true,
            }
        case SET_AUTH_CHECKED_STATUS: 
            return {
                ...state,
                isAuthChecked: true,
            }
        case DISABLE_AUTH: 
            return {
                ...state,
                auth: false,
                token: null,
                user: null
            }
        case REFRESH_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_AUTH_LOADING: 
            return {
                ...state,
                loading: action.loading
            }
        case SAVE_AUTH_PATH: 
            return {
                ...state,
                savedPath: action.path
            }
        case SET_ACCOUNTS: 
            return {
                ...state,
                accounts: {
                    list: action.data || [],
                    count: action.count
                }
            }
        case SET_PAYMENTS: 
            return {
                ...state,
                payments: {
                    list: action.data || [],
                    count: action.count
                }
            }
        case SET_SERVICES: 
            return {
                ...state,
                services: action.data
            }
        case SET_FORGOT_DATA: 
            return {
                ...state,
                forgot: action.data
            }
        default: {
            return state;
        }
    }
}