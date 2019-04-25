// pages/news_detail/news_detail.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgArr: [],
    messageArr: [],
  },

  // 修改navigationBarTitleText
  // 系统消息
  systemText: function(num){
    if(num == 2){
      wx.setNavigationBarTitle({
        title: '系统消息'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var pid = options.pid,
        _this = this;
    _this.systemText(pid);
    wx.request({
      url: app.globalData.tiltes + 'message_show',
      method: 'POST',
      data: {
        pid: pid
      },
      success: function(res){
        console.log(res.data);
        if(res.data.status == 1){
          var data = res.data.data;
          data.forEach(function(v, i){
            WxParse.wxParse('message' + i, 'html', data[i].text, _this, 5);
            if (i === data.length - 1) {
              WxParse.wxParseTemArray("messageArr",'message', data.length, _this);
            }
            for(var prop in v){
              if(prop == 'time'){
                v[prop] = app.formatDate(v[prop]);
              }
            }
          })
          _this.setData({
            msgArr: data
          })
        }
      },
      fail: function(){
        console.log('error');
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