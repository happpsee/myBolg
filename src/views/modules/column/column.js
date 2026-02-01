/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-31 15:02:37
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-01 18:53:43
 * @FilePath: \徐晨冰_Node_20260131\第五十五天\myBolg\src\models\modules\column\column.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "@/utils/index.js";
import { formatTime } from "@/utils/index.js";
import Packery from "packery";
import Draggabilily from "draggabilly";
import * as columnClass from "./styl/column.styl";
import columnTemplate from "./hbs/column.hbs";



class Column {
  constructor() {}


  async init() {
    await this.render();
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
      console.log(rowClass, colClass, "rowClass-colClass", segStatus);
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

    // console.log($packery, "$packery");

    // $packery.find(".js-column-item").each((_, item) => {
    //   const draggie = new Draggabilily(item);

    //   //bindDraggabillyEvents
    //   $packery.packery("bindDraggabillyEvents", draggie);
    // });
     
  }
}


export default Column;