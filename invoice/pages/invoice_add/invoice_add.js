// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    statics: 0,
    // invoice: 1,
    invoice1: 1,
    enterprise: [],
    personal: [],
    invoice10:1,
  },
  radioChange0: function (e) {
   return false;
  },
  radioChange: function(e) {
    var that = this;
    if (e.detail.value == "个人") {
      that.geren();
    } else {
      that.qiye();
    }
  },
  radioChange10: function(e) {
    var that = this;
    that.setData({
      invoice10: e.detail.value,
    })
  },
  // radioChange3: function (e) {
  //   var that = this;
  //   if (e.detail.value == "个人") {
  //     that.setData({
  //       select: 1,
  //     })
  //   } else {
  //     that.setData({
  //       select: 0,
  //     })
  //   }
  // },
  
  // radioChange1: function(e) {
  //   var that = this;
  //   if (e.detail.value == "普通发票") {
  //     that.setData({
  //       invoice: 1,
  //     })
  //   } else {
  //     that.setData({
  //       invoice: 2,
  //     })
  //   }
  // },
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
    console.log(e.detail)
    var that = this;
    // 添加
    if (e.detail.value.name1 == '') {
      wx.showToast({
        title: "发票抬头不能为空",
        icon: 'none',
      });
    } else if (e.detail.value.num1 == '') {
      wx.showToast({
        title: "发票税号不能为空",
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
          status: that.data.invoice10,
        },
        method: "post",
        success: function(res) {
          console.log(res)
          wx.setStorageSync('receipt_id', res.data.data.receipt_id);
          wx.navigateBack({
            delta: 1
          });
        },
        fail: function() {

        },
        complete: function(res) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
        }
      })
    }
  },
  formSubmit1: function (e) {
    console.log(e.detail)
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
        title: "发票税号不能为空",
        icon: 'none',
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'people',
        data: {
          member_id: app.globalData.member_id,
          type: 2,
          company:e.detail.value.name1,
          company_number: e.detail.value.num1
          // user_phone: e.detail.value.phone_num,
          // email: e.detail.value.email
        },
        method: "post",
        success: function (res) {
          console.log(res)
          wx.setStorageSync('receipt_id', res.data.data.receipt_id);
          wx.navigateBack({
            delta: 1
          });
        },
        fail: function () {

        },
        complete: function (res) {
          console.log(res);
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
        }
      })
    }
  },
  formSubmit2: function (e) {
    console.log('formSubmit2', e)
    wx.setStorageSync('receipt_id', e.detail.value.id);
    wx.navigateBack({
      delta: 1
    });
  },
  formSubmit3: function (e) {
    console.log('formSubmit3', e)
    wx.setStorageSync('receipt_id', e.detail.value.id);
    wx.navigateBack({
      delta: 1
    });
  },
  geren:function(){
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'approve_individual',
      data: {
        member_id:app.globalData.member_id,
        // member_id: 1049,
      },
      method: "post",
      success: function (res) {
        console.log(res);
        if (res.data.status == "1") {
          that.setData({
            personal: res.data.data[0],
            select: 3
          })
        }
        else {
          that.setData({
            select: 1
          })
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  qiye:function(){
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'approve_corporation',
      data: {
        member_id:app.globalData.member_id,
      },
      method: "post",
      success: function (res) {
        if (res.data.status == "1") {
          that.setData({
            enterprise: res.data.data[0],
            select: 2
          })
        }
        else {
          that.setData({
            select: 0
          })
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  go_form2:function(){
    var that=this;
    that.setData({
      select:1,
    })
  },
  go_form1:function(){
    var that=this;
    that.setData({
      select:0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'receipt_status',
      data: {
        uniacid: app.globalData.uniacid
      },
      method: "post",
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
    that.qiye();
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
})