import api from '../api/api';
import Cookies from 'js-cookie';

const initial = {
    
}

export const sendTrashPlaceData = (data) => async (dispatch) => {
    let uploadedData = api.wrapFormData(data);
    try {
        let result = await api.post('/form/trash-place', uploadedData);
        return {success: true};
    } catch (e) {
        
        return {success: false, message: e?.response?.data?.message};
    }
}

export const signMessagesSending = (data) => async (dispatch) => {
    try {
        let result = await api.post('/form/sign-sending', data);
        return {success: true};
    } catch (e) {
       
        return {success: false, message: e?.response?.data?.message};
    }
}

export const helpTrashPasport = (data) => async (dispatch) => {
    try {
        let result = await api.post('/form/trash-pasport', data);
        return {success: true};
    } catch (e) {
    
        return {success: false, message: e?.response?.data?.message};
    }
}

export const callOrder = (data) => async (dispatch) => {
    try {
        let result = await api.post('/form/call-order', data);
        return {success: true};
    } catch (e) {
       
        return {success: false, message: e?.response?.data?.message};
    }
}

export const sendResume = (data) => async (dispatch) => {
    let uploadedData = api.wrapFormData(data);
    try {
        let result = await api.post('/form/resume', uploadedData);
        return {success: true};
    } catch (e) {
      
        return {success: false, message: e?.response?.data?.message};
    }
}

export const becomePartner = (data) => async (dispatch) => {
    try {
        let result = await api.post('/form/partner', data);
        return {success: true};
    } catch (e) {
        
        return {success: false, message: e?.response?.data?.message};
    }
}

export const makeNewQuestion = (data) => async (dispatch) => {
    try {
        let result = await api.post('/form/question', data);
        return {success: true};
    } catch (e) {

        return {success: false, message: e?.response?.data?.message};
    }
}

export const makeNewMessageTheme = (data) => async (dispatch) => {
    try {
        data = api.wrapFormData(data);
        let result = await api.post('/form/new-message-theme', data);
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const createNewAgreement = (data) => async (dispatch) => {
    let formData = api.wrapFormData(data);
    try {
        let result = await api.post('/form/new-agreement', formData);
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const getOriginalAccount = (data) => async (dispatch) => {
    let body = {
        accounts: data
    }
    try {
        let result = await api.post('/form/account', body);
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const formReducer = (state = initial, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}