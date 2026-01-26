/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-06 14:46:32
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-06 15:02:24
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\actions\navListAction.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export const navListActions = (path) => {
    const aLis = $(".header-list a");
    
    for (let i = 0, len = aLis.length; i < len; i++) {
      if (aLis.eq(i).data("router") === path) {
        aLis.removeClass("active");
        aLis
          .eq(i)
          .addClass("active")
        break;
      }
    }
};