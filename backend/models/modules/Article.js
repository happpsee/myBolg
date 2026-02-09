/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-31 14:57:20
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-05 20:23:21
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\backend\models\modules\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEimp
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-19 11:26:17
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-21 15:24:37
 * @FilePath: \徐晨冰_Node_20260119\第四十九天\express-login\models\modules\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require("mongoose");
const { formatTime } = require("../../utils");

const schema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    required: [true, "必须填写文章标题"],
    default: () => {
      return "默认标题" + Date.now();
    }
  },
  //封面
  cover: {
    type: mongoose.SchemaTypes.String
  },
  //文章内容
  content: {
    type: mongoose.SchemaTypes.String,
    required: [true, "必须填写文章内容"],
    set: (val) => {
      return val.replace(/\"/gi, "'");
    }
  },
  //更新
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) {
      console.log(val, "Val");
      return formatTime(Date(val));
    }
  },
  //点击量
  clickNums: {
    type: mongoose.SchemaTypes.Number,
    default: 0
  },
  //评论量
  commentNums: {
    type: mongoose.SchemaTypes.Number,
    default: 0
  },
  //点赞量
  likeNums: {
    type: mongoose.SchemaTypes.Number,
    default: 0
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
      default: []
    }
  ],
  column: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Column",
  }
})

schema.set("toJSON", {getters: true});
module.exports = mongoose.model("Article", schema);