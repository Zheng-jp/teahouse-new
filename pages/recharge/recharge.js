// pages/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recharge:[],
    indexs:null,
    money:null,  
    oldmoney:null,
    oldeindexs:null,
  },
  bindoldChange:function (event) {
    var that=this;
    if(event.detail.value==''){
      that.setData({
        money:that.data.oldmoney,
        indexs:that.data.oldeindexs
      })
    }
    else{
      that.setData({
        money:event.detail.value,
        indexs:0
      })
    }
     
 },
  color:function (e) {
    
    var that=this;
     that.setData({
      indexs:e.currentTarget.dataset.id,
      money:e.currentTarget.dataset.value
     })
     console.log(that)
  },
  submit: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'member_balance_recharge',
      data: {
        member_id: app.globalData.member_id,
        money:that.data.money
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
        var order_number=res.data.data
        wx.request({
          // url: app.globalData.tiltes + 'wxpay',
          url: app.globalData.tiltes + 'wx_recharge_pay',
          data: {
            member_id: app.globalData.member_id,
            recharge_order_number: order_number,
            
          },
          dataTypr: 'json',
          method: "post",
          // header: {
          //   "Content-Type": "application/json" // 默认值
          // },
          success: function (res) {
            var result=res;
            if (result) {
              wx.requestPayment({
                timeStamp: String(result.data.timeStamp),
                nonceStr: result.data.nonceStr,
                package: result.data.package,
                signType: result.data.signType,
                paySign:  result.data.paySign,
                'success': function (successret) {
                  console.log('支付成功');
                },
                'fail': function (res) {
                  wx.request({
                    url: app.globalData.tiltes + 'wallet_recharge_del',
                    data: {
                      member_id: app.globalData.member_id,
                      recharge_id: order_number,
                    },
                    method: "post",
                    // header: {
                    //   "Content-Type": "application/x-www-form-urlencoded",
                    //   "Cookie": sessionId
                    // },
              
                    success: function (res) {
                    },
                    fail: function () {
              
                    },
                    complete: function (res) {
                      
                    }
              
                  });
                  

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
      fail: function () {

      },
      complete: function (res) {
        
      }

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.tiltes + 'recharge_setting_return',
      data: {
       
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Cookie": sessionId
      // },

      success: function (res) {
       that.setData({
        recharge:res.data.data,
        indexs:res.data.data[0].recharge_setting_id,
        oldeindexs:res.data.data[0].recharge_setting_id,
         money:res.data.data[0].recharge_setting_full_money,
         oldmoney:res.data.data[0].recharge_setting_full_money,
       })
       console.log(that);
     
      },
      fail: function () {

      },
      complete: function (res) {
        
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