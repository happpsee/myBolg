(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal-footer'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-btn-target=\"close\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"closeText") || (depth0 != null ? lookupProperty(depth0,"closeText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"closeText","hash":{},"data":data,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":45}}}) : helper)))
    + "</button>\r\n<button data-btn-target=\"close\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"confirmText") || (depth0 != null ? lookupProperty(depth0,"confirmText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confirmText","hash":{},"data":data,"loc":{"start":{"line":2,"column":32},"end":{"line":2,"column":47}}}) : helper)))
    + "</button>";
},"useData":true});
})();