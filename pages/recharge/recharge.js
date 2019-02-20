// pages/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recharge:[],
    indexs:null,
  },
  color:function (e) {
    
    var that=this;
     that.setData({
      indexs:e.currentTarget.dataset.id,
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'recharge_setting_return',
      data: {
        
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
       console.log(res.data.data[0].recharge_setting_id);
       that.setData({
        recharge:res.data.data,
        indexs:res.data.data[0].recharge_setting_id,
       })
       console.log(that);
     
      },
      fail: function () {

      },
      complete: function (res) {
        
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