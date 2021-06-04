import validator from 'validator';

export const isEmail = (value) => {
    if (!value) return 'Это поле обязательно';
    return validator.isEmail(value) ? undefined : 'Неправильный формат электронной почты';
}

export const isLength = (min, max) => (value) => {
    if (!value) return 'Это поле обязательно';
    if (value.length < min) return `Значение поля должно не меньше ${min} символов`;
    if (value.length > max) return `Значение поля должно не меньше ${max} символов`;
    return undefined;
}

export const isNumeric = (value) => {
    if (!value) return 'Это поле обязательно';
    return /^\d+$/.test(value) ? undefined : 'Поле должно содержать только цифры';
}

export const isRequired = (value) => {
    return value ? undefined : 'Это поле обязательно';
}

export const composeValidators = (...validators) => (value, allValues, meta) => {
    return validators.reduce((error, validator) => error || validator(value, allValues, meta), undefined);
}

export const isHidden = (value) => {
    return value ? 'Это поле должно быть пустым' : undefined;
}

export const isFormat = (mimetypes, formats) => (value) => {
    if (!value || !value.length) return 'Это поле обязательно';
    let files = Array.from(value);
    let condition = files.some(item => !mimetypes.includes(item.mimetype));
    return condition ? 'Неправильный формат файлов' : undefined;
}

export const isAdressRequired = (list, form) => (value) => {
    if (!value) return 'Заполните текстовое поле или выберите совпадающий адрес'; 
    if (typeof value === 'string') {
        return isLength(10, 100)(value);
    }
    let depElem = list.find(item => item.id === value);
    if (!depElem) return 'Нельзя выбрать совпадающий адрес';
    let depFieldValid = form.getFieldState(depElem.name)?.valid;
    return depFieldValid ? undefined : 'Поле совпадения заполнено неправильно';
}

export const isAdressEmptyOrRight = (list, form) => (value) => {
    if (!value) return undefined; 
    if (typeof value === 'string') {
        return isLength(10, 100)(value);
    }
    let depElem = list.find(item => item.id === value);
    if (!depElem) return 'Нельзя выбрать совпадающий адрес';
    let depFieldValid = form.getFieldState(depElem.name)?.valid;
    return depFieldValid ? undefined : 'Поле совпадения заполнено неправильно';
}

export const formatNumber = (value) => {
    if (!value) return value;
    let result = value.replace(/\D/g, '');
    return result;
}

export const isEmptyOrRight = (min, max) => (value) => {
    if (!value) return undefined;
    if (value.length < min) return `Значение поля должно не меньше ${min} символов`;
    if (value.length > max) return `Значение поля должно не больше ${max} символов`;
    return undefined;
}

export const isEmptyOrEmail = (value) => {
    if (!value) return undefined;
    return validator.isEmail(value) ? undefined : 'Неправильный формат электронной почты';
}

export const isPassword = (value, allValues, meta) => {
    let depName = meta.name === 'password' ? 'repeatPassword' : 'password';
    if (!value) return 'Это поле обязательно';
    return value === allValues[depName] ? undefined : 'Пароли не одинаковы';
}

export const isEmptyOrPassword = (value, allValues, meta) => {
    let depName = meta.name === 'password' ? 'repeatPassword' : 'password';
    let depValue = allValues[depName];
    if (!value && !depValue) return undefined;
    if ((value && !depValue) || (depValue && !value)) return 'Пароли не одинаковы';
    return value === allValues[depName] ? undefined : 'Пароли не одинаковы';
}

export const isOldPassword = (value, allValues) => {
    if (!value) return 'Это поле обязательно';
    let depValue = allValues.password;
    return value === depValue ? 'Новый пароль не должен совпадать со старым' : undefined;
}