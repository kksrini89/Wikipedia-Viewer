var animation = 'rubberBand';
$(document).ready(function(){
  $(".input-value").hide();    
  $('.search-results').hide();  
  //Search Icon Click
  $('.search-label span').on('click',function(){
    $(".input-value").show();
    $('.bottom-label').show();
    $("#searchInputId").focus();    
    $('.search-label').hide();
  });
  
  //Wikipedia Search 
  $('#searchInputId').keypress(function(e){    
    var inputText =  $('#searchInputId').val();
    var pressedKey = e.keyCode || e.which;
    if( pressedKey === 13){
      $('.bottom-label').hide();
      $('.search-results').show();
      $('.search-section').animate({'marginTop':'5%'},1000);
      var childs = $('.search-results ul').children();
      if(childs.length > 0)
        $('.search-results ul').empty();
      console.log(childs);
      $.getJSON('https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&format=json&callback=?&gsrsearch='+inputText, function(result){        
        var pages = result.query.pages;
        // console.log(pages);
        var container = $('.search-results ul');
          for(var item in pages){
            // console.log(pages[item]);            
            container.append('<li><a href="https://en.wikipedia.org/?curid='+ pages[item].pageid +'" target="_blank"><span>'+pages[item].title +'</span><span>'+pages[item].extract +'</span></a></li>');
          }        
        }
      );
    }
  });
  
  //Input text clear Icon click
  $('#searchInputClearId').on('click',function(){
    $(this).addClass('animated ' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass('animated ' + animation);
    });    
    $("#searchInputId").val(''); //input text box
    $(".input-value").hide(); //input text box with remove icon
    $('.search-results').hide(); //final results with ul and li elements
    $('.search-section').animate({'marginTop':'15%'},1000); // input text with click to search label
     $('.bottom-label').show(); //click to search label
    $('.search-label').show(); // search icon
  });
});