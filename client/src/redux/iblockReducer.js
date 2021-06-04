import api from '../api/api';

const GET_ENTITIES = "GET_ENTITIES";
const GET_ENTITY = "GET_ENTITY";
const GET_IBLOCKS = "GET_IBLOCKS";

const initial = {
    news: null,
    detailNew: null,
    sales: null,
    detailSale: null,
    partners: null,
    detailPartner: null,
    auto: null,
    detailAuto: null,
    iblocks: null,
    mainPageSlides: null
}

const getNeedKey = (id, selector) => {
    const entitiesKeys = [
        {id: 1, key: 'news'},
        {id: 2, key: 'sales'},
        {id: 3, key: 'partners'},
        {id: 4, key: 'auto'},
        {id: 5, key: 'lawDocs'},
        {id: 6, key: 'userDocs'},
        {id: 7, key: 'agreeDocs'},
        {id: 8, key: 'mainPageSlides'},
        {id: 9, key: 'projects'},
        {id: 10, key: 'polygons'},
        {id: 11, key: 'techs'},
        {id: 12, key: 'companyInfoDocs'},
        {id: 13, key: 'jobs'},
        {id: 14, key: 'costs'},
        {id: 15, key: 'questions'},
        {id: 16, key: 'offices'},
        {id: 17, key: 'bans'},
        {id: 18, key: 'trashClasses'},
        {id: 19, key: 'companyPartners'},
        {id: 20, key: 'partnerRights'},
        {id: 21, key: 'partnerEq'},
        {id: 22, key: 'partnerResident'},
    ]
    const entityKeys = [
        {id: 1, key: 'detailNew'},
        {id: 2, key: 'detailSale'},
        {id: 3, key: 'detailPartner'},
        {id: 4, key: 'detailAuto'},
        {id: 5, key: 'detailLawDocs'},
        {id: 6, key: 'detailUserDocs'},
        {id: 7, key: 'detailAgreeDocs'},
        {id: 8, key: 'detailMainPageSlides'},
        {id: 9, key: 'detailProject'},
        {id: 10, key: 'detailPolygon'},
        {id: 11, key: 'detailTech'},
        {id: 12, key: 'detailCompanyInfoDocs'},
        {id: 14, key: 'detailCosts'},
        {id: 13, key: 'detailJobs'},
        {id: 15, key: 'detailQuestions'},
        {id: 16, key: 'detailOffices'},
        {id: 17, key: 'detailBans'},
        {id: 18, key: 'detailTrashClasses'},
        {id: 19, key: 'detailCompanyPartners'},
        {id: 20, key: 'detailPartnerRights'},
        {id: 21, key: 'detailPartnerEq'},
        {id: 22, key: 'detailPartnerResident'},
    ]
    if (selector) {
        return entitiesKeys.find(item => item.id === id).key;
    } else {
        return entityKeys.find(item => item.id === id).key;
    }
}

export const getEntities = (options) => async (dispatch) => {
    let { limit, page, type, time, id, props, fieldId, order } = options;
    let date = new Date();
    let timeArray = ['', +(new Date(date.getFullYear(), 0, 1)), +(new Date(date.getFullYear(), date.getMonth(), 1))];
    limit = limit || 10;
    type = type || '';
    fieldId = fieldId || ''
    time = time ? timeArray[time] : '';
    order = order ? JSON.stringify(order) : '';
    props = props ? JSON.stringify(props) : '';
    let offset = (page - 1) * limit;
    try {
        let result = await api.get(`/iblock/entities?limit=${limit}&offset=${offset}&type=${type}&time=${time}&id=${id}&props=${props}&fieldId=${fieldId}&order=${order}`);
        dispatch({type: GET_ENTITIES, data: result.data.elements, count: result.data.count, key: getNeedKey(id, true)});
        return {success: true};
    } catch (e) {
    
        return {success: false, message: e?.response?.data?.message};
    }
}

export const getEntity = (options) => async (dispatch) => {
    let { link, id } = options;
    try {
        let result = await api.get(`/iblock/entity?link=${link}&id=${id}`);
        dispatch({type: GET_ENTITY, data: {...result.data.data, next: result.data.next}, key: getNeedKey(id, false)});
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message};
    }
}

export const setEntity = (data) => async (dispatch) => {
    let formData = api.wrapFormDataWithKey(data);
    try {
        let result = await api.post('/iblock/entity/manyset', formData);
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message}; 
    }
}

export const getIBlocks = () => async (dispatch) => {
    try {
        let result = await api.get('/iblock');
        dispatch({type: GET_IBLOCKS, data: result.data});
        return {success: true};
    } catch (e) {
        return {success: false, message: e?.response?.data?.message}; 
    }
}

export const iblockReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ENTITIES: 
            return {
                ...state,
                [action.key]: {
                    count: action.count,
                    list: action.data
                }
            }
        case GET_ENTITY: 
            return {
                ...state,
                [action.key]: action.data
            }
        case GET_IBLOCKS: 
            return {
                ...state,
                iblocks: action.data
            }
        default: {
            return state;
        }
    }
}