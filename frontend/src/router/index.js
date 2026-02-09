/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 11:29:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-06 18:42:21
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter } from "routerjs";
import { getMatchKey, getDynamicParam } from "@/utils";

const routerMap = {
  "/": {
    living: ["PersonModel", "ArticleModel"],
  },
  "/write": {
    living: ["PersonModel", "EditorModel"],
  },
  "/article/:id": {
    living: ["PersonModel", "ArticleDetailModel"],
    dynamic: true,
  },
  "/columns": {
    living: [ "PersonModel", "ColumnModel"]
  },
  "/article/search": { 
    living: ["PersonModel", "ArticleModel"]
  },
  "/userInfo": {
    living: ["PersonModel", "UserInfoModel"]
  }
}
const modelMap = {
  "skeleton": () => import("@/views/skeleton"),
  "PersonModel": () => import("@/views/person"),
  "ArticleModel": () => import("@/views/article"),
  "EditorModel": () => import("@/views/editor"),
  "ArticleDetailModel": () => import("@/views/article/articleDetail"),
  "ColumnModel": () => import("@/views/column"),
  "UserInfoModel": () => import("@/views/userInfo")
};

const getRouterMapPath = (path) => {
  let matchKey = getMatchKey(path, routerMap);
  return routerMap[matchKey];
};




class Router {
  constructor() {
   this.curPath = null;
    this.routerjs = createRouter();
    this.livings = new Map();
    this.routeStatus = new Map();
  }

  init() {
    for (const key of Object.values(routerMap)) {
      this.routerjs.get(key, (req) => {
      });
    }
  }

  async run() {
    this.init();
    this.routerjs.run();
    const importFn = modelMap["skeleton"];
    const { default: SkeletonModel } = await importFn();
    const el = new SkeletonModel().init({ path: location.pathname });
  }


  unMounted(path, context) {
    let oldPath = this.curPath;



    if (oldPath === path) {
      return false;
    }
     
    if (!getRouterMapPath(oldPath)) {
      return false;
    }

    let { living: old } = getRouterMapPath(oldPath);
    let { living: news, unKillBefore } = getRouterMapPath(path);

    if (unKillBefore) {
      return false;
    }

    for (const item of old) {
      console.log(news, item, news.includes(item));
      if (news.includes(item)) {
        continue;
      }console.log(item,"item");

      let el = this.livings.get(item);
      el?.destroy && el.destroy(context);
      this.livings.delete(item);
    }
  }
  
  async mounted(path, context) {
    if (!getRouterMapPath(path)) {
      return false;
    }

    let {living: news} = getRouterMapPath(path);

    let olds = getRouterMapPath(this.curPath)?.living || [];
    
    for (const item of news) {
      console.log(olds, "item", item);
      if (olds.includes(item)) {
        continue;
      }
      const importFn = modelMap[item];
      if (!importFn) {
        continue;
      }
      let {default: Model } = await importFn();
      const el = new Model();
      this.livings.set(item, el);
      
      await el.init(path, context); 
    }
  }

  setCurPath(path) {
    console.log("段哦有");
    this.curPath = path;
  }

  async navigate(path, context = {}) {
    let matchKey = getMatchKey(path, routerMap);
    console.log(routerMap[matchKey] && routerMap[matchKey].dynamic, "dynmaic");
    if (routerMap[matchKey] && routerMap[matchKey].dynamic) {
      console.log(getDynamicParam(path, matchKey), "getDynimac");
      Object.assign(context, getDynamicParam(path, matchKey));
    }

    this.unMounted(path, context);
    await this.mounted(path, context);
    this.routerjs.navigate(path);
    this.setCurPath(path);
  }
}

export const routerjs = new Router();