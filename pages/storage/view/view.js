// pages/storage/view/view.js
const app = getApp();
// get Data
function getData(_this) {
  // 轮播图
  wx.request({
    url: app.globalData.tiltes + 'crowd_index',
    data: {
      uniacid: app.globalData.uniacid
    },
    method: 'POST',
    success: function (res) {
      console.log(res);
      _this.setData({
        swiperDataList: res.data.data
      })
    },
    fail: function (res) {
      console.log(res);
    }
  });
}
// switch project
function switchProject(option, _this) {
  wx.request({
    url: app.globalData.tiltes + option,
    method: 'POST',
    data: {
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid
    },
    success: function (res) {
      var crowdList = res.data.data;
      var nowTime = (new Date()).getTime();
      if (option == "crowd_now") {
        for (let i = 0; i < crowdList.length; i++) {
          if (crowdList[0].endTime <= nowTime) {
            wx.request({
              url: app.globalData.url + "/crowd_goods_timeout",
              method: "POST",
              data: {
                uniacid: app.globalData.uniacid,
                goods_id: crowdList[i].id
              },
              success: (res) => {
                console.log("成功")
              },
              fail: (e) => {
                console.log("失败")
              }
            })
          }
        }
      }
      _this.setData({
        crowdList: res.data.data,
        Height: 146 * res.data.data.length + 50
      })
    },
    fail: function (res) {
      console.log(res);
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    currentTab: 0,
    scaleImg: false,
    wareHouseFlag: false,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true,
    interval: 3000,
    duration: 500,
    switchProject: true,
    swiperDataList: [],
    crowdList: [],
    Height: 0,
    version: 0,
    switchPop: false, //显示隐藏续费弹窗
    renewYear: 1, //续费年限
    inYear: '', //  入仓日期
    expireYear: '', //  到期日期
    renewExpireYear: '', //  续费到期日期
    oneYearPrice: 0, //仓储一年的价格
    savePrice: 0, // 仓储价格年费
    totalValueNum: 0,  //总价值
    allStorageArr: [], //所有仓库
    storageDataArr: [],  // 显示仓库数据
    fixiPhone: false,
    orderId: null, //订单id
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //余额支付文本框焦点
    order_number: null, //订单号
    isLive: false, //实时视频
    isGiving: false,
    givingNum: 1,
    givingId: null,
    givingNumStr: '',
    conversion: false, //是否换算
    lowestArr: null,
    outNum: 0,  //出仓数量
    showNum: null,
    giftBlessing: '海内送存茶，天涯若比邻', //祝福语
    share_id: null,
    inTemp: 0,
    inHumi: 0,
    goods_image: 'http://zhihuichacang.com/u2020-2.png'
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
              // if (res.data.data.status == 1) {
              //   wx.request({
              //     url: app.globalData.tiltes + 'remainder_pay',
              //     data: {
              //       member_id: app.globalData.member_id,
              //       order_num: _this.data.order_number,
              //       passwords: val,
              //     },
              //     method: "POST",
              //     success: function (res) { },
              //     fail: function () { },
              //     complete: function (res) {
              //       wx.showToast({
              //         icon: "none",
              //         title: res.data.info,
              //         duration: 2000
              //       })
              //     }
              //   });
              // }else {
              //   wx.showToast({
              //     icon: "none",
              //     title: res.data.info,
              //     duration: 2000
              //   })
              // }
            },
            fail: function () {
            },
            complete: function () { }
          });
        } else {
          wx.showToast({
            icon: "none",
            title: "您已取消支付",
          })
        }
      });
  },

  // 确定续费
  bindRenewEvent: function () {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'series_pay',
      method: 'post',
      data: {
        member_id: app.globalData.member_id,
        id: this.data.orderId,
        never_time: this.data.renewExpireYear,
        year_number: this.data.renewYear,
        series_price: 0.01
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode === 200) {
          // 调用微信支付接口
          wx.showActionSheet({
            itemList: ['微信支付'],
            success: function (data) {
              console.log(data)
              if (data.tapIndex === 0) {
                // 微信支付
                _this.wechatPay(res);
              } else {
                // 余额支付
                _this.showInputLayer();
              }
            },
            fail: function (data) {
              console.log('fail', data);
              wx.showToast({
                title: '支付失败!',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else {
          wx.showToast({
            title: '请求参数失败！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        console.log('确定续费:fail', res);
      }
    })
  },
  wechatPay: function (res) {
    var _this = this;
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
          _this.onShow();
          _this.setData({
            switchPop: false
          })
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
  // 计算续费到期日期
  calcRenewTime: function (year) {
    var endTime = this.data.expireYear.split('-');
    endTime[0] = +endTime[0] + year;
    var newEndTime = endTime.join('-');
    this.setData({
      renewExpireYear: newEndTime
    })
  },
  // 减
  minus: function () {
    var year = +this.data.renewYear;
    if (year > 1) {
      year--;
    }
    this.calcRenewTime(year);
    this.setData({
      renewYear: year,
      savePrice: (this.data.oneYearPrice * year).toFixed(2)
    })
  },
  // 加
  plus: function () {
    var year = +this.data.renewYear;
    year++;
    this.calcRenewTime(year);
    this.setData({
      renewYear: year,
      savePrice: (this.data.oneYearPrice * year).toFixed(2)
    })
  },
  // 显示续费弹窗
  showRenewPop: function (e) {
    null != app.globalData.judge_phone && app.globalData.judge_phone || this.isPhone();
    var dataset = e.currentTarget.dataset;
    var renewTime = dataset.outtime.split('-');
    renewTime[0] = +renewTime[0] + 1;
    this.setData({
      switchPop: true,
      inYear: dataset.intime,
      expireYear: dataset.outtime,
      renewExpireYear: renewTime.join('-'),
      oneYearPrice: (dataset.price * 365).toFixed(2),
      savePrice: (dataset.price * 365).toFixed(2),
      orderId: dataset.id
    })
  },
  // 关闭续费弹窗
  closeRenewPop: function () {
    this.setData({
      switchPop: false,
      isGiving: false,
      renewYear: 1
    })
    this.reset();
  },
  giving: function (e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      num = e.currentTarget.dataset.num,
      restatus = e.currentTarget.dataset.restatus,
      remind = e.currentTarget.dataset.remind,
      goods_image = e.currentTarget.dataset.img;
    null != app.globalData.judge_phone && app.globalData.judge_phone || this.isPhone();
    // 出仓
    if (restatus == 1) {
      wx.showToast({
        title: remind,
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.request({
        url: app.globalData.tiltes + 'api/cLickGive',
        method: 'POST',
        data: {
          store_number: num,
          id: id
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            that.setData({
              lowestArr: res.data.data
            })
          }
        },
        fail: function (e) {
          console.error(e)
        }
      })

      that.setData({
        isGiving: true,
        givingId: id,
        goods_image: goods_image
      })
    }
  },
  //获取祝福语
  giftWish: function (e) {
    let giftBlessing = e.detail.value;
    if (giftBlessing == "") {
      giftBlessing = this.data.giftBlessing;
    }
    this.setData({
      giftBlessing: giftBlessing
    })
  },
  // 输入数量
  bindManual: function (e) {
    var that = this, num = Number(e.detail.value), numArr = '';
    // var stock = this.data.minUnitStock;
    var stock = that.data.lowestArr.lowest;
    if (num <= 0) {
      that.setData({
        outNum: 1
      })
    } else if (num <= stock) {
      that.setData({
        outNum: num
      })
    } else {
      wx.showToast({
        title: '您填写的数量超过库存,已为您自动填入最大库存！',
        icon: 'none',
        duration: 1800
      })
      that.setData({
        outNum: stock
      })
    }
    wx.request({
      url: app.globalData.tiltes + 'api/ShowOrderNumber',
      method: 'POST',
      data: {
        id: that.data.givingId,
        lowest: that.data.lowestArr.lowest,
        out_number: that.data.outNum,
        lowest_unit: that.data.lowestArr.lowest_unit
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          for (let i = 0; i < res.data.data.string_number.length; i++) {
            numArr += res.data.data.string_number[i];
          }
          that.getId(res.data.data.string_number);
          that.setData({
            givingNumStr: numArr,
            showNum: res.data.data
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })
    that.setData({
      conversion: true,
    })

  },
  getId: function (string_number) {
    let that = this;
    wx.request({
      url: app.globalData.tiltes + 'api/SharePictureData',
      method: 'POST',
      data: {
        id: that.data.givingId,
        give_number: that.data.outNum,
        string_number: string_number
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            share_id: res.data.data.share_order_id
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })

  },
  // 重置数量
  reset: function () {
    this.setData({
      conversion: false,
      givingNumStr: '',
      // postage: 0,
      giftBlessing: '海内送存茶，天涯若比邻',
      outNum: 0
    })
  },
  confirm: function () {
    if (this.data.outNum < 1) {
      wx.showToast({
        title: '请填入赠送数量',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    let that = this, share_id;
    var shareObj = {
      title: "恭喜发财",
      // path: '/pages/diy/index/index',
      imageUrl: '',
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
          wx.showToast({
            title: '转发失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {

      shareObj.path = 'pages/logs/logs?share_id=' + that.data.share_id + '&shareID=' + app.globalData.member_id;
      shareObj.title = that.data.giftBlessing;
      // 此处可以修改 shareObj 中的内容
      shareObj.imageUrl = that.data.goods_image
    }
    // console.log(shareObj)
    return shareObj;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this, title;
    console.log(app.globalData)
    if (app.globalData.code_id != '') {
      wx.request({
        url: app.globalData.tiltes + 'api/getAccompanyStatus',
        method: 'POST',
        data: {
          member_id: app.globalData.member_id,
          code_id: app.globalData.code_id
        },
        success: function (res) {
          // console.log(res)
          switch (res.data.code) {
            case 1:
              that.showStorageData();
              that.totalValue();
              title = '领取成功';
              break;
            case 200:
              title = '商品已下架';
              break;
            case 201:
              title = '赠茶商品已下架';
              break;
            case 202:
              title = '您已经领取过该商品';
              break;
            case 203:
              title = '领取活动已过期';
              break;
            case 204:
              title = '您不在赠送的会员范围内';
              break;
            case 205:
              title = '商品已赠送完';
              break;
            case 206:
              title = '领取失败';
              break;
            case 207:
              title = '赠茶商品已被领取';
              break;

            default:
              break;
          }
          app.globalData.code_id = "";
          wx.showToast({
            title: title,
            icon: 'none',
            duration: 3000
          })
        },
        fail: function (e) {
          console.error(e)
        }
      })
    }
    if (app.globalData.share_id != '') {
      wx.request({
        url: app.globalData.tiltes + 'api/getShareHouseData',
        method: 'POST',
        data: {
          member_id: app.globalData.member_id,
          share_order_id: app.globalData.share_id
        },
        success: function (res) {
          // console.log(res)
          if (res.data.code == 1) {
            that.showStorageData();
            taht.totalValue();
            app.globalData.share_id = "";
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        },
        fail: function (e) {
          console.error(e)
        }
      })
    }
    getData(this);
    switchProject('crowd_now', this);
    // this.getHumitureNew()
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
    // 续费弹窗 初始化日期
    // wx.setNavigationBarColor({
    //   frontColor: app.globalData.navBarTxtColor,
    //   backgroundColor: app.globalData.navBarBgColor
    // })

  },

  // 选择显示仓库
  selectStorageData: function (e) {
    var _this = this;
    // 折叠所有仓库
    _this.showAllStorage();
    var id = e.currentTarget.dataset.id;
    var order = e.currentTarget.dataset.order;
    wx.request({
      url: app.globalData.tiltes + 'doHouseOrder',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid,
        store_house_id: id
      },
      success: function (res) {
        console.log('选择显示仓库', res)
        res.data.data[0].getArr[0].end_time = app.formatDate(res.data.data[0].getArr[0].end_time);
        app.postData(app.globalData.tiltes + "get_humiture_new", {
          store_id: app.globalData.uniacid,
          house_name: (res.data.data[0].getArr[0].store_name).slice(0, 2)
        }).then(t => {
          // console.log(t)
          if (t.status == "1") {
            res.data.data[0].inTemp = t.data.data.temperature,
              res.data.data[0].inHumi = t.data.data.humidity
          }
          _this.setData({
            storageDataArr: res.data.data
          })
        })
      },
      fail: function () { }
    })
  },
  // 显示仓库数据
  showStorageData: function (e) {
    var _this = this;
    e ? (e.currentTarget.dataset.key ? _this.showAllStorage() : '') : '';
    app.postData(app.globalData.tiltes + "getStoreData", {
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid
    }).then(res => {
      console.log('显示仓库数据：', res)
      res.data.forEach((v, i) => {
        if (res.status == "1") {
          v.getArr.forEach((i, j) => {
            i.end_time = app.formatDate(i.end_time);
            i.pay_time = app.formatDate(i.pay_time);
          })
        }
        app.postData(app.globalData.tiltes + "get_humiture_new", {
          store_id: app.globalData.uniacid,
          house_name: (v.name).slice(0, 2)
        }).then(t => {
          // console.log(t)
          if (t.status == "1") {
            // console.log(t.data.data)
            v.inTemp = t.data.data.temperature,
              v.inHumi = t.data.data.humidity
          }
          _this.setData({
            storageDataArr: res.data
          })
        })
      });
    })
  },
  // 所有仓库
  allStorage: function () {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'getStoreHouse',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function (res) {
        console.log('所有仓库：', res)
        if (res.data.status == 1) {
          _this.setData({
            allStorageArr: res.data.data
          })
        }
      },
      fail: function () { }
    })
  },
  // 总价值
  totalValue: function () {
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'theStoreValue',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function (res) {
        console.log('总价值：', res)
        if (res.data.status == 1) {
          _this.setData({
            totalValueNum: res.data.data.order_real_pay.toFixed(2)
          })
        }
      },
      fail: function () { }
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        checked: 2
      })
    }
    this.reset();
    // 总价值
    this.totalValue();
    // 所有仓库
    this.allStorage();
    // 显示仓库数据
    this.showStorageData();
    //苹果底部适配
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          fixiPhone: res.model.indexOf('iPhone X') != -1
        })
      }
    })
  },

  // 切换 正在众筹 往期众筹
  bindSwitchProject: function () {
    if (this.data.switchProject) {
      // 切换往期众筹
      switchProject('crowd_period', this);
    } else {
      switchProject('crowd_now', this);
    }
    this.setData({
      switchProject: !this.data.switchProject
    })
  },

  clickTab: function (e) {
    // 切换选项卡
    var current = e.target.dataset.current,
      _this = this;
    if (_this.data.currentTab !== current) {
      _this.setData({
        currentTab: current,
        isLive: false
      })
    }
  },
  // 去支持
  support: function (e) {
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/storage/pages/zcDetail/zcDetail?id=' + id,
      success: function () {
        console.log('跳转成功');
      },
      fail: function () {
        console.log('跳转失败');
      }
    })
  },

  swiperTab: function (e) {
    // 滑动切换选项卡
    var current = e.detail.current;
    this.setData({
      currentTab: current,
      isLive: false
    })
  },

  showAllStorage: function () {
    // 全部仓储
    this.setData({
      wareHouseFlag: !this.data.wareHouseFlag
    })
  },

  checkRealTimeData: function (e) {
    null != app.globalData.judge_phone && app.globalData.judge_phone || this.isPhone();
    var name = e.currentTarget.dataset.name;
    // 查看仓库实时数据（温度湿度）
    wx.navigateTo({
      url: '/storage/pages/realtime_data/realtime_data?store_name=' + name,
      success: function () {
        console.log('跳转成功');
      },
      fail: function () {
        console.log('跳转失败');
      }
    })
  },

  toStockDetail: function (e) {
    null != app.globalData.judge_phone && app.globalData.judge_phone || this.isPhone();
    console.log(e)
    var id = e.target.dataset.id, goods_id = e.target.dataset.goodsid, status = e.target.dataset.status;
    if (status == 0) {
      // 仓库详情
      wx.navigateTo({
        url: '/storage/pages/stock_detail/stock_detail?id=' + id,
        success: function () {
          console.log('跳转成功');
        },
        fail: function () {
          console.log('跳转失败');
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?title=' + goods_id,
        success: function () {
          console.log('跳转成功');
        },
        fail: function () {
          console.log('跳转失败');
        }
      })
    }
  },
  //实时视频显示
  showLive: function (e) {
    // console.log(e.currentTarget.dataset.id)
    let isLive, id = e.currentTarget.dataset.id, live_id;
    if (!this.data.isLive) {
      isLive = true;
      live_id = 'id_' + e.currentTarget.dataset.id;
    } else isLive = false;
    this.setData({
      isLive: isLive,
      live_id: live_id
    })
  },
  getHumitureNew: function () {
    var a = this;
    wx.request({
      url: app.globalData.tiltes + "get_humiture_new",
      method: "POST",
      data: {
        store_id: app.globalData.uniacid
      },
      success: function (t) {
        "1" == t.data.status && a.setData({
          inTemp: t.data.data.temperature.toFixed(2),
          inHumi: t.data.data.humidity.toFixed(2)
        });
      }
    });
  },
  outOfStock: function (e) {
    var id = e.currentTarget.dataset.id, restatus = e.currentTarget.dataset.restatus, remind = e.currentTarget.dataset.remind, friend_status = e.currentTarget.dataset.friend;
    null != app.globalData.judge_phone && app.globalData.judge_phone || this.isPhone();
    // 出仓
    if (restatus == 1) {
      wx.showToast({
        title: remind,
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: '/storage/pages/out_of_warehouse/out_of_warehouse?id=' + id + '&isFriend=' + friend_status
      })
    }
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link, e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  onReady: function () {
    var that = this;


  },
  isPhone: function () {
    wx.navigateTo({
      url: "/pages/logs/logs?isCha=1"
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onReady();
    this.allStorage();
    this.showStorageData();
    this.totalValue();
    wx.stopPullDownRefresh();
    this.setData({
      isLive: false
    })
  },
  onHide() {
    // console.log('onLaunch监听小程序隐藏');
    this.setData({
      isLive: false,
      isGiving: false
    })
  }

})
