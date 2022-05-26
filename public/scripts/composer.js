/** toggle scroll to top of the page */
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 110) {
      $('.scroll-top').css("display", "block");
      $('.nav-right').css("display", "none");
    } else {
      $('.nav-right').css("display", "flex");
      $('.scroll-top').css("display", "none");
    }
  });

  $('.scroll-top').on('click', function() {
    $("html, body").animate({ scrollTop: 0 }, 100);
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});