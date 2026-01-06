/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 14:06:10
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-06 13:59:26
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\stores\baseLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 14:06:10
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-05 17:53:57
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\stores\baseLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 14:06:10
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-05 16:25:07
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\stores\baseLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import headTemplate from "@/views/head.handlebars";
import mainTemplate from "@/views/main.handlebars";
import footerTemplate from "@/views/footer.handlebars";


let layoutState = {
  baseLayoutRendered: false
};
export const getLayoutState = () => {
  return {...layoutState};
};

export const setLayoutState = (value) => {
  layoutState.baseLayoutRendered = value;
};

export const renderBaseLayout = ({
  headData,
  mainData,
  footData
}) => { 
  let baseLayoutStr = headTemplate(headData) + mainTemplate(mainData) + footerTemplate(footData);
  layoutState.baseLayoutRendered = true;
  $(".blog-container").html(baseLayoutStr);
}

