/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-23 16:37:55
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-02 14:23:55
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\components\login\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//引入模态框

import {Modal} from "../modal/index.js";
import { getFormJson, kebabToCamel} from "../../utils/index.js";
import { formMap, msgMap } from "../../mocks/login.js";
import {http} from "../../utils/http.js";
import { validateForm} from "@my-blog/validate";
import { emitter } from "../../utils/eventEmitter.js";


import loginTemplate from "../../views/logReg/login.handlebars";
import registryTemplate from "../../views/logReg/registry.handlebars";


//表单工具类
class formUtils {
  static getValidateData(type) {
    let typeCamel = kebabToCamel(type);
    const msg = msgMap[typeCamel];
    return Object.entries(formMap[typeCamel]).reduce((acc, [key, value]) => {
      acc.push({
        name: key,
        display: msg[key],
        rules: value
      });
      return acc;
    }, []);
  }

  static validateFactory(type) {
    const data = formUtils.getValidateData(type);

    $(`#${type}`)
      .find(".form-error")
      .remove();

    const validateAns = validateForm(type, data);

    if (validateAns.result) {
      return true;
    }
    const { errors } = validateAns;
    for (let i = 0, len = errors.length; i < len; i++) {
      const { ele, msg } = errors[i];
      ele
        .parent()
        .append(`<p class="form-error text-xss   animate__animated animate__backInLeft">${msg}</p>`);
    }

    return false;
  }

  static drawFactory(type) {
    const templateMap = {
      "login": () => {
        return loginTemplate();
      },
      "registrty": () => {
        return registryTemplate();
      }
    }    
    const templateStr = templateMap[type]();

    const { open, close, kill, isLive, isShow } = Modal.modalFactory({ isCustom: true, customContent: templateStr });
    
    return {
      open,
      close,
      kill,
      isShow,
      isLive,

    }
  }

  static request(type) {
    const formId= kebabToCamel(type);
    const data = getFormJson(type);
    
    return http.send(formId, data);
  }
};


class Login {
  constructor() {
    emitter.once("loginSuccess", () => {
      this?.isLive && this?.isLive() && this.deactivate();
    });
  }


  handleEvent() {
    const $loginMethod = $(".login-method");
    const $close = $(".login-close");
    const $pwdLogin = $("#pwd-login");
    const $phoneLogin = $("#phone-login");
    const loginForm = $(".filp-card-item");
    const $filpCard = $(".filp-card");
    
    $loginMethod.on("click", (e) => {
      const targetEle = $(e.target);
      targetEle
      .addClass("active")
      .siblings()
      .removeClass("active");

      const idx = targetEle.index();
      
      idx === 0 ? $filpCard.css("height", "205px") : $filpCard.css("height", "280px");

      loginForm
      .eq(idx)
      .addClass("active")
      .siblings()
      .removeClass("active");
    });

    $close.on("click", () => {
      this.close();
    });

    $pwdLogin.on("submit", async (e) => {
      e.preventDefault();
      //调用form类函数做验证
      const validateAns = formUtils.validateFactory(e.target.id);

      if (!validateAns) {
        return false;
      }
      //发起请求
      try {
        await formUtils.request("pwd-login");
        //派发登录成功事件
        emitter.emit("loginSuccess");
      } catch(err) {
        console.log(err);
        console.log("错误");
      }
    });

    $phoneLogin.on("submit", async (e) => {
      e.preventDefault();

      const validateAns = formUtils.validateFactory(e.target.id);
      if (!validateAns) {
        return false;
      }
      try {
        await formUtils.request("phone-login");
        emitter.emit("loginSuccess");

      } catch(err) {
        console.log("错误");
      }
    });

    
    Object.assign(this, {
      $loginMethod,
      $close,
      $pwdLogin,
      $phoneLogin
    });

  }

  draw() {
    const { open, close, kill, isShow, isLive} = formUtils.drawFactory("login");


    Object.assign(this, {
      kill,
      open,
      close,
      isShow,
      isLive
    });
  }

  activate() {
    //要是this.Live都没有，说明是第一次启动，需要重新绘画，和监听
    if (this.isLive && this.isLive()) {
      this.open();
      return false;
    }
    
    this.draw();
    this.handleEvent();
    this.open();
  }
   
  deactivate() {
    this.close();

    this.$loginMethod.off();
    this.$close.off();
    this.$pwdLogin.off();
    this.$phoneLogin.off();
    this.kill();


    Object.assign(this, {
      open: null,
      close: null,
      kill: null,
      isShow: null,
      isLive: null
    })
  }
}

class Registry {

  constructor() {
    //登录成功后，销毁registry模态框
    emitter.once("loginSuccess", () => {
      this?.isLive && this?.isLive() && this.deactivate();
    });
  }

  draw() {
    const { open, close, kill, isShow, isLive} = formUtils.drawFactory("registry");

    Object.assign(this, {
      kill,
      open,
      close,
      isShow,
      isLive
    });
  }

  handleEvent() {
    const $close = $(".registry-close");
    const $registry = $("#registry");

    $registry.on("submit", async (e) => {
      e.preventDefault();

      const validateAns = formUtils.validateFactory(e.target.id);

      if (!validateAns) {
        return false;
      }
      try {
        await formUtils.request("registry");
        this.deactivate();

        $(".header-list--log-reg-btn").remove();
        $(".main").addClass("main_has-login");
        $(".main-left").addClass("main-left_has-login");

      } catch(err) {
        console.log("错误");
      }


    });
    $close.on("click", () => {
      this.close();
    }); 

    Object.assign(this, {
      $close
    });
  }
  
  activate() {
    if (this.isLive && this.isLive()) {
      this.open();
      return false;
    }

    this.draw();
    this.handleEvent();
    this.open();
  }

  deactivate() {

    this.close();
    

    this.$close.off();
    this.kill();
    

    Object.assign(this, {
      open: null,
      close: null,
      kill: null,
      isShow: null,
      isLive: null
    });
  }
}


class Form {

  constructor() {
    this["login"] = new Login();
    this["registry"] = new Registry();
  }


  start(){
    this.anchor = document.querySelector(".header-list--log-reg-btn");
    //使用自定义内容
    this.handleEvent();


    //当成功后，this.anchor也就没有必要了
    emitter.once("loginSuccess", () => {
      this.anchor.remove();
      $(this.anchor).off();
    });
  }

  open() {
    this.currentStatus?.activate?.() ?? this.switchStatus("login");
  }

  switchStatus(status) {
    //如果没有当前这个状态
    if (!this[status]) {
      return false;
    }
    this.currentStatus = this[status];
    this.currentStatus.activate();
  }

  handleEvent() {
    this.anchor.addEventListener("click", (e) => {
      const type = e.target.dataset?.type?.trim();
      this[type] && this.switchStatus(type);
    });
  }
}
export const form = new Form();

