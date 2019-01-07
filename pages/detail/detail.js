// pages/detail/detail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseFocus: false,
    Label:[
     {
        name:'仅限会员',
        color:'#93291E'
     },
      {
        name: '需要预约',
        color: '#669900'
      }
    ],
    information:[]
  },
  /**
* 点击回复
*/
  bindReply: function (e) {
    this.setData({
      releaseFocus: true
    })
  },
  close:function(e) {
    this.setData({
      releaseFocus: false
    })
  },
    pay: function (e) {
      var that = this;
      console.log(that.data.information.cost_moneny);
      wx.request({
        // url: app.globalData.tiltes + 'wxpay',
        url: app.globalData.tiltes + 'wx_index',
        data: {
          open_id: app.globalData.gmemberid,
          cost_moneny: that.data.information.cost_moneny,
          activity_name: that.data.information.activity_name
        },
        dataTypr: 'json',
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值
        // },
        success: function (res) {
          var result=res.data;
          console.log(result.data.timestamp);
          if (result.data) {
            wx.requestPayment({
              timeStamp: String(result.data.timestamp),
              nonceStr: result.data.noncestr,
              package: result.data.package,
              signType: 'MD5',
              paySign:  result.data.sign,
              'success': function (successret) {
                console.log('支付成功');
                //获取支付用户的信息
                // wx.getStorage({
                //   key: 'userInfo',
                //   success: function (getuser) {
                //     //加入订单表做记录
                //     wx.request({
                //       url: url + 'Wx_AddOrder',
                //       data: {
                //         uname: getuser.data.nickName,
                //         goods: that.data.goodsList[0].goods_name,
                //         price: that.data.totalPrice,
                //         openid: res.data,
                //       },
                //       success: function (lastreturn) {
                //         console.log("存取成功");
                //       }
                //     })
                //   },
                // })
              },
              'fail': function (res) {
                console.log(res);
               }
            })
          }
        },
              fail: function () {

              },
              complete: function () {
                wx.hideLoading()
              }
            });     

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
    wx.request({
      url: app.globalData.tiltes + 'teacenter_detailed',
      data: {
        id: options.title
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        that.setData({
          information: res.data.data[0],
        });
        var article = res.data.data[0].commodity;
        WxParse.wxParse('article', 'html', article, that, 5);
        


      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  
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