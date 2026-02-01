/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-05 18:04:05
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 16:15:32
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\renders\personRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  { personMocks } from "@/mocks/index.js";
import * as personClass from "./styls/person.styl";
import personTemplate from "./hbs/person.hbs";


class Person {
  constructor() {}

  async init() {
    this.render();
  }

  render() {
    //登录成功
    const $mainLeft = $(".js-app-left");

    const personStr = personTemplate({personClass, ...personMocks});
    $mainLeft.html(personStr);
  }
}

export default Person;