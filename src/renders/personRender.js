/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-05 18:04:05
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 14:55:56
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\renders\personRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  personTemplate from "@/views/person.handlebars";

export const renderPerson = ({ person } = {}) => {
  //登录成功
  const $mainLeft = $(".main-left");
  const personStr = personTemplate(person);
  $mainLeft.html(personStr);
};