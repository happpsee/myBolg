/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-21 14:56:34
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-21 16:39:18
 * @FilePath: \徐晨冰_Node_20251220\第三十二天\myBolg\script\execHbs.js
 * @Description: 在node中批量编译我们的handlebars模板
 */

const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// //proccess.cwd()指的是工作目录
const templatePath = path.resolve(process.cwd(), "template");
//输出的内容
const viewPath = path.resolve(process.cwd(), "views");

const collectFile = (dirPath) => {    
  const stat = fs.statSync(dirPath);
  let ansFiles;

  if (!stat.isDirectory()) {
    const {ext} = path.parse(dirPath);
    return ext.slice(1).trim() === "handlebars" ?  dirPath : [];
  }

  const files = fs.readdirSync(dirPath);
  //当这个地址为文件夹的时

  ansFiles = files.flatMap((item) => {
    return collectFile(path.join(dirPath, item));//如果不是数组正好，如果是数组则打平
  });

  return ansFiles;
};



const execution = (exeucPath, outputPathDir) => {
  const files = collectFile(exeucPath);
  for (let i = 0, len = files.length; i < len; i++) {
    const {name} = path.parse(files[i]);
    const outputPath = path.join(outputPathDir, `${name}.template.js`);
    exec(`handlebars ${files[i]} -f ${outputPath}`);
  }
};

execution(templatePath, viewPath);