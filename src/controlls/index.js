/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 11:12:47
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-27 21:41:07
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\actions\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-29 20:48:47
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-05 18:18:25
 * @FilePath: \徐晨冰_Node_20251227\myBolg\modules\actionControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { router } from "@/router/index.js";

export const actionsStart = () => {
  $(document).on("click", "a[data-router]", (e) => {
    e.preventDefault();
    e.target?.dataset?.router && router.navigate(e.target.dataset.router);
  });
};