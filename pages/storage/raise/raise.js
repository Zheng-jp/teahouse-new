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
    indicatorDots: true, //是否显示面板指示点
    autoplay: true,
    interval: 3000,
    duration: 500,
    switchProject: true,
    swiperDataList: [],
    crowdList: [],
    Height: 0,
    version: 0,
    fixiPhone: false,
    inTemp: 0,
    inHumi: 0
  },

  


  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  
    getData(this);
    switchProject('crowd_now', this);
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
    // 续费弹窗 初始化日期
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    })

  },




  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        checked: 2
      })
    }
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

 


  redirectto: function (t) {
    var a = t.currentTarget.dataset.link, e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  onReady: function () {
    var that = this;

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    
  },
  onHide() {
    // console.log('onLaunch监听小程序隐藏');
    
  }

})
