/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-31 15:02:37
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-02 15:53:27
 * @FilePath: \徐晨冰_Node_20260131\第五十五天\myBolg\src\models\modules\column\column.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "@/utils/index.js";
import { formatTime } from "@/utils/index.js";
import Packery from "packery";
import Draggabilily from "draggabilly";
import * as columnClass from "./styl/column.styl";
import * as addColumnClass from "./styl/addColumn.styl";
import columnTemplate from "./hbs/column.hbs";
import addColumnTemplate from "./hbs/addColumn.hbs";
import { Modal } from "../modal/modal.js";
import { Message } from "../message/message.js";




class Column {
  constructor() {}


  async init() {
    await this.render();
    this.eventAgency();
  }

  async render() {
    let { data:list} = await http.send("column");

    const listLen = list.length / 4;
    const segMap = {
      "0": "Small",
      "1": "Base",
      "2": "Middle",
      "3": "Tall"
    };
    list.sort((a, b) => {
      return a.aids.length - b.aids.length;
    });

    list = list.map(({name, aids, date}, index) => {
      let len = aids.length;
      let segStatus = Math.floor(index / listLen);
      let rowClass = columnClass[`columnItemRow${segMap[segStatus]}`];
      let colClass = columnClass[`columnItemCol${segMap[segStatus]}`];
      date = formatTime(date);
      return {name, date, aidLen: len, rowClass, colClass};
    }); 

    list.reverse();


    $(".js-app-right").html(columnTemplate({ list, class:columnClass }));

    const $packery = new Packery(".js-column-packery", {
      itemSelector: ".js-column-item",
      columnWidth: 60
    });
    
    $packery.getItemElements().forEach((itemElem) => {
      const draggie = new Draggabilily(itemElem);
      $packery.bindDraggabillyEvents(draggie);
    });
     
  }

  eventAgency() {
    $(".js-add-column").on("click", () => {
      if (!this.open) {
        const { close, open, kill } = Modal.modalFactory({
          head: {
            title: "新增分类",
          },
          footer: {
            closeText: "取消添加",
            confirmText: "确定添加分类"
          },
          body: {
            content: addColumnTemplate({class:addColumnClass})
          },
          confirm: async () => {
            let text = $(".js-add-column-input").val();
            if (text.length < 2) {
              (new Message()).danger("分类字数不得少于2位");
            }
            const ans = await http.send("addColumn", {
              name: text
            });
            (new Message()).success("添加分栏成功");
            this.reload();
            console.log("分栏的结果为", ans);
          }
        });
        this.open = open;
        this.close = close;
        this.kill = kill;
      }
      this.open();
       
    });
  }

  destroy() {
     $(".js-add-column").off();
  }

  async reload() {
    this.kill();
    this.destroy();

    await this.init();
  }

}


export default Column;