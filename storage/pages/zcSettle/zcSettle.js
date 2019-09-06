// pages/settlement/settlement.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    url: app.globalData.img_url,
    // 是否有收货地址
    selected: true,
    // 是否有店铺地址
    selected1: false,
    selected2: false,
    isnum: false,
    // 是否有存茶地址
    warehouse: '',
    //  选择保险年限
    showModalStatus: false,
    // 加减框里面的值
    num: 1,
    // 加减框里面的值
    num1: 1,
    // 加减框里面的值
    num2: 1,
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
    goods_money_one: 0,//商品钱数
    address_id: 0,//地址id
    shop_id: 0,//店铺地址id
    sava_id: 0,//存茶地址id
    // 茶叶类型
    order_type: 1,
    // 优惠劵显示
    coupon_show: null,//显示有无优惠劵
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    order_number: null,//下单订单号
    coupon_order: [],//优惠劵弹窗显示
    coupon_mark: false,
    coupon_content: "请选择优惠券",
    money: 0,
    coupon_id: 0,//使用优惠劵id
    address_0: '',
    freight: '0.00',//运费
    freight_infor: [],
    taxes_id: -1,
    taxes_select: 0,
    taxes: '0.00',//税费
    rate: 0,//费率
    storage: '0.00',// 存储费
    insurance: 0,//保险费
    invoice: 0,//发票费
    storages: [],//存储费管理
    shop_address: '',
    is_checked: true,
    unit: [],//报价单位
    ever_storage: [],//单个仓储费
    fixiPhone: false,
    pmKey: false, // switch支付弹窗
    balance: 0.00, //余额
  },
  // 弹窗
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  // 弹窗
  radioChange: function (e) {
    var _this = this;
    if (e.detail.value == "选择直邮") {
      _this.setData({
        selected: true,
        selected1: false,
        selected2: false,
        order_type: 1,
        storage: '0.00',
      })
      _this.money_freight();
    } else if (e.detail.value == "到店自提") {
      _this.setData({
        selected: false,
        selected1: true,
        selected2: false,
        order_type: 2,
        storage: '0.00',
        freight: '0.00',
      })
    } else {
      _this.setData({
        selected: false,
        selected1: false,
        selected2: true,
        order_type: 3,
        freight: '0.00',
      })
      _this.money_storages();
    }
    _this.calculate_money();
  },
  go_direct_mail_address: function (e) {
    wx.navigateTo({
      url: '/pages/select_address/select_address'
    })
  },
  go_shop_address: function (e) {
    wx.navigateTo({
      url: '/pages/select_shop_address/select_shop_address'
    })
  },
  go_invoice_add: function (e) {
    wx.navigateTo({
      url: '/invoice/pages/invoice_add/invoice_add'
    })
  },
  go_save_tea: function (e) {
    wx.navigateTo({
      url: '/pages/select_save_address/select_save_address'
    })
  },
  // 弹窗
  // 弹窗
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    var _this = this;
    var val = this.data.pwdVal;
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' },
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
                  url: app.globalData.tiltes + 'crowd_payment',
                  data: {
                    member_id: app.globalData.member_id,
                    order_num: _this.data.order_number,
                    passwords: val,
                  },
                  method: "POST",
                  complete: function (res) {
                    wx.showToast({
                      icon: "none",
                      title: res.data.info,
                      duration: 2000
                    })
                  }
                });
              } else {
                wx.showToast({
                  title: res.data.info,
                  icon: "none",
                  duration: 2000
                })
              }
            }
          });
        }
        else {
          wx.showToast({
            icon: "none",
            title: "您已取消支付",
          })
        }
        wx.redirectTo({
          url: '../zcOrder/zcOrder?title=0&enter_all_id=' + _this.data.enter_all_id
        })
      });
  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ pwdVal: e.detail.value });
    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  forget_password: function (e) {
    wx.navigateTo({
      url: '../forget_password/forget_password'
    })
  },


  // 微信支付
  wxpay: function () {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'crowd_order',
      data: {
        member_id: app.globalData.member_id,
        order_number: this.data.order_number
      },
      method: "post",
      success: function (res) {
        if (res) {
          wx.requestPayment({
            timeStamp: String(res.data.timeStamp),
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: function () {
              wx.navigateTo({
                url: '../zcOrder/zcOrder?title=0&enter_all_id=' + _this.data.enter_all_id
              })
            }
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  // 取消支付
  hideMethod: function () {
    this.setData({
      pmKey: false
    })
    wx.request({
      url: app.globalData.tiltes + 'del_order',
      data: {
        parts_order_number: this.data.order_number,
        order_type: this.data.order_type,
        coupon_type: this.data.coupon_type
      },
      method: "post",
      success: function (res) {
        console.log(res);
      }
    })
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
  // 弹窗
  // 立即支付
  repay: function () {
    var _this = this;
    var num = new Array();
    num = [_this.data.num];
    let taxes1 = Number(_this.data.taxes);
    if (_this.data.order_type == "1") {
      wx.request({
        url: app.globalData.tiltes + 'crowd_order_place',
        data: {
          member_id: app.globalData.member_id,
          goods_id: _this.data.user[1].goods_id,
          goods_standard_id: _this.data.user[0].guige,
          order_quantity: _this.data.user[2].num,
          address_id: _this.data.address_id,
          order_amount: _this.data.all_money,
          order_type: _this.data.order_type,
          coupon_id: _this.data.coupon_id,
          unit: _this.data.unit,
          year: _this.data.num2,
          receipt_id: _this.data.taxes_id,
          receipt_price: taxes1,
          receipt_status: _this.data.taxes_select,
          uniacid: app.globalData.uniacid,
          type: 1
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            var order_number = res.data.data.parts_order_number;
            _this.setData({
              order_number: order_number,
              order_type: res.data.data.order_type,
              coupon_type: res.data.data.coupon_type,
              pmKey: true,
              balance: res.data.data.balance
            })
          }
          else {
            wx.showToast({
              title: "下单失败",
              icon: 'none'
            })
          }
        }
      });
    } else if (_this.data.order_type == "2") {
      wx.request({
        url: app.globalData.tiltes + 'crowd_order_place',
        data: {
          member_id: app.globalData.member_id,
          goods_id: _this.data.user[1].goods_id,
          goods_standard_id: _this.data.user[0].guige,
          order_quantity: _this.data.user[2].num,
          address_id: _this.data.shop_id,
          order_amount: _this.data.all_money,
          order_type: _this.data.order_type,
          coupon_id: _this.data.coupon_id,
          unit: _this.data.unit,
          year: _this.data.num2,
          receipt_id: _this.data.taxes_id,
          receipt_price: taxes1,
          receipt_status: _this.data.taxes_select,
          uniacid: app.globalData.uniacid,
          type: 1
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            var order_number = res.data.data.parts_order_number;
            _this.setData({
              order_number: order_number,
              order_type: res.data.data.order_type,
              coupon_type: res.data.data.coupon_type,
              pmKey: true,
              balance: res.data.data.balance
            })
          } else {
            wx.showToast({
              title: "下单失败",
              icon: 'none',
            })
          }
        }
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'crowd_order_place',
        data: {
          member_id: app.globalData.member_id,
          goods_id: _this.data.user[1].goods_id,
          goods_standard_id: _this.data.user[0].guige,
          order_quantity: _this.data.user[2].num,
          address_id: _this.data.sava_id,
          order_amount: _this.data.all_money,
          order_type: _this.data.order_type,
          coupon_id: _this.data.coupon_id,
          unit: _this.data.unit,
          year: _this.data.num2,
          receipt_id: _this.data.taxes_id,
          receipt_price: taxes1,
          receipt_status: _this.data.taxes_select,
          uniacid: app.globalData.uniacid,
          type: 1
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            var order_number = res.data.data.parts_order_number;
            _this.setData({
              order_number: order_number,
              order_type: res.data.data.order_type,
              coupon_type: res.data.data.coupon_type,
              pmKey: true,
              balance: res.data.data.balance
            })
          } else {
            wx.showToast({
              title: "下单失败",
              icon: 'none',
            })
          }
        }
      });
    }
  },

  go_coupon: function () {
    var _this = this;
    _this.setData({
      coupon_mark: true,
    })
  },
  checkboxChangess: function (e) {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'coupon_minute',
      data: {
        coupon_id: e.currentTarget.dataset.id,
      },
      method: "POST",
      success: function (res) {
        if (e.currentTarget.dataset.value == "1") {
          if (res.data.data.money <= _this.data.goods_money_one) {
            _this.setData({
              coupon_content: "-" + res.data.data.money,
              coupon_type: e.currentTarget.dataset.value,
              money: res.data.data.money,
            });
          } else {
            _this.setData({
              coupon_content: "-" + _this.data.goods_money_one,
              coupon_type: e.currentTarget.dataset.value,
              money: res._this.data.goods_money_one,
            });
          }
        } else if (e.currentTarget.dataset.value == "3") {
          if (res.data.data.money <= Number(_this.data.storage)) {
            _this.setData({
              coupon_content: "-" + res.data.data.money,
              coupon_type: e.currentTarget.dataset.value,
              money: res.data.data.money,
            });
          } else {
            _this.setData({
              coupon_content: "-" + _this.data.storage,
              coupon_type: e.currentTarget.dataset.value,
              money: res._this.data.storage,
            });
          }
        } else if (e.currentTarget.dataset.value == "") {
          _this.setData({
            coupon_content: "-" + res.data.data.money,
            coupon_type: e.currentTarget.dataset.value,
            money: res.data.data.money,
          });
        }
        _this.calculate_money();
      },
      fail: function () {

      },
    });
    _this.setData({
      coupon_mark: false,
      coupon_id: parseInt(e.currentTarget.dataset.id),
    })
  },

  checkboxChanges: function (e) {
    var _this = this;
    _this.setData({
      is_checked: true
    })
  },
  // 优惠券
  no_use: function (e) {
    var _this = this;
    _this.setData({
      coupon_mark: false,
      coupon_content: "有可适用优惠券",
      coupon_id: 0,
      money: 0,
    })
    _this.calculate_money();
  },
  // 计算商品价格
  god_money: function () {
    var _this = this;
    var all_moneys = 0;
    for (var i = 0; i < _this.data.goods.length; i++) {
      all_moneys += Number(_this.data.goods[i].grade_price) * Number(_this.data.goods[i].number);
    }
    _this.setData({
      goods_money_one: all_moneys
    })
  },

  // 计算钱
  calculate_money: function () {
    var _this = this;
    _this.god_money();
    var all_moneys_alls = Number(_this.data.goods_money_one) + Number(_this.data.storage) + Number(_this.data.freight) - Number(_this.data.money) + Number(_this.data.taxes);
    all_moneys_alls = Number(all_moneys_alls).toFixed(2);
    if (all_moneys_alls > 0) {
      _this.setData({
        all_money: all_moneys_alls,
      });
      // _this.setData({
      //   all_money: _this.data.all_money,
      // });
    }
    else {
      _this.setData({
        all_money: 0,
      });
    }
  },
  //  计算仓储费
  money_storages: function () {
    var _this = this;
    var storagess = [];
    var ever_storage = [];
    var money_storages = 0;
    for (var j = 0; j < _this.data.goods.length; j++) {
      for (var i = 0; i < _this.data.warehouse.units.length; i++) {
        if (_this.data.goods[j].unit == _this.data.warehouse.units[i].unit) {
          storagess.push(_this.data.warehouse.units[i].cost);
        }
      }
    }
    _this.setData({
      storages: storagess,
    })
    for (var j = 0; j < _this.data.goods.length; j++) {
      ever_storage.push(_this.data.storages[j] * _this.data.goods[j].number * _this.data.num1 * 365);
      money_storages += _this.data.storages[j] * _this.data.goods[j].number;
    }
    var storage1 = (money_storages * _this.data.num1 * 365).toFixed(2);
    _this.setData({
      storage: storage1,
      ever_storage: ever_storage,
    })
  },
  // 计算运费
  money_freight: function () {
    var _this = this;
    var money_freight = 0;
    for (var i = 0; i < _this.data.goods.length; i++) {
      for (var j = 0; j < _this.data.freight_infor.length; j++) {
        if (_this.data.goods[i].goods_info.id == _this.data.freight_infor[j].goods_id) {
          money_freight += _this.data.freight_infor[j].collect + (_this.data.goods[i].number - 1) * _this.data.freight_infor[j].markup;
        }
      }
    }
    money_freight = money_freight.toFixed(2);
    _this.setData({
      freight: money_freight,
    })
  },
  //获取input文本
  getSearchKey: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  //修改数量
  shift_out: function () {
    let that = this;
    let num = this.data.goods[0].number;
    let goods = this.data.goods;
    let stock = Number(goods[0].special_info.stock);//库存
    let limit = Number(goods[0].special_info.limit);//限购数量
    if (that.data.searchKey <= 0 || that.data.searchKey == '' || that.data.searchKey == null || that.data.searchKey == undefined) {
      goods[0].number = 1;
      that.setData({
        goods: goods
      });
    } else {
      //限购
      if(limit > 0) {
        if(that.data.searchKey >= limit && limit <= stock) {
          goods[0].number = limit;
        } else {
          if (that.data.searchKey >= stock) goods[0].number = stock;
          else goods[0].number = that.data.searchKey;
        }
        //不限购
      } else {
        if (that.data.searchKey >= stock) goods[0].number = stock;
          else goods[0].number = that.data.searchKey;
      }
          this.setData({
            goods: goods
          });
      
    }
    if (that.data.taxes_select == 1) {
      that.invi();
    }
    if (that.data.order_type == "1") {
      that.money_freight();
      that.calculate_money();
    } else if (that.data.order_type == "3") {
      that.money_storages();
      that.calculate_money();
    } else {
      that.calculate_money();
    }
  },
  /* 点击减号 */
  bindMinus: function () {
    var _this = this;
    var num = this.data.goods[0].number;
    var goods = this.data.goods;
    let minusStatus;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    goods[0].number = num;
    this.setData({
      goods: goods,
      minusStatus: minusStatus
    });
    if (_this.data.order_type == "1") {
      _this.money_freight();
      _this.calculate_money();
    }
    else if (_this.data.order_type == "3") {
      _this.money_storages();
      _this.calculate_money();
    }
    else {
      _this.calculate_money();
    }
    if (_this.data.taxes_select == 1) {
      _this.invi();
    }

  },
  /* 点击加号 */
  bindPlus: function () {
    var _this = this;
    var num = Number(_this.data.goods[0].number);
    var goods = _this.data.goods;
    let stock = Number(goods[0].special_info.stock);//库存
    let limit = Number(goods[0].special_info.limit);//限购数量
    if(limit > 0) {
      if (num >= limit && limit <= stock) {
        goods[0].number = limit;
      } else {
        // 不作过多考虑自增1  
        if (num >= stock) {
          goods[0].number = stock;
        } else {
          num++;
          // 将数值与状态写回  
          goods[0].number = num;
        }
      }
    } else {
      if (num >= stock) {
        goods[0].number = stock;
      } else {
        num++;
        // 将数值与状态写回  
        goods[0].number = num;
      }
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      goods: goods,
      minusStatus: minusStatus
    });
    if (_this.data.order_type == "1") {
      _this.money_freight();
      _this.calculate_money();
    }
    else if (_this.data.order_type == "3") {
      _this.money_storages();
      _this.calculate_money();
    }
    else {
      _this.calculate_money();
    }
    if (_this.data.taxes_select == 1) {
      _this.invi();
    }
  },



  check_invoice: function (e) {
    var _this = this;
    if (e.detail.value[0] == undefined) {
      _this.setData({
        taxes_select: 0,
        taxes: 0.00,
      })
      _this.calculate_money();
    } else {
      if (_this.data.taxes_id == -1) {
        _this.setData({
          taxes_select: 0,
        })
        wx.showToast({
          title: '请添加户名',
          icon: 'none'
        })
      } else {
        _this.setData({
          taxes_select: 1,
        })
        _this.invi();
        _this.calculate_money();
      }
    }
  },

  // 计算发票费用
  invi: function () {
    var _this = this;
    var goods_money = 0.00;
    for (var i = 0; i < _this.data.goods.length; i++) {
      goods_money += Number(_this.data.goods[i].grade_price) * Number(_this.data.goods[i].number);
    }

    goods_money = (Number(goods_money) * Number(_this.data.rate.scale) / 100).toFixed(2);
    _this.setData({
      taxes: goods_money,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    let user = JSON.parse(options.title);
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          fixiPhone: res.model.indexOf('iPhone') != -1
        })
      }
    })
    _this.setData({
      user: user,
    });
    // console.log(_this.data.user)
    wx.request({
      url: app.globalData.tiltes + 'crowd_order_return',
      data: {
        "guige": user[0].guige,
        "goods_id": user[1].goods_id,
        "num": user[2].num,
        "member_id": user[3].member_id[0],
        "uniacid": app.globalData.uniacid
      },
      method: "POST",
      success: function (res) {
        let delivery_a, delivery_b, authority, goods, authority_new = 0;
        goods = res.data.data;
        // for (let o = 0; o < goods.length; o++) {
        let arr = [], bq_arr = [], goods_sign = goods[0].goods_info.goods_sign, bq_dgg = {};
        // //多规格的可存
        // if (goods[o].special_info != undefined && goods[o].special_info != null && goods[o].special_info != '') {
        //   if (goods[o].special_info.save == 1) {
        //     authority_new = 1;
        //     bq_dgg.kc = 1;
        //     bq_arr.push(bq_dgg);
        //   }
        // }
        //正常规
        for (let i in goods_sign) {
          let bq = {};
          if (goods_sign[i].text == '可存' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            authority_new = 1;
            bq.kc = 1;
            bq_arr.push(bq);
          } else if (goods_sign[i].text == 'HOT' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            bq.hot = 1;
            bq_arr.push(bq);
          } else if (goods_sign[i].text == '促销' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            bq.cx = 1;
            bq_arr.push(bq);
          } else if (goods_sign[i].text == '清仓' && goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            bq.qc = 1;
            bq_arr.push(bq);
          } else if (goods_sign[i].check == '1' && goods_sign[i].check != undefined) {
            arr.push(goods_sign[i]);
          }
        }

        res.data.data[0].goods_info.goods_sign = arr;
        res.data.data[0].goods_info.bq_arr = bq_arr;

        if (res.data.data[0].goods_info.goods_delivery.indexOf("1") > -1) delivery_a = 1;//直邮
        if (res.data.data[0].goods_info.goods_delivery.indexOf("2") > -1) delivery_b = 1;//自提
        // console.log(delivery_a,delivery_b,authority_new)
        // }
        _this.setData({
          goods: res.data.data,
          enter_all_id: res.data.enter_all_id,
          authority_new: authority_new,
          delivery_a: delivery_a,
          delivery_b: delivery_b,
        });
        var all_moneys = 0;
        // console.log(_this.data.goods);
        // 商品总价
        all_moneys = +_this.data.goods[0].grade_price * +_this.data.goods[0].number;

        _this.setData({
          all_money: all_moneys,
          num: _this.data.goods[0].number,
          unit: _this.data.goods[0].unit
        });
        // 优惠券请求
        wx.request({
          url: app.globalData.tiltes + 'coupon_appropriated',
          data: {
            'open_id': app.globalData.gmemberid,
            'goods_id': user[1].goods_id,
            'member_grade_name': app.globalData.member_grade_name,
            "money": all_moneys,
            "coupon_type": 2,
            uniacid: app.globalData.uniacid
          },
          method: "POST",
          success: function (res) {
            _this.setData({
              coupon_show: res.data.status,
              coupon_order: res.data.data,
            });
          },
          fail: function () {

          }
        });
      },
      fail: function () {

      }
    });
    // 判读从哪个页面进来
    var pages = getCurrentPages();
    var prevpage = pages[pages.length - 2];
    if (prevpage.route == "storage/pages/zcDetail/zcDetail") {
      _this.setData({
        isnum: true,
        from_buy: true,
      });
    }
    else {
      _this.setData({
        isnum: false,
        from_buy: false,
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var id = wx.getStorageSync('id');
    var sava_id = wx.getStorageSync('sava_id');
    var shop_id = wx.getStorageSync('shop_id');
    var receipt_id = wx.getStorageSync('receipt_id');
    if (id == '') {
      wx.request({
        url: app.globalData.tiltes + 'member_default_address_return',
        data: {
          member_id: app.globalData.member_id,
          address_id: ''
        },
        method: "POST",
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
            _this.setData({
              tel: tel,
              name: name,
              address: address,
              address_0: a[0],
              address_id: address_id,
            });
          } else if (res.data.status == 0) {
            _this.setData({
              selected: false,
            });
          }
          if (_this.data.order_type == 1) {
          wx.request({
            url: app.globalData.tiltes + 'getaAnsporTation',
            data: {
              'goods_id': _this.data.user[1].goods_id,
              'goods_standard_id': _this.data.user[0].guige,
              'are': _this.data.address_0
            },
            method: "POST",
            success: function (res) {
              _this.setData({
                freight_infor: res.data.data,
              })
              _this.money_freight();
              _this.calculate_money();
            },
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
        method: "POST",
        success: function (res) {
          var address_names = '';
          var a = res.data.data.address_name.split(",");
          var address_id = res.data.data.id;
          for (var index in res.data.data.address_name) {
            address_names = res.data.data.address_name.split(",").join("");
          }
          _this.setData({
            tel: res.data.data.harvester_phone_num,
            name: res.data.data.harvester,
            address: address_names + res.data.data.harvester_real_address,
            address_id: res.data.data.id,
            address_0: a[0],
            address_id: address_id,
          });
          if (_this.data.order_type == 1) {
            wx.request({
              url: app.globalData.tiltes + 'getaAnsporTation',
              data: {
                'goods_id': _this.data.user[1].goods_id,
                'goods_standard_id': _this.data.user[0].guige,
                'are': _this.data.address_0
              },
              method: "POST",
              success: function (res) {
                _this.setData({
                  freight_infor: res.data.data,
                })
                _this.money_freight();
                _this.calculate_money();
              },
            });
          }
        }
      });
    }
    if (sava_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'tacitly_approve',
        method: "POST",
        data: {
          uniacid: app.globalData.uniacid
        },
        success: function (res) {
          var warehousess = [];
          var sava_id = res.data.data.id;
          for (var i = 0; i < res.data.data.unit.length; i++) {
            var warehouses = {};
            warehouses["unit"] = res.data.data.unit[i];
            warehouses["cost"] = res.data.data.cost[i];
            warehousess.push(warehouses);
          }
          res.data.data["units"] = warehousess;
          _this.setData({
            warehouse: res.data.data,
            sava_id: sava_id,
          });
        }
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'tacitly_adress',
        data: {
          id: sava_id,
          uniacid: app.globalData.uniacid
        },
        method: "POST",
        success: function (res) {
          var warehousess = [];
          var sava_id = res.data.data.id;
          for (var i = 0; i < res.data.data.unit.length; i++) {
            var warehouses = {};
            warehouses["unit"] = res.data.data.unit[i];
            warehouses["cost"] = res.data.data.cost[i];
            warehousess.push(warehouses);
          }
          res.data.data["units"] = warehousess;
          _this.setData({
            warehouse: res.data.data,
            sava_id: sava_id,
          });
        }
      });
    }
    if (shop_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'approve_address',
        data: {
          uniacid: app.globalData.uniacid
        },
        method: "POST",
        success: function (res) {
          var shop_address = res.data.data;
          var shop_id = res.data.data.id;
          var address_names = '';
          for (var index in res.data.data.extract_address) {
            address_names = res.data.data.extract_address.split(",").join("");
          }
          var address = address_names + res.data.data.extract_real_address;
          shop_address["shop_address"] = address
          _this.setData({
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
        method: "POST",
        success: function (res) {
          var shop_id = res.data.data.id;
          var shop_address = res.data.data;
          var address_names = '';
          for (var index in res.data.data.extract_address) {
            address_names = res.data.data.extract_address.split(",").join("");
          }
          var address = address_names + res.data.data.extract_real_address;
          shop_address["shop_address"] = address
          _this.setData({
            shop_address: shop_address,
            shop_id: shop_id,
          });
        }
      });
    }
    if (receipt_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'approve_corporation',
        data: {
          member_id: app.globalData.member_id,
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == "1") {
            _this.setData({
              taxes_id: res.data.data[0].id
            })
            wx.request({
              url: app.globalData.tiltes + 'proportion',
              data: {
                receipt_id: res.data.data[0].id,
                uniacid: app.globalData.uniacid
              },
              method: "POST",
              success: function (res) {
                _this.setData({
                  rate: res.data.data
                })
              }
            })
          } else {
            wx.request({
              url: app.globalData.tiltes + 'approve_individual',
              data: {
                member_id: app.globalData.member_id
              },
              method: "POST",
              success: function (res) {
                if (res.data.status == "1") {
                  _this.setData({
                    taxes_id: res.data.data[0].id
                  })
                  wx.request({
                    url: app.globalData.tiltes + 'proportion',
                    data: {
                      receipt_id: res.data.data[0].id,
                      uniacid: app.globalData.uniacid
                    },
                    method: "POST",
                    success: function (res) {
                      _this.setData({
                        rate: res.data.data
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    } else {
      _this.setData({
        taxes_id: receipt_id
      })
      wx.request({
        url: app.globalData.tiltes + 'proportion',
        data: {
          receipt_id: receipt_id,
          uniacid: app.globalData.uniacid
        },
        method: "POST",
        success: function (res) {
          // console.log(res.data.data);
          _this.setData({
            rate: res.data.data
          })
          if (_this.data.taxes_select == 1) {
            _this.invi();
          }
        }
      })
    }
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
  },
})