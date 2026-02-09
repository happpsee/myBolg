/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-02-03 18:31:03
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-02-04 19:33:23
 * @FilePath: \徐晨冰_Node_20260202\第五十五天\blog\frontend\plugins\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from "path";



let globalId = 0;
const keyFactory = (prefix) => {
  globalId++;
  let componentIdx = 0;
  return () => (componentIdx++, prefix + globalId + componentIdx);
};

const valueFactory = () => {
  let id = 0;
  return () => ++id;
};


const kebabToCamel = (value) => {
  return value.replace(/(-.)/gi, ($1) => {
    return $1[1].toUpperCase();
  });
};



export default function signLabelLoader(content) {
  const { name } = path.parse(path.join(this.resourcePath, "../"));

  const getValue = valueFactory();
  const getKey = keyFactory(name);

  let config = content.match(/\[[\S\s]*\]/gi);
  config = JSON.parse(config);

  config = config.reduce((acc, curr) => {
    let key  = getKey().toLowerCase();
    let value = getValue();
    acc[curr] = `${key}='${value}'`;
    acc[kebabToCamel(curr)] = `data-${key}=${value}`;
    return acc;
  }, {});


  return "export default " + JSON.stringify(config);
}