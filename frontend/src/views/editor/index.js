/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-01 22:16:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-06 15:04:26
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\src\views\editor\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createEditor, createToolbar} from "@wangeditor/editor";
import { http } from "@/utils";
import EditorSubmit from "./submit";
import editorTemplate from "./hbs/editor";
import * as editorClass from "./styl/editor";
import { Message } from "@/components/message";
import labelSign from "./index.sign";
class editorRender {
  constructor() {
  }

  async init(_, context) {
    this.render(context);
    this.eventAgency();
  }


  render(context) {
    //先重新渲染main-right;
    this.appRightRender = context.appRightRender;
    $(context.appRightRender).html(editorTemplate({class:editorClass, labelSign}));
    
    //然后渲染富文本编辑器
    this.renderEditor();
  }

  renderEditor()  {
    const editorConfig = {
      placeholder: '你好，创作者。这个空白的世界，正等待你用文字与代码来填充。不必追求完美，只需真诚地写下你想分享的一切 —— 你的发现、你的构建、你的故事。开始你的「纪事」第一章',
      autoFocus: false,
      MENU_CONF: {
        "uploadImage": {
          async customUpload(file, insertFn) {
            console.log(file, "文件为：", file instanceof File);
            let formdata = new FormData();
            formdata.append("file", file);
            const ans = await http.send("upload", formdata, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            insertFn(ans.fileUrl, "文章图片", ans.fileUrl);
          }
        }
      }
    }


    let editor = createEditor({
      selector: ".js-editor-content",
      config: editorConfig,
    });

    let editorTool = createToolbar({
      editor,
      selector: ".js-editor-toolbar-wrapper"
    });
    this.editor = editor;
    this.editorTool = editorTool;
   }
   
  async submitArticle() {
    let articleContent = this.editor.getHtml();
    let articleTitle = $(".js-editor-title").val();

    if (articleTitle.length === 0 || articleContent.length < 30) {
      (new Message()).info("文章标题或内容字数过少");
      return false;
    }

    if (!this.articleSubmitEl) {
      this.articleSubmitEl = new EditorSubmit()
      await this.articleSubmitEl.init({articleContent, articleTitle});
    }
    this.articleSubmitEl.open();
  }

  eventAgency() {
    $$(labelSign.submit).on("click", () => {
      this.submitArticle();
    }); 
  }
}

export default editorRender;