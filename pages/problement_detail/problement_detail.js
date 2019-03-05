// pages/problement_detail/problement_detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myHtml: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'problem_show',
      method: 'POST',
      data: {
        id: options.titleid
      },
      success: function(res){
       
        if(res.data.status == 1){
          _this.setData({
            myHtml: res.data.data[0].text
          })
          var article = _this.data.myHtml;
				  WxParse.wxParse('article', 'html', article, _this, 5);
        }
        
        console.log(_this.data.myHtml);
      },
      fail: function(res){
        console.log(res.status, res.statusText);
      }
    })
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