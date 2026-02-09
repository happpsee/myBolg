/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-19 11:26:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-07 17:04:40
 * @FilePath: \徐晨冰_Node_20260119\第四十九天\express-login\models\modules\User.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../../core");

const schema = mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: [true, "必须填写用户名"],
    validate: {
      validator(val) {
        return /[0-9a-zA-Z]{4,8}/.test(val)
      },
      message: "用户名必须由 数字字母 6-8位组成"
    },
    unique: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: [true, "必须填写密码"],
    validate: {
      validator: function (val) {
        val = decrypt(val);
        console.log(val, "val值是什么");
        return /^[a-zA-Z0-9\_\-\=]{3,16}$/gi.test(val);
      },
      message: () => "密码格式不正确!"
    },
    select: false,
    set (val) {
      return encrypt(val)
    },
    get (val) {
      try {
      console.log(decrypt(val), "vall");
      } catch (err) {
        console.log("错误是什么", err);
      }
      return decrypt(val);
    }
  },
  email: {
    type: mongoose.SchemaTypes.String,
    validate: {
      validator(val) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(val);
      },
      message: "请输入合法邮箱地址"
    }
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
    get(val) {
      console.log(val, "Vall");
      return val || "https://ts1.tc.mm.bing.net/th/id/OIP-C.zQqd6ObRcWLBHbN6VEwwsQAAAA?w=205&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2";
    }
  },
  nickname: {
    type: mongoose.SchemaTypes.String,
    validate: {
      validator(val) {
        return /[\u4e00-\u9fa50-9a-zA-Z]{1,8}/.test(val);
      },
      message: "昵称由 字母数字汉字 1-8位组成"
    }
  },
  signature: {
    type: String,
    default: '这个人很懒, 什么都没有写 ^_^'
  },
  description: {
    type: String,
    default: '这个人很懒, 什么都没有写 ^_^'
  }
})
schema.set("toJSON", {getters: true});
module.exports = mongoose.model("User", schema);