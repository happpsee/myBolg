(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['person'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"userNickname") || (depth0 != null ? lookupProperty(depth0,"userNickname") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"userNickname","hash":{},"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":20}}}) : helper)))
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    暖阳\r\n    ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"motto") || (depth0 != null ? lookupProperty(depth0,"motto") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"motto","hash":{},"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":14,"column":13}}}) : helper)))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    用代码温暖世界，用文字照亮前路\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <p>p标签</p>\r\n        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"articlesNum") || (depth0 != null ? lookupProperty(depth0,"articlesNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"articlesNum","hash":{},"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":24,"column":23}}}) : helper)))
    + "\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "        128k\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"readerNum") || (depth0 != null ? lookupProperty(depth0,"readerNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"readerNum","hash":{},"data":data,"loc":{"start":{"line":32,"column":8},"end":{"line":32,"column":21}}}) : helper)))
    + "\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "        5.2k\r\n        ";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"personalTag") || (depth0 != null ? lookupProperty(depth0,"personalTag") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"personalTag","hash":{},"data":data,"loc":{"start":{"line":39,"column":4},"end":{"line":39,"column":19}}}) : helper)))
    + "\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "    前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"person animate__animated animate__bounceInLeft\">\r\n  <div class=\"person-avatar\">\r\n  <img  src=\"./public/img/avatar.jpeg\"></img>\r\n  </div>\r\n\r\n  <span class=\"person-nickname text-xl\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"userNickname") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":11,"column":11}}})) != null ? stack1 : "")
    + "</span>\r\n  <span class=\"person-motto text-xs\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"motto") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":13,"column":4},"end":{"line":17,"column":11}}})) != null ? stack1 : "")
    + "  </span>\r\n  <div class=\"person-data\">\r\n    <div class=\"person-data--article\"><span class=\"text-xs person-data--article-icon \">文章</span><span\r\n        class=\"person-data--article-num text-base\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"articlesNum") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":22,"column":8},"end":{"line":27,"column":15}}})) != null ? stack1 : "")
    + "      </span></div>\r\n    <div class=\"person-data--reader\"><span class=\"text-xs person-data--reader-icon\">读者</span><span\r\n        class=\"person-data--reader-num text-base\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"readerNum") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":31,"column":8},"end":{"line":35,"column":15}}})) != null ? stack1 : "")
    + "</span></div>\r\n  </div>\r\n  <span class=\"person-tag text-sm\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"personalTag") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":38,"column":4},"end":{"line":42,"column":11}}})) != null ? stack1 : "")
    + "\r\n  </span>\r\n  <div class=\"person-nav\">\r\n    <div class=\"person-nav--gth person-nav--item \"></div>\r\n    <div class=\"person-nav--bili  person-nav--item \"></div>\r\n    <div class=\"person-nav--email  person-nav--item \"></div>\r\n  </div>\r\n</div>";
},"useData":true});
})();