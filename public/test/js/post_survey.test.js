jQuery(document).ready(function($){

  var display = function (msg){
    console.log(msg);

    $('<div></div>').text(msg).css({"marginTop":"3em", "borderTop":"1px solid #333", "paddingTop":"3em"}).appendTo( $('body > div.container-fluid:first') );
  };

  $.ajax({
    "url"         : "http://localhost/admin/data/surveys",
    "method"      : "POST",
    "contentType" : "application/json",
    "data"        : '{"title":"title!", "question":"question?", "answers":["yes", "no", "maybe"]}',
    "dataType"    : "text",
    "success"     : function(result){    display(result);},
    "error"       : function(x,y,result){display("error: " + result);}
  });

});
