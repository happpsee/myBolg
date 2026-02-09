/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-06 21:01:12
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 17:08:38
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\src\views\userInfo\avatarOprate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Modal } from "@/components/modal";
import avatarTemplate from "./hbs/avatar";
import * as avatarClass from "./styl/avatar";
import labelSign from "./index.sign";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
class AvatarOperate {
  constructor() { }

  init({avatarTools, avatarSrc}) {
    this.avatarTools = avatarTools;
    this.avatarSrc = avatarSrc;
    this.eventAgency();

    return this;
  }

  renderModal(){
    const { close, open, kill } = Modal.modalFactory({
      isCustom: true, customContent: avatarTemplate({ class: avatarClass, labelSign, avatarSrc: this.avatarSrc })
    });
    this.close = close;
    this.open = open;
    this.kill = kill;

  }

  eventAgency() {
    const typeMap = {
      "scan": () => {
        this.renderModal();
        this.open();
        $$(labelSign.avatarOperateClose).on("click", () => {
          this.close();
          this.kill();
          $$(labelSign.avatarOperateClose).off();
        });
      },
      "crop": () => {
        this.renderModal();
        this.open();
        const cropper = new Cropper($$(labelSign.avatarOperateImg)[0], {
          minCropBoxWidth: 100,
          minCropBoxHeight: 100,
          crop(e) {
          }
        });
    
        $$(labelSign.avatarOperateClose).on("click", () => {
          this.close();
          this.kill();
          $$(labelSign.avatarOperateClose).off();
          cropper.getCroppedCanvas().toBlob((img) => {
            this.avatarBlob = img;
            this.avatarSrc = URL.createObjectURL(img);
            console.log(this.avatarBlob instanceof Blob, this.avatarSrc, "thi.avatarSrc");
            cropper.destroy();
          });
        })
       }
    };
    this.avatarTools.on("click", (e) => {
      let type = $(e.target).data("action");
      typeMap[type] && typeMap[type](e);
    });

  }

   switchImg(src, file){
    this.avatarSrc = src;
    this.avatarBlob = file; 
  }





  destroy() {
    this.close();
    this.kill();
    $$(labelSign.avatarOperateClose).off();

  }

}

export default AvatarOperate;