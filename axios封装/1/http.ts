import Axios from 'axios';
import * as qs from 'qs';
import Func from './func';
import {SITES} from '@sites'; 
const Http  = {
    post(url: string, data: any = {}) {
        const config: any = {
            method: 'POST',
            url,
           
        };
        if (data != {}) {
            config.data = data;
            // console.log(config);
            
        }

        return this.request(config);
    },

    getText(url: string) {
        const config: any = {
            method: 'GET',
            url,
            responseType: 'text',
        };

        return this.request(config);
    },

    get(url: string, data :any = {}) {
        let getUrl = url;
        
        if (data != {}) {
            var str = [];
            for (let k in data) {
                str.push(k + '=' + encodeURIComponent(data[k]))
            }
            getUrl = getUrl + "?" + str.join('&');
        }
        const config: any = {
            method: 'GET',
            url,
        };

        return this.request(config);
    },

    request(config: any) {
        const conf = {
            // baseURL: 'http://yapi.orayer.com:3000',
            baseURL: SITES.STOREAPI,
            // baseURL: 'http://store-api.oray.net',
            responseType: 'json',
            withCredentials: true,
            transformRequest: [((data: any) => {
                data = qs.stringify(data);
                return data;
            })],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        };
        const configs = Func.extend(conf, config);

        return Axios.request(configs);
    },
};

export default Http;
