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
    outNum: 0,  //出仓数量
    housePrice: {}, // 运费模板数据
    minUnit: '', //最小单位
    minUnitStock: 0, // 库存换算成最小单位
    conversion: false, //是否换算
    conversionStr: '', //换算后展示
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
        var unitLen = data.unit.length;
        data.end_time = app.formatDate(data.end_time);
        data.pay_time = app.formatDate(data.pay_time);
        _this.setData({
          orderInfo: data,
          minUnit: data.unit[unitLen - 1]
        })
        _this.getDefaultAddress(); //获取默认地址
        // 把库存换算成最小单位
        switch(unitLen){
          case 1:
            _this.setData({
              minUnitStock: +data.store_number[0]}
            ); 
            break;
          case 2:
            _this.setData({
              minUnitStock: +data.store_number[0] + (+data.num[0] * +data.num[1] * data.store_number[2])}
            ); 
            break;
          case 3: 
            _this.setData({
              minUnitStock: +data.store_number[0] + (+data.num[0] * +data.num[1] * data.store_number[2]) + (+data.num[0] * +data.num[1] * data.store_number[4])
            }); 
            break;
        }
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
        _this.getHousePrice(); // 获取运费模板
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

  // 支付 确认出仓
  payment: function(){
    var _this = this;
    this.data.outNum == 0 ? wx.showToast({
      title: '请填入出仓数量！',
      icon: 'none',
      duration: 1200
    }) : (function(){
      var params = {
        id: _this.data.id,
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid,
        house_charges: 0.01,
        order_quantity: _this.data.outNum,
        store_unit: _this.data.minUnit,
        address_id: _this.data.defaultAddress.address_name + _this.data.defaultAddress.harvester_real_address
      }
      _this.myRequest('setContinuAtion', params, function(res){
        console.log(res);
        if(res.statusCode == 200){
          _this.wechatPay(res);
        }else{
          wx.showToast({
            title: '生成订单失败，请退出后重试！',
            icon: 'none',
            duration: 1200
          })
        }
      })
    })()
  },

  // 微信支付
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
          wx.navigateBack({ delta: 1 })
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

  // 输入数量
  bindManual: function (e) {
    var num = e.detail.value;
    var stock = this.data.minUnitStock;
    if (num <= 0) {
      this.setData({
        outNum: 1
      })
    } else if (num <= stock) {
      this.setData({
        outNum: num
      })
    } else {
      wx.showToast({
        title: '您填写的数量超过库存,已为您自动填入最大库存！',
        icon: 'none',
        duration: 1800
      })
      this.setData({
        outNum: stock
      })
    }
    this.setData({
      conversion: true,
    })
    this.calcPostage(this.data.outNum);
  },
  // 重置数量
  reset: function(){
    this.setData({
      conversion: false,
      conversionStr: '',
      postage: 0,
      outNum: 0
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
        _this.setData({
          housePrice: res.data
        })
      }
    })
  },

  // 计算邮费
  calcPostage: function(outNum){
    var data = this.data.housePrice;
    // 订单信息
    var orderInfo = this.data.orderInfo;
    var len = orderInfo.unit.length;
    //固定邮费
    if(data.franking_type == 2){
      this.setData({
        postage: data.data.collect
      })
      this.returnConvStr(len, outNum);
    }else{
      var postage = 0;
      // 一个单位
      if(len === 1){
        postage = (outNum - 1) * data.data[0].markup + data.data[0].collect;
        this.setData({
          postage: postage
        });
        this.returnConvStr(1, outNum);
      }else if(len === 2){
        //两个单位
        var maxUnitNum = Math.floor(outNum / orderInfo.num[1]);
        var minUnitNum = outNum % orderInfo.num[1];
        var maxPostage = maxUnitNum > 0 ? (maxUnitNum - 1) * data.data[0].markup + data.data[0].collect : '';
        var minPostage = minUnitNum > 0 ? (minUnitNum - 1) * data.data[1].markup + data.data[1].collect : '';
        postage = maxPostage + minPostage;
        this.setData({
          postage: postage
        });
        this.returnConvStr(2, outNum);
      }else if(len === 3){
        // 三个单位
        var maxUnitNum = Math.floor(outNum / (orderInfo.num[1] * orderInfo.num[2]));
        var midUnitNum = Math.floor(outNum % (orderInfo.num[1] * orderInfo.num[2]) / orderInfo.num[2]);
        var minUnitNum = outNum % (orderInfo.num[1] * orderInfo.num[2]) % orderInfo.num[2];
        var maxPostage = maxUnitNum > 0 ? (maxUnitNum - 1) * data.data[0].markup + data.data[0].collect : '';
        var midPostage = midUnitNum > 0 ? (midUnitNum - 1) * data.data[1].markup + data.data[1].collect : '';
        var minPostage = minUnitNum > 0 ? (minUnitNum - 1) * data.data[2].markup + data.data[2].collect : '';
        postage = maxPostage + midPostage + minPostage;
        // 换算的字符串
        this.setData({
          postage: postage
        });
        this.returnConvStr(3, outNum);
      }
    }
  },

  // 返回换算后的字符串
  returnConvStr: function(len, outNum){
    // 订单信息
    var orderInfo = this.data.orderInfo;
    var conversionStr = '';
    if(len == 1){
      // 换算的字符串
      conversionStr = outNum + orderInfo.unit[0];
    }else if(len == 2){
      var maxUnitNum = Math.floor(outNum / orderInfo.num[1]);
      var minUnitNum = outNum % orderInfo.num[1];
      // 换算的字符串
      conversionStr = maxUnitNum + orderInfo.unit[0] + minUnitNum + orderInfo.unit[1];

    }else{
      // 三个单位
      var maxUnitNum = Math.floor(outNum / (orderInfo.num[1] * orderInfo.num[2]));
      var midUnitNum = Math.floor(outNum % (orderInfo.num[1] * orderInfo.num[2]) / orderInfo.num[2]);
      var minUnitNum = outNum % (orderInfo.num[1] * orderInfo.num[2]) % orderInfo.num[2];
      // 换算的字符串
      conversionStr = maxUnitNum + orderInfo.unit[0] + midUnitNum + orderInfo.unit[1] + minUnitNum + orderInfo.unit[2];
    }
    this.setData({
      conversionStr: conversionStr
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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