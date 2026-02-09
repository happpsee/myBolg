import forge from  "node-forge"

//将连字符转为驼峰命名的写法
export const kebabToCamel = (value) => {
  return value.replace(/(-.)/gi, ($1) => {
    return $1[1].toUpperCase();
  });
};

//获取一个独特的id
export const getUniqueId = () => {
  const len = Math.random() * 10;
  return self.crypto.randomUUID().replace(/-/g, "").slice(len);
};




//获取一个独特的id,低成本版本
export const getUniqueIdSlim = (prefix = "id") => {
  let id = 0;
  return () => `${prefix}-${Date.now()}-${++id}`;
};


//数据加密
export const encrypt = (publicKey, value) => {
  console.log(publicKey, "publicKey");
  console.log(value, "valueee");
  const publicKeyPem = forge.pki.publicKeyFromPem(publicKey); 

  value = publicKeyPem.encrypt(value, "RSA-OAEP");

  const encrypted = forge.util.encode64(value);
  return encrypted;
};


export const getFormJson = (formId) => {
  
  return $(`#${formId}`).serializeArray().reduce((acc, {name, value}) => {
    acc[name] = value;

    return acc;
  }, {});
};


export const combinate = (...fns) => {
  return (...args) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  }
};


//睡眠三秒后，把控制权转出， 由调用方控制
export const sleep = (delay = 300) => {
  return new Promise(fulfilled => setTimeout(fulfilled, delay));
};


export const padLeft = (value) => {
  value = String(value);
  if (value.length !== 1) {
    return value;
  }
  return '0' + value;
};

export const formatTime = (date, format = "yyyy-mm-dd") => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const regexpMap = {
    "y+": date.getFullYear(),
    "m+": padLeft(date.getMonth() + 1),
    "d+": padLeft(date.getDate())
  };

  for (const [key, value] of Object.entries(regexpMap)) {
    format = format.replace(new RegExp(key), value);
  }

  return format; 
};

export const getMatchKey = (path, routerMap) => {
  let matchKey = path;

  if (routerMap[path]) {
    return matchKey;
  }

  //如果没有
  for (let key of Object.keys(routerMap)) {
    if (!key.includes(":")) {
      continue;
    }
    //如果包含:,则
    let regxs = key.replace(/(:\S+)\/|(:\S+)/, ($1) => {
      //将$1换成d
      return $1[$1.length - 1] === "/" ? "\\S+/" : "\\S+";
    });

    regxs = new RegExp(regxs);

    if (regxs.test(path)) {
      matchKey = key;
      break;
    }
  }

  return matchKey;
}

export const getDynamicParam = (path, key) => {

  path = path.trim().split("/");
  key = key.trim().split("/");

  return key.reduce((acc, _, idx) => {
    if (path[idx] === key[idx]) {
      return acc;
    }
    acc[key[idx].slice(1)] = path[idx];
    return acc;
  }, {});

}


//拆解属性,这个属性必须是
export const getSignAttr = (attr) => {
  let ans = /data-(.+)=(.+)/.exec(attr);

  return {
    key: ans[1],
    value: ans[2]
  };
};

export const debounce = (func, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};