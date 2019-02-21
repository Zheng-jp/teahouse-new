// pages/bill/bill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'consume_index',
      data: {
       member_id:app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
       that.setData({
        bill:res.data.data
       })
     
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