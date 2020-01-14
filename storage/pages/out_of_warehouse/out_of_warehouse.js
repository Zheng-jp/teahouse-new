// storage/pages/out_of_warehouse/out_of_warehouse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    defaultAddress: {}, //默认地址
    province: null,  //省份
    id: null, //出仓订单id
    orderInfo: {}, //出仓订单信息
    postage: 0, //邮费
    outNum: 0,  //出仓数量
    housePrice: {}, // 运费模板数据
    minUnit: '', //最小单位
    minUnitStock: 0, // 库存换算成最小单位
    conversion: false, //是否换算
    conversionStr: '', //换算后展示
    pmKey: false, // switch支付弹窗
    balance: 0.00, //余额
    isFu: true, //钱为零时无需弹支付
    cangList: []
  },

  myRequest: function (url, params, callback) {
    wx.request({
      url: app.globalData.tiltes + url,
      method: 'POST',
      data: params,
      success: function (res) {
        callback(res);
      },
      fail: function (res) {
        console.log('fail:', res);
      }
    })
  },

  // 出仓订单信息
  outPositionOrder: function () {
    var _this = this;
    var params = {
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid,
      id: _this.data.id,
    }
    _this.myRequest('outPositionOrder', params, function (res) {
      console.log('出仓订单信息：', res);
      if (res.data.status == 1) {
        var data = res.data.data;
        var unitLen = data.unit.length;
        data.end_time = app.formatDate(data.end_time);
        data.pay_time = app.formatDate(data.pay_time);
        _this.setData({
          orderInfo: data,
          minUnit: data.unit[unitLen - 1],
          minUnitStock: +data.order_quantity  //最小单位库存
        })
        _this.getDefaultAddress(); //获取默认地址
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) this.setData({ id: options.id });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取默认地址
  getDefaultAddress: function () {
    var _this = this;
    var params = { open_id: app.globalData.gmemberid }
    _this.myRequest('member_default_address_return', params, function (res) {
      console.log('获取默认地址：', res);
      if (res.data.status == 1) {
        _this.setData({
          defaultAddress: res.data.data,
          province: res.data.data.address_name.split(',')[0]
        })
        // _this.getHousePrice(); // 获取运费模板
      } else {
        wx.showToast({
          title: '请先设置收货地址，才能出仓',
          icon: 'none',
          duration: 2500
        })
      }
    })
  },

  // 跳转地址列表
  toAddressList: function () {
    wx.navigateTo({
      url: '../../../pages/select_address/select_address'
    })
  },

  // 微信支付
  wxpay: function () {
    var _this = this;
    var params = {
      id: _this.data.id,
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid,
      house_charges: _this.data.postage,
      order_quantity: _this.data.outNum,
      // store_unit: _this.data.minUnit,
      address_id: _this.data.defaultAddress.id,
      lowest_unit: _this.data.orderInfo.lowest_unit,
      surplus: _this.data.cangList.surplus,
      surplus_number: _this.data.cangList.surplus_number,
      string_number: _this.data.cangList.string_number,
    }
    _this.myRequest('setContinuAtion', params, function (res) {
      console.log(res);
      if (res.statusCode == 200) {
        _this.wechatPay(res);
      } else {
        wx.showToast({
          title: '生成订单失败，请退出后重试！',
          icon: 'none',
          duration: 1200
        })
      }
    })
  },

  // 取消支付
  hideMethod: function () {
    this.setData({
      pmKey: false
    })
    // wx.request({
    //   url: app.globalData.tiltes + 'del_order',
    //   data: {
    //     parts_order_number: this.data.order_number,
    //     order_type: this.data.order_type
    //   },
    //   method: "post",
    //   success: function(res){
    //     console.log(res);
    //   }
    // })
  },

  // 选择支付方式
  selectMethod: function (e) {
    var tapindex = +e.currentTarget.dataset.tapindex;
    this.setData({
      pmKey: false
    })
    if (tapindex == 0) {
      this.showInputLayer();
    } else {
      this.wxpay();
    }
  },

  // 支付 确认出仓
  payment: function () {
    var _this = this;
    console.log('2222' + _this.data.isFu)
    this.data.outNum == 0 ? wx.showToast({
      title: '请填入出仓数量！',
      icon: 'none',
      duration: 1200
    }) : (_this.data.isFu ? (function () { //是否需要付钱
      wx.request({
        url: app.globalData.tiltes + 'get_member_banlance',
        data: {
          member_id: app.globalData.member_id
        },
        success: function (res) {
          console.log(res)
          if (res.data.data.balance == 0) {
            wx.showToast({
              title: '您的账户余额不足，请在我的账户中心里充值！',
              icon: 'none',
              duration: 1200
            })
          }
          _this.setData({
            pmKey: true,
            balance: res.data.data.balance
          })
        }
      })
    })() : _this.payChu())
  },
  payChu: function () {
    var _this = this;
    console.log(this.data.cangList)
    wx.request({
      url: app.globalData.tiltes + 'payment_out_order',
      data: {
        id: _this.data.id,
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid,
        house_charges: _this.data.postage,
        order_quantity: _this.data.outNum,
        address_id: _this.data.defaultAddress.id,
        lowest_unit: _this.data.orderInfo.lowest_unit,
        surplus: _this.data.cangList.surplus,
        surplus_number: _this.data.cangList.surplus_number,
        string_number: _this.data.cangList.string_number,
      },
      method: "post",
      success: function (res) {
        console.log('支付')
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1200
        })
        if (res.data.code == 1) {
          setTimeout(function () {
            wx.navigateBack({ delta: 1 })
          }, 1600)
        }
      }
    })
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    var _this = this;
    var val = this.data.pwdVal;
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    }, function () {
      if (val.length == 6) {
        wx.request({
          url: app.globalData.tiltes + 'check_password',
          data: {
            member_id: app.globalData.member_id,
            passwords: val,
          },
          method: "post",
          success: function (res) {
            if (res.data.data.status == 1) {
              if (Number(_this.data.balance) >= Number(_this.data.postage)) {
                _this.payChu();
              } else {
                wx.showToast({
                  icon: "none",
                  title: '余额不足，请及时充值',
                  duration: 2000
                })
              }
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 2000
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
  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });
    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  forget_password: function (e) {
    wx.navigateTo({
      url: '../../../pages/forget_password/forget_password'
    })
  },

  // 微信支付
  wechatPay: function (res) {
    wx.requestPayment({
      timeStamp: res.data.timeStamp,
      nonceStr: res.data.nonceStr,
      package: res.data.package,
      signType: res.data.signType,
      paySign: res.data.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功!',
          icon: 'none',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({ delta: 1 })
        }, 1600)
      },
      fail: function (res) {
        wx.showToast({
          title: '支付失败!',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  // 输入数量
  bindManual: function (e) {
    var num = Number(e.detail.value);
    // var stock = this.data.minUnitStock;
    var stock = this.data.orderInfo.lowest;
    if (num <= 0) {
      this.setData({
        outNum: 1
      })
    } else if (num <= stock) {
      this.setData({
        outNum: num
      })
    } else {
      wx.showToast({
        title: '您填写的数量超过库存,已为您自动填入最大库存！',
        icon: 'none',
        duration: 1800
      })
      this.setData({
        outNum: stock
      })
    }
    this.setData({
      conversion: true,
    })
    // this.calcPostage(this.data.outNum);
    this.calculate(this.data.outNum);

  },
  // 重置数量
  reset: function () {
    this.setData({
      conversion: false,
      conversionStr: '',
      postage: 0,
      outNum: 0
    })
  },

  // 获取运费模板
  getHousePrice: function () {
    var _this = this;
    var params = {
      member_id: app.globalData.member_id,
      goods_id: _this.data.orderInfo.goods_id,
      are: _this.data.province
    }
    _this.myRequest('getHousePrice', params, function (res) {
      console.log('获取运费模板', res);
      if (res.data.status == 1) {
        _this.setData({
          housePrice: res.data
        })
      }
    })
  },
  calculate: function (num) {
    let that = this, conversionStr = '', isFu = false;
    wx.request({
      url: app.globalData.tiltes + 'geTexchange',
      data: {
        member_id: app.globalData.member_id,
        out_number: num,
        num: that.data.orderInfo.num,
        unit: that.data.orderInfo.unit,
        goods_id: that.data.orderInfo.goods_id,
        lowest: that.data.orderInfo.lowest,
        lowest_unit: that.data.orderInfo.lowest_unit,
        are: that.data.province,
      },
      method: "post",
      success: function (res) {
        console.log(res)
        let data = res.data;
        if (data.code == 1) {
          for (let i = 0; i < data.data.string_number.length; i++) {
            conversionStr += data.data.string_number[i];
          }
          if (data.data.out_price > 0) {
            isFu = true;
          }
          that.setData({
            postage: data.data.out_price,
            conversionStr: conversionStr,
            cangList: data.data,
            isFu: isFu
          })
        }
      }
    });
  },
  // 计算邮费
  calcPostage: function (outNum) {
    console.log(outNum)
    var data = this.data.housePrice;
    // 订单信息
    var orderInfo = this.data.orderInfo;
    var len = orderInfo.unit.length;
    //固定邮费
    if (data.franking_type == 2) {
      if (data.data.collect == 0) {
        this.setData({
          isFu: false
        })
      }
      this.setData({
        postage: data.data.collect
      })
      this.returnConvStr(len, outNum);
    } else {
      var postage = 0;
      // 一个单位
      if (len === 1) {
        postage = (outNum - 1) * data.data[0].markup + data.data[0].collect;

        this.setData({
          postage: postage
        });
        this.returnConvStr(1, outNum);
      } else if (len === 2) {
        //两个单位
        var maxUnitNum = Math.floor(outNum / orderInfo.num[1]);
        var minUnitNum = outNum % orderInfo.num[1];
        var maxPostage = maxUnitNum > 0 ? (maxUnitNum - 1) * data.data[0].markup + data.data[0].collect : '';
        var minPostage = minUnitNum > 0 ? (minUnitNum - 1) * data.data[1].markup + data.data[1].collect : '';
        postage = maxPostage + minPostage;

        this.setData({
          postage: postage
        });
        this.returnConvStr(2, outNum);
      } else if (len === 3) {
        // 三个单位
        var maxUnitNum = Math.floor(outNum / (orderInfo.num[2] / orderInfo.num[1]) / (orderInfo.num[1] / orderInfo.num[0]));
        var midUnitNum = Math.floor(outNum / (orderInfo.num[2] / orderInfo.num[1]) % (orderInfo.num[1] / orderInfo.num[0]));
        var minUnitNum = outNum % (orderInfo.num[2] / orderInfo.num[1]) % (orderInfo.num[1] / orderInfo.num[0]);

        var maxPostage = maxUnitNum > 0 ? (maxUnitNum - 1) * data.data[0].markup + data.data[0].collect : '';
        var midPostage = midUnitNum > 0 ? (midUnitNum - 1) * data.data[1].markup + data.data[1].collect : '';
        var minPostage = minUnitNum > 0 ? (minUnitNum - 1) * data.data[2].markup + data.data[2].collect : '';
        postage = maxPostage + midPostage + minPostage;

        // 换算的字符串
        this.setData({
          postage: postage
        });
        this.returnConvStr(3, outNum);
      }
      if (postage == 0) {
        this.setData({
          isFu: false
        })
      }
    }
  },

  // 返回换算后的字符串
  returnConvStr: function (len, outNum) {
    // 订单信息
    var orderInfo = this.data.orderInfo;
    var conversionStr = '';
    if (len == 1) {
      // 换算的字符串
      conversionStr = outNum + orderInfo.unit[0];
    } else if (len == 2) {
      var maxUnitNum = Math.floor(outNum / orderInfo.num[1]);
      var minUnitNum = outNum % orderInfo.num[1];
      // 换算的字符串
      conversionStr = maxUnitNum + orderInfo.unit[0] + minUnitNum + orderInfo.unit[1];

    } else {
      // 三个单位
      var maxUnitNum = Math.floor(outNum / (orderInfo.num[2] / orderInfo.num[1]) / (orderInfo.num[1] / orderInfo.num[0]));
      var midUnitNum = Math.floor(outNum / (orderInfo.num[2] / orderInfo.num[1]) % (orderInfo.num[1] / orderInfo.num[0]));
      var minUnitNum = outNum % (orderInfo.num[2] / orderInfo.num[1]) % (orderInfo.num[1] / orderInfo.num[0]);

      console.log(maxUnitNum, midUnitNum, minUnitNum);
      // 换算的字符串
      conversionStr = maxUnitNum + orderInfo.unit[0] + midUnitNum + orderInfo.unit[1] + minUnitNum + orderInfo.unit[2];
    }
    this.setData({
      conversionStr: conversionStr
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.outPositionOrder(); //出仓订单信息

    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
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