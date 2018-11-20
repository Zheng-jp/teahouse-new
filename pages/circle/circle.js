// pages/circle/circle.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: app.data.test,
    url: app.globalData.img_url,
    ico:[],
    share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
        share_content: "20180809马连道茶话会报名参加中马连道进......",
        validity: '长期',

      }
    ],

  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    wx.request({
      url: app.globalData.tiltes +'teacenter_data',
      data: {
      },
      method: "post",
      header: {
        "Content-Type": "json" // 默认值

      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          ico: res.data.data,
        });

       },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });

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