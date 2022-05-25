/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  tweets.forEach((element) => {
    let $tweets = createTweetElement(element);
    $('#tweets-container').append($tweets);
  });
};

const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet">
<div class="header">
  <div class="header_left">
    <img src=${tweet.user.avatars} />
    <span class="name">${tweet.user.name}</span>
  </div>
  <span class="id">${tweet.user.handle}</span>
</div>
<p class="tweet-content">${safeHtml(tweet.content.text)}
</p>
<footer class="tweet-footer">
  <span>${timeago.format(tweet.created_at)}</span>
  <div class="tweet-footer_icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`;
  
  return $tweet;
};

const safeHtml = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/tweets',
    success: function(res) {
      const sortedRes = res.sort((a, b)=> b.created_at - a.created_at);
      renderTweets(sortedRes);
    }
  });
};

$(document).ready(function() {
  loadTweets();

  $('form').on('submit', function(e) {
    e.preventDefault();
    const inputData = $(this).serialize();
    const length = $(this).find('output').val();
    
    if (length < 0 || length == 140) {
      $('.tweet-error').slideDown().show().delay(2000).slideUp();
    } else {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/tweets',
        data: inputData,
        success: function(res) {
          const tweet = createTweetElement(res);
          $('#tweets-container').prepend(tweet);
        },
      });
    }
  });
});

