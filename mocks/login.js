/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-24 18:59:16
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-26 17:24:15
 * @FilePath: \徐晨冰_Node_20251224\第三十四天\myBolg\mocks\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export const formMap = {
  pwdLogin: {
    username: "is_required|is_username|minlength(2)|maxlength(9)",
    pwd: "is_required|is_pwd|minlength(6)|maxlength(12)"
  },
  phoneLogin: {
    phone: "is_required|is_phone",
    pwd: "is_required|is_pwd|minlength(6)|maxlength(12)",
    vertificate: "is_required|is_vertificate|minlength(4)|maxlength(6)"
  },
  registry: {
      username: "is_required|is_username|minlength(2)|maxlength(9)",
      pwd: "is_required|is_pwd|minlength(6)|maxlength(12)"
  }
};

export const msgMap = {
  pwdLogin: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    pwd: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
  phoneLogin: {
    phone: "手机号必填|手机号格式错误",
    pwd: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位| 密码不能少于6位|密码不能多于12位",
    vertificate: "验证码必填|验证码格式必须为 字母 + 数字|验证码不能少于4|验证码不能多于6"
  },
  registry: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    pwd: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
};
