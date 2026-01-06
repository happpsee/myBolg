import { getEditor } from "@/stores/editor.js";
import editorArticleTemplate from "@/views/editor/editorArticles.handlebars";





export const editorActions = () => {
  $(".editor-submit").on("click", () => {
    
    const {editor, editorTool} = getEditor();
    //点击后得到html,这个时候卸载书写板，显示文章列表

    $(".main-right").html(editorArticleTemplate({ articleContent: editor.getHtml() }));
    console.log(editor.getHtml(), "edtor.getHtml()");

  });
};