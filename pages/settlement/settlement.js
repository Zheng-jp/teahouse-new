// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:true,
    selected1: false,
    selected2: false,
    warehouse:true,
    
  },
  radioChange: function (e) {
    var that = this;
    if (e.detail.value =="选择直邮"){
      that.setData({
        selected: true,
        selected1: false,
        selected2: false,
      })
    }
    else if (e.detail.value == "到店自提"){
      that.setData({
        selected: false,
        selected1: true,
        selected2: false,
      })
    }
    else{
      that.setData({
        selected: false,
        selected1: false,
        selected2: true,
      })
    }
    // console.log(e.detail.value);
  },
  go_direct_mail_address:function(e){
    wx.navigateTo({
      url: '../select_address/select_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  go_shop_address: function (e) {
    wx.navigateTo({
      url: '../select_shop_address/select_shop_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  go_save_tea: function (e) {
    wx.navigateTo({
      url: '../select_save_address/select_save_address',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }

    })
  },
  repay:function(){
    wx.showActionSheet({
      itemList: ['账户支付', '微信支付',],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
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