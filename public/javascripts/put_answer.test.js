jQuery(document).ready(function($){

  var survey_id = 1;
  var answer_id = 1;

  var display = function (msg){
    console.log(msg);

    $('<div></div>').text(msg).css({"marginTop":"3em", "borderTop":"1px solid #333", "paddingTop":"3em"}).appendTo( $('body > div.container-fluid:first') );
  };

  $.ajax({
    "url"         : "http://localhost/data/answer/" + survey_id + "/" + answer_id,
    "method"      : "PUT",
    "dataType"    : "text",
    "success"     : function(result){    display(result);},
    "error"       : function(x,y,result){display("error: " + result);}
  });

});
