/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-01 20:01:29
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-02 12:25:34
 * @FilePath: \徐晨冰_Node_20250102\第三十九天\myBolg\config\webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {merge} from "webpack-merge";

import path from "path";

import common from "./webpack.common.js";


console.log(path.join(import.meta.dirname, "../public"));
export default merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(import.meta.dirname, "../public"),
    },
    port:5437,
    open: true,
    compress: true
  }
});