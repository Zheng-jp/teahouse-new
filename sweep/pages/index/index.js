// pages/nfc/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNfc: false
  },
  scan: function () {
    wx.scanCode({
      onlyFromCamera: false,
      success(res) {
        var code_url = res.result.split('/')[2];
        var com_url = app.globalData.url.split('/')[2];
        if (code_url != com_url) {
          wx.showToast({
            title: '非本产品，无法识别',
            icon: 'none',
            duration: 2500
          })
        } else {
          var code = res.result.split('?')[1];
          wx.navigateTo({
            url: '../../../sweep/pages/sweep_detail/sweep_detail?'+ code,
            success: function (res) {console.log('扫码跳转成功')},
            fail: function () { console.log('扫码跳转失败')},
            complete: function () { }
          })
        }

      }
    });
  },
  nfc: function () {
    wx.navigateTo({
      url: '../nfc/index',
      success: function (res) { },
      fail: function () { },
      complete: function () { }
    })
    // wx.getHCEState({
    //   success(res) {
    //     console.log(res)
    //     wx.navigateTo({
    //       url: '../nfc/index',
    //       success: function (res) { },
    //       fail: function () { },
    //       complete: function () { }
    //     })
    //   },
    //   fail(e) {
    //     console.log(e)
    //     wx.showToast({
    //       title: '您的手机暂不支持nfc功能',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
  },
 



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.nfc();
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