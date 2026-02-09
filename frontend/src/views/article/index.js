/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-01 22:16:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-06 13:42:15
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\src\views\article\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import IScroll from "iscroll";
import { http, debounce } from "@/utils";
import { routerjs } from "@/router";
import articlesTemplate from "./hbs/articles";
import * as articleClass from "./styl/article";
import labelSign from "./index.sign";
import { getSignAttr } from "@/utils";

class articleRender {
  constructor() {
  }

  async init(_, context) {
    this.searchEle = context.searchEle;
    console.log(this.searchEle, "this.searchEle");
    const $mainRight = context.appRightRender;
    this.$mainRight = $mainRight;
    await this.commonRender();
    this.eventAgency();
  }

  transformRes(data) {
    return data.reduce((acc, { title, content, date, likeNums, commentNums, _id } = {}) => {
      acc.push({
        articleTitle: title,
        articleDes: content.slice(0, 100),
        createdDate: date,
        likeNums,
        commentNums,
        id: _id
      });
      return acc;
    }, []);
  }

  async getArticles() {
    let { data } = await http.send("articles");
    return this.transformRes(data);
  }
  async searchArticle(search) {
    let {records} = await http.send("articleSearch",  {
      params: {
        search
      }
    });

    return this.transformRes(records);
  }

  async commonRender() {
    let articles = await this.getArticles();
    this.render(articles);
  }

  render(articles) {
    const articlesStr = articlesTemplate({ class:articleClass, articles, labelSign});
    this.$mainRight.html(articlesStr);
    
    if (!this.myScroll) {
      const myScroll = new IScroll(this.$mainRight[0], {
        mouseWheel: true,
        scrollbars: true,
        click: true,
      });
      this.myScroll = myScroll;
    } else {
      this.myScroll.refresh();
    }

  }

  async searchRender(search) {
    let articles = await this.searchArticle(search);
    this.render(articles);
  }

  eventAgency() {
    const list = $$(labelSign.list);

    list.on("click",(e) => {
      console.log("为什么触发两次");
      if (e.target === list[0]) {
        //点击到父容器了
        return false;
      }

      const {key, value} = getSignAttr(labelSign.listItem);
      let target = $(e.target);

      if ($(e.target).data(key) != value) {
        target = target.parent(`[data-${key}=${value}]`);
      }
      console.log(target, "target");
      routerjs.navigate(`/article/${target.data("id")}`, {
            appRightRender:this.$mainRight
      });
    });
   
    const confirmSearch = debounce((search) => {
      console.log("受说");
      this.searchRender(search);
    })
    const getSearchValue = (e) => {
      if (e.keyCode === 13) {
        confirmSearch($(e.target).val());
      }
    };

    this.searchEle.on("focus", () => {
      this.searchEle.on("keyup", getSearchValue);
    });
    this.searchEle.on("blur", () => {
      this.searchEle.off("keyup", getSearchValue);
    });


  }

  destroy() {
    $$(labelSign.list).off();
    this.myScroll.destroy();
  }
}

export default articleRender;