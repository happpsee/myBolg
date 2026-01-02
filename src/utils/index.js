/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-25 18:08:06
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-02 14:25:31
 * @FilePath: \徐晨冰_Node_20251224\第三十四天\myBolg\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import forge from  "node-forge"

//将连字符转为驼峰命名的写法
export const kebabToCamel = (value) => {
  return value.replace(/(-.)/gi, ($1) => {
    return $1[1].toUpperCase();
  });
};


//获取一个独特的id
export const getUniqueId = () => {
  return self.crypto.randomUUID().replace(/-/g, "");
};


//数据加密
export const encrypt = (publicKey, value) => {
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