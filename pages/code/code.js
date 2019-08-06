// pages/code/code.js
const app = getApp();
const QR = require("../../wxParse/wxqrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:'',
    information:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var gmemberid = app.globalData.gmemberid;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });
      }
    });
    wx.request({
      url: app.globalData.tiltes + 'my_show_grade',
      data: {
        open_id: gmemberid,
        uniacid: app.globalData.uniacid
      },
      method: "POST",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        let qrcodeSize = that.getQRCodeSize()
        that.createQRCode(res.data.data.information.share_url, qrcodeSize)
   
        that.setData({
          information: res.data.data.information
        });
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });

  },
  //适配不同屏幕大小的canvas
  getQRCodeSize: function () {
    var size = 0;
    try {
      var res = wx.getSystemInfoSync();
      var scale = res.windowWidth / 750; //不同屏幕下QRcode的适配比例；设计稿是750宽
      var width = 300 * scale;
      size = width;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
      size = 150;
    }
    return size;
  },
  createQRCode: function (text, size) {
    console.log(text)
    //调用插件中的draw方法，绘制二维码图片
    let that = this
    try {
      // console.log('QRcode: ', text, size)
      let _img = QR.createQrCodeImg(text, {
        size: parseInt(size)
      })
      that.setData({
        'qrcode': _img
      })
    } catch (e) {
      console.log(e)
    }
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