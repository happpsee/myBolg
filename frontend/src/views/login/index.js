/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-23 16:37:55
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 16:17:56
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\components\login\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//引入模态框

import {Modal} from "@/components/modal";
import { validateForm} from "@my-blog/validate";
import { emitter, http, getFormJson, kebabToCamel } from "@/utils";
import loginTemplate from "./hbs/login";
import registryTemplate from "./hbs/registry";
import * as logRegClass from "./styl/log-reg";
import { msgMap, formMap } from "./validate";



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
      .find(".js-form-error")
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
        .append(`<p class="${logRegClass.formError} js-form-error text-xss   animate__animated animate__backInLeft">${msg}</p>`);
    }

    return false;
  }

  static drawFactory(type) {
    const templateMap = {
      "login": () => {
        return loginTemplate({class:logRegClass});
      },
      "registry": () => {
        console.log(logRegClass.formGroup, "grou[");
        return registryTemplate({class:logRegClass});
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
    const $loginMethod = $(".js-login-method");
    const $close = $(".js-close");
    const $pwdLogin = $(".js-pwd-login");
    const $phoneLogin = $(".js-phone-login");
    const loginForm = $(".js-filp-card-item");
    const $filpCard = $(".js-filp-card");
    
    $loginMethod.on("click", (e) => {
      const targetEle = $(e.target);
      targetEle
      .addClass(logRegClass.active)
      .siblings()
      .removeClass(logRegClass.active);

      const idx = targetEle.index();
      
      console.log(idx, "idxx");
      idx === 0 ? $filpCard.css("height", "205px") : $filpCard.css("height", "280px");

      console.log(loginForm, "loginForm");
      loginForm
      .eq(idx)
      .addClass(logRegClass.active)
      .siblings()
      .removeClass(logRegClass.active);
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
        console.log("错误");
      }
      // this.deactivate();
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
      } finally {
        this.deactivate();
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
      $(".js-activate-form-btn").remove();
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
    const $close = $(".js-close");
    const $registry = $("#registry");

    $registry.on("submit", async (e) => {
      e.preventDefault();

      const validateAns = formUtils.validateFactory(e.target.id);

      if (!validateAns) {
        return false;
      }
      try {
        await formUtils.request("registry");
        emitter.emit("loginSuccss");
        $(".js-activate-form-btn").remove();
        $(".main").addClass("main_has-login");
        $(".main-left").addClass("main-left_has-login");

      } catch(err) {
        console.log(err, "错误");
      } finally {
        this.deactivate();
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

  async init(_, context) {
    console.log(context, "登录的context为:");
    this.switchStatus(context.type);
  }
  switchStatus(status) {
    console.log("Sss", this[status]);
    //如果没有当前这个状态
    if (!this[status]) {
      return false;
    }

    this.currentStatus = this[status];
    this.currentStatus.activate();
  }
}

export default Form;

