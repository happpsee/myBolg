/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-28 20:36:26
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-30 12:26:58
 * @FilePath: \徐晨冰_Node_20260129\myBolg\src\utils\modules\message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getTemplate } from "@/views/index.js";

const message = getTemplate("message");

export  class Message {
  constructor(wrap = "body") {
    this.wrap = $(wrap);
    this.durTime = 3000;
  }
  render(type, msg) {
    let msgEle = $(message({
      type,
      msg,
      isEnter: true
    }));
    setTimeout(() => {
      msgEle.children().addClass("animate__bounceOutUp");

      setTimeout(() => {
        msgEle.remove();
      }, 3000);

    }, this.durTime)
    this.wrap.append(msgEle);
  }

  success (msg) {
    this.render("success", msg);
  }

  info(msg) {
    this.render("info", msg);
  }

  danger(msg) {
    this.render("danger", msg);
  }
}