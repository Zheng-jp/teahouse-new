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
    goods_money_one: 0, //商品钱数
    address_id: 0, //地址id
    shop_id: 0, //店铺地址id
    sava_id: 0, //存茶地址id
    // 茶叶类型
    order_type: 1,
    // 优惠劵显示
    coupon_show: null, //显示有无优惠劵
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    order_number: null, //下单订单号
    coupon_order: [], //优惠劵弹窗显示
    coupon_mark: false,
    coupon_content: "请选择优惠券",
    money: 0,
    coupon_id: 0, //使用优惠劵id
    address_0: '',
    freight: '0.00', //运费
    freight_infor: [],
    taxes_id: -1,
    taxes_select: 0,
    taxes: '0.00', //税费
    rate: 0, //费率
    storage: '0.00', // 存储费
    insurance: 0, //保险费
    invoice: 0, //发票费
    storages: [], //存储费管理
    shop_address: '',
    is_checked: true,
    unit_all: [], //报价单位
    ever_storage: [], //单个仓储费
    fixiPhone: false, //苹果底部适配,
    pmKey: false, // switch支付弹窗
    balance: 0.00, //余额
  },
  // 隐藏支付弹窗
  hideMethod: function () {
    this.data.pmKey = false;
  },

  // 弹窗
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  // 弹窗
  radioChange: function (e) {
    var that = this;
    let goods = that.data.goods;
    if (that.data.goods_standby.length > 1) goods = that.data.goods_standby;
    if (e.detail.value == "选择直邮") {
      that.setData({
        goods: goods,
        selected: true,
        selected1: false,
        selected2: false,
        order_type: 1,
        storage: '0.00',
        sta: 1
      })
      that.money_freight();
    } else if (e.detail.value == "到店自提") {
      that.setData({
        goods: goods,
        selected: false,
        selected1: true,
        selected2: false,
        order_type: 2,
        storage: '0.00',
        freight: '0.00',
        sta: 2
      })
    } else {
      let arr = [], unit = [], goods_id = [], goods_standard_id = [], goods_num = [], shoppinds_id = [];
      // console.log(that.data.coupon_order)
      //购物车结算时，剔除不可存茶商品
      if (goods.length > 1) {
        for (let i = 0; i < goods.length; i++) {
          for (let o in goods[i].goods_info.bq_arr) {
            if (goods[i].goods_info.bq_arr[o].kc == 1 && goods[i].goods_info.bq_arr[o].kc != null && goods[i].goods_info.bq_arr[o].kc != undefined) {
              arr.push(goods[i]);

              unit.push(goods[i].unit);
              goods_id.push(goods[i].goods_info.id);
              if (goods[i].special_info == undefined || goods[i].special_info == null) {
                goods_standard_id.push('0');
              } else {
                goods_standard_id.push(goods[i].special_info.id);
              }
              goods_num.push(goods[i].number);
              //购物车id
              if (goods[i].goods_info.id == that.data.user[4].shopAddids[i].goods_id) {
                shoppinds_id.push(that.data.user[4].shopAddids[i].shop_id)
              }
            }
          }
        }
        
        wx.showToast({
          title: '已剔除非存储商品，您可结算可存储商品',
          icon: 'none',
          duration: 3000
        })
      } else {
        goods_id.push(goods[0].goods_info.id);
        unit.push(goods[0].unit);
        if (goods[0].special_info == undefined || goods[0].special_info == null) {
          goods_standard_id.push('0');
        } else {
          goods_standard_id.push(goods[0].special_info.id);
        }
        goods_num.push(goods[0].number);
        if (that.data.user.length < 5) {
          shoppinds_id.push(that.data.user[0].shop_id)
        } else {
          shoppinds_id.push(that.data.user[4].shopAddids[0].shop_id)
        }
        arr = that.data.goods;
      }
      that.setData({
        goods: arr,
        selected: false,
        selected1: false,
        selected2: true,
        order_type: 3,
        storage: '0.00',
        freight: '0.00',
        sta: 3,
        unit_all: unit,
        goods_id: goods_id,
        goods_standard_id: goods_standard_id,
        goods_num: goods_num,
        shoppinds_id: shoppinds_id
      })
      that.money_storages();

    }
    that.calculate_money();
  },
  go_direct_mail_address: function (e) {
    wx.navigateTo({
      url: '../select_address/select_address'
    })
  },
  go_shop_address: function (e) {
    wx.navigateTo({
      url: '../select_shop_address/select_shop_address'
    })
  },
  go_invoice_add: function (e) {
    wx.navigateTo({
      url: '/invoice/pages/invoice_add/invoice_add'
    })
  },
  go_save_tea: function (e) {
    wx.navigateTo({
      url: '../select_save_address/select_save_address'
    })
  },
  // 弹窗
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
    var that = this;
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
          method: "post",
          success: function (res) {
            if(res.data.data.status == 1) {
              wx.request({
                url: app.globalData.tiltes + 'balance_payment',
                data: {
                  member_id: app.globalData.member_id,
                  order_num: that.data.order_number,
                  passwords: val,
                },
                method: "post",
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
          }
        });
      } else {
        wx.showToast({
          icon: "none",
          title: "您已取消支付",
        })
      }
      setTimeout(function(){
        wx.navigateTo({
          url: '../order/order?title=0&enter_all_id=' + that.data.enter_all_id
        })
      },1000)
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
      url: '../forget_password/forget_password'
    })
  },

  // 微信支付
  wxpay: function(){
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'wx_order_index',
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
            complete: function(){
              setTimeout(function(){
                wx.navigateTo({
                  url: '../order/order?title=0&enter_all_id=' + that.data.enter_all_id
                })
              },1000)
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
  hideMethod: function(){
    this.setData({
      pmKey: false
    })
    wx.request({
      url: app.globalData.tiltes + 'del_order',
      data: {
        parts_order_number: this.data.order_number,
        order_type: this.data.order_type,
        coupon_type: this.data.coupon_type,
      },
      method: "post",
      success: function(res){
        console.log(res);
      }
    })
  },

  // 选择支付方式
  selectMethod: function(e){
    var tapindex = +e.currentTarget.dataset.tapindex;
    this.setData({
      pmKey: false
    })
    if(tapindex == 0){
      if(app.globalData.judge_repay) {
        if(Number(this.data.balance) < Number(this.data.all_money)) {
          wx.showToast({
            title: "您的账户余额不足，请在我的账户中心里充值！",
            icon: 'none',
          })
        } else {
          this.showInputLayer();
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '您还没设置支付密码，是否前往设置？',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "../forget_password/forget_password"
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }else{
      this.wxpay();
    }
  },

  // 弹窗
  // 立即支付
  repay: function () {
    var that = this, goods_price;
    var num = new Array();
    num = [that.data.goods[0].number];
    let stock;
    if(that.data.goods[0].special_info == "" || that.data.goods[0].special_info == null) {
      stock = Number(that.data.goods[0].goods_info.goods_repertory);
    } else {
      stock = Number(that.data.goods[0].special_info.stock);
    }
    let taxes1 = Number(that.data.taxes);
    goods_price = [that.data.goods[0].grade_price];
    if(Number(num[0]) <= stock) {
      if (that.data.order_type == "1") {
        wx.request({
          url: app.globalData.tiltes + 'order_places',
          data: {
            member_id: app.globalData.member_id,
            goods_id: that.data.user[1].good_id,
            goods_standard_id: that.data.user[2].guige,
            order_quantity: num,
            address_id: that.data.address_id,
            order_amount: that.data.all_money,
            order_type: that.data.order_type,
            coupon_id: that.data.coupon_id,
            unit: that.data.unit_all,
            year: that.data.num2,
            receipt_id: that.data.taxes_id,
            receipt_price: taxes1,
            receipt_status: that.data.taxes_select,
            uniacid: app.globalData.uniacid,
            freight: that.data.freight,
            storage: that.data.storage,
            goods_price: goods_price
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              var order_number = res.data.data.parts_order_number;
              that.setData({
                order_number: order_number,
                order_type: res.data.data.order_type,
                coupon_type: res.data.data.coupon_type,
                pmKey: true,
                balance: res.data.data.balance
              })
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'none'
              })
            }
          }
        });
      } else if (that.data.order_type == "2") {
        //到店自提地址
        if (that.data.shop_id != '' && that.data.shop_id != null && that.data.shop_id != undefined) {
          wx.request({
            url: app.globalData.tiltes + 'order_places',
            data: {
              member_id: app.globalData.member_id,
              goods_id: that.data.user[1].good_id,
              goods_standard_id: that.data.user[2].guige,
              order_quantity: num,
              address_id: that.data.shop_id,
              order_amount: that.data.all_money,
              order_type: that.data.order_type,
              coupon_id: that.data.coupon_id,
              unit: that.data.unit_all,
              year: that.data.num2,
              receipt_id: that.data.taxes_id,
              receipt_price: taxes1,
              receipt_status: that.data.taxes_select,
              uniacid: app.globalData.uniacid,
              freight: that.data.freight,
              storage: that.data.storage,
              goods_price: goods_price
            },
            method: "post",
            success: function (res) {
              if (res.data.status == 1) {
                var order_number = res.data.data.parts_order_number;
                that.setData({
                  order_number: order_number,
                  order_type: res.data.data.order_type,
                  coupon_type: res.data.data.coupon_type,
                  pmKey: true,
                  balance: res.data.data.balance
                })
              } else {
                wx.showToast({
                  title: res.data.info,
                  icon: 'none',
                })
              }
            }
          });
        } else {
          wx.showToast({
            title: "请选择到店自提地址",
            icon: 'none',
          })
        }
      } else {
        wx.request({
          url: app.globalData.tiltes + 'order_places',
          data: {
            member_id: app.globalData.member_id,
            store_house_id: that.data.sava_id,
            goods_id: that.data.goods_id,
            goods_standard_id: that.data.goods_standard_id,
            order_quantity: num,
            unit: that.data.unit_all,
            address_id: that.data.address_id,
            order_amount: that.data.all_money,
            order_type: that.data.order_type,
            coupon_id: that.data.coupon_id,
            year: that.data.num2,
            receipt_id: that.data.taxes_id,
            receipt_price: taxes1,
            receipt_status: that.data.taxes_select,
            uniacid: app.globalData.uniacid,
            freight: that.data.freight,
            storage: that.data.storage,
            goods_price: goods_price
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              var order_number = res.data.data.parts_order_number;
              that.setData({
                order_number: order_number,
                order_type: res.data.data.order_type,
                coupon_type: res.data.data.coupon_type,
                pmKey: true,
                balance: res.data.data.balance
              })
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            }
          },
        });
      }
    } else {
      wx.showToast({
        title: "库存不足，请修改数量",
        icon: 'none',
      })
    }
  },

  // 购物车支付
  buyrepay: function () {
    var that = this;
    let goods = that.data.goods, goods_num = that.data.goods_num ,is_data = false, goods_price = new Array();
    if (goods_num == undefined) goods_num = that.data.user[3].num;//商品数量
    for(let i = 0; i < goods.length; i ++) {
      let stock;
      if(goods[i].special_info == "" || goods[i].special_info == null) {//库存
        stock = Number(goods[i].goods_info.goods_repertory);
      } else {
        stock = Number(goods[i].special_info.stock);
      }
      // if(goods[i].goods_info.goods_standard == 0) stock = goods[i].goods_info.goods_repertory;
      // else stock = goods[i].goods_info.goods_repertory;

      if(goods_num >= stock) goods[i].is_err = true, is_data = true;
      else goods[i].is_err = false;
      goods_price.push(goods[i].grade_price);
    }
    that.setData({
      goods: goods
    })
    
    if(!is_data) {
      // 下单请求
      let taxes1 = Number(that.data.taxes);
      if (that.data.order_type == "1") {
        wx.request({
          url: app.globalData.tiltes + 'order_place_by_shoppings',
          data: {
            member_id: app.globalData.member_id,
            shopping_id: that.data.user[0].shop_id,
            goods_id: that.data.user[1].good_id,
            goods_standard_id: that.data.user[2].guige,
            order_quantity: that.data.user[3].num,
            address_id: that.data.address_id,
            order_amount: that.data.all_money,
            order_type: that.data.order_type,
            coupon_id: that.data.coupon_id,
            unit: that.data.unit_all,
            year: that.data.num2,
            house_price: that.data.ever_storage,
            receipt_id: that.data.taxes_id,
            receipt_price: taxes1,
            receipt_status: that.data.taxes_select,
            uniacid: app.globalData.uniacid,
            freight: that.data.freight,
            storage: that.data.storage,
            goods_price:goods_price
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              var order_number = res.data.data.parts_order_number;
              that.setData({
                order_number: order_number,
                order_type: res.data.data.order_type,
                coupon_type: res.data.data.coupon_type,
                pmKey: true,
                balance: res.data.data.balance
              })
            } else if(res.data.data.status == 2) {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            }
          },
        });
      } else if (that.data.order_type == "2") {
        wx.request({
          url: app.globalData.tiltes + 'order_place_by_shoppings',
          data: {
            member_id: app.globalData.member_id,
            shopping_id: that.data.user[0].shop_id,
            goods_id: that.data.user[1].good_id,
            goods_standard_id: that.data.user[2].guige,
            order_quantity: that.data.user[3].num,
            address_id: that.data.shop_id,
            order_amount: that.data.all_money,
            order_type: that.data.order_type,
            coupon_id: that.data.coupon_id,
            unit: that.data.unit_all,
            year: that.data.num2,
            house_price: that.data.ever_storage,
            receipt_id: that.data.taxes_id,
            receipt_price: taxes1,
            receipt_status: that.data.taxes_select,
            uniacid: app.globalData.uniacid,
            freight: that.data.freight,
            storage: that.data.storage,
            goods_price:goods_price
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              var order_number = res.data.data.parts_order_number;
              that.setData({
                order_number: order_number,
                order_type: res.data.data.order_type,
                coupon_type: res.data.data.coupon_type,
                pmKey: true,
                balance: res.data.data.balance
              })
            } else if(res.data.data.status == 2) {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            }
          },
        });
      } else {
        wx.request({
          url: app.globalData.tiltes + 'order_place_by_shoppings',
          data: {
            member_id: app.globalData.member_id,
            shopping_id: that.data.shoppinds_id,
            goods_id: that.data.goods_id,
            goods_standard_id: that.data.goods_standard_id,
            order_quantity: that.data.goods_num,
            address_id: that.data.address_id,
            store_house_id: that.data.sava_id,
            order_amount: that.data.all_money,
            order_type: that.data.order_type,
            coupon_id: that.data.coupon_id,
            unit: that.data.unit_all,
            year: that.data.num2,
            house_price: that.data.ever_storage,
            receipt_id: that.data.taxes_id,
            receipt_price: taxes1,
            receipt_status: that.data.taxes_select,
            uniacid: app.globalData.uniacid,
            freight: that.data.freight,
            storage: that.data.storage,
            goods_price:goods_price
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              var order_number = res.data.data.parts_order_number;
              that.setData({
                order_number: order_number,
                order_type: res.data.data.order_type,
                coupon_type: res.data.data.coupon_type,
                pmKey: true,
                balance: res.data.data.balance
              })
            } else if(res.data.data.status == 2) {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'none',
              })
            }
          }
        });
      }
    } else {
      wx.showToast({
        title: "红框商品数量库存不足，请修改",
        icon: 'none',
      })
    }
  },

  go_coupon: function () {
    var that = this;
    that.setData({
      coupon_mark: true,
    })
  },
  checkboxChangess: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'coupon_minute',
      data: {
        coupon_id: e.currentTarget.dataset.id,
      },
      method: "post",
      success: function (res) {
        let range = e.currentTarget.dataset.value;
        res.data.data.money = (res.data.data.money).toFixed(2);
        let for_goods = range.indexOf('1'), insurance_costs = range.indexOf('2'), storage_charges = range.indexOf('3');
        if(range.length == 3) {//使用所有范围
          that.setData({
            coupon_content: "-" + res.data.data.money + "元",
            money: res.data.data.money,
          });
        } else if(range.length == 2){
          if(for_goods > -1 && insurance_costs == -1 && storage_charges > -1) {//没有2
            that.setData({
              coupon_content: "-" + res.data.data.money + "元",
              money: res.data.data.money,
            });
          } else if (for_goods > -1 && insurance_costs > -1 && storage_charges == -1){//没有3
            that.setData({
              coupon_content: "-" + res.data.data.money + "元",
              money: res.data.data.money,
            });
          } else {
            that.setData({
              coupon_content: "-" + res.data.data.money + "元",
              money: res.data.data.money,
            });
          }
        } else {
          if(for_goods > -1 && insurance_costs == -1 && storage_charges == -1) {//只有1
            if (Number(res.data.data.money) <= that.data.goods_money_one) {
              that.setData({
                coupon_content: "-" + res.data.data.money + "元",
                // coupon_type: e.currentTarget.dataset.value,
                money: res.data.data.money,
              });
            } else {
              that.setData({
                coupon_content: "-" + that.data.goods_money_one + "元",
                // coupon_type: e.currentTarget.dataset.value,
                money: that.data.goods_money_one,
              });
            }
          } else if (for_goods == -1 && insurance_costs == -1 && storage_charges > -1) {//只有3
            if (Number(res.data.data.money) <= Number(that.data.storage)) {
              that.setData({
                coupon_content: "-" + res.data.data.money + "元",
                // coupon_type: e.currentTarget.dataset.value,
                money: res.data.data.money,
              });
            } else {
              that.setData({
                coupon_content: "-" + that.data.storage + "元",
                // coupon_type: e.currentTarget.dataset.value,
                money: that.data.storage,
              });
            }
          } else {
            that.setData({
              coupon_content: "-" + res.data.data.money + "元",
              // coupon_type: e.currentTarget.dataset.value,
              money: res.data.data.money,
            });
          }
        }

          
        that.calculate_money();
      },
    });
    that.setData({
      coupon_mark: false,
      coupon_id: parseInt(e.currentTarget.dataset.id),
    })
  },

  checkboxChanges: function (e) {
    var that = this;
    that.setData({
      is_checked: true
    })
  },
  no_use: function (e) {
    var that = this;
    that.setData({
      coupon_mark: false,
      coupon_content: "有可适用优惠券",
      coupon_id: 0,
      money: 0,
    })
    that.calculate_money();
  },
  // 计算商品价格
  god_money: function () {
    var that = this;
    var all_moneys = 0;
    for (var i = 0; i < that.data.goods.length; i++) {
      all_moneys += Number(that.data.goods[i].grade_price) * Number(that.data.goods[i].number);
    }
    that.setData({
      goods_money_one: all_moneys
    })
  },

  // 计算钱
  calculate_money: function () {
    var that = this;
    that.god_money();
    var all_moneys_alls = Number(that.data.goods_money_one) + Number(that.data.storage) + Number(that.data.freight) - Number(that.data.money) + Number(that.data.taxes);
    all_moneys_alls = Number(all_moneys_alls).toFixed(2);
    if (all_moneys_alls > 0) {
      that.setData({
        all_money: all_moneys_alls,
      });
    } else {
      that.setData({
        all_money: 0,
      });
    }
  },

  //  计算仓储费
  money_storages: function () {
    var that = this;
    var storagess = [];
    var ever_storage = [];
    var money_storages = 0;
    for (var j = 0; j < that.data.goods.length; j++) {
      for (var i = 0; i < that.data.warehouse.units.length; i++) {
        if (that.data.goods[j].unit == that.data.warehouse.units[i].unit) {
          storagess.push(that.data.warehouse.units[i].cost);
        }
      }
    }

    that.setData({
      storages: storagess,
    })
    for (var j = 0; j < that.data.goods.length; j++) {
      ever_storage.push(that.data.storages[j] * that.data.goods[j].number * that.data.num1 * 365);
      money_storages += that.data.storages[j] * that.data.goods[j].number;
    }
    var storage1 = (money_storages * that.data.num1 * 365).toFixed(2);
    that.setData({
      storage: storage1,
      ever_storage: ever_storage,
    })
  },
  // 计算运费
  money_freight: function () {
    var that = this;
    var money_freight = 0;
    for (var i = 0; i < that.data.goods.length; i++) {
      for (var j = 0; j < that.data.freight_infor.length; j++) {
        if (that.data.goods[i].goods_info.id == that.data.freight_infor[j].goods_id) {
          money_freight += that.data.freight_infor[j].collect + (that.data.goods[i].number - 1) * that.data.freight_infor[j].markup;
        }
      }
    }
    money_freight = money_freight.toFixed(2);
    that.setData({
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
    let goods = this.data.goods, stock;
    if(goods[0].goods_info.goods_standard == 1) stock = Number(goods[0].special_info.stock);//库存
    else stock = Number(goods[0].goods_info.goods_repertory);//库存
    if (that.data.searchKey <= 0 || that.data.searchKey == '' || that.data.searchKey == null || that.data.searchKey == undefined) {
      goods[0].number = 1;
      that.setData({
        goods: goods
      });
    } else {
      if (goods[0].is_limit == 1 && Number(goods[0].limit_number) > 0) {
        if (that.data.searchKey > Number(goods[0].limit_number)) {
          goods[0].number = goods[0].limit_number;
          that.setData({
            goods: goods
          });
        }
      } else {
        if(that.data.searchKey >= stock) goods[0].number = stock;
        else goods[0].number = that.data.searchKey;
        that.setData({
          goods: goods
        });
      }
    }
    that.invi();
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
    var that = this;
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
    that.invi();
    if (that.data.order_type == "1") {
      that.money_freight();
      that.calculate_money();
    } else if (that.data.order_type == "3") {
      that.money_storages();
      that.calculate_money();
    }else {
      that.calculate_money();
    }
  },
  /* 点击加号 */
  bindPlus: function () {
    var that = this;
    var num = this.data.goods[0].number;
    var goods = this.data.goods;
    let stock, minusStatus;
    if(goods[0].goods_info.goods_standard == 1) stock = Number(goods[0].special_info.stock);//库存
    else stock = Number(goods[0].goods_info.goods_repertory);//库存
    if (goods[0].is_limit == 1 && Number(goods[0].limit_number) > 0) {
      if (num < Number(goods[0].limit_number)) {
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        minusStatus = num < 1 ? 'disabled' : 'normal';

        // 将数值与状态写回  
        goods[0].number = num;
        this.setData({
          goods: goods,
          minusStatus: minusStatus
        });
        that.invi();
        if (that.data.order_type == "1") {
          that.money_freight();
          that.calculate_money();
        } else if (that.data.order_type == "3") {
          that.money_storages();
          that.calculate_money();
        } else {
          that.calculate_money();
        }
      }
    } else {
      if(num >= stock) {
        
        goods[0].number = stock;
      } else {
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        
        // 将数值与状态写回  
        goods[0].number = num;
      }
      minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        goods: goods,
        minusStatus: minusStatus
      });
      that.invi();
      if (that.data.order_type == "1") {
        that.money_freight();
        that.calculate_money();
      } else if (that.data.order_type == "3") {
        that.money_storages();
        that.calculate_money();
      } else {
        that.calculate_money();
      }
    }

  },
  /* 点击减号 */
  bindMinus1: function () {
    var that = this;
    var num1 = this.data.num1;
    // 如果大于1时，才可以减  
    if (num1 > 1) {
      num1--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num1 <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num1: num1,
      minusStatus: minusStatus
    });
    that.money_storages();
    that.calculate_money();
  },
  /* 点击加号 */
  bindPlus1: function () {
    var that = this;
    var num1 = this.data.num1;
    // 不作过多考虑自增1  
    num1++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num1 < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num1: num1,
      minusStatus: minusStatus
    });
    that.money_storages();
    that.calculate_money();
  },

  /* 点击减号 */
  bindMinus2: function () {
    var that = this;
    var num2 = this.data.num2;
    // 如果大于1时，才可以减  
    if (num2 > 1) {
      num2--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num2 <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num2: num2,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus2: function () {
    var that = this;
    var num2 = this.data.num2;
    // 不作过多考虑自增1  
    num2++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num2 < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  

    this.setData({
      num2: num2,
      minusStatus: minusStatus
    });
  },
  check_invoice: function (e) {
    var that = this;
    if (e.detail.value[0] == undefined) {
      that.setData({
        taxes_select: 0,
        taxes: '0.00',
      })
      that.calculate_money();
    } else {
      if (that.data.taxes_id == -1) {
        that.setData({
          taxes_select: 0,
        })
        wx.showToast({
          title: '请添加户名',
          icon: 'none'
        })
      } else {
        that.setData({
          taxes_select: 1,
        })
        that.invi();
        that.calculate_money();
      }
    }
  },

  // 计算发票费用
  invi: function () {
    var that = this;
    var goods_money = 0.00;
    for (var i = 0; i < that.data.goods.length; i++) {
      goods_money += that.data.goods[i].grade_price * that.data.goods[i].number;
    }
    if (that.data.taxes_select == 1) {
      goods_money = (goods_money * that.data.rate / 100).toFixed(2);
    } else {
      goods_money = '0.00';
    }
    that.setData({
      taxes: goods_money,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let user = JSON.parse(options.title);
    that.setData({
      user: user,
    });
    wx.request({
      url: app.globalData.tiltes + 'order_return',
      data: {
        'open_id': app.globalData.gmemberid,
        'goods_id': user[1].good_id,
        'guige': user[2].guige,
        'num': user[3].num,
        'shopping_id': user[0].shop_id,
        'uniacid': app.globalData.uniacid
      },
      method: "post",
      success: function (res) {
        if (res.data.data != undefined && res.data.data != null && res.data.data != '') {
          let delivery_a, delivery_b, authority, goods, kc, hot, qc, cx, authority_new = 0;
          authority = res.data.authority;
          goods = res.data.data;
          for (let o = 0; o < goods.length; o++) {
            let arr = [], bq_arr = [], goods_sign = goods[o].goods_info.goods_sign, bq_dgg = {};
            //多规格的可存
            if (goods[o].special_info != undefined && goods[o].special_info != null && goods[o].special_info != '') {
              if (goods[o].special_info.save == 1) {
                authority_new = 1;
                bq_dgg.kc = 1;
                bq_arr.push(bq_dgg);
              }
            }
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
            res.data.data[o].goods_info.goods_sign = arr;
            res.data.data[o].goods_info.bq_arr = bq_arr;
          }
          if (goods.length > 2) {
            delivery_a = 1;
            delivery_b = 1;
          } else {
            if (res.data.data[0].goods_info.goods_delivery.indexOf("1") > -1) delivery_a = 1;
            if (res.data.data[0].goods_info.goods_delivery.indexOf("2") > -1) delivery_b = 1;
          }
          that.setData({
            goods: res.data.data,
            goods_standby: res.data.data,
            authority: authority,
            authority_new: authority_new,
            delivery_a: delivery_a,
            delivery_b: delivery_b,
            enter_all_id: res.data.enter_all_id
          });
          var all_moneys = 0;
          var unit = [];
          for (var i = 0; i < that.data.goods.length; i++) {
            all_moneys += Number(that.data.goods[i].grade_price) * Number(that.data.goods[i].number);
          }
          for (var j = 0; j < that.data.goods.length; j++) {
            unit.push(that.data.goods[j].unit);
          }
          that.setData({
            all_money: all_moneys,
            num: that.data.goods[0].number,
            unit_all: unit,
          });
          //优惠券
          wx.request({
            url: app.globalData.tiltes + 'coupon_appropriated',
            data: {
              'open_id': app.globalData.gmemberid,
              'goods_id': user[1].good_id,
              'member_grade_name': app.globalData.member_grade_name,
              "money": all_moneys,
              "coupon_type": 1,
              uniacid: app.globalData.uniacid
            },
            method: "post",
            success: function (res) {
              let order = res.data.data;
              var arrs = []
                for (let i in order) {
                    arrs.push(order[i]); //属性
                }
              for(let z = 0; z < arrs.length; z ++) {
                let arr = [];
                if(arrs[z].suit_price2.indexOf('3') > -1 && that.data.authority != 1 && that.data.authority_new != 1) arrs[z].authority = 0;
                else arrs[z].authority = 1;
                for(let i = 0; i < arrs[z].suit_price2.length; i++) {
                  if(arrs[z].suit_price2[i] == 1) arr.push('商品费用');
                  else if (arrs[z].suit_price2[i] == 2) arr.push('保险费用');
                  else arr.push('仓储费用');
                }
                // let end_time = that.formatDate(arrs[z].end_time);
                // let start_time = that.formatDate(arrs[z].start_time);
                arrs[z].suit_price2 = arr;
                // arrs[z].end_time = end_time;
                // arrs[z].start_time = start_time;
              }
              that.setData({
                coupon_show: res.data.status,
                coupon_order: order,
              });
            }
          });
        }
      }
    });
    // 判读从哪个页面进来
    var pages = getCurrentPages();
    var prevpage = pages[pages.length - 2];
    if (prevpage.route == 'pages/goods_detail/goods_detail') {
      that.setData({
        isnum: true,
        from_buy: true,
      });
    } else {
      that.setData({
        isnum: false,
        from_buy: false,
      });
    }
  },
  //格式化时间
  formatDate: function(inputTime) {
    var date = new Date(inputTime * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '/' + m + '/' + d ;
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
    app.judge_phone();
    app.judge_repay();
    var that = this;

    var id = (wx.getStorageSync('id') ? wx.getStorageSync('id') : '');
    var sava_id = (wx.getStorageSync('sava_id') ? wx.getStorageSync('sava_id') : '');
    var shop_id = (wx.getStorageSync('shop_id') ? wx.getStorageSync('shop_id') : '');
    var receipt_id = (wx.getStorageSync('receipt_id') ? wx.getStorageSync('receipt_id') : '');
    wx.removeStorageSync('receipt_id');
    // that.setData({
    //   taxes_id: -1
    // })

    //苹果底部适配
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          fixiPhone: res.model.indexOf('iPhone X') != -1
        })
      }
    })
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
    if (sava_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'tacitly_approve',
        data: {
          uniacid: app.globalData.uniacid
        },
        method: "post",
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
          that.setData({
            warehouse: res.data.data,
            sava_id: sava_id,
          });
          if (that.data.sta == 3) {
            that.money_storages();
            that.calculate_money();
          }
        }
      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'tacitly_adress',
        data: {
          id: sava_id,
          uniacid: app.globalData.uniacid
        },
        method: "post",
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
          that.setData({
            warehouse: res.data.data,
            sava_id: sava_id,
          });
          if (that.data.sta == 3) {
            that.money_storages();
            that.calculate_money();
          }
        }
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
    if (receipt_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'approve_corporation',
        data: {
          member_id: app.globalData.member_id,
        },
        method: "post",
        success: function (res) {
          // console.log(res)
          if (res.data.status == "1") {
            console.log('-----------------默认企业户名-----------------');
            console.log(res.data)
            that.setData({
              taxes_id: res.data.data[0].id,
              company: res.data.data[0].company
            })
            wx.request({
              url: app.globalData.tiltes + 'proportion',
              data: {
                receipt_id: res.data.data[0].id,
                uniacid: app.globalData.uniacid
              },
              method: "post",
              success: function (res) {
                console.log(res)
                that.setData({
                  rate: res.data.data.scale,
                  company: res.data.data.company
                })
              }
            })
          } else {
            wx.request({
              url: app.globalData.tiltes + 'approve_individual',
              data: {
                member_id: app.globalData.member_id,
              },
              method: "post",
              success: function (res) {
                console.log('-----------------默认个人户名-----------------');
                console.log(res);
                if (res.data.status == "1") {
                  that.setData({
                    taxes_id: res.data.data[0].id,
                  })
                  wx.request({
                    url: app.globalData.tiltes + 'proportion',
                    data: {
                      receipt_id: res.data.data[0].id,
                      uniacid: app.globalData.uniacid
                    },
                    method: "post",
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        rate: res.data.data.scale,
                        company: res.data.data.company
                      })
                    }
                  })
                } else {
                  that.setData({
                    taxes_id: -1,
                    rate: 0,
                    company: ''
                  })
                }
              }
            })
          }
        }
      })
    } else {
      that.setData({
        taxes_id: receipt_id
      })
      wx.request({
        url: app.globalData.tiltes + 'proportion',
        data: {
          receipt_id: receipt_id,
          uniacid: app.globalData.uniacid
        },
        method: "post",
        success: function (res) {
          that.setData({
            rate: res.data.data.scale,
            company: res.data.data.company
          })
          if (that.data.taxes_select == 1) {
            that.invi();
          }
        }
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})