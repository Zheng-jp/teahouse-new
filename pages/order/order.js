// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    tab: '1',
    static: '5',
    order: [],
    url: app.globalData.img_url,
    member_grade_img: null,
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    order_number: null, //付款点击的订单编号
    pmKey: false, // switch支付弹窗
    balance: 0.00, //余额
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
                url: app.globalData.tiltes + 'balance_payment',
                data: {
                  member_id: app.globalData.member_id,
                  order_num: that.data.order_number,
                  passwords: val,
                },
                method: "post",
                success: function(res) {
                  if (res.data.status == "1") {
                    wx.request({
                      url: app.globalData.tiltes + 'ios_api_order_all',
                      data: {
                        open_id: app.globalData.gmemberid,
                      },
                      method: "post",
                      success: function(res) {
                        that.setData({
                          order: res.data.data,
                          tab: '1'
                        })
                      },
                      complete: function() {
                        wx.hideLoading();
                      }
                    });
                  }
                },
                complete: function(res) {
                  wx.showToast({
                    icon: "none",
                    title: res.data.info,
                    duration: 3000
                  })
                }
              });
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 3000
              })
            }
          },
          fail: function() {},
          complete: function() {}
        });
      } else {
        wx.showToast({
          icon: "none",
          title: "您已取消支付",
          duration: 3000
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
      url: '../forget_password/forget_password'
    })
  },
  // 弹窗
  // 删除订单
  delete_order: function(e) {
    var that = this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    for (var i = 0; i < orderItems.length; ++i) {
      if (orderItems[i].parts_order_number == indexs) {
        orderItems.splice(i, 1);
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_del',
          data: {
            open_id: app.globalData.gmemberid,
            parts_order_number: indexs
          },
          method: "post",
          success: function(res) {
            wx.showToast({
              title: '删除成功',
              icon: 'none',
              duration: 3000
            })
            that.setData({
              order: orderItems
            });
          },
        });
      }
    }
  },
  tab_click: function(e) {
    var that = this;
    this.setData({
      tab: e.currentTarget.dataset.current
    });
    if (e.currentTarget.dataset.current == 1) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_all',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data
          })
        },
        complete: function() {
          wx.hideLoading()
        }
      });
    } else if (e.currentTarget.dataset.current == 2) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_pay',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data
          })
        },
        complete: function() {
          wx.hideLoading()
        }
      });
    } else if (e.currentTarget.dataset.current == 3) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_send',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data
          })
        },
        complete: function() {
          wx.hideLoading()
        }
      });
    } else if (e.currentTarget.dataset.current == 4) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_deliver',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data
          })
        },
        complete: function() {
          wx.hideLoading()
        }

      });
    } else if (e.currentTarget.dataset.current == 5) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_evaluate',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data
          })
        },
        complete: function() {
          wx.hideLoading()
        }
      });
    }
  },
  // 取消订单
  cancel_order: function(e) {
    var that = this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success: function(res) {
        if (res.confirm) {
          for (var i = 0; i < orderItems.length; i++) {
            if (orderItems[i].parts_order_number == indexs) {
              orderItems.splice(i, 1);
              wx.request({
                url: app.globalData.tiltes + 'ios_api_order_no_pay_cancel',
                data: {
                  open_id: app.globalData.gmemberid,
                  parts_order_number: indexs,
                  cancel_order_description: '取消'
                },
                method: "post",
                success: function(res) {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'none',
                    duration: 3000
                  })
                  that.setData({
                    order: orderItems
                  });
                },
                complete: function() {
                  // wx.hideLoading()
                }
              });
            }
          }
        }
      }
    })
  },
  // 确认收货
  confirm_receipt: function(e) {
    var that = this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    for (var i = 0; i < orderItems.length; ++i) {
      if (orderItems[i].parts_order_number == indexs) {
        orderItems.splice(i, 1);
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_collect_goods',
          data: {
            open_id: app.globalData.gmemberid,
            parts_order_number: indexs
          },
          method: "post",
          success: function(res) {
            wx.showToast({
              title: '收货成功',
              icon: 'none',
              duration: 3000
            })
            that.setData({
              order: orderItems
            });
          },
        });
      }
    }
  },
  // // 追加评价
  // go_evaluation: function(event) {
  //   wx.navigateTo({
  //     url: '../evaluation/evaluation?title=' + event.currentTarget.dataset.id
  //   })
  // },
   // 追加评价
   go_evaluation: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../evaluation/evaluation?title=' + event.currentTarget.dataset.id,
      success: function (res) {
      
      },
      fail: function () {
       
      },
    })
  },
