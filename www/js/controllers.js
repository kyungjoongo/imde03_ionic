angular.module('imde3.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('ImdeCtrl', function ($scope, ImdeService, $state, $ionicLoading, AdMob, $ionicPopup, $timeout) {

    $timeout( function(){
      $scope.showBanner();
    }, 3000 );


    $timeout( function(){
      $scope.showInterstitial();
    }, 7000 );


    $scope.showBanner = function(){
      var done = AdMob.showBanner();
      if( !done ){
        $ionicPopup.show({
          title: "AdMob is not ready",
          buttons: [
            {
              text: 'Got it!',
              type: 'button-positive',
              onTap: function (e) {
              }
            }
          ]
        })
      }
    };

    $scope.removeBanner = function(){
      AdMob.removeAds();
    };

    $scope.showInterstitial = function(){

      var done = AdMob.showInterstitial();
      if( !done ){
        $ionicPopup.show({
          title: "AdMob is not ready",
          buttons: [
            {
              text: 'Got it!',
              type: 'button-positive',
              onTap: function (e) {
              }
            }
          ]
        })
      }
    };

    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function () {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
    };


    $scope.itemsAvailable = true;
    $scope.pageIndex = 1;


    $scope.items = [];

    $scope.selectedSi = "";


    /**
     * ##################################
     * loadMore
     * ##################################
     */
    $scope.loadMore = function () {
      ImdeService.getAll($scope.pageIndex, $scope.selectedSi).then(function (response) { //2. so you can use .then()

        if (response.data.resultList.length == 0) {
          $scope.itemsAvailable = false;

          alert('더 이상 데이터가 없습니다.');
        } else {
          $scope.items2 = response.data.resultList;

          for (var i = 0; i < $scope.items2.length; i++) {
            $scope.items.push($scope.items2[i]);
          }

          $scope.pageIndex++;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }


      });
    };


    /**
     * 코도바 인앱 브라우져..
     * @param pblancId
     */
    $scope.openInAppBrowser = function (pblancId) {

      window.open('https://m.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcView.do#detailPage?pblancId=' + pblancId, '_selft');

      /*$cordovaInAppBrowser.open('https://m.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcView.do#detailPage?pblancId=' + pblancId, '_blank', options)
        .then(function(event) {
        })
        .catch(function(event) {
        });*/
    };

    $scope.openCordovaWebView = function (pblancId) {

      console.log(pblancId + "<--------");
      window.open('https://m.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcView.do#detailPage?pblancId=' + pblancId, '_selft');
    };


    $scope.goImdeDetail = function (pblancId) {
      console.log("pblancId---> " + pblancId);
      $state.go("app.imdeDetail", {pblancId: pblancId});
    }


    $scope.getGooList = function (srchbrtcCode) {

      console.log(srchbrtcCode);
      if (srchbrtcCode == "") {

        $scope.gooList = "";
      } else {
        ImdeService.getGooList(srchbrtcCode).then(function (response) { //2. so you can use .then()
          var gooList = response.data.result;
          $scope.gooList = gooList;
          console.log(JSON.stringify(gooList));
        });
      }
    };


    /**
     * select박수 선택시 선택된 시군구 코드를 가지고 하단의 리스트를 다시 만든다..
     * @param selected_srchbrtcCode
     */
    $scope.updateList = function (srchbrtcCode, selectedGoo) {

      console.log(srchbrtcCode);

      console.log("selectedGoo-->" + selectedGoo);

      $scope.pageIndex = 1;

      $scope.show();
      ImdeService.getAll($scope.pageIndex, srchbrtcCode, selectedGoo).then(function (response) { //2. so you can use .then()
        $scope.hide();
        $scope.items = response.data.resultList;

        $scope.selectedSi = srchbrtcCode;

        $scope.pageIndex++;

        $scope.itemsAvailable = true;

      });
    };




  })

  .controller('ImdeDetailCtrl', function ($scope, $stateParams, ImdeService) {

    $scope.pblancId = $stateParams.pblancId;

    ImdeService.getDetail($stateParams.pblancId).then(function (response) { //2. so you can use .then()
      console.log(response.data.rcritBasic);

      var result = response.data.rcritBasic;
      $scope.guidanceCn = result.guidanceCn;

      $scope.sttusNm = result.sttusNm;
      $scope.suplyTyNm = result.suplyTyNm;
      $scope.pblancNm = result.pblancNm;

    });

    ImdeService.getSupplyDetail($stateParams.pblancId).then(function (response) { //2. so you can use .then()
      var reqResult = response.data.suplyList;
      var houseList = response.data.houseList;

      console.log("houseList-->" + JSON.stringify(houseList));

    });
  })
  .filter('newlines', function () {
    return function (text) {
      return text.replace(/\n/g, '<br/>');
    }
  });

