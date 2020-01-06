// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    isHome: false
  },

  onLoad: function (options) {
    console.log(options)
    var code, that=this, special, type = 1;
    if(options) {
      code = options.code;
      special = code.split('165801');
      if(special.length > 1) {
        code = special[1];
      } else {
        code = special[0];
      }
      if(options.isHome) {
        that.setData({
          isHome: true
        })
      }
    }
    wx.request({
      url: app.globalData.tiltes + 'get_anti_fake_info',
      data: {
        code: code,
      },
      method: "post",
      success: function(res) {
        console.log(res)
        if(res.data.status == "1") {
          that.addNum(code, type);
          that.setData({
            goods: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function() {

      },
      complete: function() {
        // wx.hideLoading()
      }
    });
  },
  addNum: function(code, type) {
    wx.request({
      url: app.globalData.tiltes + 'inc_number',
      data: {
        code: code,
        type: type
      },
      method: "post",
      success: function(res) {},
      fail: function() {},
      complete: function() {}
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
    if(this.data.isHome) {
      wx.switchTab({
        url: '../../../pages/diy/index/index', // 新首页
      })
    }
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