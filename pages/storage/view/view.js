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
}
// switch project
function switchProject(option, _this){
  wx.request({
    url: app.globalData.tiltes + option,
    method: 'POST',
    data: {
      member_id: app.globalData.member_id
    },
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
    switchProject: true,
    swiperDataList: [],
    crowdList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getData(this);
    switchProject('crowd_now', this);
  },

  // 切换 正在众筹 往期众筹
  bindSwitchProject: function(){
    if(this.data.switchProject){
      // 切换往期众筹
      switchProject('crowd_period', this);
    }else{
      switchProject('crowd_now', this);
    }
    this.setData({
      switchProject: !this.data.switchProject
    })
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
})