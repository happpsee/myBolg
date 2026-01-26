/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-24 20:28:15
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 16:18:10
 * @FilePath: \徐晨冰_Node_20260124\第五十二天\myBolg\src\renders\articlesRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import articlesTemplate from "@/views/articles.handlebars";
import IScroll from "iscroll";
import articleControler from "../controlls/article.js";

class articleRender {
  constructor() {
    this.controller = new articleControler();
    this.render();
  }
  async render() {
    console.log(this.controller, "Articles时");
    let articles = await this.controller.getArticles();
    const $mainRight = $(".main-right");
    const articlesStr = articlesTemplate({ articles});
    $mainRight.html(articlesStr);
    const myScroll = new IScroll(".main-right", {
      mouseWheel: true,
      scrollbars: true
    });
  }
}

export default articleRender;