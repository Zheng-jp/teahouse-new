// pages/order/order.js
const app = getApp();

function getAfterSaleData(_this, url){
  wx.request({
    url: app.globalData.tiltes + url,
    method: 'POST',
    data: {
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid
    },
    success: function(res){
      console.log('success:', res);
      if(res.data.status == 1 && res.data.data.lenght!== 0){
        _this.setData({
          dataList: res.data.data
        })
      }else{
        _this.setData({
          dataList: []
        })
      }
    },
    fail: function(res){
      console.log('fail:', res);
    }
  })
}
function myNavigateTo(url, id, status){
  wx.navigateTo({
    url: url + '?id=' + id + '&status=' + status,
    success: function(res){
      console.log('success');
    },
    fail: function(res){
      console.log('fail');
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navNameList: ['全部', '申请中', '已撤销', '已完成'],
    dataList: [],
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
    switch(current){
      case 0:
        getAfterSaleData(_this, 'after_sale_all');break;
      case 1:
        getAfterSaleData(_this, 'after_sale_applying');break;
      case 2:
        getAfterSaleData(_this, 'after_sale_rescinded');break;
      case 3:
        getAfterSaleData(_this, 'after_sale_completed');break;
    }
  },

  swiperTab: function(e){
    var _this = this;
    // 滑动切换选项卡
    var current = e.detail.current;
    _this.setData({
      currentTab: current
    })
    switch(current){
      case 0:
        getAfterSaleData(_this, 'after_sale_all');break;
      case 1:
        getAfterSaleData(_this, 'after_sale_applying');break;
      case 2:
        getAfterSaleData(_this, 'after_sale_rescinded');break;
      case 3:
        getAfterSaleData(_this, 'after_sale_completed');break;
    }
  },

  checkDetail: function(e){
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var handleTag = e.currentTarget.dataset.handletag;
    if(status == 1 || (status == 5 && handleTag == 1) || (status == 5 && handleTag == 3)){
      myNavigateTo('/aftersale/pages/aftersale_detail/aftersale_detail', id, status);
    }else if(status == 2 || status == 3 || (status == 5 && handleTag == 2)){
      myNavigateTo('/aftersale/pages/aftersale_success/aftersale_success', id, status);
    }else if(status == 4){
      myNavigateTo('/aftersale/pages/aftersale_finish/aftersale_finish', id, status);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    getAfterSaleData(_this, 'after_sale_all');
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