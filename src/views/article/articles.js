/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-24 20:28:15
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 21:45:55
 * @FilePath: \徐晨冰_Node_20260124\第五十二天\myBolg\src\renders\articlesRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import IScroll from "iscroll";
import { http, formatTime  } from "@/utils/index.js";
import { routerjs } from "@/router/index.js";
import articlesTemplate from "./hbs/articles.hbs";
import * as articleClass from "./styl/article.styl";
 

class articleRender {
  constructor() {
  }

  async init() {
    await this.render();
    this.eventAgency();
  }

  transformRes(data) {
    return data.reduce((acc, { title, content, date, likeNums, commentNums, _id }) => {
      acc.push({
        articleTitle: title,
        articleDes: content.slice(0, 100),
        createdDate: formatTime(date),
        likeNums,
        commentNums,
        id: _id
      });
      return acc;
    }, []);
  }

  async getArticles() {
    let { data } = await http.send("articles");
    return this.transformRes(data);
  }

  async render() {
    let articles = await this.getArticles();
    const $mainRight = $(".js-app-right");
  
    const articlesStr = articlesTemplate({ class:articleClass, articles});
    $mainRight.html(articlesStr);

    const myScroll = new IScroll(".js-app-right", {
      mouseWheel: true,
      scrollbars: true,
      click: true,
    });
    this.myScroll = myScroll;
  }

  eventAgency() {
    $(".js-app-right-list").on("click",(e) => {
      let target = $(e.target);

      if (target.hasClass("js-app-right-list")) {
        return false;
      }

      if (!target.hasClass("js-app-right-article")) {
        target = target.parent(".js-app-right-article");
      }
      routerjs.navigate(`/article/${target.data("id")}`);
    });
  }

  destroy() {
    console.log(this.myScroll.destroy, "destroy");
    this.myScroll.destroy();
  }
}

export default articleRender;