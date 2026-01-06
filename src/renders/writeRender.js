/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-05 18:09:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-06 11:25:22
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\renders\writeRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import editorTemplate  from "@/views/editor/editor.handlebars";
import { renderEditor } from "@/stores/editor.js";

export const renderWrite = () => {
  //先重新渲染main-right;
  $(".main-right").html(editorTemplate);

  //然后渲染富文本编辑器
  renderEditor();

};