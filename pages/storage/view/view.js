// pages/storage/view/view.js
const app = getApp();
// get Data
function getData(_this) {
  // 轮播图
  wx.request({
    url: app.globalData.tiltes + 'crowd_index',
    data:{
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
      console.log(res);
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
  },
  // 确定续费
  bindRenewEvent: function(){
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'series_pay',
      method: 'post',
      data: {
        member_id: app.globalData.member_id,
        id: this.data.orderId,
        never_time: this.data.renewExpireYear,
        year_number: this.data.renewYear,
        series_price: this.data.savePrice
      },
      success: function(res){
        console.log(res);
        if(res.statusCode === 200){
          // 调用微信支付接口
          wx.showActionSheet({
            itemList: ['微信支付'],
            success: function(data){
              console.log(data)
              if(data.tapIndex === 0){
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function(res){
                    wx.showToast({
                      title: '支付成功!',
                      icon: 'none',
                      duration: 1500
                    })
                    setTimeout(function(){
                      _this.onShow();
                      _this.setData({
                        switchPop: false
                      })
                    }, 1600)
                  },
                  fail: function(res){
                    wx.showToast({
                      title: '支付失败!',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              }
            },
            fail: function(data){
              console.log('fail', data);
              wx.showToast({
                title: '支付失败!',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }else{
          wx.showToast({
            title: '请求参数失败！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(res){
        console.log('确定续费:fail', res);
      }
    })
  }, 
  // 计算续费到期日期
  calcRenewTime: function(year){
    var endTime = this.data.expireYear.split('-');
    endTime[0] = +endTime[0] + year;
    var newEndTime = endTime.join('-');
    this.setData({
      renewExpireYear: newEndTime
    })
  },
  // 减
  minus: function(){
    var year = +this.data.renewYear;
    if(year > 1){
      year --;
    }
    this.calcRenewTime(year);
    this.setData({
      renewYear: year,
      savePrice: (this.data.oneYearPrice * year).toFixed(2)
    })
  },
  // 加
  plus: function(){
    var year = +this.data.renewYear;
    year++;
    this.calcRenewTime(year);
    this.setData({
      renewYear: year,
      savePrice: (this.data.oneYearPrice * year).toFixed(2)
    })
  },
  
  // 显示续费弹窗
  showRenewPop: function(e){
    var dataset= e.currentTarget.dataset;
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
  closeRenewPop: function(){
    this.setData({
      switchPop: false,
      renewYear: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getData(this);
    switchProject('crowd_now', this);
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    })
    // 续费弹窗 初始化日期
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    })

  },

  // 选择显示仓库
  selectStorageData: function(e){
    var _this = this;
    // 折叠所有仓库
    _this.showAllStorage();
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.tiltes + 'doHouseOrder',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid,
        store_house_id: id
      },
      success: function(res){
        console.log('选择显示仓库', res)
        if(res.data.status == 1){
          _this.setData({
            storageDataArr: res.data.data
          })
        }
      },
      fail: function(){}
    })
  },
  // 显示仓库数据
  showStorageData: function(e){
    var _this = this;
    e ? (e.currentTarget.dataset.key ? _this.showAllStorage() : '') : '';
    wx.request({
      url: app.globalData.tiltes + 'getStoreData',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function(res){
        console.log('显示仓库数据：', res)
        if(res.data.status == 1){
          res.data.data.forEach((v, i) => {
              v.getArr.forEach((i, j) => {
                i.end_time = app.formatDate(i.end_time);
                i.pay_time = app.formatDate(i.pay_time);
              })
          });
          _this.setData({
            storageDataArr: res.data.data
          })
        }
      },
      fail: function(){}
    })
  },
  // 所有仓库
  allStorage: function(){
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'getStoreHouse',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function(res){
        console.log('所有仓库：', res)
        if(res.data.status == 1){
          _this.setData({
            allStorageArr: res.data.data
          })
        }
      },
      fail: function(){}
    })
  },
  // 总价值
  totalValue: function(){
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'theStoreValue',
      method: 'POST',
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid
      },
      success: function(res){
        console.log('总价值：', res)
        if(res.data.status == 1){
          _this.setData({
            totalValueNum: res.data.data.order_real_pay.toFixed(2)
          })
        }
      },
      fail: function(){}
    })
  },

  onShow: function () {
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        checked: 2
      })
    }
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
        currentTab: current
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
      currentTab: current
    })
  },

  showAllStorage: function () {
    // 全部仓储
    this.setData({
      wareHouseFlag: !this.data.wareHouseFlag
    })
  },

  checkRealTimeData: function () {
    // 查看仓库实时数据（温度湿度）
    wx.navigateTo({
      url: '/storage/pages/realtime_data/realtime_data',
      success: function () {
        console.log('跳转成功');
      },
      fail: function () {
        console.log('跳转失败');
      }
    })
  },

  toStockDetail: function (e) {
    var id = e.target.dataset.id;
    // 仓库详情
    wx.navigateTo({
      url: '/storage/pages/stock_detail/stock_detail?id='+id,
      success: function () {
        console.log('跳转成功');
      },
      fail: function () {
        console.log('跳转失败');
      }
    })
  },

  outOfStock: function () {
    // 出仓
    wx.navigateTo({
      url: '/storage/pages/out_of_warehouse/out_of_warehouse',
      success: function () {
        console.log('跳转成功');
      },
      fail: function () {
        console.log('跳转失败');
      }
    })
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link, e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  onReady: function () {
    var that = this;
    var uniacid = app.globalData.uniacid;
    wx.request({
      url: app.globalData.baseurl + "doPagehomepage",
      cachetime: "30",
      data: {
        uniacid: uniacid
      },
      success: function (t) {
        var version_is = '';
        that.setData({
          foot_is: t.data.data.foot_is,
        })
        // console.log(t)
        if (t.data.data.test_name.goods_name == '茶进阶版')
          version_is = 3;
        else if (t.data.data.test_name.goods_name == '茶行业版')
          version_is = 2;
        else
          version_is = 1;
        that.setData({
          version: version_is
        })
        
        wx.request({
          url: app.globalData.baseurl + "doPageGetFoot",
          cachetime: "30",
          data: {
            uniacid: uniacid,
            foot: t.data.data.foot_is
          },
          success: function (t) {
            var lujing = [];
            var num = getCurrentPages().length - 1;
            var url = getCurrentPages()[num].route; //当前页面路径
            console.log(url)
            for (let i in t.data.data.data) {
              lujing.push(t.data.data.data[i]);
            }
            for (let o = 0; o < lujing.length; o++) {
              if (lujing[o].linkurl.indexOf(url) != -1) {
                lujing[o].change = true;
              } else {
                lujing[o].change = false;
              }
            }
            t.data.data.data = lujing;
            console.log(t.data.data)
            that.setData({
              footinfo: t.data.data,
              style: t.data.data.style,
            })
          }
        });


      },
      fail: function (t) {
        console.log(t);
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onReady();
    wx.stopPullDownRefresh();
  }

})
