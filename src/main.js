/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-24 20:28:15
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 21:43:42
 * @FilePath: \徐晨冰_Node_20260124\第五十二天\myBolg\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "./utils/http.js";
import {routerStart} from "./router/index.js";
import {actionsStart} from "./controlls/index.js";
import store from "store";
import { storeKey } from "./constant/index.js";
import "./styl/index.styl";
// const typography = new Typography(githubTheme)


// console.log(typography.toString(), "ToString");
// import Message from "./utils/message.js";

// const message = new Message();
// message.info("通知");

const init = () => {  
  routerStart();

try {
  store.get(storeKey.pubKey) || http.send("pubKey");
} catch (err) {
  console.log(err, "Errr为");
}
  actionsStart();

};


init();


