import { encrypt } from "./index.js";
import axios from "./axios.js";


const BASEURL = "http://127.0.0.1:8080";
const TIMEOUT = 5000;
const pubKeyName = "ua_publicKey";
const tokenName = "ua_jot";

axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = TIMEOUT;
axios.defaults.headers.post["Content-Type"] = "application/json";


//中断请求拦截
const abortInterceptor = (config) => {
  config.signal = Http.controller.signal;
  return config;
}


//加密拦截
const encryptInterceptor = (config) => {
  const currStatus = Http.customStatus.get(config.url);

  if (!currStatus || !currStatus.rsaKey || !Array.isArray(currStatus.rsaKey)) {
    return config;
  }

  const pubKey = store.get(pubKeyName);

  const rsaKey = currStatus.rsaKey;

  rsaKey.forEach((key) => {
    const encryptedData = encrypt(pubKey, config.data[key]);
    config.data[key] = encryptedData;
  });

  return config;
};


//token拦截
const tokenInterceptor = config => {
  const currStatus = Http.customStatus.get(config.url);
  console.log(currStatus, "currStauts", config.url, "url");
  if (!currStatus || !currStatus.withToken) {
    return config;
  }
    
  const token = store.get(tokenName);
  
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

//密钥响应拦截
const rsaKeyResInterceptor = response => {
  console.log(response,  "Response");
  if (response.config.url === "/getPublicKey") {
    store.set(pubKeyName, response.data.data.publicKey);
  }
  return response;
};

//token响应拦截
const tokenResInterceptor = (response) => {
  if (response.config.url !== "/login" && response.config.url !== "/registry") {
    return response;
  }
  let token = response.data.data.token;
  store.set(tokenName, token);
  
  return response;
};


const commonReqInterceptor = [abortInterceptor, encryptInterceptor, tokenInterceptor];
const commonResInterceptor = [rsaKeyResInterceptor, tokenResInterceptor];


export class Http {
  constructor() {
    this.request = axios.create();
    this.before = [];
    this.after = [];

    this.init();

    //记录这次发送请求等时候， 我们在这上面附加的状态
  }


  static customStatus = new Map();

  static controller = new AbortController();

  static REQUEST_MAP = {
    "register": {
      url: "/register",
      method: "POST",
      rsaKey: ["password"]
    },
    "pwdLogin": {
      url: "/login",
      method: "POST",
      rsaKey: ["password"],
    },
    "user": {
      withToken: true,
      url: "/",
      method: "POST"
    },
    "pubKey": {
      withToken: false,
      url: "/getPublicKey",
      method: "GET"
    }
  };

  init() {
    this.request.interceptors.request.use((config) => {
      
      this.before.forEach((fn) => {
        (typeof fn === "function") && (config = fn(config));
      });

      return config;
    });

    this.request.interceptors.response.use(response => {
      this.after.forEach((fn) => {
        (typeof fn === "function") && (response = fn(response));
      });

      return response.data;
    }, (error) => {
      return Promise.reject(error);
    });

    this.addReqInterceptor.apply(this, commonReqInterceptor);
    this.addResInterceptors.apply(this, commonResInterceptor);
  }

  abort() {
    Http.controller.abort();
  }

  //type 类型, data 数据, 返回一个Promise
  send(type, data) {
    if (!Http.REQUEST_MAP[type]) {
      return false;
    }
    
    const {method, url} = Http.REQUEST_MAP[type];
    Http.customStatus.set(Http.REQUEST_MAP[type].url, Object.assign({}, Http.REQUEST_MAP[type]));
    //使用axios, 返回一个promise
    return this.request[method.toLowerCase()](url, data);
  }

  addReqInterceptor(...args) {
    this.before.push.apply(this.before, args);
  }

  addResInterceptors(...args) {
    this.after.push.apply(this.after, args);
  }

  //给自定义调用的接口
  get(url, config, customStatus) {
     customStatus && Http.customStatus.set(url, Object.assign({}, customStatus));
    return this.request.get(url, config);
  }

  post(url, data, config, customStatus) {
    customStatus && Http.customStatus.set(url, Object.assign({}, customStatus));
    Http.customStatus.set(url, Object.assign({}, customStatus));
    return this.request.post(url, data, config);
  }

}

export const http = new Http();


// // //在这里加上一些公共的请求拦截器
// export const http = new Http();

