/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-16 18:22:50
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-26 13:53:00
 * @FilePath: \徐晨冰_Nde_20260116\第四十七天\express-login\router\modules\loginRouter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-16 18:22:50
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-16 19:36:08
 * @FilePath: \徐晨冰_Nde_20260116\第四十七天\express-login\router\modules\loginRouter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const User = require("../../models/modules/User");
const assert = require("http-assert");
const { getToken, decrypt } = require("../../core/index");

router.post("/", async (req, res, next) => {
  console.log(req);
  let {username, password} = req.body;



  try {
    password = decrypt(password);
    if (!username || username.length === 0 || !password || password.length === 0) {
    createError(422, "必需填写账号或密码");
    return false;
    }
    const user = await User.findOne({username}).select("password");
    console.log(user, "userrr");
    assert(user.password === password, 422, "用户不存在");
    let token = getToken({username, id: user._id});

    res.json({
      code: 200,
        data: {
          userId: user._id,
          token
        },
      timestamp: Date.now()
    });
  } catch (err) {
    next(createError(422, "登录错误"));
  }

}); 

module.exports = {
  loginRouter: router
}