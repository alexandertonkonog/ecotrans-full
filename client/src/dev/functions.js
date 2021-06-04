export const declOfNum = (n, text_forms) => {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

export const getSliderPagination = (len, scroll) => {
    let result = [];
    if (scroll === 1) {
        for(let i = 0; i < len; i++) {
            result.push(i);
        }
    } else {
        for(let i = 0; i < len; i++) {
            if (i % scroll === 0) {
                result.push(i);
            }
        }
    } 
    return result;
}

export const cutText = (text, len = 50) => {
    return text.length > len
        ? text.slice(0, len - 3) + '...'
        : text
}

export class DateFormat {

    static backTimeFormat(str) {
        const today = new Date();
        let date = new Date(str);
        let dif = today.getTime() - date.getTime();
        let final = Math.floor(dif / 3600000);
        if (final <= 1) return 'Только что';
        if (final > 23) {
            return this.getFormatStr(date.getDate()) + '.' + this.getFormatStr(date.getMonth() + 1) + '.' + date.getFullYear();
        }
        return Math.abs(final) + ' ' + declOfNum(final, ['час', 'часа', 'часов']) + ' назад';
    }

    static getTodayTimeOrDateTime(str) {
        const today = new Date();
        let date = new Date(str);
        if (today.getDate() === date.getDate() 
        && today.getMonth() === date.getMonth() 
        && today.getFullYear() === date.getFullYear()) {
            return this.getFormatStr(date.getHours()) + ':' + this.getFormatStr(date.getMinutes());
        } else {
            return this.getFormatStr(date.getDate()) + '.' + this.getFormatStr(date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + this.getFormatStr(date.getHours()) + ':' + this.getFormatStr(date.getMinutes());
        }
    }
    
    static getTodayTimeOrDate(str) {
        const today = new Date();
        let date = new Date(str);
        if (today.getDate() === date.getDate() 
        && today.getMonth() === date.getMonth() 
        && today.getFullYear() === date.getFullYear()) {
            return this.getFormatStr(date.getHours()) + ':' + this.getFormatStr(date.getMinutes());
        } else {
            return this.getFormatStr(date.getDate()) + '.' + this.getFormatStr(date.getMonth() + 1) + '.' + date.getFullYear();
        }
    }

    static getFormatStr(param) {
        return ('0' + param).slice(-2);
    }
}

export const getInputMask = (str, options) => {
    switch (str) {
        case 'phone':
            return {
                mask: '+{7}(000)000-00-00',
            }   
        case 'number':
            if (options && options.max) {
                return {
                    mask: new RegExp('^\[0-9]{1,' + options.max + '}$', 'gim'),                
                } 
            }
            return {
                mask: /^\d+$/,                
            } 
        case 'email':
            return {         
                mask: /^\S*@?\S*$/,               
            }    
        default:
            return {         
                               
            } 
    }
}

export const getPlaceholder = (count = 2) => {
    let i = 0;
    let str = '';
    while(i < count) {
        str += '_ ';
        i++;
    }
    return str;
}

/*validation */
const getTest = (item, text) => {
    switch (item.mask) {
        case 'phone': 
            return text.length === 11;
        case 'number':
            let result = true;
            if (item.max) {
                result = text.length <= item.max;
            }
            if (item.min) {
                result = text.length >= item.min;
            }
            return result;
        case 'email':
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(text).toLowerCase());
        default:
            return true;
    }
}

/*register*/
export const isValide = (input, form) => {
    if (input.req) {
        if (!form[input.name] || !form[input.name].length) return false;
        return getTest(input, form[input.name]);
    } else {
        return true;
    }
}
/*register*/

export const isObjValide = (input) => {
    if (input.req) {
        if (!input.value || !String(input.value).length) return false;
        return getTest(input, input.value);
    } else {
        return true;
    }
}
/*validation*/

export const sortForDate = (prev, next) => {
    return (new Date(prev.createdAt)) - (new Date(next.createdAt));
}