// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ispassword:false,

  },
  go: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.src;
    if(item=='../recharge/recharge'){
      if(!that.data.ispassword){
        wx.showModal({
          title:'请设置支付密码',
          content: '您还没有资金账号，为了保证您的资金安全，请先设置资金账号支付密码。设置后才可以进行充值、余额消费等操作',
          confirmText:'马上设置',
          confirmColor:'#3399FF',
          cancelColor:'#bbb',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../password/password',
                success: function (res) {
                
                },
                fail: function () {
                 
                },
                complete: function () {
                
                }
          
          
              })
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
        })
      }
      else{
        wx.navigateTo({
          url: item,
          success: function (res) {
          
          },
          fail: function () {
           
          },
          complete: function () {
          
          }
    
    
        })
      }
     
    }
    else{
      wx.navigateTo({
        url: item,
        success: function (res) {
        
        },
        fail: function () {
         
        },
        complete: function () {
        
        }
  
  
      })
    }
 
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