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
    });

  }
}


export default articleDetail;