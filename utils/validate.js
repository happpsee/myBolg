
const regexps = {
  required:  () => /^.+$/,
  username: () => /^[\u4e00-\u9fa5a-zA-Z0-9]*$/,
  pwd: () =>  /^[a-zA-Z0-9]*$/,
  phone: () =>  /^1[3-9]\d{9}$/,
  vertificate: () => /^[a-zA-Z0-9]*$/,
  maxlength: (length) => new RegExp(`.{0,${length}}`),
  minlength: (length) => new RegExp(`.{${length}}`)
};


const getRule = (rule) => {
  const divideRegxps = /^(?:is_([a-zA-Z_]+)|([a-zA-Z_]+)\((\d+)\))$/;


  const match = rule.match(divideRegxps);


  if (match[1]) {
    return regexps[match[1]]();
  }

  return regexps[match[2]](match[3]);
};

//生产链表上的单个节点
const validateNodeFactory = (rule = "is_required", msg) => {
  return {
    rule: getRule(rule),
    msg,
    nextSuccessor: null
  }
};


//生产验证链表
const validateListFactory = (rules, display) => {

  rules = rules.split("|");
  display = display.split("|");

  const dummpy = validateNodeFactory();
  let  curr = dummpy;
  for (let i = 0, len = rules.length; i < len; i++) {
    const p = validateNodeFactory(rules[i], display[i]);
    curr.nextSuccessor = p;
    curr = p;
  }
  return dummpy.nextSuccessor;
};

//收集针对于表单上的所有输入input标签的验证链，返回一个数组，每一项由输入框dom元素和验证链构成
const collectRegExps = ($anchor, data) => {
  return data.reduce((acc, {name, display, rules}) => {
    
    //用于查找要校验的那个表单
    const ele = $anchor.find(`input[name="${name}"]`);

    //生成专属于这个表单的校验传递链
    const list = validateListFactory(rules, display);

    acc.push({
      ele, list
    });

    return acc;
  }, []);
};


const executeValidateList = (list, value) => {
  let curr = list;
  let result = true, msg = "";
  //当curr没有到达list尾的时候
  while (curr) {
    console.log("测试", curr.rule, value);
    result = curr.rule.test(value);
    if (!result) {
      //如果验证错误了，那么也就没有必要必须判断了，打断循环
      msg = curr.msg;
      console.log(msg, "MSSS");
      break;
    }

    //验证成功,传递给下一个节点
    curr = curr.nextSuccessor;
  }
  return {
    result,
    msg
  };
};



//总验证工厂
export const validateForm = (type, data) => {

  const $form = $(`#${type}`);

  //得到这个表单上所有的输入框的dom元素，和验证链
  const validates = collectRegExps($form, data);
  //上面两步把配菜准备完成
  //这个函数是一个执行机器，在这里执行验证链
  const errors = validates.reduce((acc, {ele, list}) => {
    
    const {result, msg} = executeValidateList(list, ele.val());
    if (result) {
      //验证成功，则我们什么也不做
      return acc;
    }

    console.log(result, "Result");
    //验证失败,拿到dom元素和msg错误消息
    acc.push({
      ele,
      msg 
    });
    return acc;
  }, []);

  return {
    result: errors.length > 0 ? false : true,
    errors
  }
};

