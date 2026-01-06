/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 14:48:40
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-06 13:59:34
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\stores\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from "store";
import { storeKey } from "@/constant/index.js";

 let loginState = { isLogin: !!store.get(storeKey.loginKey) };
 

export const getLoginStatus = () => {
    return {...loginState};
  };

export const setLoginStatus = (value) => {
    loginState.isLogin = value;
  };