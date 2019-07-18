// storage/pages/out_of_warehouse/out_of_warehouse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url, 
    defaultAddress: {}, //默认地址
    province: null,  //省份
    id: null, //出仓订单id
    orderInfo: {}, //出仓订单信息
    postage: 0, //邮费
  },

  myRequest: function(url, params, callback){
    wx.request({
      url: app.globalData.tiltes + url,
      method: 'POST',
      data: params,
      success: function(res){
        callback(res);
      },
      fail: function(res){
        console.log('fail:', res);
      }
    })
  },

  // 出仓订单信息
  outPositionOrder: function(){
    var _this = this;
    var params = {
      member_id: app.globalData.member_id,
      uniacid: app.globalData.uniacid,
      id: _this.data.id,
    }
    _this.myRequest('outPositionOrder', params, function(res){
      console.log('出仓订单信息：', res);
      if(res.data.status == 1){
        var data = res.data.data;
        data.end_time = app.formatDate(data.end_time);
        data.pay_time = app.formatDate(data.pay_time);
        _this.setData({
          orderInfo: res.data.data
        })
        _this.getHousePrice(); // 获取运费模板
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options) this.setData({id: options.id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  // 获取默认地址
  getDefaultAddress: function(){
    var _this = this;
    var params = {open_id: app.globalData.gmemberid}
    _this.myRequest('member_default_address_return', params, function(res){
      console.log('获取默认地址：', res);
      if(res.data.status == 1){
        _this.setData({
          defaultAddress: res.data.data,
          province: res.data.data.address_name.split(',')[0]
        })
      }
    })
  },

  // 跳转地址列表
  toAddressList: function(){
    wx.navigateTo({
      url: '../../../pages/select_address/select_address',
      success: function (res) { },
      fail: function () {}
    })
  },

  // 获取运费模板
  getHousePrice: function(){
    var _this = this;
    var params = {
      member_id: app.globalData.member_id,
      goods_id: _this.data.orderInfo.goods_id,
      are: _this.data.province
    }
    _this.myRequest('getHousePrice', params, function(res){
      console.log('获取运费模板', res);
      if(res.data.status == 1){
        // 计算邮费
        _this.calcPostage(res.data);
      }
    })
  },

  // 计算邮费
  calcPostage: function(data){
    //固定邮费
    if(data.franking_type == 2){
      this.setData({
        postage: data.data.collect
      })
    }else{

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDefaultAddress(); //获取默认地址
    this.outPositionOrder(); //出仓订单信息
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