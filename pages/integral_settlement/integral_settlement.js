// pages/settlement/settlement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_height: null,
    // 是否有收货地址
    selected: true,
    // 是否有店铺地址
    selected1: false,
    selected2: false,
    // 是否有存茶地址
    warehouse: false,
    //  选择保险年限
    showModalStatus: false,
    // 加减框里面的值
    num: 1,
    // 手机号码
    tel: '',
    // 名字
    name: '',
    // 地址
    address: '',
    goods: [],
    from_buy: false,
    all_money: 0,
    user: [],
    address_id: 0,
    // 茶叶类型
    order_type: 1,
    // 优惠劵显示
    coupon_show: null,
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    goods_id: null, //商品id
  },

  // 弹窗
  radioChange: function(e) {
    var that = this;
    if (e.detail.value == "选择直邮") {
      that.setData({
        selected: true,
        selected1: false,
        selected2: false,
        order_type: 1,
      })
    } else if (e.detail.value == "到店自提") {
      that.setData({
        selected: false,
        selected1: true,
        selected2: false,
        order_type: 2,
      })
    }
  },
  go_direct_mail_address: function(e) {
    wx.navigateTo({
      url: '../select_address/select_address',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  go_shop_address: function(e) {
    wx.navigateTo({
      url: '../select_shop_address/select_shop_address',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  go_save_tea: function(e) {
    wx.navigateTo({
      url: '../select_save_address/select_save_address',
      success: function(res) {},
      fail: function() {},
      complete: function() {}

    })
  },
  // 弹窗
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function() {
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function() {
    var that = this;
    var val = this.data.pwdVal;
    this.setData({
        showPayPwdInput: false,
        payFocus: false,
        pwdVal: ''
      },
      function() {
        if (val.length == 6) {
          wx.request({
            url: app.globalData.tiltes + 'check_password',
            data: {
              member_id: app.globalData.member_id,
              passwords: val,
            },
            method: "post",
            success: function(res) {
              if (res.data.data.status == 1) {
                wx.request({
                  url: app.globalData.tiltes + 'order_integaral',
                  data: {
                    open_id: app.globalData.gmemberid,
                    address_id: that.data.address_id,
                    goods_id: that.data.goods_id,
                    order_quantity: that.data.num,
                    order_type: that.data.order_type,
                    passwords: val,
                    uniacid: app.globalData.uniacid
                  },
                  method: "post",
                  success: function(res) {
                    if (res.data.status == "1") {
                      wx.showToast({
                        icon: "none",
                        title: res.data.info,
                      })
                      setTimeout(function(){
                        wx.navigateTo({ url: '../integral_order/integral_order?version='+ res.data.data.enter_all_id })
                      }, 1000)
                    } else {
                      wx.showToast({
                        icon: "none",
                        title: res.data.info,
                      })
                    }
                  }
                });
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.data.info,
                })
              }
            }
          });
        } else {
          wx.showToast({
            icon: "none",
            title: "您已取消支付",
          })
        }
      });
  },
  /**
   * 获取焦点
   */
  getFocus: function() {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e) {
    this.setData({
      pwdVal: e.detail.value
    });
    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  forget_password: function(e) {
    wx.navigateTo({
      url: '../forget_password/forget_password',
      success: function(res) {

      },
      fail: function() {

      },
    })
  },
  // 计算钱
  calculate_money: function() {
    var money = this.data.goods.integral * this.data.num;
    this.setData({
      all_money: money
    });
  },

  /* 点击减号 */
  bindMinus: function() {
    var that = this;
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    that.calculate_money();
  },
  /* 点击加号 */
  bindPlus: function() {
    var that = this;
    // console.log(that);
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    that.calculate_money();
  },
  repay: function(e) {
    var that = this;
    that.setData({
      goods_id: e.currentTarget.dataset.id,

    })
    that.showInputLayer();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    that.setData({
      s_height: s_height,

    });
    
    wx.request({
      url: app.globalData.tiltes + 'bonus_detailed',
      data: {
        id: options.title
      },
      method: "post",
      success: function(res) {
        that.setData({
          goods: res.data.data[0]
        });
        that.calculate_money();
      },
      fail: function() {

      }
    });
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
    var that = this;
    var tel = wx.getStorageSync('tel');
    var name = wx.getStorageSync('name');
    var address = wx.getStorageSync('address');
    var id = wx.getStorageSync('id');
    var shop_id = (wx.getStorageSync('shop_id') ? wx.getStorageSync('shop_id') : '');
    
    if (id == '') {
      wx.request({
        url: app.globalData.tiltes + 'member_default_address_return',
        data: {
          // member_id: app.globalData.member_id,
          open_id: app.globalData.gmemberid,
          address_id: ''
        },
        method: "post",
        success: function (res) {
          if (res.data.status == 1) {
            var tel = res.data.data.harvester_phone_num;
            var name = res.data.data.harvester;
            var address_id = res.data.data.id;
            var address_names = '';
            var a = res.data.data.address_name.split(",");
            for (var index in res.data.data.address_name) {
              address_names = res.data.data.address_name.split(",").join("");
            }
            var address = address_names + res.data.data.harvester_real_address;
            that.setData({
              tel: tel,
              name: name,
              address: address,
              address_0: a[0],
              address_id: address_id,
            });
          } else if (res.data.status == 0) {
            that.setData({
              selected: false,
            });
          }
          if (that.data.order_type == 1) {
            wx.request({
              url: app.globalData.tiltes + 'transportation',
              data: {
                'goods_id': that.data.user[1].good_id,
                'goods_standard_id': that.data.user[2].guige,
                'are': that.data.address_0
              },
              method: "post",
              success: function (res) {
                that.setData({
                  freight_infor: res.data.data,
                })
                that.money_freight();
                that.calculate_money();
              }
            });
          }
        }
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'member_address_edit_information',
        data: {
          id: id,
        },
        method: "post",
        success: function (res) {
          var address_names = '';
          var a = res.data.data.address_name.split(",");
          var address_id = res.data.data.id;
          for (var index in res.data.data.address_name) {
            address_names = res.data.data.address_name.split(",").join("");
          }
          that.setData({
            tel: res.data.data.harvester_phone_num,
            name: res.data.data.harvester,
            address: address_names + res.data.data.harvester_real_address,
            address_id: res.data.data.id,
            address_0: a[0],
            address_id: address_id,
          });
          if (that.data.order_type == 1) {
            wx.request({
              url: app.globalData.tiltes + 'transportation',
              data: {
                'goods_id': that.data.user[1].good_id,
                'goods_standard_id': that.data.user[2].guige,
                'are': that.data.address_0
              },
              method: "post",
              success: function (res) {
                that.setData({
                  freight_infor: res.data.data,
                })
                that.money_freight();
                that.calculate_money();
              }
            });
          }
        },
      });
    }
    if (shop_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'approve_address',
        data: {
          uniacid: app.globalData.uniacid
        },
        method: "post",
        success: function (res) {
          var shop_address = res.data.data;
          var shop_id = res.data.data.id;
          var address_names = '';
          for (var index in res.data.data.extract_address) {
            address_names = res.data.data.extract_address.split(",").join("");
          }
          var address = address_names + res.data.data.extract_real_address;
          shop_address["shop_address"] = address
          that.setData({
            shop_address: shop_address,
            shop_id: shop_id,
          });
        }
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'approve_detailed',
        data: {
          id: shop_id
        },
        method: "post",
        success: function (res) {
          var shop_id = res.data.data.id;
          var shop_address = res.data.data;
          var address_names = '';
          for (var index in res.data.data.extract_address) {
            address_names = res.data.data.extract_address.split(",").join("");
          }
          var address = address_names + res.data.data.extract_real_address;
          shop_address["shop_address"] = address
          that.setData({
            shop_address: shop_address,
            shop_id: shop_id,
          });
        }

      });
    }
   
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