/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-29 15:02:08
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 16:24:40
 * @FilePath: \徐晨冰_Node_20260129\myBolg\src\modules\skeleton.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { headMocks } from "@/mocks"
import store from "store";
import { routerjs } from "@/router";


import * as headClass from "./styls/header";
import * as mainClass from "./styls/main";
import * as layoutClass from "./styls/layout";

import headTemplate from "./hbs/head";
import mainTemplate from "./hbs/main";
import footerTemplate from "./hbs/footer";
import layoutTemplate from "./hbs/layout";
import  labelSign  from "./index.sign";
import { getSignAttr, emitter } from "@/utils";

import Form from "@/views/login";
import {Message} from "@/components/message";

console.log(labelSign, "arr");
console.log(headClass, "headClass");

class Skeleton {
  constructor() {
    
  }

  async init(req) {
    this.render(req);
    this.eventAgency(req);
    routerjs.navigate(req.path, {
        "appLeftRender": $$(labelSign.appLeftRender),
        "appRightRender": $$(labelSign.appRightRender),
        "searchEle":  $$(labelSign.search)
      });
  }

  render(req) {
    let isLogin = !!store.get(LOGIN_KEY);

    $("#app").html(layoutTemplate({layoutClass, labelSign}));


    for (const item of Object.values(headMocks.navList)) {
      item.active = item.navigate === req.path;
    }

    let skeleton = headTemplate({isLogin, ...headMocks, headClass, labelSign }) + mainTemplate({mainClass, classStr: JSON.stringify(mainClass), labelSign}) + footerTemplate();

    $$(labelSign.app).html(skeleton);
  }

  eventAgency(req) {
    let isLogin = !!store.get(LOGIN_KEY);
    if (!isLogin) {
      $$(labelSign.login).on("click", (e) => {
        let type = $(e.target).data("type").trim();
        if (!type) {
          return false;
        }
        new Form().init("", {
          type
        });

        emitter.once("loginSuccess", () => {
           $$(labelSign.login).off();
            $$(labelSign.login).remove();
        });


      });
    } 
    const {key, value} = getSignAttr(labelSign.navItem);
    $$(labelSign.navList).on("click", `[data-${key}=${value}]`, (e) => {
      const ele = $(e.target);
        //传入自己的可以挂载的点
      if (ele.data("router") !== "/" &&  !isLogin) {
        (new Message()).info("请先登录!!!");
        return false;
      }

      ele
        .addClass(headClass.jsNavActive)
        .siblings()
        .removeClass(headClass.jsNavActive);

      routerjs.navigate(ele.data("router"), {
        "appLeftRender": $$(labelSign.appLeftRender),
        "appRightRender": $$(labelSign.appRightRender),
        "searchEle": $$(labelSign.search)
      });
    });



  }
}

export default Skeleton;