// storage/pages/zcDetail/zcDetail.js
const app = getApp();
var WxParse = require('../../..//wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currTab: 0,
    tabHdArr: ['项目详情', '团队介绍', '监测报告', '评价'],
    fixiPhone: false,
    switchDialogKey: false,
    switchWidth: false,
    proArr: [],
    specActive: 0,
    buyNum: 1,
  },
  // 减
  minus: function(){
    var num = this.data.buyNum;
    if(num > 1){
      num --;
    }
    this.setData({
      buyNum: num
    })
  },
  // 加
  plus: function(){
    var num = this.data.buyNum;
    if(+num < +this.data.proArr[0].standard[this.data.specActive].stock){
      num++;
      this.setData({
        buyNum: num
      })
    }else{
      wx.showToast({
        title: '您所填写的数量超过库存！',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 输入数量
  bindManual: function(e){
    var num = e.detail.value;
    var stock = +this.data.proArr[0].standard[this.data.specActive].stock;
    if(num <= 0){
      this.setData({
        buyNum: 1
      })
    }else if(num <= stock){
      this.setData({
        buyNum: num
      })
    }else{
      wx.showToast({
        title: '您所填写的数量超过库存！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        buyNum: stock
      })
    }
  },
  touchMove () {},
  // 选择规格
  clickSpec: function(e){
    var index = e.target.dataset.index
    this.setData({
      specActive: index,
    })
  },

  // 操作选项卡
  clickTabHd: function(e){
    var current = e.target.dataset.current;
    if(this.data.currTab != current){
      this.setData({
        currTab: current
      })
    }
  },
  swiperTabBd: function(e){
    this.setData({
      currTab: e.detail.current
    })
  },
  // 显示规格对话框
  switchDialog: function(){
    this.setData({
      switchDialogKey: !this.data.switchDialogKey
    })
    if(!this.data.switchDialogKey){
      var _this = this;
      setTimeout(function(){
        _this.setData({
          switchWidth: !_this.data.switchWidth
        })
      }, 200)
    }else{
      this.setData({
        switchWidth: !this.data.switchWidth
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        id = options.id;
    wx.getSystemInfo({
      success: function(res){
        _this.setData({
          fixiPhone: res.model.indexOf('iPhone X') != -1
        })
      }
    })
    // all data
    wx.request({
      url: app.globalData.tiltes + 'crowd_support',
      method: 'POST',
      data: {
        id: id
      },
      success: function(res){
        console.log(res);
        WxParse.wxParse('proDom', 'html', res.data.data[0].goods_text, _this, 5);
        WxParse.wxParse('teamDom', 'html', res.data.data[0].team, _this, 5);
        WxParse.wxParse('textDom', 'html', res.data.data[0].text, _this, 5);
        _this.setData({
          proArr: res.data.data
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
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