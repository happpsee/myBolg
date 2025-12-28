(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"userNickname") || (depth0 != null ? lookupProperty(depth0,"userNickname") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"userNickname","hash":{},"data":data,"loc":{"start":{"line":12,"column":8},"end":{"line":12,"column":24}}}) : helper)))
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "          暖阳\r\n        ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"motto") || (depth0 != null ? lookupProperty(depth0,"motto") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"motto","hash":{},"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":18,"column":17}}}) : helper)))
    + "\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        用代码温暖世界，用文字照亮前路\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p>p标签</p>\r\n            "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"articlesNum") || (depth0 != null ? lookupProperty(depth0,"articlesNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"articlesNum","hash":{},"data":data,"loc":{"start":{"line":28,"column":12},"end":{"line":28,"column":27}}}) : helper)))
    + "\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "            128k\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"readerNum") || (depth0 != null ? lookupProperty(depth0,"readerNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"readerNum","hash":{},"data":data,"loc":{"start":{"line":36,"column":12},"end":{"line":36,"column":25}}}) : helper)))
    + "\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "            5.2k\r\n            ";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"personalTag") || (depth0 != null ? lookupProperty(depth0,"personalTag") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"personalTag","hash":{},"data":data,"loc":{"start":{"line":43,"column":8},"end":{"line":43,"column":23}}}) : helper)))
    + "\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "         前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践前端开发工程师，热爱技术分享与开源贡献。专注于React、TypeScript和现代前端工程化实践\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"with","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":6},"end":{"line":83,"column":15}}})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"main-right-article\">\r\n        <div class=\"article-title text-xl\">\r\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"articleTitle") || (depth0 != null ? lookupProperty(depth0,"articleTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"articleTitle","hash":{},"data":data,"loc":{"start":{"line":67,"column":10},"end":{"line":67,"column":26}}}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"article-des text-sm\">\r\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"articleDes") || (depth0 != null ? lookupProperty(depth0,"articleDes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"articleDes","hash":{},"data":data,"loc":{"start":{"line":70,"column":10},"end":{"line":70,"column":24}}}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"article-about text-xs\">\r\n          <span class=\"article-date\"><span class=\"article-date--icon \"></span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"createdDate") || (depth0 != null ? lookupProperty(depth0,"createdDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createdDate","hash":{},"data":data,"loc":{"start":{"line":73,"column":84},"end":{"line":73,"column":99}}}) : helper)))
    + "</span></span>\r\n          <div class=\"article-like\"><span class=\"article-like--icon\"></span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"liekeNum") || (depth0 != null ? lookupProperty(depth0,"liekeNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"liekeNum","hash":{},"data":data,"loc":{"start":{"line":74,"column":76},"end":{"line":74,"column":88}}}) : helper)))
    + "<span></span></div>\r\n          <div class=\"article-comment\"><span class=\"article-comment--icon\"></span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"commnetNum") || (depth0 != null ? lookupProperty(depth0,"commnetNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commnetNum","hash":{},"data":data,"loc":{"start":{"line":75,"column":88},"end":{"line":75,"column":102}}}) : helper)))
    + "</span></div>\r\n          <div class=\"article-tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":12},"end":{"line":79,"column":21}}})) != null ? stack1 : "")
    + "          </div>\r\n        </div>\r\n      </div>\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"article-tags--item\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- 主体部分 start -->\r\n<main class=\"main \">\r\n  <!-- 个人简介部分 start -->\r\n  <div class=\"main-left visible-lg-block \">\r\n    <!-- -->\r\n\r\n    <!-- 个人介绍 -->\r\n    <div class=\"person\">\r\n      <img class=\"person-avatar\" src=\"./public/img/avatar.jpeg\"></img>\r\n      <span class=\"person-nickname text-xl\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"userNickname") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":11,"column":8},"end":{"line":15,"column":15}}})) != null ? stack1 : "")
    + "</span>\r\n      <span class=\"person-motto text-xs\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"motto") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":21,"column":15}}})) != null ? stack1 : "")
    + "        </span>\r\n      <div class=\"person-data\">\r\n        <div class=\"person-data--article\"><span class=\"text-xs person-data--article-icon \">文章</span><span\r\n            class=\"person-data--article-num text-base\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"articlesNum") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":31,"column":19}}})) != null ? stack1 : "")
    + "            </span></div>\r\n        <div class=\"person-data--reader\"><span class=\"text-xs person-data--reader-icon\">读者</span><span\r\n            class=\"person-data--reader-num text-base\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"readerNum") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":35,"column":12},"end":{"line":39,"column":19}}})) != null ? stack1 : "")
    + "</span></div>\r\n      </div>\r\n      <span class=\"person-tag text-sm\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"personalTag") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":42,"column":8},"end":{"line":46,"column":15}}})) != null ? stack1 : "")
    + "       \r\n      </span>\r\n      <div class=\"person-nav\">\r\n        <div class=\"person-nav--gth person-nav--item \"></div>\r\n        <div class=\"person-nav--bili  person-nav--item \"></div>\r\n        <div class=\"person-nav--email  person-nav--item \"></div>\r\n      </div>\r\n    </div>\r\n\r\n    </div>\r\n  </div>\r\n  <!-- 个人简介部分 end -->\r\n\r\n  <!-- 文章列表部分 start -->\r\n  <div class=\"main-right\">\r\n    <div class=\"main-right-list animate__animated animate__bounceInRight\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"articles") : depth0),{"name":"each","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":6},"end":{"line":84,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n  </div>\r\n  <!-- 文章列表部分 end -->\r\n</main>\r\n<!-- 主体部分 end -->";
},"useData":true});
})();