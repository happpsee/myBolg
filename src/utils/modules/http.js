import { encrypt } from "../index.js";
import store from "store";
import { Http } from "@my-blog/http";


const baseURL = BASE_API_URL;
const timeout = 5000;
const pubKeyName = "ua_publicKey";
const tokenName = "ua_jot";

const requestMap = {
    "registry": {
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
    },
    "articles": {
      url: "/api/articles",
      method: "GET"
    },
    "publishArticle": {
      url: "/api/articles",
      method: "POST",
      withToken: true
    },
    "upload": {
      url: "/upload/article",
      method: "POST",
      withToken: true
    },
    "column": {
      url: "/api/columns",
      method: "GET",
      withToken: true
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
    console.log(response.data);
    store.set(pubKeyName, response.data.data.publicKey);
  }
  return response;
};

//token响应拦截
const tokenResInterceptor = (response) => {
  console.log(response, "response");
  if (response.config.url !== "/login" && response.config.url !== "/register") {
    return response;
  }
  let token = response.data.data.token;
  store.set(tokenName, token);
  
  return response;
};

const responseInterceptor = (response) => {
  console.log(response, "response");
  return response.data;
};

// const message = new Message();
const hanldeErr = (err) => {
    // message.danger(err.data.message);
};


const commonReqInterceptor = [encryptInterceptor, tokenInterceptor];
const commonResInterceptor = [rsaKeyResInterceptor, tokenResInterceptor, responseInterceptor];

export const http = new Http({
  requestMap,
  commonReqInterceptor,
  commonResInterceptor,
  hanldeErr,
  options: {
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json"
    }
  }
})