// 申请售后
  go_apply_after_sales: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.id;
    console.log(item)
    wx.request({
      url: app.globalData.tiltes + 'after_sale_is_set',
      data: {
        order_id:item,
      },
      method: "post",
      success: function (res) {
       if(res.data.status=="1"){
         wx.navigateTo({
          url: '../apply_after_sales/apply_after_sales?title=' + event.currentTarget.dataset.id,
          success: function (res) {
          
          },
          fail: function () {
          
          },
        })
       }
      },
      fail: function () {
      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon:'none',
        });
      }
  
    });
    
  
  },
  go_order_detail: function(event) {
    var id = event.currentTarget.dataset.id;
    var status = event.currentTarget.dataset.status;
    wx.navigateTo({
      url: '../order_detail/order_detail?title=' + id + "&status=" + status,
    })
  },

  // 微信支付
  wxpay: function(){
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
            success: function(){
              wx.showToast({
                title: '支付成功',
                icon: success,
                duration: 1500
              })
              setTimeout(function() {
                that.onShow();
              }, 1600)
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
  },

  // 选择支付方式
  selectMethod: function(e){
    var tapindex = +e.currentTarget.dataset.tapindex;
    this.setData({
      pmKey: false
    })
    if(tapindex == 0){
      this.showInputLayer();
    }else{
      this.wxpay();
    }
  },

  // 付款
  repay: function(e) {
    var that = this;
    var indexs = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.tiltes + 'get_member_banlance',
      data: {
        member_id: app.globalData.member_id
      },
      success: function(res){
        console.log(res)
        that.setData({
          order_number: indexs,
          pmKey: true,
          balance: res.data.data.balance
        })
      }
    })
  },
  // 提醒
  tip_order: function(e) {
    var that = this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    wx.request({
      url: app.globalData.tiltes + 'option_add',
      data: {
        order_num: indexs,
      },
      method: "post",
      success: function(res) {
        wx.showToast({
          title: '提醒成功',
          icon: 'none',
          duration: 3000
        })
      },
      fail: function() {

      },
      complete: function() {
        // wx.hideLoading()
      }
    });
  },
  //入仓跳转茶仓
  to_warehouse: function(e) {
    wx.reLaunch({
      url: '../storage/view/view'
    })
  },
  //查看物流
  to_logistics: function(e) {
    var that = this;
    var item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../logistics/logistics?title=' + item
    })
  },
  // 追加评价
  go: function(event) {
    var item = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: item + '?title=' + 0 + '&version=' + this.data.version
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this,
      version;
    if (options.version == undefined || options.version == null) version = options.enter_all_id;
    else if (options.enter_all_id == undefined || options.enter_all_id == null) version = options.version;
    that.setData({
      version: version
    })
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: height
    });
    var member_grade_img = app.globalData.member_grade_img;
    this.setData({
      member_grade_img: member_grade_img
    });
    var title = options.title;
    if (title == 0) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_all',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data,
            tab: '1'
          })
        },
        fail: function() {

        },
        complete: function() {
          wx.hideLoading()
        }

      });
    } else if (title == 1) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_pay',
        data: {
          open_id: app.globalData.gmemberid,
          tab: '2'
        },
        method: "post",
        success: function(res) {

          that.setData({
            order: res.data.data
          })
        },
        fail: function() {

        },
        complete: function() {
          wx.hideLoading()
        }

      });
    } else if (title == 2) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_send',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {

          that.setData({
            order: res.data.data,
            tab: '3'
          })
        },
        fail: function() {

        },
        complete: function() {
          wx.hideLoading()
        }

      });
    } else if (title == 3) {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_deliver',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {

          that.setData({
            order: res.data.data,
            tab: '4'
          })
        },
        fail: function() {

        },
        complete: function() {
          wx.hideLoading()
        }

      });
    } else {
      wx.request({
        url: app.globalData.tiltes + 'ios_api_order_wait_evaluate',
        data: {
          open_id: app.globalData.gmemberid,
        },
        method: "post",
        success: function(res) {
          that.setData({
            order: res.data.data,
            tab: '5'
          })
        },
        fail: function() {

        },
        complete: function() {
          wx.hideLoading()
        }

      });
    }

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