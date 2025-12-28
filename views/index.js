/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-22 13:40:36
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-27 19:03:04
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\views\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import  "./head.template.js"; 
import  "./main.template.js";
import  "./footer.template.js";
import "./footer.template.js";
import "./main.template.js";
import "./head.template.js";
import "./login.template.js";
import "./registry.template.js";

//引入默认的模态框
import "./modal-head.template.js";
import "./modal-main.template.js";
import "./modal-footer.template.js";
import "./modal.template.js";


import headMocks  from "../mocks/head.js";
import personMocks from "../mocks/person.js";
import articleMocks from "../mocks/articles.js";


//引入登录模块
import { form } from "../components/login/login.js";

import { http } from "../utils/http.js";

const anchor = document.querySelector(".blog-container");


const headTemplate = Handlebars.templates["head"];
const mainTemplate = Handlebars.templates["main"];
const footerTemplate = Handlebars.templates["footer"];




const headStr = headTemplate(headMocks);

const mainMocks = {person: personMocks, articles: articleMocks};
const mainStr = mainTemplate(mainMocks);
const footerStr = footerTemplate();

const anchorStr = headStr + mainStr + footerStr;

anchor.innerHTML = anchorStr;

// console.log(headStr, "这里应该打印出headTemplate的内容");
// console.log(mainStr, "这里应该打印出mainStr的内容");
// console.log(footerStr, "这里应该打印出footer的内容");

const init = async () => {
  await http.send("pubKey"); 
  form.start();
};


init();

