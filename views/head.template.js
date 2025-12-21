(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['head'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <li class=\"header-list--item  text-base\"><a href=\"#\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a></li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- 头部部分 start -->\r\n<header class=\"header\">\r\n  <div class=\"header-left\">\r\n    <a href=\"#\">\r\n      <h1 class=\"header-logo\">\r\n        <img class=\"header-logo--icon\" src=\"./public/logo.png\"></img>\r\n        <span class=\"header-logo--title text-xl\">代码纪事</span>\r\n      </h1>\r\n    </a>\r\n  </div>\r\n  <input class=\"header-search text-sm hidden-xs\" placeholder=\"搜索文章...\" />\r\n  <div class=\"header-right\">\r\n    <ul class=\"header-list   hidden-xs hidden-sm hidden-md\">\r\n      <li class=\"header-list--item  text-base active\"><a href=\"#\">首页</a></li>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"navList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":6},"end":{"line":17,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\r\n    <img src=\"./public/img/list.svg\" class=\"header-list--icon hidden-lg\" alt=\"选项\">\r\n  </div>\r\n\r\n</header>\r\n<!-- 头部部分 end -->";
},"useData":true});
})();