/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 11:29:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 16:57:13
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter } from "routerjs";
import { getLoginStatus, } from "@/stores/login.js";
import { getLayoutState, renderBaseLayout } from "@/stores/baseLayout.js";
import headMocks from "@/mocks/head.js";
import { combinate } from "@/utils/index.js";
import { FormActions } from "@/controlls/formAction.js";
import { renderPerson } from "@/renders/personRender.js";
import articleRender from "@/renders/articles.js";
import { navListActions } from "../controlls/navListAction.js";
import { emitter } from "../utils/eventEmitter.js";
import editorRender from "../renders/editor.js";

export const router = createRouter();


//确保在路由前执行这个
const layoutMiddleware = () => {
  if (getLayoutState().baseLayoutRendered) {
    return false;
  }
  const headData = {
    isLogin: getLoginStatus().isLogin,
    navList: headMocks.navList
  };

  renderBaseLayout({
    headData
  });

  const {isLogin} = getLoginStatus();
  isLogin ? renderPerson() : emitter.once("loginSuccess", renderPerson());
  isLogin || FormActions();

};


router.get("/", combinate(layoutMiddleware, () => {
  //渲染文章
  new articleRender();
  

}));

router.get("/write", combinate(layoutMiddleware, () => {
  new editorRender();
}));


router.always((context) => {
  navListActions(context.path);
});

export const routerStart = () => {
  router.run();
};


