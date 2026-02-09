/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-02 18:41:46
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-04 19:42:26
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\src\views\article\comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { formatTime } from "@/utils";
import commentTemplate from "./hbs/comment";
import * as commentClass from "./styl/comment";


export class ArticleComment {
  constructor() {}

  init(data) {
    data = data.map((item) => {
      item.date = formatTime(item.date);
      return item;
    });
    this.render(data);
  }

  render(data){
    $(".js-comment-list").html(commentTemplate({class: commentClass,data}));
  }
}
