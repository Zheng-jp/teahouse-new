// pages/nfc/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNfc: false
  },
  nfc: function (e) {
    //获取当前状态
    var that = this;
    wx.getHCEState({
      success(res) {
        that.setData({
          isNfc: true
        })
        wx.showModal({
          title: '提示',
          content: '检测到您手机支持NFC功能，将为您转进该功能',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.scanCode({
                onlyFromCamera: false,
                success(res) {
                  var code_url = res.result.split('/')[2];
                  var com_url = app.globalData.url.split('/')[2];
                  if (code_url != com_url) {
                    wx.showToast({
                      title: '非在下产品,恕在下无法识别',
                      icon: 'none',
                      duration: 2500
                    })
                  } else {
        
                    wx.navigateTo({
                      url: '../../../sweep/pages/sweep_detail/sweep_detail',
                      success: function (res) { },
                      fail: function () { },
                      complete: function () { }
                    })
                  }
        
                }
              });
            }
          }
        })
      },
      fail(err) {
        console.error('NfcHCECore-->getNfcStatus::fail:', err)
        wx.scanCode({
          onlyFromCamera: false,
          success(res) {
  
            var code_url = res.result.split('/')[2];
            var com_url = app.globalData.url.split('/')[2];
            if (code_url != com_url) {
              wx.showToast({
                title: '非在下产品,恕在下无法识别',
                icon: 'none',
                duration: 2500
              })
            } else {
  
              wx.navigateTo({
                url: '../../../sweep/pages/sweep_detail/sweep_detail',
                success: function (res) { },
                fail: function () { },
                complete: function () { }
              })
            }
  
          }
        });
      }
    });
    // if (this.data.isNfc) {
      
    // } else {
      
    // }






  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.nfc();
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