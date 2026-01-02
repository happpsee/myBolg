import { encrypt } from "./index.js";

import store from "store";

import { Http } from "@my-blog/http";

const baseURL = "http://127.0.0.1:8080";
const timeout = 5000;
const pubKeyName = "ua_publicKey";
const tokenName = "ua_jot";

const requestMap = {
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
  if (!currStatus || !currStatus.withToken) {
    return config;
  }
    
  const token = store.get(tokenName);
  
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

//密钥响应拦截
const rsaKeyResInterceptor = response => {
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


const commonReqInterceptor = [encryptInterceptor, tokenInterceptor];
const commonResInterceptor = [rsaKeyResInterceptor, tokenResInterceptor];

export const http = new Http({
  requestMap,
  commonReqInterceptor,
  commonResInterceptor,
  options: {
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json"
    }
  }
})
