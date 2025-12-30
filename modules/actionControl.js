/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-29 20:48:47
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-30 17:17:15
 * @FilePath: \徐晨冰_Node_20251227\myBolg\modules\actionControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {templateFactory} from "./templateControl.js";
import articleMocks from "../mocks/articles.js";
import { form } from "./login/login.js";

export class ActionControl {
  constructor() {
    this.navigateAgency();
  }

  navigateAgency() {
    $(document).on("click",  'a[data-router]', (e) => {

      //当没有登录的时候，退出，并且直接调起login模态框
      if (!store.get("ua_jot") ) {
        form.open();

        return false;
      }

      $(e.target)
        .parent()
        .addClass("active")
        .siblings()
        .removeClass("active");
      if (e.target.dataset.router === "/write") {

        //先重新渲染main-right;
        templateFactory("editor", $(".main-right")).render();

        const {createEditor, createToolbar} = window.wangEditor;
        const editorConfig = {
          placeholder: '你好，创作者。这个空白的世界，正等待你用文字与代码来填充。不必追求完美，只需真诚地写下你想分享的一切 —— 你的发现、你的构建、你的故事。开始你的「纪事」第一章',
          onChange(editor) {
            const html = editor.getHtml()
            console.log('editor content', html)
            // 也可以同步到 <textarea>
          },
        }
        const editor = createEditor({
          selector: "#editor-container",
          config: editorConfig,
        });
        const toolbar = createToolbar({
          editor,
          selector: "#toolbar-container"
        })

      }

      if (e.target.dataset.router === "/index") {
        templateFactory("articles", $(".main-right")).render({articles:articleMocks});
      }
    });
  }
}



// //登录后，我们重新显示左侧
// emitter.once("login", () => {
//   $("")[0];
//   $(".main").addClass("main_has-login");
//   $(".main-left").addClass("main-left_has-login");
// });