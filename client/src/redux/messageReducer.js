import api from '../api/api';
import { sortForDate } from '../dev/functions';

const SET_DIALOGS_LOADING = 'SET_DIALOGS_LOADING';
const SET_MESSAGES_LOADING = 'SET_DIALOGS_LOADING';
const SET_DIALOGS = 'SET_DIALOGS';
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const SET_MORE_MESSAGES = 'SET_MORE_MESSAGES';
const SET_ONE_MESSAGE = 'SET_ONE_MESSAGE';
const CHANGE_READ_MESSAGES = 'CHANGE_READ_MESSAGES';
const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES';
const REMOVE_ONE_MESSAGES = 'REMOVE_ONE_MESSAGES';

const initial = {
    messages: {},
    dialogs: [],
    dialogLoading: true,
    messageLoading: true
}

export const getDialogs = () => async (dispatch) => {
    try {
        dispatch({type: SET_DIALOGS_LOADING, data: true});
        dispatch({type: SET_MESSAGES_LOADING, data: true});   
        let themes = await api.get('/message/dialogs');
        dispatch({type: SET_DIALOGS, data: themes.data});
        dispatch({type: SET_DIALOGS_LOADING, data: false});
        dispatch({type: SET_MESSAGES_LOADING, data: false}); 
        return {success: true};
    } catch (e) {
        dispatch({type: SET_DIALOGS_LOADING, data: false});
        dispatch({type: SET_MESSAGES_LOADING, data: false}); 
    }
}

export const getMessages = (id, count = 10) => async (dispatch) => {
    try {
        dispatch({type: SET_MESSAGES_LOADING, data: true});  
        let messages = await api.get(`/message/messages?id=${id}&count=${count}`);
        dispatch({type: SET_ALL_MESSAGES, data: messages.data});
        dispatch({type: SET_MESSAGES_LOADING, data: false});  
        return {success: true};
    } catch (e) {
        dispatch({type: SET_MESSAGES_LOADING, data: false});
    }
}

export const getMoreMessages = (id, offset, count = 10) => async (dispatch) => {
    try {
        let messages = await api.get(`/message/messages?id=${id}&offset=${offset}&count=${count}`);
        dispatch({type: SET_MORE_MESSAGES, data: messages.data});
        return {success: true};
    } catch (e) {

    }
}

export const readMessage = (id) => async (dispatch) => {
    try {
        let response = await api.post('/message/read', {id});
        dispatch({type: CHANGE_READ_MESSAGES, id});
        return {success: true};
    } catch (e) {

    }
}

export const newMessage = (values) => async (dispatch) => {
    try {
        let formData = api.wrapFormData(values);
        let response = await api.post('/message/new-message', formData);
        dispatch({type: SET_ONE_MESSAGE, data: response.data, id: values.id })
    } catch (e) {
        
    }
}

export const messageReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_DIALOGS: { 
            if (action.data.count) {
                let themeId = String(action.data.messages[0].themeId);
                let newMessages = {...state.messages};
                newMessages[themeId] = {
                    list: action.data.messages.sort(sortForDate),
                    count: action.data.messageCount
                }
                return {
                    ...state,
                    dialogs: action.data.themes,
                    messages: newMessages,
                }
            } else {
                return state;
            }
        }
        case SET_ALL_MESSAGES: {
            
            let themeId = String(action.data.messages[0].themeId);
            
            let newMessages = {...state.messages};
            
            newMessages[themeId] = {
                list: action.data.messages.sort(sortForDate),
                count: action.data.messageCount,
            };

            return {
                ...state,
                messages: newMessages
            }
        }
        case SET_MORE_MESSAGES: {

            let themeId = String(action.data.messages[0].themeId);
            let newMessages = {...state.messages};
            newMessages[themeId] = {
                list: [...action.data.messages.sort(sortForDate), ...newMessages[themeId].list],
                count: action.data.messageCount
            };
    
            return {
                ...state,
                messages: newMessages
            }
        }
        case REMOVE_ALL_MESSAGES: 
            return {
                ...state,
                messages: {}
            }
        case REMOVE_ONE_MESSAGES: 
            return {
                ...state,
                messages: {}
            }
        case SET_DIALOGS_LOADING: 
            return {
                ...state,
                dialogLoading: action.data
            }
        case SET_MESSAGES_LOADING: 
            return {
                ...state,
                messageLoading: action.data
            }
        case CHANGE_READ_MESSAGES:
            return {
                ...state,
                dialogs: state.dialogs.map(item => {
                    if (item.id === action.id) {
                        return {...item, unread: 0};
                    }
                    return item;
                })
            }
        case SET_ONE_MESSAGE:
            let messages = state.messages[action.id];
            messages = {
                list: [...messages.list, action.data.message],
                count: action.data.messageCount
            };
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.id]: messages
                }
            }
        default: {
            return state;
        }
    }
}