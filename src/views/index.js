import person  from "./modules/person.handlebars";
import main  from "./modules/main.handlebars";
import head  from "./modules/head.handlebars";
import footer  from "./modules/footer.handlebars";
import articleDetail  from "./modules/articlesDetail.handlebars";
import article  from "./modules/articles.handlebars";
import login  from "./modules/logReg/login.handlebars";
import registry  from "./modules/logReg/registry.handlebars";
import editor  from "./modules/editor.handlebars";
import message  from "./modules/message.handlebars";

import modalHead  from "./modules/modal/modal-head.handlebars";
import modalMain  from "./modules/modal/modal-main.handlebars";
import modal  from "./modules/modal/modal.handlebars";
import modalFooter  from "./modules/modal/modal-footer.handlebars";

const templates = {
  main ,
  head ,
  footer ,
  person ,
  article ,
  articleDetail,
  login ,
  registry ,
  editor ,
  message ,
  modalHead ,
  modalMain ,
  modal ,
  modalFooter 
};

export const getTemplate = (tmpName) => {
  return templates[tmpName];
};