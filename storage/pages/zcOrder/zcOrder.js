// storage/pages/zcOrder/zcOrder.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moneyArray: [1, 5, 10],
    index: 0,
    suppMoney: null,
    standardId: null, //打赏商品规格id
  },
  
  bindPickerChange: function(e){
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 输入支付金额
  bindInputMoney: function(e){
    var val = e.detail.value;
    if(val >= 1 ){
      this.setData({
        suppMoney: val
      })
    }else{
      wx.showToast({
        title: '打赏金额最低1元',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 去支付
  payment: function(){
    var param = {
      id: this.data.standardId,
      // money: this.data.suppMoney ? this.data.suppMoney : this.data.moneyArray[this.data.index],
      money: 0.01,
      member_id: app.globalData.member_id
    }
    wx.request({
      url: app.globalData.tiltes + 'crowd_reward',
      method: 'POST',
      data: param,
      success: function(res){
        console.log(res);
        if(res.data.status == 1){
          // 调起支付
          wx.request({
            url: app.globalData.tiltes + 'reward_pay',
            method: 'POST',
            data: {
              member_id: app.globalData.member_id,
              order_number: res.data.data.order_number
            },
            success: function(res){
              console.log(res);
              if(res.statusCode == 200){
                var data = res.data;
                // 调 微信支付
                wx.requestPayment({
                  timeStamp: data.timeStamp,
                  nonceStr: data.nonceStr,
                  package: data.package,
                  signType: 'MD5',
                  paySign: data.paySign,
                  success(res) {
                    console.log(res);
                    // 支付成功 跳转众筹订单
                    // wx.navigateTo({
                    //   url: '../order/order?title=' + 0,
                    //   success: function (res) {},
                    //   fail: function () {},
                    // })
                  },
                  fail(res) {console.log(res)}
                })
              }
            },
            fail: function(res){console.log(res);}
          })
        }
      },
      fail: function(res){console.log(res)}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打赏商品规格id
    if(options.standardId){
      this.setData({
        standardId: options.standardId
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