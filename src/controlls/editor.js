/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-26 16:18:43
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-28 14:42:20
 * @FilePath: \第五十二天\myBolg\src\controlls\editor.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "../utils/http.js";
import Message from "../utils/message.js";
import IScroll from "iscroll";
import { router } from "../router/index.js";
class editorController {
  constructor() {}


  submitArticle({editor, editorTool}) {
    let articleContent = editor.getHtml();
    let articleTitle = $(".editor-title").val();

    http.send("publishArticle", {
      title: articleTitle ,
      content: articleContent
    }).then((data) => {
      (new Message()).success("新增文章成功");
      console.log(data, "data是什么:");
      router.navigate(`/article/${data._id}`);
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
    $("#editor-container").on("click", () => {
      editor.focus();
    });
  
  }
}

export default editorController;