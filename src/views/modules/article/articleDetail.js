/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-28 14:50:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 22:00:01
 * @FilePath: \第五十三天\myBolg\src\renders\articleDetail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { http } from "@/utils/index.js";
import IScroll from  "iscroll";
import detailTemplate from "./hbs/detail.hbs";
import * as detailClass from "./styl/detail.styl";

class articleDetail {
  constructor() {
  }

  async init(req) {
    await this.render(req.params.id);
  }

  async render(id) {
    let data = await http.get(`/api/articles/${id}`, {}, {
      withToken: true
    });
    $(".js-app-right").html(detailTemplate({
      articleTitle: data.title,
      articleContent: data.content,
      class: detailClass
    }));
    let iscroll = new IScroll(".app-article-detail-scroll", {
      mouseWheel: true,
      click: true,
      disableMouse: true,
      disablePointer: true,
      keyBindings: true,
      preventDefault: true,
      disableTouch: true,
    });
    this.iscroll = iscroll;
  }

  destroy() {
    this.iscroll.destroy();
  }
}


export default articleDetail;