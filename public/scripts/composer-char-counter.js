$(document).ready(function() {
  /** counts the characters in textarea form
   * make it red if length is longer than 140 chars
  */
  $('#tweet-text').on('input', function() {
    const counter = $(this).next().find('output');
    let length = $(this).val().length;
    
    counter.val(140 - length);
   
    if (counter.val() < 0) {
      counter.css('color','red');
      
    } else {
      counter.css('color','#545149');
    }
  });
});