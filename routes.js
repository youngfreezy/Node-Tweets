var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = React.createFactory(require('./components/TweetsApp.react')),
  Tweet = require('./models/Tweet');
module.exports = {
  index: function(req, res) {
    Tweet.getTweets(0, 0, function(tweets, pages) {
      var markup = React.renderToString(TweetsApp({
        tweets: tweets
      }));
      res.render('home', {
        markup: markup,
        state: JSON.stringify(tweets)
      });
    });
  },
  page: function(req, res) {
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
      res.send(tweets);
    });
  }
}