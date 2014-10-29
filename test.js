var jsWeekly = require('./index');
var assert = require('assert');

describe("JavaScript Weekly", function () {

  describe('issue 204', function () {
    var issue;
    before(function (done) {
      jsWeekly(204, function (_issue) {
        issue = _issue;
        done();
      });
    });

    it('issue.title should return "October 24, 2014".', function () {
      assert.deepEqual(issue.date, 'October 24, 2014');
    });

    describe('article', function () {
      var article;
      before(function () {
        article = issue.articles[4];
      });

      it('article.title should return correct title.', function () {
        assert.deepEqual(article.title, "TypeScript and the Road to 2.0");
      });

      it('article.url should return correct url.', function () {
        assert.deepEqual(article.url, 'http://blogs.msdn.com/b/typescript/archive/2014/10/22/typescript-and-the-road-to-2-0.aspx');
      });

      it('article.body should return correct body.', function () {
        assert.deepEqual(article.body.substr(0, 6), 'A look');
        assert.deepEqual(article.body.substr(-7), 'to 2.0.');
      });

      it('article.source should return correct source.', function () {
        assert.deepEqual(article.source, 'Microsoft');
      });
    });

    describe('brief', function () {
      var brief;
      before(function () {
        brief = issue.brieves[0];
      });

      it('brief.title should return correct title.', function () {
        assert.deepEqual(brief.title, "Node v0.10.33 (Stable) Released");
      });

      it('brief.url should return correct url.', function () {
        assert.deepEqual(brief.url, 'http://blog.nodejs.org/2014/10/23/node-v0-10-33-stable/');
      });

      it('brief.body should return correct body.', function () {
        assert.deepEqual(brief.body.substr(0, 7), 'Handles');
        assert.deepEqual(brief.body.substr(-8), 'default.');
      });

      it('brief.source should return correct source.', function () {
        assert.deepEqual(brief.source, 'Node.js Blog');
      });

      it('brief.cats should return correct categories.', function () {
        assert.deepEqual(brief.cats, ['news', 'node']);
      });
    });
  });

  describe('issue 200', function () {
    var issue;
    before(function (done) {
      jsWeekly(200, function (_issue) {
        issue = _issue;
        done();
      });
    });

    it('issue.title should return "September 26, 2014".', function () {
      assert.deepEqual(issue.date, 'September 26, 2014');
    });

    describe('brief', function () {
      var brief;
      before(function () {
        brief = issue.brieves[2];
      });

      it('brief.title should return correct title.', function () {
        assert.deepEqual(brief.title, "An Introduction to Broccoli");
      });

      it('brief.url should return correct url.', function () {
        assert.deepEqual(brief.url, 'http://aexmachina.info/intro-to-broccoli/');
      });

      it('brief.body should return correct body.', function () {
        assert.deepEqual(brief.body.substr(0, 6), 'A Node');
        assert.deepEqual(brief.body.substr(-12), 'definitions.');
      });

      it('brief.source should return correct source.', function () {
        assert.deepEqual(brief.source, 'Simon Wade');
      });

      it('brief.cats should return correct categories.', function () {
        assert.deepEqual(brief.cats, ['tutorial']);
      });
    });
  });

});
