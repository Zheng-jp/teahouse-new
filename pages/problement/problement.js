// pages/meeting/meeting.js
import templates from '../../utils/template'
const app = getApp();
Page({

  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航
    tab: 0,
    url: app.globalData.url,
    nav: [],
    shares: [],
    initPid: null,
    

    // 搜索列表
    showView: true,
    seach_list: [
      '未过期',
      '未过期',
      '未过期'
    ]
  },
  tab_slide: function (e) {//滑动切换tab 
    var _this = this;
    var current = e.detail.current;
    _this.setData({
      tab: e.detail.current
    })
    var pid = _this.data.nav[current].pid;
    wx.request({
      url: app.globalData.tiltes + 'problem_data',
      data: {
        pid: pid
      },
      method: "POST",
      success: function (res) {
        // console.log(res);
        var data = res.data.data;
        for(var item in data){
          data[item].url = app.globalData.tiltes
        }
        _this.setData({
          shares: res.data.data
        })
      },
      fail: function () {
        console.log(res.status, res.statusText);
      },
      complete: function () {
        wx.hideLoading()
      }
    });
  },
  tab_click: function (e) {//点击tab切换
    var _this = this;
    var current = e.target.dataset.current;
    if(current != _this.data.tab){
      _this.setData({
        tab: current
      })
      var pid = _this.data.nav[current].pid;
      wx.request({
        url: app.globalData.tiltes + 'problem_data',
        data: {
          pid: pid
        },
        method: 'POST',
        success: function(res){
          console.log(res);
          var data = res.data.data;
          for(var item in data){
            data[item].url = app.globalData.tiltes
          }
          _this.setData({
            shares: res.data.data
          })
        },
        fail: function(res){
          console.log(res.status, res.statusText);
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }
  },
  go_problement_detail: function(titleid){//查看问题详情
    var titleid = titleid.currentTarget.dataset.titleid
    wx.navigateTo({
      url: '../problement_detail/problement_detail?titleid=' + titleid,
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },
  // 点击搜索
  onChangeShowState: function () {

    var that = this;
    // console.log(that);
    that.setData({
      showView: (!that.data.showView)
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    showView: (options.showView == "true" ? true : false)
    // navList
    wx.request({
      url: app.globalData.tiltes + 'problem_list',
      method: "POST",
      success: function(res){
        console.log(res)
        var data = res.data.data;
        for(var item in data){
          data[item].tab = item;
        }
        that.setData({
          nav: data,
          initPid: data[0].pid
        })
        getFirstNavItem();
      },
      error: function(res){
        console.log(res);
      }
    })
    // navItem
    function getFirstNavItem(){
      wx.request({
        url: app.globalData.tiltes + 'problem_data',
        data: {
          pid: that.data.initPid
        },
        method: 'POST',
        success: function(res){
          console.log(res);
          var data = res.data.data;
          for(var item in data){
            data[item].url = app.globalData.tiltes
          }
          that.setData({
            shares: res.data.data
          })
          console.log(that.data.shares);
        },
        error: function(res){
          console.log(res.status, res.statusText);
        }
      })
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