import { formatTime } from "@/utils/index.js";
import commentTemplate from "./hbs/comment.hbs";
import * as commentClass from "./styl/comment.styl";


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
