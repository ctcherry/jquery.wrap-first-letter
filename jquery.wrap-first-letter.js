(function($){

  $.fn.wrapFirstLetter = function(options) {
    
    var settings = {
      'charpattern' : /[a-z0-9]/i,
      'tag'         : 'span',
      'class'       : 'first-letter'
    };
    
    if (options) {
        jQuery.extend(true, settings, options);
    }
        
    function _wrap(content) {
      var len = content.length;
      var intag = false;
      
      for (var i=0; i<len; i++) {
        if (content[i] == '<') {
          intag = true;
          continue;
        }

        if (content[i] == '>') {
          intag = false;
          continue;
        }

        if (intag) {
          continue;
        }

        if (settings.charpattern.test(content[i])) {
          var pre = '';
          var post = '';
          var t = settings.tag;
          var c = settings.class;
          if (i==0) {
            post = content.substring(1);
            return pre + "<"+t+" class=\"" + c + "\">" + content[i] + "</"+t+">" + post;
          }
          if (i==(len-1)) {
            pre = content.substring(0,i);
            return pre + "<"+t+" class=\"" + c + "\">" + content[i] + "</"+t+">" + post;
          }

          pre = content.substring(0,i);
          post = content.substring(i+1);
          return pre + "<"+t+" class=\"" + c + "\">" + content[i] + "</"+t+">" + post;
        }
      }
    }
        
        
    return this.each(function() {
      var obj = $(this);
      var content = obj.html();
      var newcontent = _wrap(content);
      obj.html(newcontent);
    });
    
  };
    
})(jQuery);