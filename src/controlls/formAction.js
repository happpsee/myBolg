/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-24 20:28:15
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 14:44:22
 * @FilePath: \徐晨冰_Node_20260124\第五十二天\myBolg\src\controlls\formAction.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {form} from "@/modules/login/login.js";

export const FormActions = () => {
  if (!$(".header-list--log-reg-btn")[0]) {
    return false;
  }

  $(".header-list--log-reg-btn").on("click", (e) => { 
    const type = e.target.dataset?.type?.trim();
    form.switchStatus(type);
  });
};