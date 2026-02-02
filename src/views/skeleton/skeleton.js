/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-29 15:02:08
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 19:45:24
 * @FilePath: \徐晨冰_Node_20260129\myBolg\src\modules\skeleton.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { headMocks } from "@/mocks/index.js"
import store from "store";
import { routerjs } from "@/router/index.js";
import {form} from "../login/login.js";


import * as headClass from "./styls/header.styl";
import * as mainClass from "./styls/main.styl";
import * as layoutClass from "./styls/layout.styl";

import headTemplate from "./hbs/head.hbs";
import mainTemplate from "./hbs/main.hbs";
import footerTemplate from "./hbs/footer.hbs";
import layoutTemplate from "./hbs/layout.hbs";
console.log(headClass, "headClass");

class Skeleton {
  constructor() {
    
  }

  async init(req) {
    this.render(req);
    this.eventAgency(req);
  }

  render(req) {
    let isLogin = !!store.get(LOGIN_KEY);

    $("#app").html(layoutTemplate({layoutClass}));

    let skeleton = headTemplate({isLogin, ...headMocks, headClass }) + mainTemplate({mainClass, classStr: JSON.stringify(mainClass)}) + footerTemplate();
    $(".js-app").html(skeleton);
  }

  eventAgency(req) {
    let isLogin = !!store.get("loginKey");
    if (!isLogin) {
      $(".js-activate-form-btn").on("click", ".js-activate-form-btn-item", (e) => {
        let type = $(e.target).data("type");
        console.log(type, "type");
        form.switchStatus(type);
      });
    } 

    $(`.js-head-item[data-router="${req.path}"]`)
      .addClass("js-head-item--active")


    $(".js-head-list").on("click", ".js-head-item", (e) => {
      const ele = $(e.target);
      ele
        .addClass("js-head-item--active")
        .siblings()
        .removeClass("js-head-item--active");
      routerjs.navigate(ele.data("router"));
    });

  }
}

export default Skeleton;