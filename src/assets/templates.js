/*global $ */
$(function() {
  var replaceTemplates = function() {
    $('body [data-template]').each(function(i,e){
      var $e = $(e);
      var templateName = $e.attr('data-template');
      var templateSrc = $('template#' + templateName).html()
            .replace('&lt;','<')
            .replace('&gt;','>');
      var compiled = _.template(templateSrc);
      var result = compiled($e.data());
      $e.replaceWith(result);
    });

    if($('body [data-template]').length > 0) {
      replaceTemplates();
    }
  };
  replaceTemplates();
});
