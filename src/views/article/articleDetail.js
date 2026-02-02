/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-28 14:50:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-02 19:38:16
 * @FilePath: \第五十三天\myBolg\src\renders\articleDetail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { http } from "@/utils/index.js";
import IScroll from  "iscroll";
import detailTemplate from "./hbs/detail.hbs";
import * as detailClass from "./styl/detail.styl";
import { Message } from "../message/message.js";
import { ArticleComment } from "./comment.js";

console.log(detailClass, "detailClass");
class articleDetail {
  constructor() {
  }

  async init(req = {}) {
    await this.render(req.params?.id || this.articleId);
    this.eventAgency();
  }

  async render(id) {
    let data = await http.get(`/api/articles/${id}`, {}, {
      withToken: true
    });
    this.articleId = data._id;
    console.log("文章详情的评论为,", data);
    $(".js-app-right").html(detailTemplate({
      articleTitle: data.title,
      articleContent: data.content,
      likeNums: data.likeNums,
      clickNums: data.clickNums,
      commentNums: data.commentNums,
      class: detailClass
    }));

    await (new ArticleComment()).init(data.comments);

    let iscroll = new IScroll(".app-article-detail-scroll", {
      mouseWheel: true,
      scrollbars: true,
      click: true,
    });
    this.iscroll = iscroll;
  }

  eventAgency() {
     $("[data-btn='comment-submit']").on("click", () => {
      console.log($("[data-input='comment']"), "Ssss");
      let text = $("[data-input='comment']").val();
      if (text.length < 15) {
        (new Message()).info("评论字数至少不能少于15");
        return false;
      }
      http.send("pubComment", {
          content: text,
          aid: this.articleId,
          fieldIds: {
            aid: this.articleId
          }
      });
      (new Message()).success("评论成功");
      this.reload();
      
     });
  }

  reload() {
    this.destroy();
     this.init();
  }
  destroy() {
    this.iscroll.destroy();
     $("[data-btn='comment-submit']").off();
  }
}


export default articleDetail;