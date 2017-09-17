angular.module('imde3.services', [])

  .factory('ImdeService', function ($http) {

    var url = "http://kyungjoon.ipdisk.co.kr:8080/";

    var url2 = "http://35.194.71.159:8080/";
    // Might use a resource here that returns a JSON array
    return {
      getAll: function (pageIndex, srchbrtcCode, selectedGoo) {
        return $http.post(url2+ "lh/lhListToJson?pageIndex=" + pageIndex + "&srchbrtcCode="+ srchbrtcCode
          + "&srchsignguCode="+ selectedGoo);  //1. this returns promise
      },
      getGooList: function (srchbrtcCode) {
        return $http.post(url2+ "lh/gettGooListToJson?srchbrtcCode="+ srchbrtcCode);  //1. this returns promise
      },
      getDetail: function (pblancId) {

        console.log("pblancId-->" + pblancId);
        return $http.post(url2+ "lh/lhDetailToJson?pblancId=" + pblancId);  //1. this returns promise
      },
      getSupplyDetail: function (pblancId) {
        console.log("pblancId-->" + pblancId);
        return $http.post(url2+ "lh/suplyListToJson?pblancId=" + pblancId);  //1

      }
    };

    /*http://35.194.71.159:8080/lh/gettGooListToJson?srchbrtcCode=135*/

  })


  /**
   *
   * ############################################################
   * 애드맙 서비스
   * ############################################################
   */
  .factory('AdMob', function ($window){
    var _admob;
    var _admobid;
    var _opt;

    var _interstitialReady;
    var _bannerReady;

    return {
      init: function(){
        console.log("AdMob init");

        _admob = $window.AdMob;

        if(_admob){

          // Register AdMob events
          // new events, with variable to differentiate: adNetwork, adType, adEvent
          document.addEventListener('onAdFailLoad', function(data){
            console.log('error: ' + data.error +
              ', reason: ' + data.reason +
              ', adNetwork:' + data.adNetwork +
              ', adType:' + data.adType +
              ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
          });
          document.addEventListener('onAdLoaded', function(data){
            console.log('onAdLoaded: ' + JSON.stringify(data));
          });

          document.addEventListener('onAdPresent', function(data){
            console.log('onAdPresent: ' + JSON.stringify(data));
          });
          document.addEventListener('onAdLeaveApp', function(data){
            console.log('onAdLeaveApp: ' + JSON.stringify(data));
          });
          document.addEventListener('onAdDismiss', function(data){
            _interstitialReady = false;
            console.log('onAdDismiss: ' + JSON.stringify(data));
          });

          _opt = {
            // bannerId: admobid.banner,
            // interstitialId: admobid.interstitial,
            // adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: _admob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,     // valid when set position to 0 / POS_XY
            // y: integer,     // valid when set position to 0 / POS_XY
            isTesting: false, // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
          };

          _admobid = {};

          if(ionic.Platform.isAndroid()) {
            _admobid = { // for Android
              interstitial: 'ca-app-pub-6826082357124500/9307296734',
              banner: 'ca-app-pub-6826082357124500/7593091515'
            };
          }

          if(ionic.Platform.isIOS()){
            _admobid = { // for iOS
              interstitial: 'ca-app-pub-6826082357124500/1231231223',
              banner: 'ca-app-pub-6826082357124500/12312312323'
            };
          }

          _admob.setOptions(_opt);


          this.prepareInterstitial(false);
          this.prepareBanner( false );

        } else {
          console.log("No AdMob?");
        }
      },
      prepareBanner: function(bShow){
        if( !_admob ) return false;

        _admob.createBanner({
          adId: _admobid.banner,
          position: _admob.AD_POSITION.BOTTOM_CENTER,
          autoShow: bShow,
          //adSize:'SMART_BANNER',
          success: function(){
            _bannerReady = true;
            console.log('banner ready');
          },
          error: function(){
            console.log('failed to create banner');
          }
        })
        return true;
      },
      showBanner: function(position) {
        if( !_bannerReady ){
          console.log('banner not ready');
          return this.prepareBanner(true);
        }

        if( position == undefined ) position = _admob.AD_POSITION.BOTTOM_CENTER;
        _admob.showBanner(position);

        return true;
      },
      prepareInterstitial: function(bShow){
        if( !_admob ) return false;
        _admob.prepareInterstitial({
          adId: _admobid.interstitial,
          autoShow: bShow,
          success: function(){
            _interstitialReady = true;
            console.log('interstitial prepared');
          },
          error: function(){
            console.log('failed to prepare interstitial');
          }
        })

        return true;
      },
      showInterstitial: function() {
        if( !_interstitialReady ){
          console.log('interstitial not ready');
          return this.prepareInterstitial(true);
        }

        _admob.showInterstitial();

        return true;
      },
      removeAds: function() {
        if(! _admob ) return;
        _admob.removeBanner();
        _bannerReady = false;
      }
    }})


;

