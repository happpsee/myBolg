/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-29 22:30:56
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-30 12:54:55
 * @FilePath: \徐晨冰_Node_20260129\myBolg\src\views\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import main  from "./modules/skeleton/main.handlebars";
import head  from "./modules/skeleton/head.handlebars";
import footer  from "./modules/skeleton/footer.handlebars";

import articleDetail  from "./modules/article/articlesDetail.handlebars";
import article  from "./modules/article/articles.handlebars";
import articleSubmit from "./modules/article/articleSubmit.handlebars";

import login  from "./modules/logReg/login.handlebars";
import registry  from "./modules/logReg/registry.handlebars";

import editor  from "./modules/editor/editor.handlebars";

import message  from "./modules/message/message.handlebars";

import person  from "./modules/person/person.handlebars";

import modalHead  from "./modules/modal/modal-head.handlebars";
import modalMain  from "./modules/modal/modal-main.handlebars";
import modal  from "./modules/modal/modal.handlebars";
import modalFooter  from "./modules/modal/modal-footer.handlebars";



const templates = {
  main ,
  head ,
  footer ,
  person ,
  article ,
  articleDetail,
  articleSubmit,
  login ,
  registry ,
  editor ,
  message ,
  modalHead ,
  modalMain ,
  modal ,
  modalFooter
};

export const getTemplate = (tmpName) => {
  return templates[tmpName];
};