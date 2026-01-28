/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-05 18:09:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 22:12:42
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\renders\writeRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import editorTemplate  from "@/views/editor/editor.handlebars";
import { createEditor, createToolbar } from "@wangeditor/editor";
import editorController from "../controlls/editor.js";
class editorRender {
  constructor() {
    
    this.render();

    this.controller = new editorController();
    this.controller.eventListner({
      editorSubmitBtn: $(".editor-submit"),
      editor: this.editor,
      editorTool: this.editorTool
    });
  }


  render() {
    //先重新渲染main-right;
    $(".main-right").html(editorTemplate);
    
    //然后渲染富文本编辑器
    this.renderEditor();
  }

  renderEditor()  {
    const editorConfig = {
      placeholder: '你好，创作者。这个空白的世界，正等待你用文字与代码来填充。不必追求完美，只需真诚地写下你想分享的一切 —— 你的发现、你的构建、你的故事。开始你的「纪事」第一章',
      autoFocus: false
    }
    let editor = createEditor({
      selector: "#editor-container",
      config: editorConfig,
    });
    let editorTool = createToolbar({
      editor,
      selector: "#toolbar-container"
    });
    this.editor = editor;
    this.editorTool = editorTool;
  }

}

export default editorRender;