// storage/pages/zcOrder/zcOrder.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moneyArray: [1, 5, 10],
    index: 0,
    suppMoney: null,
    standardId: null, //打赏商品规格id
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //余额支付文本框焦点
    order_number: null, //订单号
  },

  //输入密码监听
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });
    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  // 忘记密码
  forget_password: function (e) {
    wx.navigateTo({
      url: '/pages/forget_password/forget_password',
      success: function (res) { }
    })
  },
  // 获取焦点
  getFocus: function () {
    this.setData({ payFocus: true });
  },

  //显示支付密码输入层
  showInputLayer: function () {
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },

  //隐藏支付密码输入层
  hidePayLayer: function () {
    var _this = this;
    var val = this.data.pwdVal;
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    },
    function () {
      if (val.length == 6) {
        wx.request({
          url: app.globalData.tiltes + 'check_password',
          data: {
            member_id: app.globalData.member_id,
            passwords: val,
          },
          method: "POST",
          success: function (res) {
            if (res.data.data.status == 1) {
              wx.request({
                url: app.globalData.tiltes + 'remainder_pay',
                data: {
                  member_id: app.globalData.member_id,
                  order_num: _this.data.order_number,
                  passwords: val,
                },
                method: "POST",
                success: function (res) { },
                fail: function () { },
                complete: function (res) {
                  wx.showToast({
                    icon: "none",
                    title: res.data.info,
                    duration: 2000
                  })
                }
              });
            }else {
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 2000
              })
            }
          },
          fail: function () {
          },
          complete: function () { }
        });
      }else {
        wx.showToast({
          icon: "none",
          title: "您已取消支付",
        })
      }
      wx.navigateTo({
        url: '/storage/pages/zcOrder/zcOrder?title=' + 0,
        success: function (res) {},
      })
    });
  },

  // 打赏金额 下拉列表索引
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 输入支付金额
  bindInputMoney: function (e) {
    var val = e.detail.value;
    if (val >= 1) {
      this.setData({
        suppMoney: val
      })
    } else {
      wx.showToast({
        title: '打赏金额最低1元',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 去支付
  payment: function () {
    var _this = this;
    var param = {
      id: this.data.standardId,
      money: this.data.suppMoney ? this.data.suppMoney : this.data.moneyArray[this.data.index],
      member_id: app.globalData.member_id
    }
    wx.request({
      url: app.globalData.tiltes + 'crowd_reward',
      method: 'POST',
      data: param,
      success: function (res) {
        console.log(res);
        var data = res.data;
        _this.data.order_number = data.data.order_number;
        if (data.status == 1) {
          wx.showActionSheet({
            itemList: ['账户支付', '微信支付'],
            success(res) {
              if (res.tapIndex == 0) {
                // 余额支付
                _this.showInputLayer();
              } else {
                // 调用微信支付
                _this.wechatPay(data);
              }
            }
          })
        }
      },
      fail: function (res) { console.log(res) }
    })
  },
  // 调用微信支付
  wechatPay: function (data) {
    // 调起支付
    console.log(data)
    wx.request({
      url: app.globalData.tiltes + 'reward_pay',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        order_number: data.data.order_number
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          // 调 微信支付
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign,
            success(res) {
              console.log(res);
              // 支付成功 跳转众筹订单
              wx.redirectTo({
                url: '/storage/pages/zcOrder/zcOrder?title=' + 0,
                success: function (res) {},
                fail: function () {},
              })
            },
            fail(res) { console.log(res) }
          })
        }
      },
      fail: function (res) { console.log(res); }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打赏商品规格id
    if (options.standardId) {
      this.setData({
        standardId: options.standardId
      })
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