/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-06 17:45:31
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 17:00:14
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\src\views\about\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {http} from "@/utils";
import * as UserInfoClass from "./styl";

import userInfoTemplate from "./hbs";
import labelSign from "./index.sign";
import { routerjs } from "@/router";
import {Message} from "@/components/message";
import AvatarOperate from "./avatarOperate";
console.log(UserInfoClass, "S");

const form = [
  {
    label: "昵称",
    field: "nickname",
    type: "text",
    readonly: true,
    placeholder: "请输入昵称",
    sign: labelSign.nickname
  },
  {
    label: "邮箱",
    field: "email",
    type: "text",
    placeholder: "请输入邮箱地址",
    sign: labelSign.email
  },
  {
    label: "签名",
    field: "signature",
    type: "text",
    placeholder: "请输入你的个性签名",
    sign: labelSign.signature
  },
  {
    label: "描述",
    field: "description",
    type: "text",
    placeholder: "请输入你的个性描述",
    sign: labelSign.description
  }
];

class AboutModel {
  constructor() {}

  async init(_, context){
    if (!this.appRightRender) {
      this.appRightRender = context.appRightRender;
    }


    await this.render();
    this.eventAgency();
  }

  async render() {
   const ans = await http.send("getUserInfo");

   for (const item of Object.values(form)) {
      if (!!ans[item.field]) {
        //如果有这个字段
        item.value = ans[item.field];
      }
   }

   console.log(ans.avatar, "得到用户信息");

   this.appRightRender.html(userInfoTemplate({
    class: UserInfoClass,
    form,
    avatarSrc: ans.avatar,
    labelSign
   }));

   this.avatarSrc = ans.avatar;
  }

  eventAgency() {
    const handleMap = {
      "cancel": () => {
        routerjs.navigate("/");
      },
      "confirm": async () => {
        const data = form.reduce((acc, {sign, field}) => {
          acc[field] = $$(sign).val();
          return acc;
        }, {});
        try {
          const ans = await http.send("changeUserInfo", data);

          console.log(this.cropper.avatarBlob, "有没有");
          if (this.cropper.avatarBlob) {
            const formdata = new FormData();
            formdata.append("file", this.cropper.avatarBlob);
            console.log(this.cropper.avatarBlob, "Ss");
            console.log("调用", this.cropper.avatarBlob);
            await http.send("uploadUser", formdata, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
          }
 
          new Message().success("修改成功!");
          this.reload();
        } catch (err) {
          new Message().danger("修改失败!");
          console.log(err);
        }
      }


      
    };
    $$(labelSign.btn).on("click", (e) => {
      let type = $(e.target).data("action");
      console.log(type);
      handleMap[type] && handleMap[type](e);
    });
    $$(labelSign.avatarInput).on("mouseover", () => {
      $$(labelSign.mask).removeAttr("hidden");
    });
    $$(labelSign.avatarInput).on("mouseleave", () => {
      $$(labelSign.mask).attr("hidden", "");
    });
    $$(labelSign.avatarInput).on("change", (e) => {
      const file = e.target.files[0];
      this.avatarSrc = URL.createObjectURL(file);
     $$(labelSign.avatarImg)[0].src = this.avatarSrc;
      this.cropper.switchImg(this.avatarSrc, file);
    });


    this.cropper = new AvatarOperate().init({
      avatarTools:$$(labelSign.avatarTools), 
      avatarSrc:this.avatarSrc
    });

  }

  destroy() {
    $$(labelSign.btn).off();
  }
  reload() {
    location.reload();
  }
  
}

export default AboutModel;