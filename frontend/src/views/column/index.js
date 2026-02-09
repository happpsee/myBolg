/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-31 15:02:37
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-04 19:44:11
 * @FilePath: \徐晨冰_Node_20260131\第五十五天\myBolg\src\models\modules\column\column.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEcl
 */
import { http } from "@/utils";
import { formatTime } from "@/utils";
import Packery from "packery";
import Draggabilily from "draggabilly";
import * as columnClass from "./styl/column";
import * as addColumnClass from "./styl/addColumn";
import columnTemplate from "./hbs/column";
import addColumnTemplate from "./hbs/addColumn";
import { Modal } from "@/components/modal";
import { Message } from "@/components/message";
import labelSign from "./index.sign";
import { getSignAttr } from "@/utils";



class Column {
  constructor() {}

  async init(_, context) {
    await this.render(context);
    this.eventAgency();
  }

  async render(context) {
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


    const anchor = context.appRightRender;
    anchor.html(columnTemplate({ list, class:columnClass, labelSign}));


    const {key, value } = getSignAttr(labelSign.columnList);
    const {key:itemKey, value: itemValue} = getSignAttr(labelSign.columnItem);
    const $packery = new Packery(`[data-${key}='${value}']`, {
      itemSelector: `[data-${itemKey}='${itemValue}']`,
      columnWidth: 60
    });
    
    $packery.getItemElements().forEach((itemElem) => {
      const draggie = new Draggabilily(itemElem);
      $packery.bindDraggabillyEvents(draggie);
    });
     
  }

  eventAgency() {
    $$(labelSign.addColumn).on("click", () => {
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
     $$(labelSign.addColumn).off();
     this.kill && this.kill();
  }

  async reload() {
    this.kill && this.kill();
    this.destroy();

    await this.init();
  }

}


export default Column;