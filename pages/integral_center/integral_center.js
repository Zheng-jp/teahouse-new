// pages/ integral_center/ integral_center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [
      // {
      //   name: '双骄',
      //   url: '/pages/Course/course',
      //   icon: 'img/u160.jpg',
      //   code: '10',
      //   selling:[
      //     '新益号',
      //     '普洱茶'
      //   ],
      //   price_img: 'img/u182.png'
        
      // },
      // {
      //   name: '双骄',
      //   url: '/pages/Course/course',
      //   icon: 'img/u160.jpg',
      //   code: '10',
      //   selling: [
      //     '新益号',
      //     '普洱茶'
      //   ],
      //   price_img: 'img/u182.png',
      //   jiage: '￥120.0/片'
      // },
      // {
      //   name: '双骄',
      //   url: '/pages/Course/course',
      //   icon: 'img/u160.jpg',
      //   code: '10',
      //   selling: [
      //     '新益号',
      //     '普洱茶'
      //   ],
      //   price_img: 'img/u182.png',
      //   jiage: '￥120.0/片'
      // },
     
      // {
      //   name: 'Python',
      //   url: '/pages/Course/course',
      //   icon: 'img/u160.jpg',
      //   code: '10',
      //   selling: [
      //     '新益号',
      //     '普洱茶'
      //   ],
      //   price_img: 'img/u182.png',
      //   jiage: '￥120.0/片'
      // },
    
    ],
    url: app.globalData.img_url,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
      for (var index in that.data.share) {
        var sexParam = "share[" + index + "].url";
        that.setData({
          [sexParam]: app.globalData.img_url,
        })

      }


    },
    fail: function () {

    },
    complete: function () {
      wx.hideLoading()
    }

  });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})