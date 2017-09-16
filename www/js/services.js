angular.module('imde3.services', [])

  .factory('ImdeService', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
      getAll: function (pageIndex, srchbrtcCode, selectedGoo) {
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/lhListToJson?pageIndex=" + pageIndex + "&srchbrtcCode="+ srchbrtcCode
          + "&srchsignguCode="+ selectedGoo);  //1. this returns promise
      },
      getGooList: function (srchbrtcCode) {
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/gettGooListToJson?srchbrtcCode="+ srchbrtcCode);  //1. this returns promise
      },
      getDetail: function (pblancId) {

        console.log("pblancId-->" + pblancId);
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/lhDetailToJson?pblancId=" + pblancId);  //1. this returns promise
      },
      getSupplyDetail: function (pblancId) {
        console.log("pblancId-->" + pblancId);
        return $http.post("http://kyungjoon.ipdisk.co.kr:8080/lh/suplyListToJson?pblancId=" + pblancId);  //1

      }
    };

  })

;

