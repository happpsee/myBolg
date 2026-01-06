/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 11:12:47
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-06 14:24:37
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-22 13:40:36
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-02 14:43:59
 * @FilePath: \徐晨冰_Node_20251221\第三十三天\myBolg\views\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */




import { http } from "./utils/http.js";
import {routerStart} from "./router/index.js";
import {actionsStart} from "./actions/index.js";
import store from "store";
import { storeKey } from "./constant/index.js";
import "@my-blog/editor/editor.css";
import "./styl/index.styl";
import Typography from 'typography'
import githubTheme from 'typography-theme-github'

const typography = new Typography(githubTheme)


console.log(typography.toString(), "ToString");
const init = () => {  
  routerStart();


  store.get(storeKey.pubKey) || http.send("pubKey");

  actionsStart();

};


init();


