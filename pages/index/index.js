//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    member_grade_img:null,
    url: app.globalData.img_url,
    // 轮播图图片地址数据
    image: [
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181128/eb9826b6cbef8a7a581d7cd55726612f.jpg',
      app.globalData.url + '/upload/20181128/31d02b855e58a946d5c8dddbb278376b.jpg',
    ],
   
    circular: 'true',
    indicatorDots: 'true',
    interval:'4000',
    autoplay:'true',
    // 小喇叭图片地址
    laba:'img/u206.png',
    // 关闭图片地址
    close:'img/close.png',
    // 更多图片地址
    more:'img/more.png',
    nav:[
      {
        url:'img/u103.png',
        text:'商品分类'
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
    share: [
    ]

    },
    nfc:function(){
      wx.stopHCE({
        success(res) {
          console.log(res.errMsg)
        }
      })
    },
    bindViewTap: function (event) {
      var that=this;
      var item = event.currentTarget.dataset.item;
      wx.navigateTo({
        url: '../detail/detail?title='+ event.currentTarget.id ,
        success: function (res) {
        },
        fail: function () {
      
        },
        complete: function () {
       
        }
  
      })
    },
  go_good: function (event) {

    var that = this;
    console.log(event);
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../good/good',
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },
  go_meeting: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.switchTab ({
      url: '../circle/circle',
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },
  go_gooddetail: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.item;

    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../goods_detail/goods_detail?title=' + event.currentTarget.dataset.id,
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }


    })
  },
    // 点击购物车
    go_car: function (e) {
      wx.navigateTo({
        url: '../buy/buy',
        success: function (res) {
          // success
          console.log("nihao////跳转成功")
        },
        fail: function () {
          // fail
          console.log("nihao////跳转失败")
        },
        complete: function () {
          // complete
          console.log("nihao////跳转行为结束，未知成功失败")
        }

      })
    },

    onReady: function () {
    var that = this;
    var member_grade_img=app.globalData.member_grade_img;
    that.setData({
      member_grade_img: member_grade_img,
    })
  wx.request({
    url: app.globalData.tiltes + 'teacenter_recommend',
    data: {
    },
    method: "post",
    // header: {
    //   "Content-Type": "json" // 默认值

    // },
    success: function (res) {
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
      console.log(that.data.share);


    },
    fail: function () {

    },
    complete: function () {
      wx.hideLoading()
    }

  });
  // 商品列表请求
  wx.request({
    url: app.globalData.tiltes + 'commodity_recommend',
    data: {
      'open_id': app.globalData.gmemberid,
    },
    method: "post",
    // header: {
    //   "Content-Type": "json" // 默认值

    // },
    success: function (res) {
      console.log(res);
      that.setData({
        routers: res.data.data,
      });
      
        //  添加字段到等级数组
        for (var index in that.data.routers) {
          var sexParam = "routers[" + index + "].url";
          that.setData({
            [sexParam]: app.globalData.img_url,
          })
  
        }
        var member_grade_img=app.globalData.member_grade_img;
    
           //  添加字段到等级数组
           for (var index in that.data.routers) {
            var sexParam = "routers[" + index + "].member_grade_img";
            that.setData({
              [sexParam]: member_grade_img,
            })
    
          }


    },
    fail: function () {

    },
    complete: function () {
      wx.hideLoading()
    }

  });
    
  }
 
})
