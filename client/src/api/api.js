import axios from 'axios';
import Cookies from 'js-cookie';

class API {

    constructor () {
        this.options = {
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + Cookies.get('token')
            },
            responseType: 'application/json'
        }
        this.url = 'http://localhost:8000/api'
    }
    
    async get(url) {
        return await axios.get(this.url + url, this.options);
    }

    async post(url, body = {}) {
        return await axios.post(this.url + url, body, this.options);
    }

    wrapFormData(data) {
        let formData = new FormData();
        for (let key in data) {
            if (data[key] instanceof FileList) {
                for (var i = 0; i < data[key].length; i++) {
                    let file = data[key].item(i);
                    formData.append('file', file);
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }

    wrapFormDataWithKey(data) {
        let formData = new FormData();
        for (let key in data) {
            if (data[key] instanceof FileList) {
                for (var i = 0; i < data[key].length; i++) {
                    let file = data[key].item(i);
                    formData.append(key, file);
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }
}

export default new API;