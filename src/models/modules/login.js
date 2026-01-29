/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-23 16:37:55
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-29 23:34:02
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\components\login\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//引入模态框

import {Modal} from "./modal.js";
import { validateForm} from "@my-blog/validate";
import { emitter, http, getFormJson, kebabToCamel } from "@/utils/index.js";
import { getTemplate } from "@/views/index.js";

const loginTemplate = getTemplate("login");
const registryTemplate = getTemplate("registry");


const formMap = {
  pwdLogin: {
    username: "is_required|is_username|minlength(2)|maxlength(9)",
    password: "is_required|is_pwd|minlength(6)|maxlength(12)"
  },
  phoneLogin: {
    phone: "is_required|is_phone",
    password: "is_required|is_pwd|minlength(6)|maxlength(12)",
    vertificate: "is_required|is_vertificate|minlength(4)|maxlength(6)"
  },
  registry: {
      username: "is_required|is_username|minlength(2)|maxlength(9)",
      password: "is_required|is_pwd|minlength(6)|maxlength(12)"
  }
};

const msgMap = {
  pwdLogin: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
  phoneLogin: {
    phone: "手机号必填|手机号格式错误",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位| 密码不能少于6位|密码不能多于12位",
    vertificate: "验证码必填|验证码格式必须为 字母 + 数字|验证码不能少于4|验证码不能多于6"
  },
  registry: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
};




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
      "registry": () => {
        return registryTemplate();
      }
    }    
    console.log(type, "typeee");
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
      $(".js-activate-form-btn").remove();
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
export const form = new Form();

