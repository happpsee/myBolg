import { http } from "../utils/http.js";
import editorArticleTemplate from "@/views/editor/editorArticles.handlebars";
import Message from "../utils/message.js";
import IScroll from "iscroll/build/iscroll-lite.js";

class editorController {
  constructor() {}


  submitArticle({editor, editorTool}) {
    let articleContent = editor.getHtml();
    let articleTitle = $(".editor-title").val();
    console.log(articleTitle, "articlesTitle");
    $(".main-right").html(editorArticleTemplate({ articleContent,articleTitle }));
    new IScroll(".my-article--scroller", {
      mouseWheel: true,
      scrollbars: true
    });

    http.send("publishArticle", {
      title: $(".editor-title").val,
      content: articleContent
    }).then(() => {
      (new Message()).success("新增文章成功");
    });
  }

  eventListner({
    editorSubmitBtn,
    editor,
    editorTool
  }) {
    editorSubmitBtn.on("click", () => {
      this.submitArticle({editor, editorTool});
    });
  }
}

export default editorController;