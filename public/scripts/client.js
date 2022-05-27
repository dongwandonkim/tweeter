$(document).ready(function() {
  loadTweets();
  
  // nav toggle icon animation
  navBarToggleIconAnimation();

  /** toggle new-tweet */
  toggleNewTweetComposer();

  // Posting a new tweet
  postNewTweet();
});

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  tweets.forEach((element) => {
    let $tweets = createTweetElement(element);
    $('#tweets-container').append($tweets);
  });
};

/** tweet object into HTML */
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

/** XSS prevent */
const safeHtml = function(str) {
  let div = document.createElement("div"); // create a new div
  div.appendChild(document.createTextNode(str)); // append a TextNode to div
  return div.innerHTML;
};

/** GET tweets */
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

const navBarToggleIconAnimation = () => {
  $('.toggle').on('mouseenter', function() {
    $(this).children('i').css('animation', "bounce 0.6s infinite");
  }).on('mouseleave', function() {
    $(this).children('i').css('animation', "");
  });
};

const toggleNewTweetComposer = () => {
  $('.nav-right').on('click', function() {
    if ($('.new-tweet').css('display') === "none") {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
    } else {
      $('.new-tweet').slideUp();
      $('#tweet-text').val('');
    }
  });
};

/** POST request to create a new tweet */
const postNewTweet = () => {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const inputData = $(this).serialize(); //serialize the form data
    const length = $(this).find('output').val(); //get char length
    
    // check for invalid length for a new tweet
    if (length < 0 || length == 140) {
      $('.tweet-error').slideDown().show().delay(2000).slideUp();
      $('#tweet-text').focus();
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: inputData,
        success: function(res) {
          const tweet = createTweetElement(res);
          $('#tweets-container').prepend(tweet);
          
          // clears form and reset counter back to 140
          $('#tweet-text').val('').focus();
          $('form').find('output').val(140);
        },
      });
    }
  });
};
