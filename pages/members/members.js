// pages/members/members.js
var app = getApp();
Page({
  test: app.data.test,

  /**
   * 页面的初始数据
   */
  data: {
    tab: '0',
    is: true,
    url: app.globalData.img_url,
    level: [],
    information: [],
    member_send: '0.00',
    integral_send: '0.00',
    is_pay: false,
    check: ''
  },
  catchTouchMove: function(res) {
    return false
  },
  /**
   * radio监听事件
   */
  read: function(e) {
    var that = this;
    if (e.detail.value == '') {
      that.setData({
        check: 0
      })
    } else {
      that.setData({
        check: 1
      })
    }
  },
  toda: function() {
    wx.navigateTo({
      url: '../contract_detail/contract_detail?id=2',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  radioChange: function(e) {
    var that = this;
    // console.log(e)
    //  点击添加类
    if (that.data.level.tab === e.detail.value) {
      return false;
    } else {
      that.setData({
        tab: e.detail.value
      })
    }
    var tab = that.data.tab;
    that.setData({
      member_send: that.data.level[tab].recharge_member_send,
      integral_send: that.data.level[tab].recharge_integral_send
    })
    for (var i = 0; i < that.data.level.length; i++) {
      var check = "level[" + i + "].check";
      that.setData({
        [check]: false
      })
      if (that.data.level[i].member_grade_id == that.data.level[tab].member_grade_id) {
        var check = "level[" + tab + "].check";
        that.setData({
          [check]: true
        })
      }
    }
    var member_grade_id = that.data.information.member_grade_id;
    if (member_grade_id == that.data.level[tab].member_grade_id) {
      that.setData({
        is: true,
      })
    } else {
      that.setData({
        is: false,
      })
    }
  },
  stopTouchMove: function() {
    return false;
  },
  bindViewTap: function() {
    var that = this;
    wx.navigateTo({
      url: '../code/code?title=' + app.globalData.gmemberid,
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },

  //调起支付下单
  pay: function(e) {
    var that = this;
    var data = e.currentTarget;
    // console.log(that.data.level)
    var arr_data;
    if (that.data.check == '') {
      wx.showToast({
        title: '您是否阅读并同意《会员权益协议》',
        icon: 'none',
        duration: 3000
      })
    } else {
      for (var i = 0; i < that.data.level.length; i++) {
        if (that.data.level[i].check == true) {
          arr_data = that.data.level[i];
          if (that.data.level[i].member_grade_id <= that.data.information.member_grade_id) {
            that.setData({
              is_pay: false
            })
            wx.showToast({
              title: '您当前等级为该档，您可选择其他等级补差额升级',
              icon: 'none',
              duration: 3000
            })
          } else {
            that.setData({
              is_pay: true
            })
          }
        }
      }
      if (that.data.is_pay == true) {
        //下单
        wx.request({
          url: app.globalData.tiltes + 'member_balance_recharge',
          data: {
            member_id: that.data.information.member_id, //账号id
            money: arr_data.recharge_member_send, //金额
            member_grade_id: arr_data.member_grade_id //选择等级
          },
          method: "POST",
          success: function(res) {
            // console.log(res)
            //调起支付
            wx.request({
              url: app.globalData.tiltes + 'wx_recharge_pay',
              data: {
                member_id: that.data.information.member_id,
                recharge_order_number: res.data.data
              },
              method: 'POST',
              success: function(res) {
                console.log(res)
                var result = res;
                if (result) {
                  wx.requestPayment({
                    timeStamp: String(result.data.timeStamp),
                    nonceStr: result.data.nonceStr,
                    package: result.data.package,
                    signType: result.data.signType,
                    paySign: result.data.paySign,
                    'success': function(successret) {
                      wx.showToast({
                        title: '购买成功',
                        icon: 'none',
                        duration: 3000
                      })
                      wx.navigateBack({
                        delta: 1
                      })
                    },
                    'fail': function(e) {
                      console.log(e)
                    }
                  })
                }
              },
              fail: function(e) {}
            })
          },
          fail: function(e) {

          },
          complete: function() {}
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var gmemberid = app.globalData.gmemberid;
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'my_show_grade',
      data: {
        open_id: gmemberid,
        uniacid: app.globalData.uniacid
      },
      method: "POST",
      success: function(res) {
        console.log(res.data.data.member_grade)
        that.setData({
          level: res.data.data.member_grade,
          information: res.data.data.information
        });
        //  添加字段到等级数组
        for (var index in that.data.level) {
          var sexParam = "level[" + index + "].tab";
          that.setData({
            [sexParam]: index,
          })
        }
        for (var index in that.data.level) {
          var sexParam = "level[" + index + "].check";
          that.setData({
            [sexParam]: false,
          })
        }
        var member_grade_id = that.data.information.member_grade_id;
        // console.log(member_grade_id);
        // console.log(that.data.level);
        for (var index in that.data.level) {

          if (member_grade_id == that.data.level[index].member_grade_id) {
            var check = "level[" + index + "].check";
            that.setData({
              member_send: that.data.level[index].recharge_member_send,
              integral_send: that.data.level[index].recharge_integral_send,
              tab: that.data.level[index].tab,
              [check]: true,
            })
          }
        }
      },
      fail: function() {

      },
      complete: function() {
        wx.hideLoading()
      }
    });
  },
})