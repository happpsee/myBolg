/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-22 14:48:22
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-26 18:32:22
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\components\modal\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 
 * 这是一个全局的模态框
 * 允许关闭模态框的办法有两种，一种是点击按钮，一种是使用类手动关闭
 * 
 * customHeader表示使用自定义的头部
 * customMain 传入要表示的内容
 * customFoooter 表示使用自定义的底部
 */


// const getUniqueId = () => {
//   let id = 0;
//   let last = 0;
//   return () => {
//     if (last === Date.now()) {
//       id++;
//       return last + id;
//     }
//     id = 0;
//     return Date.now();
//   }

// };
import {getUniqueId} from "../../utils/index.js";

export class Modal {
  #show = false;
  #live = false;

  constructor({
    modalId
  }) {
    this.anchor = document.querySelector(`#${modalId}`);//匹配到的第一元素
    this.#live = true;
    this.#eventAgent();
  }


  #eventAgent() {
    //使用策略对象规定开放接口，避免在点击的时候调用了非open, close等规定可以调用的api
    const openMap = {
      "open": () => {
        this.#show = true;
        this.open()
      },
      "close": () => {
        this.#show = false;
        this.close()
      }
    };

    this.anchor.addEventListener("click", (e) => {
      openMap[e.target.dataset.btnTarget] && openMap[e.target.dataset.btnTarget](e);
    });
  }

  isShow() {
    return this.#show;
  }
  isLive() {
    return this.#live;
  }
  kill() {
    this.anchor.remove();
    this.#live = false;
  }

  open() {
    this.anchor.removeAttribute("hidden");
  }

  close() {
    this.anchor.setAttribute("hidden", "");
    this.closeCallback && this.closeCallback();
  }

  static modalMap = {
  "custom": ({ isCustom, customContent, modalId }) => {
    const anchorTemplate = Handlebars.templates["modal"]({ isCustom, customContent, modalId});
    return anchorTemplate;
  },
  "default": (options) => {

    //默认不是说完全使用默认模板，而是可以部分替换，部分使用自定义模板，意思是不完全替换
    const title = options?.head?.title ?? "标题";
    const mainContent = options?.body?.content ?? "模态框的主体内容写在这里";
    const closeText = options?.footer?.closeText ?? "取消";
    const confirmText = options?.footer?.confirmText ?? "确定";

    const headTemplate = options?.customHeader ?? Handlebars.templates["modal-head"]({ title });
    const mainTemplate = options?.customMain ?? Handlebars.templates["modal-main"]({ mainContent });
    const footerTemplate = options?.customFooter ?? Handlebars.templates["modal-footer"]({ closeText, confirmText });
    const anchorTemplate = options?.anchor ?? Handlebars.templates["modal"]({ headTemplate, mainTemplate, footerTemplate,  modalId:options.modalId});


    return anchorTemplate;
  }
};

  static modalFactory (options) {
    const modalId = `id-${getUniqueId()}`;
    options.modalId = modalId;
    let anchorTemplate = options.isCustom ? Modal.modalMap["custom"](options) : Modal.modalMap["default"](options);
    const anchor = options?.anchorEle ?? document.querySelector("body");//默认挂载到body, 可以选择options.anchorEle为挂载点

    const tempEle = document.createElement("div");
    anchor.append(tempEle);
    tempEle.outerHTML = anchorTemplate;

    const modal = new Modal({modalId});

    return {
      close: () => modal.close(),
      open: () => modal.open(),
      kill: () => modal.kill(),
      isShow: () => modal.isShow(),
      isLive: () => modal.isLive()
    };
  }
}




// const modalMap = {
//   "custom": ({ isCustom, customContent, modalId }) => {
//     const anchorTemplate = Handlebars.templates["modal"]({ isCustom, customContent, modalId});
//     return anchorTemplate;
//   },
//   "default": (options) => {

//     //默认不是说完全使用默认模板，而是可以部分替换，部分使用自定义模板，意思是不完全替换
//     const title = options?.head?.title ?? "标题";
//     const mainContent = options?.body?.content ?? "模态框的主体内容写在这里";
//     const closeText = options?.footer?.closeText ?? "取消";
//     const confirmText = options?.footer?.confirmText ?? "确定";

//     const headTemplate = options?.customHeader ?? Handlebars.templates["modal-head"]({ title });
//     const mainTemplate = options?.customMain ?? Handlebars.templates["modal-main"]({ mainContent });
//     const footerTemplate = options?.customFooter ?? Handlebars.templates["modal-footer"]({ closeText, confirmText });
//     const anchorTemplate = options?.anchor ?? Handlebars.templates["modal"]({ headTemplate, mainTemplate, footerTemplate,  modalId:options.modalId});


//     return anchorTemplate;
//   }
// };