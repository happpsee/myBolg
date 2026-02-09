/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-01 21:16:04
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-04 19:41:44
 * @FilePath: \徐晨冰_Node_20260131\第五十五天\myBolg\src\models\modules\message\message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import msgTemplate from "./hbs/message.hbs"; 
import * as msgClass from "./styl/message.styl";


  
export class Message {
  constructor(wrap = "body") {
    this.wrap = $(wrap);
    this.durTime = 3000;
  }
  render(type, msg) {
    Object.assign(msgClass, {
      alertType: msgClass[`alert${type}`],
      alertIconType: msgClass[`alertIcon${type}`],
      alertMsgType: msgClass[`alertMsg${type}`],
    });

    let msgEle = $(msgTemplate({
      msg,
      isEnter: true,
      class: msgClass
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
    this.render("Success", msg);
  }

  info(msg) {
    this.render("Info", msg);
  }

  danger(msg) {
    this.render("Danger", msg);
  }
}