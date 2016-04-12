(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Answer: The loadById method loads articles by a specific ID. It uses the
  //findWhere method to grab a subset of articles based on what field you pass
  //through. The findWhere method is a SQL query selecting articles with a specific
  //field. In this case, it selects articles with a specific ID.
  // loadById is called on the routes.js page, if you want to go to an article
  //with a certain ID.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Answer: The loadByAuthor selects and loads articles based on authors picked from the
  //author filter. The path of execution is ../author/:authorName.
  //The :authorName is a placeholder for the specific author name chosen by the
  //author filter.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Answer: The loadbyCategory method will find the articles in a specific category
  //based on what was chosen in the category filter. The path is .../category/:categoryName
  //The categoryName refers to the specific category chosen through the filter.
  //The method is called when the abovementioned path is entered.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Answer: The articlesControlller.loadAll method loads all the articles to the page.
  //It is automatically called when the page first loads (localhost:300/). If
  //there are no articles in the Article.all array, the .loadAll method will call
  //Article.fetchAll to load the data. If there are articles in the Article.all array,
  //the method will assign the array to the context object.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
