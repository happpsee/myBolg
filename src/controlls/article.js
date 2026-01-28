import { router } from "../router/index.js";

/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-26 16:08:32
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-27 23:24:41
 * @FilePath: \徐晨冰_Node_20260126\第五十二天\myBolg\src\controlls\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class articleControler {
  constructor({
    myScroll
  }) {
    this.myScroll = myScroll;
    this.eventListener();
  }

  eventListener() {
    $(".main-right-list").on("click",  (e) => {
      let target = $(e.target);
      if (!target.hasClass("main-right-article")) {
        target = target.parent(".main-right-article");
      }

      console.log(target[0].dataset.id, "target[0].dataset.id");
      router.navigate(`/article/${target[0].dataset.id}`);

    });
  }




}

export default articleControler;