/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-28 14:22:05
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-30 15:27:03
 * @FilePath: \myBolg\modules\templateControl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const TEMP_MAP = {
  "head": () => Handlebars.templates["head"],
  "main": () => Handlebars.templates["main"],
  "person": () => Handlebars.templates["person"],
  "articles": () => Handlebars.templates["articles"],
  "editor": () => Handlebars.templates["editor"],
  "footer": () => Handlebars.templates["footer"],
  "login": () => Handlebars.templates["login"],
  "registry": () => Handlebars.templates["registry"],
  "modal-head": () => Handlebars.templates["modal-head"],
  "modal-main": () => Handlebars.templates["modal-main"],
  "modal-footer": () => Handlebars.templates["modal-footer"],
  "modal": () => Handlebars.templates["modal"]

};

export const templateFactory = (name, wrap = $("body")) => {

  if (!TEMP_MAP[name]) {
    console.warn("没有这个模板！！！");
    return false;
  }

  const tempHandle = TEMP_MAP[name](); 

  const render = (data) => {
    const tempStr = tempHandle(data);
    

    wrap.html(tempStr);

    return tempStr;
  };

  const getHTMLStr = (data) => {
    return tempHandle(data);
  };

  const setWrap = (newWrap) => {
    wrap = newWrap;
  };

  const getWrap = () => {
    return wrap;
  }

  return {
    render,
    getHTMLStr,
    setWrap,
    getWrap
  };
};