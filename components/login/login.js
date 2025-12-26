/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-23 16:37:55
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-26 18:47:26
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\components\login\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//引入模态框

import {Modal} from "../modal/index.js";
import { kebabToCamel} from "../../utils/index.js";
import { formMap, msgMap } from "../../mocks/login.js";

import { validateForm} from "../../utils/validate.js";



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
  }

  static drawFactory(type) {
    const templateStr = Handlebars.templates[type]();

    const { open, close, kill, isLive, isShow } = Modal.modalFactory({ isCustom: true, customContent: templateStr });
    
    console.log("搓手手试试");
    console.log(isLive, "isLive函数");
    return {
      open,
      close,
      kill,
      isShow,
      isLive,

    }
  }

  static request() {}
};


class Login {
  handleEvent() {
    console.log("login handleEvent调用一次了");
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

    $pwdLogin.on("submit", (e) => {
      e.preventDefault();
      //调用form类函数做验证
      formUtils.validateFactory(e.target.id);
 
    });

    $phoneLogin.on("submit", (e) => {
      e.preventDefault();

      formUtils.validateFactory(e.target.id);
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
    console.log("registry调用了一次");
    const $close = $(".registry-close");
    const $registry = $("#registry");

    $registry.on("submit", (e) => {
      e.preventDefault();

      formUtils.validateFactory(e.target.id);
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

class Form  {
  constructor() {
    this["login"] = new Login();
    this["registry"] = new Registry();
  }


  start(){
    this.anchor = document.querySelector(".header-list--log-reg-btn");
    //使用自定义内容
    this.handleEvent();
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




  // getValidateData(type) {
  //    let typeCamel = kebabToCamel(type);
  //    const msg = msgMap[typeCamel];
  //    return Object.entries(formMap[typeCamel]).reduce((acc, [key, value]) => {
  //     acc.push({
  //       name: key,
  //       display: msg[key],
  //       rules: value
  //     });
  //     return acc;
  //    }, []);
  // }
  // validateFactory(type) {
  //   const data = this.getValidateData(type);

  //   $(`#${type}`)
  //     .find(".form-error")
  //     .remove();

  //   console.log(data, "Data");
  //   const validateAns = validateForm(type, data);
    
  //   if (validateAns.result) {
  //     return true;
  //   }
  //   const {errors} = validateAns;
  //   console.log(errors, "errors");
  //   for (let i = 0, len = errors.length; i < len; i++) {
  //     const {ele, msg} = errors[i];
  //     ele
  //     .parent()
  //     .append(`<p class="form-error text-xss   animate__animated animate__backInLeft">${msg}</p>`);
  //   }

  //   //不通过
  // }

//  drawFactory(type)  {
//   const templateStr = Handlebars.templates[type]();
  
//   const {modal, open, close} =  Modal.modalFactory({isCustom: true, customContent: templateStr});
//     return {
//       modal,
//       open,
//       close
//     }
//   }