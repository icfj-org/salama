'use strict';

/**
 * @ngdoc service
 * @name salamaApp.contentService
 * @description
 * # contentService
 * Service in the salamaApp.
 */
(function(){
  angular
    .module('salamaApp')
    .factory('contentService', contentService);

  contentService.$inject = ['$q', '$http'];

  function contentService($q, $http){

    var urlSite = '#{URLCONTENT}';
    urlSite = urlSite.indexOf('CONTENT')===-1 ?
                urlSite : 'https://raw.githubusercontent.com/icfj-org/salama-content/gh-pages/';
    console.log('urlContent', urlSite);
    var urlVersion = urlSite + 'version.txt';
    var urlMetadata = urlSite + 'metadata/';
    var urlPosts = urlSite + 'posts/';
    var urlQuestions = urlSite + 'questions/';
    var urlAdvices = urlSite + 'advices/';

    return {
      getVersion: getVersion,
      getMetadata: getMetadata,
      getPost: getPost,
      getEvalIndividuals: getEvalIndividuals,
      getEvalOrganizations: getEvalOrganizations,
      getEvalByName: getEvalByName,
      getAdvice: getAdvice
    };

    function getVersion(){
      return downloadFile(urlVersion);
    }

    function getMetadata(lang){
      var url = urlMetadata + 'locale-' + lang + '.json';
      return downloadFile(url);
    }

    function getPost(path){
      var url = urlPosts+path;
      return downloadFile(url).then(function(post){
        //removing frontmatter
        post = post.replace(/^---(.|\s)*?---/,'');
        post = post.replace(/{{site.baseurl}}/,urlSite);
        return post;
      });
    }

    function getEvalIndividuals(lang){
      var url = urlQuestions + lang + '/individuals.json' ;
      return downloadFile(url).then(function(questions){
        return questions.pages;
      });
    }

    function getEvalByName(lang, name) {
      var url = urlQuestions + lang + '/'+name+'.json' ;
      return downloadFile(url).then(function(questions){
        return questions.pages;
      });
    }

    function getEvalOrganizations(lang){
      var url = urlQuestions + lang + '/organizations.json' ;
      return downloadFile(url).then(function(questions){
        return questions.pages;
      });
    }

    function getAdvice(riskLevel,lang){
      var url = lang + '/' +riskLevel + '.md';
      return getPost(url);
    }

    function downloadFile(url){
      var deferred = $q.defer();
      $http.get(url).then(
        function(res){
          deferred.resolve(res.data);
        },
        function(err){
          deferred.reject(err);
        }
      );
      return deferred.promise;
    }
  }
})();
