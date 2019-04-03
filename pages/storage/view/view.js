// pages/storage/view/view.js
const app = getApp();
// get Data
function getData(_this){
  // 轮播图
  wx.request({
    url: app.globalData.tiltes + 'crowd_index',
    method: 'POST',
    success: function(res){
      console.log(res);
      _this.setData({
        swiperDataList: res.data.data
      })
    },
    fail: function(res){
      console.log(res);
    }
  });
  // 正在众筹
  wx.request({
    url: app.globalData.tiltes + 'crowd_now',
    method: 'POST',
    success: function(res){
      console.log(res);
      _this.setData({
        crowdList: res.data.data
      })
    },
    fail: function(res){
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
    switchProject: false,
    swiperDataList: [],
    crowdList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    getData(_this);
  },

  clickTab: function(e){
    // 切换选项卡
    var current = e.target.dataset.current,
        _this = this;
    if(_this.data.currentTab !== current){
      _this.setData({
        currentTab: current
      })
    }
  },
  // 去支持
  support: function(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/storage/pages/zcDetail/zcDetail?id=' + id,
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },

  swiperTab: function(e){
    // 滑动切换选项卡
    var current = e.detail.current;
    this.setData({
      currentTab: current
    })
  },

  showAllStorage: function(){
    // 全部仓储
    this.setData({
      wareHouseFlag: !this.data.wareHouseFlag
    })
  },

  checkRealTimeData: function(){
    // 查看仓库实时数据（温度湿度）
    wx.navigateTo({
      url: '/storage/pages/realtime_data/realtime_data',
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },

  toStockDetail: function(){
    // 仓库详情
    wx.navigateTo({
      url: '/storage/pages/stock_detail/stock_detail',
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },

  outOfStock: function(){
    // 出仓
    wx.navigateTo({
      url: '/storage/pages/out_of_warehouse/out_of_warehouse',
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
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