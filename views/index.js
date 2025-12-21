
import  "./head.template.js"; 
import  "./main.template.js";
import  "./footer.template.js";
import headMocks  from "../mocks/head.js";
import personMocks from "../mocks/person.js";
import articleMocks from "../mocks/articles.js";

const anchor = document.querySelector(".blog-container");


const headTemplate = Handlebars.templates["head"];
const mainTemplate = Handlebars.templates["main"];
const footerTemplate = Handlebars.templates["footer"];




const headStr = headTemplate(headMocks);

const mainMocks = {person: personMocks, articles: articleMocks};
const mainStr = mainTemplate(mainMocks);
const footerStr = footerTemplate();

const anchorStr = headStr + mainStr + footerStr;

anchor.innerHTML = anchorStr;

console.log(headStr, "这里应该打印出headTemplate的内容");
console.log(mainStr, "这里应该打印出mainStr的内容");
console.log(footerStr, "这里应该打印出footer的内容");