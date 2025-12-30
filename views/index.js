/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-22 13:40:36
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-30 15:40:38
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
import "./person.template.js";
import "./articles.template.js";
import "./editor.template.js";

//引入默认的模态框
import "./modal-head.template.js";
import "./modal-main.template.js";
import "./modal-footer.template.js";
import "./modal.template.js";


import headMocks  from "../mocks/head.js";
import personMocks from "../mocks/person.js";
import articleMocks from "../mocks/articles.js";

//引入登录模块
import { form } from "../modules/login/login.js";

import { http } from "../utils/http.js";
import { templateFactory } from "../modules/templateControl.js";

import { emitter } from "../utils/eventEmitter.js";
import { ActionControl } from "../modules/actionControl.js";


  



const init = () => {
  const isLogin = !!store.get("ua_jot"); 
  //整个项目的根节点,祖先节点
  const anchor = $(".blog-container");
  // const mainMocks = {person: personMocks, articles: articleMocks};
  //头部

  const headStr = templateFactory("head").getHTMLStr({isLogin, ...headMocks});

   //主体
  const mainStr = templateFactory("main").getHTMLStr(); 
  
  //尾部
  const footerStr = templateFactory("footer").getHTMLStr();

  const anchorStr = headStr + mainStr + footerStr;

  anchor.html(anchorStr);

  //挂载上articles
  templateFactory("articles", $(".main-right")).render({ articles: articleMocks });

  const renderPseron = ({person} = {}) => {
    //登录成功
    const $mainLeft = $(".main-left");

    $("main").addClass("main_has-login");
    //渲染事件，挂载点, 传入person数据
    templateFactory("person", $mainLeft).render(person);
  }


  //在这里监听一个登录事件，当登录后，我们显示出person页面
   isLogin ? renderPseron() : emitter.once("loginSuccess", renderPseron);


  isLogin || http.send("pubKey");


  isLogin || form.start();

  new ActionControl();

};


init();
 
//TODO: 完成初始化的渲染模板管理

