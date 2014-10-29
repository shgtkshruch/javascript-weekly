var http = require('http');
var cheerio = require('cheerio');
var async = require('async');

module.exports = function (issueNumber, callback) {

  function getHtml(cb) {
    var url = 'http://javascriptweekly.com/issues/' + issueNumber;

    http.get(url, function (res) {
      var html;
      res.on('data', function (data) {
        html += data; 
      });

      res.on('end', function () {
        cb(null, html);
      });
    });
  }

  function parseHtml(html, cb) {
    var $ = cheerio.load(html);
    var issue = {};

    var main = $('.issue-html .container').eq(1);
    var heading = $(main).children().eq(0).find('.gowide.lonmo span').text();

    issue.title = heading.match(/[A-Za-z]+\s[0-9]+\s/)[0].trim();
    issue.date = heading.match(/[A-Za-z]+\s[0-9]+\,\s[0-9]+\n$/)[0].trim();

    var articles = [];
    $(main).children().eq(1).find('table .gowide > tr > td').each(function (i, elem) {
      var article = _getArticle($, this);
      article ? articles.push(article) : null;
    });
    issue.articles = articles;

    var brieves = [];
    $(main).children().eq(1).find('p').each(function (i, elem) {
      if ($(this).text() !== 'In brief') return;

      $(this).next().find('li').each(function (i, elem) {
        var brief = _getBrief($, this);
        brieves.push(brief);
      });
    });
    issue.brieves = brieves;

    cb(null, issue);
  }

  function _getArticle($, that) {
    var article = {};
    var source = $(that).children().eq(1).text().trim();

    if (source.search(/sponsored/i) !== -1) {
      return false;
    }

    article.title = $(that).find('a').text();
    article.url = $(that).html().split('href="')[1].split('?')[0];
    article.source = source;
    article.body = $(that).children().eq(2).text().trim();

    return article;
  }

  function _getBrief($, that) {
    var brief = {};
    brief.cats = [];

    brief.title = $(that).find('a').text();
    brief.url = $(that).html().split('href="')[1].split('?')[0];
    brief.body = $(that).find('br').next().remove().text().trim();
    brief.source = $(that).find('span').last().remove().text().trim();

    $(that).find('span').each(function (i, elem) {
      brief.cats.push($(this).text());
    });

    return brief;
  }

  async.waterfall([
    function (cb) {
      getHtml(cb);
    },
    function (html, cb) {
      parseHtml(html, cb);
    }
  ], function (err, issue) {
    callback(issue);
  });
}
