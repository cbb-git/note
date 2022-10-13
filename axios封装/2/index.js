import axios from "axios";
import { SITE } from "@sites";
import { OuiShowMessage } from "@/components/oui";

export const ContentType = {
  JSON: "application/json",
  URLEncode: "application/x-www-form-urlencoded",
  XML: "text/xml"
};

axios.interceptors.request.use(
  config => {
    //增加接口时间戳
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    };
    return config;
  },
  error => {
    //发送请求错误操作
    return Promise.reject(error);
  }
);

// 配置响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.status == 500) {
      OuiShowMessage("服务器错误", 3000, "error");
      return false;
    }
    return Promise.resolve(res);
  },
  error => {
    return Promise.reject(error);
  }
);
export class Request {
  method = "";
  url = "";
  requestOptions = null;
  // 构造函数
  constructor(method, url) {
    this.method = method;
    this.url = url;
    this.requestOptions = {
      url: this.url,
      method: this.method,
      withCredentials: true,
      timeout: 30000,
      /*headers: {
        'Cache-Control': 'no-cache'
      },*/
      // 2xx, 3xx, 4xx 的返回必须处理，5xx将以异常方式抛出
      validateStatus: status => {
        return status > 0 && status < 500;
      }
    };
  }
  // 设置headers
  setHeader(key, val) {
    if (undefined === this.requestOptions.headers) {
      this.requestOptions.headers = {};
    }
    this.requestOptions.headers[key] = val;
    return this;
  }
  // 设置超时
  setTimeout(timeout) {
    this.requestOptions.timeout = timeout;
    return this;
  }
  // 响应主体格式
  setResponseType(dataType) {
    this.requestOptions.responseType = dataType;
    return this;
  }
  // 注入请求数据
  setData(data, contentType = ContentType.URLEncode) {
    this.requestOptions.data = data;
    if (undefined === this.requestOptions.headers) {
      this.requestOptions.headers = {};
    }
    this.requestOptions.headers["Content-Type"] =
      contentType + "; charset=utf-8";
    return this;
  }
  // 执行请求
  execute() {
    return new Promise((resolve, reject) => {
      axios
        .request(this.requestOptions)
        .then(resp => {
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

const Http = {
  Reqeust(method, path) {
    return new Request(method.toLowerCase(), path);
  },
  GET(path) {
    return new Request("get", path);
  },
  POST(path, data, contentType = ContentType.URLEncode) {
    return new Request("post", path).setData(data, contentType);
  },
  PUT(path, data, contentType = ContentType.URLEncode) {
    return new Request("put", path).setData(data, contentType);
  },
  DELETE(path) {
    return new Request("delete", path);
  },
  OPTIONS(path) {
    return new Request("options", path);
  },
  HEAD(path) {
    return new Request("head", path);
  },
  PATCH(path, data, contentType = ContentType.URLEncode) {
    return new Request("patch", path).setData(data, contentType);
  }
};

export default Http;
