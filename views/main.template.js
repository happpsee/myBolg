(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "main_has-login";
},"3":function(container,depth0,helpers,partials,data) {
    return "main-left_has-login";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"person\">\r\n      <img class=\"person-avatar\" src=\"./public/img/avatar.jpeg\"></img>\r\n      <span class=\"person-nickname text-xl\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"userNickname") || (depth0 != null ? lookupProperty(depth0,"userNickname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userNickname","hash":{},"data":data,"loc":{"start":{"line":11,"column":44},"end":{"line":11,"column":60}}}) : helper)))
    + "</span>\r\n      <span class=\"person-motto text-xs\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"motto") || (depth0 != null ? lookupProperty(depth0,"motto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"motto","hash":{},"data":data,"loc":{"start":{"line":12,"column":41},"end":{"line":12,"column":50}}}) : helper)))
    + "</span>\r\n      <div class=\"person-data\">\r\n        <div class=\"person-data--article\"><span class=\"text-xs person-data--article-icon \">文章</span><span\r\n            class=\"person-data--article-num text-base\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"articlesNum") || (depth0 != null ? lookupProperty(depth0,"articlesNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"articlesNum","hash":{},"data":data,"loc":{"start":{"line":15,"column":55},"end":{"line":15,"column":70}}}) : helper)))
    + "</span></div>\r\n        <div class=\"person-data--reader\"><span class=\"text-xs person-data--reader-icon\">读者</span><span\r\n            class=\"person-data--reader-num text-base\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"readerNum") || (depth0 != null ? lookupProperty(depth0,"readerNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"readerNum","hash":{},"data":data,"loc":{"start":{"line":17,"column":54},"end":{"line":17,"column":67}}}) : helper)))
    + "</span></div>\r\n      </div>\r\n      <span class=\"person-tag text-sm\">\r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"personalTag") || (depth0 != null ? lookupProperty(depth0,"personalTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"personalTag","hash":{},"data":data,"loc":{"start":{"line":20,"column":8},"end":{"line":20,"column":23}}}) : helper)))
    + "\r\n      </span>\r\n      <div class=\"person-nav\">\r\n        <div class=\"person-nav--gth person-nav--item \"></div>\r\n        <div class=\"person-nav--bili  person-nav--item \"></div>\r\n        <div class=\"person-nav--email  person-nav--item \"></div>\r\n      </div>\r\n    </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"with","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":6},"end":{"line":57,"column":15}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"main-right-article\">\r\n        <div class=\"article-title text-xl\">\r\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"articleTitle") || (depth0 != null ? lookupProperty(depth0,"articleTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"articleTitle","hash":{},"data":data,"loc":{"start":{"line":41,"column":10},"end":{"line":41,"column":26}}}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"article-des text-sm\">\r\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"articleDes") || (depth0 != null ? lookupProperty(depth0,"articleDes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"articleDes","hash":{},"data":data,"loc":{"start":{"line":44,"column":10},"end":{"line":44,"column":24}}}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"article-about text-xs\">\r\n          <span class=\"article-date\"><span class=\"article-date--icon \"></span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"createdDate") || (depth0 != null ? lookupProperty(depth0,"createdDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createdDate","hash":{},"data":data,"loc":{"start":{"line":47,"column":84},"end":{"line":47,"column":99}}}) : helper)))
    + "</span></span>\r\n          <div class=\"article-like\"><span class=\"article-like--icon\"></span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"liekeNum") || (depth0 != null ? lookupProperty(depth0,"liekeNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"liekeNum","hash":{},"data":data,"loc":{"start":{"line":48,"column":76},"end":{"line":48,"column":88}}}) : helper)))
    + "<span></span></div>\r\n          <div class=\"article-comment\"><span class=\"article-comment--icon\"></span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"commnetNum") || (depth0 != null ? lookupProperty(depth0,"commnetNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commnetNum","hash":{},"data":data,"loc":{"start":{"line":49,"column":88},"end":{"line":49,"column":102}}}) : helper)))
    + "</span></div>\r\n          <div class=\"article-tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":12},"end":{"line":53,"column":21}}})) != null ? stack1 : "")
    + "          </div>\r\n        </div>\r\n      </div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
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

  return "<!-- 主体部分 start -->\r\n<main class=\"main "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":18},"end":{"line":2,"column":54}}})) != null ? stack1 : "")
    + "\">\r\n  <!-- 个人简介部分 start -->\r\n  <div class=\"main-left visible-lg-block "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":82}}})) != null ? stack1 : "")
    + "\">\r\n    <!-- -->\r\n\r\n    <!-- 个人介绍 -->\r\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,(depth0 != null ? lookupProperty(depth0,"person") : depth0),{"name":"with","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":28,"column":13}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n  </div>\r\n  <!-- 个人简介部分 end -->\r\n\r\n  <!-- 文章列表部分 start -->\r\n  <div class=\"main-right\">\r\n    <div class=\"main-right-list animate__animated animate__bounceInRight\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"articles") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":6},"end":{"line":58,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n  </div>\r\n  <!-- 文章列表部分 end -->\r\n</main>\r\n<!-- 主体部分 end -->";
},"useData":true});
})();