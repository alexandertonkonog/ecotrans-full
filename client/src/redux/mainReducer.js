import axios from 'axios';
import W from 'wialonjs-api';
import service from '../images/service.jpg';
import company from '../images/company.jpg';
import doc from '../images/document.jpg';
import api from '../api/api';

const MAIN = "MAIN";
const RESIZE_SCREEN = "RESIZE_SCREEN";
const SET_BREADCRUMBS = "SET_BREADCRUMBS";

export const resizeScreen = (val) => (dispatch) => {
    dispatch({type: RESIZE_SCREEN, payload: val});
}

export const setBreadcrumbs = (data) => (dispatch) => {
    dispatch({type: SET_BREADCRUMBS, data});
}

const initial = {
    screenWidth: 0,
    menu: [
        {
            id: 1,
            title: 'Услуги',
            img: service,
            code: 'service',
            link: '/uslugi', 
            hasChildren: true,
            openMobile: false,
            showInMenu: true,
            showInMobileMenu: true,
            data: [
                {id: 1, name: 'Транспортировка ТКО', link: '/uslugi/transportirovka-tko'},
                {id: 2, name: 'Транспортировка  прочих отходов', link: '/uslugi/prochie-othodi'},
                {id: 3, name: 'Сбор вторсырья', link: '/uslugi/sbor-vtorsirya'},
                {id: 4, name: 'Паспортизация отходов', link: '/uslugi/pasportizaciya-othodov'},
            ]
        },
        {
            id: 2,
            title: 'О компании',
            img: company,
            varName: 'Company',
            code: 'company',
            link: '/o-kompanii', 
            hasChildren: true,
            openMobile: false,
            showInMenu: true,
            showInMobileMenu: true,
            data: [
                {id: 1, name: 'Общая информация', link: '/o-kompanii', code: 'common', exact: true},
                {id: 2, name: 'Деятельность', link: '/o-kompanii/deyatelnost', code: 'action'},
                {id: 3, name: 'Раскрытие информации', link: '/o-kompanii/raskritie-informatchii', code: 'info'},
                {id: 4, name: 'Вакансии', link: '/o-kompanii/vakansii', code: 'job'},
            ]
        },
        {
            id: 3,
            title: 'Партнерам',
            code: 'partner',
            link: '/partneram',
            showInMenu: true,
            showInMobileMenu: true,
        },
        {
            id: 4,
            title: 'Документы',
            img: doc,
            code: 'document',
            link: '/dokumenti', 
            hasChildren: true,
            openMobile: false,
            ecotrans: true,
            showInMenu: true,
            showInMobileMenu: true,
            data: [
                {id: 1, name: 'Законодательство', link: '/dokumenti/zakonodatelstvo'},
                {id: 2, name: 'Заключение договора', link: '/dokumenti/zakluchenie-dogovora'},
                {id: 3, name: 'Документы потребителям', link: '/dokumenti/dokumenti-potrebitelyam'},
                {id: 4, name: 'Запрещается', link: '/dokumenti/zapreschaetsya'},
            ]
        },
        {
            id: 5,
            title: 'Контакты',
            code: 'contact',
            link: '/kontakti',
            showInMenu: true,
            showInMobileMenu: true,
        },
        {
            id: 6,
            title: 'Ответы на вопросы',
            code: 'question',
            link: '/otveti-na-voprosi',
            hasChildren: true,
            openMobile: false,
            showInMobileMenu: true,
            data: [
                {id: 1, name: 'Для юр.лиц', link: '/otveti-na-voprosi', exact: true},
                {id: 2, name: 'Для ИП', link: '/otveti-na-voprosi/ip'},
                {id: 3, name: 'Для физ. лиц', link: '/otveti-na-voprosi/fizicheskie-litsa'},
                {id: 4, name: 'Заключение договора', link: '/otveti-na-voprosi/zakluchenie-dogovora'},
                {id: 5, name: 'Оплата на сайте', link: '/otveti-na-voprosi/oplata-na-saite'},
            ]
        },
        {
            id: 7,
            title: 'Тарифы',
            code: 'cost',
            link: '/tarifi',
            hasChildren: true,
            data: [
                {id: 1, name: 'Для юр.лиц', link: '/tarifi', exact: true},
                {id: 2, name: 'Для ИП', link: '/tarifi/ip'},
                {id: 3, name: 'Для физ. лиц', link: '/tarifi/fizicheskie-litsa'},
            ]
        },
        {
            id: 8,
            title: 'Новости',
            code: 'new',
            link: '/novosti',
        },
        {
            id: 9,
            title: 'Контакты',
            code: 'contact',
            link: '/kontakti',
        },
        {
            id: 10,
            title: 'Личный кабинет',
            code: 'lk',
            link: '/personal', 
            hasChildren: true,
            data: [
                {id: 1, name: 'Личный кабинет', link: '/personal'},
                {id: 2, name: 'Заключить договор', link: '/personal/agreement'},
                {id: 3, name: 'Сверка взаиморасчетов', link: '/personal/operations'},
                {id: 4, name: 'Платежные документы', link: '/personal/documents'},
                {id: 5, name: 'Личные данные', link: '/personal/personal-data'},
                {id: 6, name: 'Обращения', link: '/personal/messages'},
            ]
        },
        {
            id: 11,
            title: 'Политика конфиденциальности',
            code: 'privacy',
            link: '/politika-konfidencialnosti',
        },
    ],
    serviceAreas: [
        {id: 1, text: 'МО город Таганрог'},
        {id: 2, text: 'МО «Куйбышевский район»'},
        {id: 3, text: 'МО «Матвеево-Курганский район»'},
        {id: 4, text: 'МО «Неклиновский район»'},
    ],
    breads: null
};

export const getWialonData = () => async (dispatch) => {
    // let sess = await new W.Session('https://web.erc61.ru', {
    //     eventsTimeout: 5
    // });
    
    // let params = { token: '95fdd1ae293740597b643ec5b61253fbC4DDE501B6B88A1CFB9B28657B06E3EDC9C5BE3D' };
    // sess.execute('token/login', params, (res) => {
    //     debugger
    //     if (!res.error) {
    //         let params = {spec:[{"type":"type","data":"avl_unit","flags":0x0401,"mode":0}]};
    //         sess.execute('core/update_data_flags', params, (data) => {
    //             console.log(sess.getItems('avl_unit'))
    //         });    
    //     } else {
    //         console.log(sess.getItems('avl_unit'))
    //     }
    // })
}

export const mainReducer = (state = initial, action) => {
    switch (action.type) {
        case MAIN: {
            return state;
        }
        case RESIZE_SCREEN: {
            return {
                ...state,
                screenWidth: action.payload
            };
        }
        case SET_BREADCRUMBS: {
            return {
                ...state,
                breads: action.data
            };
        }
        default: {
            return state;
        }
    }
}