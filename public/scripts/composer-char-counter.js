$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function(e) {
    const counter = $(this).next().find('output');
    let length = $(this).val().length;
    
    counter.val(140 - length);
   
    if (counter.val() < 0) {
      counter.css('color','red');
      $('#tweet-error').slideDown(400);
    } else {
      counter.css('color','black');
    }
  });
});