/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-28 14:50:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-28 15:36:36
 * @FilePath: \第五十三天\myBolg\src\renders\articleDetail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import articleDetailTemp from  "@/views/articlesDetail.handlebars";
import { http } from "../utils/http.js";
import IScroll from  "iscroll";

class articleDetail {
  constructor(id) {
    this.render(id);
  }

  async render(id) {
    let data = await http.get(`/api/articles/${id}`, {}, {
      withToken: true
    });
    $(".main-right").html(articleDetailTemp({
      articleTitle: data.title,
      articleContent: data.content
    }));
    new IScroll(".article-detail--scroller", {
      mouseWheel: true,
      scrollbars: true,
      click: true
    });

  }
}


export default articleDetail;