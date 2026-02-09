/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-05 18:04:05
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 16:58:29
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\renders\personRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  { personMocks } from "@/mocks";
import * as personClass from "./styls/person";
import personTemplate from "./hbs/person";
import store from "store";
import {http, emitter} from "@/utils";

class Person {
  constructor() {}

  async init(_, context) {
    const isLogin = !!store.get(LOGIN_KEY);
    const $mainLeft = context.appLeftRender;
    this.$mainLeft = $mainLeft;
    if (!isLogin) {
      emitter.once("loginSuccess", () => {
        this.render(context);
      });
      return false;
    }
    this.render(context);


  }

  async render(context) {
    //登录成功
   const ans = await http.send("getUserInfo", {
    params: {
      detail: true
    }
   });

    console.log(ans, "ans");


    const personStr = personTemplate({personClass, ...ans});
    this.$mainLeft.html(personStr);
  }
}

export default Person;