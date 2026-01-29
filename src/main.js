/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-24 20:28:15
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-29 21:58:13
 * @FilePath: \徐晨冰_Node_20260124\第五十二天\myBolg\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "./utils/modules/http.js";
import {routerStart} from "./router/index.js";
import store from "store";
import "./styl/index.styl";

const init = () => {  
  routerStart();
  
  store.get(PUBLIC_KEY) || http.send("pubKey");
};


init();


