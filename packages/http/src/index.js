import axios from "axios";

export class Http {
  constructor({
    requestMap,
    commonReqInterceptor,
    commonResInterceptor,
    options
  }) {
    this.requestMap = requestMap;
    this.request = axios.create(options);
    this.before =  commonReqInterceptor;
    this.after = commonResInterceptor;

    this.init();

    //记录这次发送请求等时候， 我们在这上面附加的状态
  }

  static customStatus = new Map();

  static controller = new AbortController();

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
  }

  abort() {
    Http.controller.abort();
  }

  //type 类型, data 数据, 返回一个Promise
  send(type, data) {
    if (!this.requestMap[type]) {
      return false;
    }
    
    const {method, url} = this.requestMap[type];
    Http.customStatus.set(this.requestMap[type].url, Object.assign({}, this.requestMap[type]));
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

