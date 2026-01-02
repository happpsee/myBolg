/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-22 13:40:36
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-02 14:43:59
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\views\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "./styl/index.styl";


import headMocks  from "./mocks/head.js";
import articleMocks from "./mocks/articles.js";

//引入登录模块
import { form } from "./modules/login/login.js";

import { http } from "./utils/http.js";

import { emitter } from "./utils/eventEmitter.js";
import { ActionControl } from "./modules/actionControl.js";
import store from "store";

  
import headTemplate from "./views/head.handlebars";
import mainTemplate from "./views/main.handlebars";
import footerTemplate from "./views/footer.handlebars";
import articlesTemplate from "./views/articles.handlebars";
import personTemplate from "./views/person.handlebars";



import "@my-blog/editor/editor.css";

const init = () => {
  const isLogin = !!store.get("ua_jot"); 
  //整个项目的根节点,祖先节点
  const anchor = $(".blog-container");
  // const mainMocks = {person: personMocks, articles: articleMocks};
  //头部

  const headStr = headTemplate({isLogin, ...headMocks});

   //主体
  const mainStr = mainTemplate(); 
  
  //尾部
  const footerStr = footerTemplate();

  const anchorStr = headStr + mainStr + footerStr;

  anchor.html(anchorStr);

  //挂载上articles
  const $mainRight = $(".main-right");
  const articlesStr = articlesTemplate({articles: articleMocks});
  $mainRight.html(articlesStr);


  const renderPseron = ({person} = {}) => {
    //登录成功
    const $mainLeft = $(".main-left");

    $("main").addClass("main_has-login");
    //渲染事件，挂载点, 传入person数据
    const personStr = personTemplate(person);

    $mainLeft.html(personStr);
  }


  //在这里监听一个登录事件，当登录后，我们显示出person页面
   isLogin ? renderPseron() : emitter.once("loginSuccess", renderPseron);


  isLogin || http.send("pubKey");


  isLogin || form.start();

  new ActionControl();

};


init();
 
//TODO: 完成初始化的渲染模板管理

