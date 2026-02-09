/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-28 14:50:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-06 15:01:33
 * @FilePath: \第五十三天\myBolg\src\renders\articleDetail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { http } from "@/utils";
import IScroll from  "iscroll";
import detailTemplate from "./hbs/detail";
import * as detailClass from "./styl/detail";
import { Message } from "@/components/message";
import { ArticleComment } from "./comment";
import labelSign from "./index.sign";

console.log(labelSign, "labelSign");



const list = [
  {
    "action": "comment",
    "icon": detailClass["jsCommentIcon"],
    "content": "评论",
  },
  {
    "action": "like",
    "icon": detailClass["jsLikeIcon"],
    "content": "点赞"
  },
  {
    "action": "favorite",
    "icon": detailClass["jsFavoriteIcon"],
    "content": "收藏",
  }
];




class articleDetail {
  constructor() {
  }

  async init(path, context) {
    this.$mainRight || (this.$mainRight = context.appRightRender);

    await this.render(context?.id || this.articleId);
    this.eventAgency();
  }

  async render(id) {
    let data = await http.get(`/api/articles/${id}`, {}, {
      withToken: true
    });
    this.articleId = data._id;
    console.log("文章详情的评论为,", data);




    this.$mainRight.html(detailTemplate({
      articleTitle: data.title,
      articleContent: data.content,
      likeNums: data.likeNums,
      clickNums: data.clickNums,
      commentNums: data.commentNums,
      class: detailClass,
      list,
      labelSign
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
    const inputComment = () => {
      $$(labelSign.comment).on("click", async () => {
        console.log($("[data-input='comment']"), "Ssss");
        let text = $("[data-input='comment']").val();
        if (text.length < 15) {
          (new Message()).info("评论字数至少不能少于15");
          return false;
        }
        await http.send("pubComment", {
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

    const listActionMap = {
      "comment": (e) => {

        $$(labelSign.comment).removeClass(detailClass.jsHiddenComment);
        inputComment();
      }
    };

     $$(labelSign.actionList).on("click", (e) => {
      listActionMap[e.target.dataset.action] && listActionMap[e.target.dataset.action](e);
     });
  }

  reload() {
    this.destroy();
     this.init();
  }
  destroy() {
    this.iscroll.destroy();
     $("[data-btn='comment-submit']").off();
    $$(labelSign.actionList).off();
  }
}


export default articleDetail;