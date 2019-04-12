// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    statics: 0,
    invoice: 1,
    invoice1: 1,
  },
  radioChange: function(e) {
    var that = this;
    if (e.detail.value == "个人") {
      that.setData({
        select: true,
      })
    } else {
      that.setData({
        select: false,
      })
    }
  },
  radioChange1: function(e) {
    var that = this;
    if (e.detail.value == "普通发票") {
      that.setData({
        invoice: 1,
      })
    } else {
      that.setData({
        invoice: 2,
      })
    }
  },
  radioChange2: function(e) {
    var that = this;
    if (e.detail.value == "普通发票") {
      that.setData({
        invoice1: 1,
      })
    } else {
      that.setData({
        invoice1: 2,
      })
    }
  },
  go_invoice_select: function() {
    wx.navigateTo({
      url: '../invoice_select/invoice_select',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  formSubmit: function(e) {
    var that = this;
    console.log(e);
    // 添加

    if (e.detail.value.name1 == '') {
      wx.showToast({
        title: "发票抬头不能为空",
        icon: 'none',
      });
    } else if (e.detail.value.num1 == '') {
      wx.showToast({
        title: "企业税号不能为空",
        icon: 'none',
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'bill',
        data: {
          member_id: app.globalData.member_id,
          type: 1,
          company: e.detail.value.name1,
          company_number: e.detail.value.num1,
          status: that.data.invoice1

        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
        success: function(res) {


        },
        fail: function() {

        },
        complete: function(res) {
          wx.showToast({
            title: res.data.data.info,
            icon: 'none',
          });
        }
      })
    }



  },
  formSubmit1: function (e) {
    var that = this;
    console.log(e);
    // 添加
    if (e.detail.value.email == '') {
      wx.showToast({
        title: "邮箱不能为空",
        icon: 'none',
      });
    } else if (e.detail.value.name == '') {
      wx.showToast({
        title: "姓名不能为空",
        icon: 'none',
      });
    } else if (e.detail.value.phone_num == '') {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none',
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'people',
        data: {
          member_id: app.globalData.member_id,
          type: 2,
          company:e.detail.value.name,
          name: e.detail.value.name,
          user_phone: e.detail.value.phone_num,
          email: e.detail.value.email

        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
        success: function (res) {


        },
        fail: function () {

        },
        complete: function (res) {
          wx.showToast({
            title: res.data.data.info,
            icon: 'none',
          });
        }
      })
    }



  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'receipt_status',
      data: {},
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function(res) {
        that.setData({
          statics: res.data.data.status
        })

      },
      fail: function() {

      },
      complete: function() {

      }
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})