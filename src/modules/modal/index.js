/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-01 20:24:09
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-01 21:16:31
 * @FilePath: \徐晨冰_Node_20250102\第三十九天\myBolg\src\modules\modal\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {getUniqueId} from "../../utils/index.js";
import modalTemplate from "../../views/modal/modal.handlebars";
import modalHeadTemplate from "../../views/modal/modal-head.handlebars";
import modalMainTemplate from "../../views/modal/modal-main.handlebars";
import modalFootTemplate from "../../views/modal/modal-footer.handlebars";

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
    const anchorTemplate = modalTemplate({ isCustom, customContent, modalId});
    return anchorTemplate;
  },
  "default": (options) => {

    //默认不是说完全使用默认模板，而是可以部分替换，部分使用自定义模板，意思是不完全替换
    const title = options?.head?.title ?? "标题";
    const mainContent = options?.body?.content ?? "模态框的主体内容写在这里";
    const closeText = options?.footer?.closeText ?? "取消";
    const confirmText = options?.footer?.confirmText ?? "确定";

    const headTemplate = options?.customHeader ?? modalHeadTemplate({ title });
    const mainTemplate = options?.customMain ?? modalMainTemplate("modal-main").getHTMLStr({ mainContent });
    const footerTemplate = options?.customFooter ?? modalFootTemplate({ closeText, confirmText });
    const anchorTemplate = options?.anchor ?? modalTemplate({ headTemplate, mainTemplate, footerTemplate,  modalId:options.modalId});

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

