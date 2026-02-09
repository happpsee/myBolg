export const formMap = {
  pwdLogin: {
    username: "is_required|is_username|minlength(2)|maxlength(9)",
    password: "is_required|is_pwd|minlength(6)|maxlength(12)"
  },
  phoneLogin: {
    phone: "is_required|is_phone",
    password: "is_required|is_pwd|minlength(6)|maxlength(12)",
    vertificate: "is_required|is_vertificate|minlength(4)|maxlength(6)"
  },
  registry: {
      username: "is_required|is_username|minlength(2)|maxlength(9)",
      password: "is_required|is_pwd|minlength(6)|maxlength(12)"
  }
};

export const msgMap = {
  pwdLogin: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
  phoneLogin: {
    phone: "手机号必填|手机号格式错误",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位| 密码不能少于6位|密码不能多于12位",
    vertificate: "验证码必填|验证码格式必须为 字母 + 数字|验证码不能少于4|验证码不能多于6"
  },
  registry: {
    username: "用户名必填|用户名格式必须为 数字+字母 2-9位|用户名不能少于2位|用户名不能多于9位",
    password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 6-12位|密码不能少于6位|密码不能多于12位"
  },
};
