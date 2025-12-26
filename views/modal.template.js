(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"modalId") || (depth0 != null ? lookupProperty(depth0,"modalId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"modalId","hash":{},"data":data,"loc":{"start":{"line":1,"column":47},"end":{"line":1,"column":60}}}) : helper))) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"customContent") || (depth0 != null ? lookupProperty(depth0,"customContent") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"customContent","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":23}}}) : helper))) != null ? stack1 : "")
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"my-modal-contain\">\r\n    <div class=\"my-modal-head\">\r\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"headTemplate") || (depth0 != null ? lookupProperty(depth0,"headTemplate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"headTemplate","hash":{},"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":7,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\r\n        </div>\r\n    <div class=\"my-modal-main\">\r\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"mainTemplate") || (depth0 != null ? lookupProperty(depth0,"mainTemplate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainTemplate","hash":{},"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"my-modal-footer\">\r\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"footerTemplate") || (depth0 != null ? lookupProperty(depth0,"footerTemplate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"footerTemplate","hash":{},"data":data,"loc":{"start":{"line":13,"column":4},"end":{"line":13,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"my-modal-wrap\" id= \""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"modalId") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":67}}})) != null ? stack1 : "")
    + "\" hidden>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isCustom") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":15,"column":11}}})) != null ? stack1 : "")
    + "  </div>\r\n</div>";
},"useData":true});
})();