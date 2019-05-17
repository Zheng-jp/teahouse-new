// pages/add_address/add_address.js
const throttle = require('../../utils/throttle.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    customItem: "全部",
    address: [],
    title: '',
    btntext: '获取验证码',
    change: true,
    disabled: true,
    num: null,
    oldnum: '',
    newnum: '',
    oldnum1: '',
    code_num: ''
  },

  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.harvester== '') {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none',
      });
    }else if (e.detail.value.harvester_password != e.detail.value.harvester_new_password) {
      wx.showToast({
        title: "两次密码不一致",
        icon: 'none',
      });
    } else if (e.detail.value.harvester_phone_num1 == '') {
      wx.showToast({
        title: "验证码不能为空",
        icon: 'none',
      });
    }else {
      wx.request({
        url: app.globalData.tiltes + 'user_phone_bingding',
        data: {
          member_phone_num: e.detail.value.harvester,
          code: e.detail.value.harvester_phone_num1,
          member_id: app.globalData.member_id,
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        //   "Cookie": sessionId
        // },

        success: function (res) {
          if (res.data.status == 1) {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000)
          }
          else {

          }

        },
        fail: function () {

        },
        complete: function (res) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
        }

      });
    }
  },
  validateTel: function (tel) {
    var TEL_REGEXP = /^1[3456789]\d{9}$/;
    if (TEL_REGEXP.test(tel)) {
      return true;
    }
    return false;
  },
  // bindChange: function (event) {
  //   var that = this;
  //   that.setData({
  //     num: event.detail.value
  //   })
  // },
  //新密码
  bindoldChange: function (event) {
    var that = this;
    that.setData({
      oldnum: event.detail.value
    })
    that.show_btn();
  },
  //第二次新密码
  bindoldChange1: function (event) {
    var that = this;
    that.setData({
      oldnum1: event.detail.value
    })
    that.show_btn();
  },
  //手机号
  bindnewChange: function (event) {
    var that = this;
    that.setData({
      newnum: event.detail.value
    })
    that.show_btn();
  },
  //验证码
  code_num: function (event) {
    var that = this;
    that.setData({
      code_num: event.detail.value
    })
    that.show_btn();
  },
  send_cold: throttle.throttle(function (e) {
    var that = this;
    var is_phone = that.validateTel(that.data.newnum);
    if (is_phone) {
      wx.request({
        url: app.globalData.tiltes + 'sendMobileCodePay',
        data: {
          mobile: that.data.newnum,
        },
        method: "post",
        success: function (res) {
          var coden = 60    // 定义60秒的倒计时
          var codeV = setInterval(function () {
            that.setData({    // _this这里的作用域不同了
              btntext: '重新获取' + (--coden) + 's'
            })
            if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
              clearInterval(codeV)
              that.setData({
                btntext: '获取验证码'
              })
            }
          }, 1000)  //  1000是1秒
        },
        fail: function () {

        },
        complete: function () {
          wx.hideLoading()
        }
      });
    }else {
      wx.showToast({
        title: '手机格式有问题',
        icon: 'none',
      })
    }

  }, 5000),
  //判断提交按钮是否显示
  show_btn: function() {
    var that = this;
    if(that.data.oldnum != '' && that.data.newnum != '' && that.data.oldnum1 != '' && that.data.code_num != '') {
      that.setData({
        disabled: false
      })
    } else {
      that.setData({
        disabled: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
 

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