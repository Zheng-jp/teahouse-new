//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    member_grade_img: null,
    url: app.globalData.img_url,
    // 轮播图图片地址数据
    image: [
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181128/eb9826b6cbef8a7a581d7cd55726612f.jpg',
      app.globalData.url + '/upload/20181128/31d02b855e58a946d5c8dddbb278376b.jpg',
    ],

    circular: 'true',
    indicatorDots: 'true',
    interval: '4000',
    autoplay: 'true',
    // 小喇叭图片地址
    laba: 'img/u206.png',
    // 关闭图片地址
    close: 'img/close.png',
    // 更多图片地址
    more: 'img/more.png',
    nav: [{
        url: 'img/u103.png',
        text: '商品分类'
      },
      {
        url: 'img/u266.png',
        text: '我的消息'
      },
      {
        url: 'img/u105.png',
        text: '买茶入仓'
      },
      {
        url: 'img/u107.png',
        text: '出仓提货'
      },
      {
        url: 'img/u242.png',
        text: '茶山走势'
      },

    ],
    // 商品信息
    routers: [],
    // 分享信息
    share: []

  },

  nfc: function(e) {
    wx.scanCode({
      onlyFromCamera: false,
      success(res) {
        var code_url = res.result.split('/')[2];
        var com_url = app.globalData.url.split('/')[2];
        // console.log(code_url)
        // console.log(com_url)
        if (code_url != com_url){
          wx.showToast({
            title: '非在下产品',
            icon: 'none',
            duration: 2500
          })
        } else {
          wx.navigateTo({
            url: '../code/code?title=' + app.globalData.gmemberid,
            success: function (res) { },
            fail: function () { },
            complete: function () { }

          })
        }
        
      }
    });
    
  },
  tofaker: function() {
    var that = this;
    wx.navigateTo({
      url: '../nfc/index/index'

    })
  },
  bindViewTaps: function() {
    var that = this;
    wx.navigateTo({
      url: '../code/code?title=' + app.globalData.gmemberid,
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  bindViewTap: function(event) {
    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/storage/pages/detail/detail?title=' + event.currentTarget.id,
      success: function(res) {},
      fail: function() {

      },
      complete: function() {

      }

    })
  },
  go_div: function(event) {

    var that = this;
    wx.navigateTo({
      url: '/diy/index/index',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  go_seach: function(event) {

    var that = this;
    wx.navigateTo({
      url: '../seach/seach',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  go_good: function(event) {

    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../good/good',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  redirectto: function(t) {
    var a = t.currentTarget.dataset.link,
      e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  go_meeting: function(event) {
    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../circle/circle',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  go_gooddetail: function(event) {

    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../goods_detail/goods_detail?title=' + event.currentTarget.dataset.id,


      success: function(res) {},
      fail: function() {},
      complete: function() {}


    })
  },
  // 点击购物车
  go_car: function(e) {
    wx.navigateTo({
      url: '../buy/buy',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },

  onReady: function() {
    var that = this;
    var member_grade_img = app.globalData.member_grade_img;
    that.setData({
      member_grade_img: member_grade_img,
    })
    wx.request({
      url: app.globalData.tiltes + 'teacenter_recommend',
      data: {},
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function(res) {
        that.setData({
          share: res.data.data,
        });
        //  添加字段到等级数组
        for (var index in that.data.share) {
          var sexParam = "share[" + index + "].url";
          that.setData({
            [sexParam]: app.globalData.img_url,
          })

        }


      },
      fail: function() {

      },
      complete: function() {
        wx.hideLoading()
      }

    });
    // 商品列表请求
    wx.request({
      url: app.globalData.tiltes + 'commodity_recommend',
      data: {
        'open_id': app.globalData.gmemberid,
        member_grade_name: app.globalData.member_grade_name,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function(res) {
        that.setData({
          routers: res.data.data,
        });
        // console.log(that.data.routers)
        //  添加字段到等级数组
        for (var index in that.data.routers) {
          var sexParam = "routers[" + index + "].url";
          that.setData({
            [sexParam]: app.globalData.img_url,
          })

        }
        var member_grade_img = app.globalData.member_grade_img;

        //  添加字段到等级数组
        for (var index in that.data.routers) {
          var sexParam = "routers[" + index + "].member_grade_img";
          that.setData({
            [sexParam]: member_grade_img,
          })

        }


      },
      fail: function() {

      },
      complete: function() {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.baseurl + "doPagehomepage",
      cachetime: "30",
      data: {
        uniacid: 1
      },
      success: function(t) {
        that.setData({
          foot_is: t.data.data.foot_is
        })
        wx.request({
          url: app.globalData.baseurl + "doPageGetFoot",
          cachetime: "30",
          data: {
            uniacid: 1,
            foot: t.data.data.foot_is
          },
          success: function(t) {
            console.log(t)
            that.setData({
              footinfo: t.data.data,
              style: t.data.data.style,
            })
          }
        });


      },
      fail: function(t) {
        console.log(t);
      }
    });

  }

})