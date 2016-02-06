'use strict';

/**
 * @ngdoc function
 * @name salamaApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the salamaApp
 */
(function(){
  angular.module('salamaApp')
    .controller('ArticleCtrl', ArticleCtrl);

  ArticleCtrl.$inject=['contentService'];

  function ArticleCtrl(contentService){
    var ctrl=this;
    ctrl.article=null;

    activate();

    function activate(){
      contentService.getArticle().then(function(article){
        ctrl.article=article;
      });
    }
  }
})();

