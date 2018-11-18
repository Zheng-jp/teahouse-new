// pages/members/members.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level:[
      {
        name:'贵宾',
        photo: 'img/u6501.png',
        time:'12',
        monyle:'5',
        checked:'true'
      },
      {
        name: '黄金',
        photo: 'img/u6501.png',
        time: '12',
        monyle: '5',
        checked:''
      }, {
        name: '白金',
        photo: 'img/u6501.png',
        time: '12',
        monyle: '5',
        checked: ''
      }
    ]

  },
  /**
 * radio监听事件
 */
  radioChange: function (e) {
    console.log(e.detail.value);
  },
  pay: function () {
    var ordercode = this.data.txtOrderCode;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.yourdomain.com/pay',
            data: {
              code: res.code,//要去换取openid的登录凭证
              ordercode: ordercode
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: function (res) {
                  // success
                  console.log(res);
                },
                fail: function (res) {
                  // fail
                  console.log(res);
                },
                complete: function (res) {
                  // complete
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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