/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-03 11:29:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 22:17:22
 * @FilePath: \徐晨冰_Node_20250103\第四十天\myBolg\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter } from "routerjs";
import { getMatchKey } from "@/utils/index.js";
import { SkeletonModel, PersonModel, ArticleModel, EditorModel, ArticleDetailModel, ColumnModel } from "@/views/index.js";


const routerMap = {
  "/": {
    living: [PersonModel, ArticleModel],
  },
  "/write": {
    living: [PersonModel, EditorModel],
  },
  "/article/:id": {
    living: [PersonModel, ArticleDetailModel],
  },
  "/columns": {
    living: [PersonModel, ColumnModel],
  }
}

const getRouterMapPath = (path) => {
  console.log(routerMap, "routerMap");
  let matchKey = getMatchKey(path, routerMap);
  return routerMap[matchKey];
};




class Router {
  constructor({
    path,
    routerjs
  }) {
    new SkeletonModel().init({path: getMatchKey(location.pathname, routerMap)});
    this.curPath = path;
    this.routerjs = routerjs;
    this.livings = [];
  }

  unMounted(req, context) {
    let path = req.path;
    let oldPath = this.curPath;
    
    if (oldPath === path) {
      return false;
    }

     
    if (!getRouterMapPath(oldPath)) {
      return false;
    }

    let { living: old } = getRouterMapPath(oldPath);
    let { living: news } = getRouterMapPath(path);

    for (const item of old) {
      if (news.includes(item)) {
        continue;
      }
      let idx = this.livings.findIndex((el) => {
        return el instanceof item;
      });
      this.livings[idx].destroy && this.livings[idx].destroy();
      this.livings.splice(idx, 1);
    }
  }
  
  mounted(req, context) {
    let path = req.path;

    if (path === this.curPath) {
      return false;
    }

    let {living: news} = getRouterMapPath(path);;

    let render = Promise.resolve(); 
    
    for (const item of news) {
      render.then(async () => {
        let el = new item();
        this.livings.push(el);
        await el.init(req, context); 
      });
    }
  }

  setCurPath(req) {
    this.curPath = req.path;
  }

  navigate(...args) {
    this.unMounted(...args);
    this.mounted(...args);
    this.setCurPath(...args);
  }
}



export const routerjs = createRouter();

const router = new Router({
  routerjs
});



export const routerStart = () => {
  for (const key of Object.keys(routerMap)) {
    routerjs.get(key, (...args) => {
      router.navigate(...args);
    });
  }

  routerjs.run();
};


