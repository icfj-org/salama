'use strict';

/**
 * @ngdoc service
 * @name salamaApp.individualsService
 * @description
 * # individualsService
 * Service in the salamaApp.
 */
(function(){
  angular.module('salamaApp')
    .service('individualsService', individualsService);

  individualsService.$inject = ['$localStorage', 'contentService'];

  function individualsService($localStorage, contentService){

    var db = $localStorage.individuals = $localStorage.individuals || {};

    db.metadata   = db.metadata || {};
    db.version    = db.version || '';
    db.lang       = db.lang || 'en_US';
    db.evaluation = db.evaluation || {};


    return {
      getEval: getEval
    }

    function getEval(lang, name){
      setLang(lang);
      return contentService.getVersion()
        .then(resolveVersion)
        .then(resolveEval(name));
    }

    function resolveVersion(newversion){
      if (db.version != newversion) {
        db.version = newversion;
        return true;
      }
      return false;
    }

    function resolveEval(file){
      return function(newversion) {
        if (!db.evaluation[db.lang+'_'+file] || newversion){
          return contentService.getEvalByName(db.lang, file)
            .then(setEval, file);
        }
        return db.evaluation[db.lang+'_'+file];
      }

    }

    function setEval(evaluation, file){
      db.evaluation[db.lang+'_'+file] = evaluation;
      return evaluation;
    }

    function setLang(newlang){
      db.lang = newlang;
    }

  }
})();
