// pages/contract_detail/contract_detail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.request({
      url: app.globalData.tiltes + 'agreement_show',
      data: {
        id: options.id
      },
      method: "POST",
      header: {
        "Content-Type": "application/json" // 默认值
      },
      success: function (res) {
       
        _this.setData({
          information: res.data.data[0].text,
        });
        var article = _this.data.information;
        WxParse.wxParse('article', 'html', article, _this, 5);
      },
      fail: function () {

      },
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