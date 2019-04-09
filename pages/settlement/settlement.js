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
    freight: 0,//运费
    freight_infor:[],
    taxes: 0,//税费
    storage: 0,// 存储费
    insurance: 0,//保险费
    invoice: 0,//发票费
    storages: [],//存储费管理
    shop_address: '',
    is_checked: true,
    unit_all:[],//报价单位


  },
  // 弹窗
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  // 弹窗
  radioChange: function (e) {
    var that = this;
    if (e.detail.value == "选择直邮") {
      that.setData({
        selected: true,
        selected1: false,
        selected2: false,
        order_type: 1,
        storage:0,
      })
      that.money_freight();
    }
    else if (e.detail.value == "到店自提") {
      that.setData({
        selected: false,
        selected1: true,
        selected2: false,
        order_type: 2,
        storage:0,
        freight:0,
      })
    }
    else {
     
      that.setData({
        selected: false,
        selected1: false,
        selected2: true,
        order_type: 3,
        freight:0,
      })
      that.money_storages();

    }
    that.calculate_money();

  },
  go_direct_mail_address: function (e) {
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
  go_invoice_add: function (e) {
    wx.navigateTo({
      url: '/invoice/pages/invoice_add/invoice_add',
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
    var that = this;
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
            method: "post",
            // header: {
            //   "Content-Type": "json" // 默认值

            // },
            success: function (res) {
              if (res.data.data.status == 1) {
                wx.request({
                  url: app.globalData.tiltes + 'balance_payment',
                  data: {
                    member_id: app.globalData.member_id,
                    order_num: that.data.order_number,
                    passwords: val,
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
                      icon: "none",
                      title: res.data.info,
                    })

                  }

                });
              }
              else {
                wx.showToast({
                  icon: "none",
                  title: res.data.info,
                })

              }
            },
            fail: function () {
            },
            complete: function () {
            }

          });
        }
        else {
          wx.showToast({
            icon: "none",
            title: "您已取消支付",
          })
        }
        wx.navigateTo({
          url: '../order/order?title=' + 0,
          success: function (res) {

          },
          fail: function () {

          },
          complete: function () {

          }

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
      url: '../forget_password/forget_password',
      success: function (res) {

      },
      fail: function () {

      },
      complete: function () {

      }


    })
  },
  // 弹窗
  // 立即支付
  repay: function () {
    var that = this;
    var num = new Array();
    num = [that.data.num];
    // wx.request({
    //   url: app.globalData.tiltes + 'order_place',
    //   data: {
    //     open_id: app.globalData.gmemberid,
    //     goods_id: that.data.user[1].good_id,
    //     goods_standard_id: that.data.user[2].guige,
    //     order_quantity: that.data.user[3].num,
    //     address_id: that.data.address_id,
    //     order_amount: that.data.all_money,
    //     order_type: that.data.order_type,
    //     coupon_id: that.data.coupon_id
        
    //   },
    //   method: "post",

    //   // header: {
    //   //   "Content-Type": "json" // 默认值

    //   // },
    //   success: function (res) {
    //     var order_number = res.data.data.parts_order_number;
    //     that.setData({
    //       order_number: order_number,
    //     })
    //     wx.showActionSheet({
    //       itemList: ['账户支付', '微信支付',],
    //       success: function (res) {

    //         // 账户支付
    //         if (res.tapIndex == 0) {
    //           that.showInputLayer();
    //         }
    //         else if (res.tapIndex == 1) {
    //           wx.request({
    //             // url: app.globalData.tiltes + 'wxpay',
    //             url: app.globalData.tiltes + 'wx_order_index',
    //             data: {
    //               member_id: app.globalData.member_id,
    //               order_number: order_number,

    //             },
    //             dataTypr: 'json',
    //             method: "post",
    //             // header: {
    //             //   "Content-Type": "application/json" // 默认值
    //             // },
    //             success: function (res) {
    //               var result = res;

    //               if (result) {
    //                 wx.requestPayment({
    //                   timeStamp: String(result.data.timeStamp),
    //                   nonceStr: result.data.nonceStr,
    //                   package: result.data.package,
    //                   signType: result.data.signType,
    //                   paySign: result.data.paySign,
    //                   'success': function (successret) {
    //                     console.log('支付成功');
    //                     wx.navigateTo({
    //                       url: '../order/order?title=' + 0,
    //                       success: function (res) {

    //                       },
    //                       fail: function () {

    //                       },
    //                       complete: function () {

    //                       }


    //                     })

    //                   },
    //                   'fail': function (res) {

    //                   }
    //                 })
    //               }
    //             },
    //             fail: function () {

    //             },
    //             complete: function () {
    //               wx.hideLoading()
    //             }
    //           });
    //         }

    //       },
    //       fail: function (res) {
    //         wx.navigateTo({
    //           url: '../order/order?title=' + 0,
    //           success: function (res) {

    //           },
    //           fail: function () {

    //           },
    //           complete: function () {

    //           }


    //         })
    //       }
    //     })
    //   },
    //   fail: function () {

    //   },
    //   complete: function () {
    //   }

    // });
    if(that.data.order_type=="1"){
      wx.request({
        url: app.globalData.tiltes + 'order_places',
        data: {
          member_id: app.globalData.member_id,
          goods_id: that.data.user[1].good_id,
          goods_standard_id: that.data.user[2].guige,
          order_quantity: that.data.user[3].num,
          address_id: that.data.address_id,
          order_amount: that.data.all_money,
          order_type: that.data.order_type,
          coupon_id: that.data.coupon_id,
          unit:that.data.unit_all,
          year:that.data.num2,
          
        },
        method: "post",
  
        // header: {
        //   "Content-Type": "json" // 默认值
  
        // },
        success: function (res) {
          var order_number = res.data.data.parts_order_number;
          that.setData({
            order_number: order_number,
          })
          wx.showActionSheet({
            itemList: ['账户支付', '微信支付',],
            success: function (res) {
  
              // 账户支付
              if (res.tapIndex == 0) {
                that.showInputLayer();
              }
              else if (res.tapIndex == 1) {
                wx.request({
                  // url: app.globalData.tiltes + 'wxpay',
                  url: app.globalData.tiltes + 'wx_order_index',
                  data: {
                    member_id: app.globalData.member_id,
                    order_number: order_number,
  
                  },
                  dataTypr: 'json',
                  method: "post",
                  // header: {
                  //   "Content-Type": "application/json" // 默认值
                  // },
                  success: function (res) {
                    var result = res;
  
                    if (result) {
                      wx.requestPayment({
                        timeStamp: String(result.data.timeStamp),
                        nonceStr: result.data.nonceStr,
                        package: result.data.package,
                        signType: result.data.signType,
                        paySign: result.data.paySign,
                        'success': function (successret) {
                          console.log('支付成功');
                          wx.navigateTo({
                            url: '../order/order?title=' + 0,
                            success: function (res) {
  
                            },
                            fail: function () {
  
                            },
                            complete: function () {
  
                            }
  
  
                          })
  
                        },
                        'fail': function (res) {
  
                        }
                      })
                    }
                  },
                  fail: function () {
  
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                });
              }
  
            },
            fail: function (res) {
              wx.navigateTo({
                url: '../order/order?title=' + 0,
                success: function (res) {
  
                },
                fail: function () {
  
                },
                complete: function () {
  
                }
  
  
              })
            }
          })
        },
        fail: function () {
  
        },
        complete: function () {
        }
  
      });
    }
    else if(that.data.order_type=="2"){
      wx.request({
        url: app.globalData.tiltes + 'order_places',
        data: {
          member_id: app.globalData.member_id,
          goods_id: that.data.user[1].good_id,
          goods_standard_id: that.data.user[2].guige,
          order_quantity: that.data.user[3].num,
          address_id: that.data.shop_id,
          order_amount: that.data.all_money,
          order_type: that.data.order_type,
          coupon_id: that.data.coupon_id,
          unit:that.data.unit_all,
           year:that.data.num2,
          
        },
        method: "post",
  
        // header: {
        //   "Content-Type": "json" // 默认值
  
        // },
        success: function (res) {
          var order_number = res.data.data.parts_order_number;
          that.setData({
            order_number: order_number,
          })
          wx.showActionSheet({
            itemList: ['账户支付', '微信支付',],
            success: function (res) {
  
              // 账户支付
              if (res.tapIndex == 0) {
                that.showInputLayer();
              }
              else if (res.tapIndex == 1) {
                wx.request({
                  // url: app.globalData.tiltes + 'wxpay',
                  url: app.globalData.tiltes + 'wx_order_index',
                  data: {
                    member_id: app.globalData.member_id,
                    order_number: order_number,
  
                  },
                  dataTypr: 'json',
                  method: "post",
                  // header: {
                  //   "Content-Type": "application/json" // 默认值
                  // },
                  success: function (res) {
                    var result = res;
  
                    if (result) {
                      wx.requestPayment({
                        timeStamp: String(result.data.timeStamp),
                        nonceStr: result.data.nonceStr,
                        package: result.data.package,
                        signType: result.data.signType,
                        paySign: result.data.paySign,
                        'success': function (successret) {
                          console.log('支付成功');
                          wx.navigateTo({
                            url: '../order/order?title=' + 0,
                            success: function (res) {
  
                            },
                            fail: function () {
  
                            },
                            complete: function () {
  
                            }
  
  
                          })
  
                        },
                        'fail': function (res) {
  
                        }
                      })
                    }
                  },
                  fail: function () {
  
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                });
              }
  
            },
            fail: function (res) {
              wx.navigateTo({
                url: '../order/order?title=' + 0,
                success: function (res) {
  
                },
                fail: function () {
  
                },
                complete: function () {
  
                }
  
  
              })
            }
          })
        },
        fail: function () {
  
        },
        complete: function () {
        }
  
      });
    }
    else{
      wx.request({
        url: app.globalData.tiltes + 'order_places',
        data: {
          member_id: app.globalData.member_id,
          goods_id: that.data.user[1].good_id,
          goods_standard_id: that.data.user[2].guige,
          order_quantity: that.data.user[3].num,
          address_id: that.data.sava_id,
          order_amount: that.data.all_money,
          order_type: that.data.order_type,
          coupon_id: that.data.coupon_id,
          unit:that.data.unit_all,
          year:that.data.num2,
          
        },
        method: "post",
  
        // header: {
        //   "Content-Type": "json" // 默认值
  
        // },
        success: function (res) {
          var order_number = res.data.data.parts_order_number;
          that.setData({
            order_number: order_number,
          })
          wx.showActionSheet({
            itemList: ['账户支付', '微信支付',],
            success: function (res) {
  
              // 账户支付
              if (res.tapIndex == 0) {
                that.showInputLayer();
              }
              else if (res.tapIndex == 1) {
                wx.request({
                  // url: app.globalData.tiltes + 'wxpay',
                  url: app.globalData.tiltes + 'wx_order_index',
                  data: {
                    member_id: app.globalData.member_id,
                    order_number: order_number,
  
                  },
                  dataTypr: 'json',
                  method: "post",
                  // header: {
                  //   "Content-Type": "application/json" // 默认值
                  // },
                  success: function (res) {
                    var result = res;
  
                    if (result) {
                      wx.requestPayment({
                        timeStamp: String(result.data.timeStamp),
                        nonceStr: result.data.nonceStr,
                        package: result.data.package,
                        signType: result.data.signType,
                        paySign: result.data.paySign,
                        'success': function (successret) {
                          console.log('支付成功');
                          wx.navigateTo({
                            url: '../order/order?title=' + 0,
                            success: function (res) {
  
                            },
                            fail: function () {
  
                            },
                            complete: function () {
  
                            }
  
  
                          })
  
                        },
                        'fail': function (res) {
  
                        }
                      })
                    }
                  },
                  fail: function () {
  
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                });
              }
  
            },
            fail: function (res) {
              wx.navigateTo({
                url: '../order/order?title=' + 0,
                success: function (res) {
  
                },
                fail: function () {
  
                },
                complete: function () {
  
                }
  
  
              })
            }
          })
        },
        fail: function () {
  
        },
        complete: function () {
        }
  
      });
    }
   

  },
  // 购物车支付
  buyrepay: function () {
    var that = this;
    // 下单请求
    wx.request({
      url: app.globalData.tiltes + 'order_place_by_shopping',
      data: {
        open_id: app.globalData.gmemberid,
        shopping_id: that.data.user[0].shop_id,
        goods_id: that.data.user[1].good_id,
        goods_standard_id: that.data.user[2].guige,
        order_quantity: that.data.user[3].num,
        address_id: that.data.address_id,
        order_amount: that.data.all_money,
        order_type: that.data.order_type,
        coupon_id: that.data.coupon_id

      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        var order_number = res.data.data.parts_order_number;
        that.setData({
          order_number: order_number,
        })
        wx.showActionSheet({
          itemList: ['账户支付', '微信支付',],
          success: function (res) {
            // 账户支付
            if (res.tapIndex == 0) {

              that.showInputLayer();
            }
            else if (res.tapIndex == 1) {
              wx.request({
                url: app.globalData.tiltes + 'wx_order_index',
                data: {
                  member_id: app.globalData.member_id,
                  order_number: order_number
                },
                dataTypr: 'json',
                method: "post",
                // header: {
                //   "Content-Type": "application/json" // 默认值
                // },
                success: function (res) {
                  var result = res;

                  if (result) {
                    wx.requestPayment({
                      timeStamp: String(result.data.timeStamp),
                      nonceStr: result.data.nonceStr,
                      package: result.data.package,
                      signType: result.data.signType,
                      paySign: result.data.paySign,
                      'success': function (successret) {
                        wx.navigateTo({
                          url: '../order/order?title=' + 0,
                          success: function (res) {

                          },
                          fail: function () {

                          },
                          complete: function () {

                          }


                        })

                      },
                      'fail': function (res) {

                      }
                    })
                  }
                },
                fail: function () {

                },
                complete: function () {
                  wx.hideLoading()
                }
              });
            }


          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      },
      fail: function () {

      },
      complete: function () {
      }

    });

  },

  go_coupon: function () {
    var that = this;
    that.setData({
      coupon_mark: true,
    })

  },
  checkboxChange: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'coupon_minute',
      data: {
        coupon_id: e.detail.value[0],
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        that.setData({
          coupon_content: "-" + res.data.data.money,
          money: res.data.data.money
        });
        that.calculate_money();
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    that.setData({
      coupon_mark: false,
      coupon_id: parseInt(e.detail.value[0]),
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
  // 计算钱
  calculate_money: function () {
    var that = this;
    var all_moneys = 0;
    for (var i = 0; i < that.data.goods.length; i++) {
      all_moneys += that.data.goods[i].grade_price * that.data.goods[i].number;
    }
    var all_moneys_alls=all_moneys+that.data.storage+that.data.freight-that.data.money
    if (all_moneys_alls> 0) {
      that.setData({
        all_money: all_moneys_alls,
      });
      that.setData({
        all_money: that.data.all_money,
      });
    }
    else {
      that.setData({
        all_money: 0,
      });
    }

  },
  //  计算仓储费
  money_storages: function () {
    var that = this;
    var storagess = [];
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
      for (var i = 0; i < that.data.storages.length; i++) {
        money_storages += that.data.storages[i] * that.data.goods[j].number;
      }
    }
    console.log(money_storages);
    that.setData({
      storage: money_storages * that.data.num1 * 365,
    })
    that.setData({
      storage: that.data.storage,
    })
  },
  // 计算运费
  money_freight: function () {
    var that = this;
    var money_freight=0;
    for(var i=0;i<that.data.goods.length;i++){
      for(var j=0;j<that.data.freight_infor.length;j++){
         if(that.data.goods[i].goods_info.id==that.data.freight_infor[j].goods_id){
            money_freight+=that.data.freight_infor[j].collect+(that.data.goods[i].number-1)*that.data.freight_infor[j].markup;
         }
      }
    }
     that.setData({
      freight:money_freight,
     })
  },

  /* 点击减号 */
  bindMinus: function () {
    var that = this;
    var num = this.data.goods[0].number;
    var goods = this.data.goods;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    goods[0].number = num;
    this.setData({
      goods: goods,
      minusStatus: minusStatus
    });
    if(that.data.order_type=="1"){
      that.money_freight();
      that.calculate_money();
    }
    else if(that.data.order_type=="3"){
      that.money_storages();
      that.calculate_money();
    }
   
  },
  /* 点击加号 */
  bindPlus: function () {
    var that = this;
    var num = this.data.goods[0].number;
    var goods = this.data.goods;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    goods[0].number = num;
    this.setData({
      goods: goods,
      minusStatus: minusStatus
    });
    if(that.data.order_type=="1"){
      that.money_freight();
      that.calculate_money();
    }
    else if(that.data.order_type=="3"){
      that.money_storages();
      that.calculate_money();
    }
    else{
      that.calculate_money();
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
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {

        that.setData({
          goods: res.data.data,
        });
        var all_moneys = 0;
        var  unit=[];
        for (var i = 0; i < that.data.goods.length; i++) {
          all_moneys += that.data.goods[i].grade_price * that.data.goods[i].number;
        }
        for(var j = 0; j < that.data.goods.length; j++){
         
          unit.push(that.data.goods[j].unit);   
        }
        that.setData({
          all_money: all_moneys,
          num: that.data.goods[0].number,
          unit_all:unit,
        });

        wx.request({
          url: app.globalData.tiltes + 'coupon_appropriated',
          data: {
            'open_id': app.globalData.gmemberid,
            'goods_id': user[1].good_id,
            'member_grade_name': app.globalData.member_grade_name,
            "money": all_moneys
          },
          method: "post",
          // header: {
          //   "Content-Type": "json" // 默认值

          // },
          success: function (res) {
            that.setData({
              coupon_show: res.data.status,
              coupon_order: res.data.data,
            });


          },
          fail: function () {

          },
          complete: function () {
          }

        });


      },
      fail: function () {

      },
      complete: function () {
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
    }
    else {
      that.setData({
        isnum: false,
        from_buy: false,
      });
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
    var that = this;
    var id = wx.getStorageSync('id');
    var sava_id = wx.getStorageSync('sava_id');
    var shop_id = wx.getStorageSync('shop_id');
   
    if (id =='') {
      wx.request({
        url: app.globalData.tiltes + 'member_default_address_return',
        data: {
          open_id: app.globalData.gmemberid,
          address_id: ''
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
              address_id:address_id,
            });

          }
          else if (res.data.status == 0) {
            that.setData({
              selected: false,
            });

          }
          wx.request({
            url: app.globalData.tiltes + 'transportation',
            data: {
              'goods_id': that.data.user[1].good_id,
              'goods_standard_id': that.data.user[2].guige,
              'are':that.data.address_0
            },
            method: "post",
            // header: {
            //   "Content-Type": "json" // 默认值
      
            // },
            success: function (res) {
               that.setData({
                freight_infor:res.data.data,
               })
               that.money_freight();
               that.calculate_money();
            },
            fail: function () {
      
            },
            complete: function () {
            }
      
          });


        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }
    else {
      wx.request({
        url: app.globalData.tiltes + 'member_address_edit_information',
        data: {
          id: id,
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
            address_id:address_id,
          });
          wx.request({
            url: app.globalData.tiltes + 'transportation',
            data: {
              'goods_id': that.data.user[1].good_id,
              'goods_standard_id': that.data.user[2].guige,
              'are':that.data.address_0
            },
            method: "post",
            // header: {
            //   "Content-Type": "json" // 默认值
      
            // },
            success: function (res) {
               that.setData({
                freight_infor:res.data.data,
               })
               that.money_freight();
               that.calculate_money();
            },
            fail: function () {
      
            },
            complete: function () {
            }
      
          });
        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }

    if (sava_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'tacitly_approve',
        data: {

        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
            sava_id:sava_id,
          });


        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }
    else {
      wx.request({

        url: app.globalData.tiltes + 'tacitly_adress',
        data: {
          id: sava_id
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
            sava_id:sava_id,
          });


        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }
    if (shop_id == '') {
      wx.request({
        url: app.globalData.tiltes + 'approve_address',
        data: {

        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
            shop_id:shop_id,
          });


        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }
    else {
      wx.request({
        url: app.globalData.tiltes + 'approve_detailed',
        data: {
          id: shop_id
        },
        method: "post",
        // header: {
        //   "Content-Type": "json" // 默认值

        // },
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
            shop_id:shop_id,
          });


        },
        fail: function () {

        },
        complete: function () {
        }

      });
    }
   
    
    
   

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