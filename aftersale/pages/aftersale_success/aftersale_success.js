// aftersale/pages/aftersale_success/aftersale_success.js
const app = getApp();
// 时间戳转换
function timeTrans(date){
  var date = new Date(date*1000);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var H = date.getHours();
  var MM = date.getMinutes();
  return Y + '-' + M + '-' + D + ' ' + H + ':' + MM;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    status: null,
    dataObj: {},
    whoHandle: null,
    operationTime: '',
    switchReplyBoxTag: false,
    facusTag: false,
    replyContent: '',
    expressCompany: '',
    expressNumber: '',
  },

  sendExpressInfo: function(){
    // 发送快递信息
    var _this = this;
    if(_this.data.expressCompany && _this.data.expressNumber){
      wx.request({
        url: app.globalData.tiltes + 'add_express_information',
        method: 'POST',
        data: {
          buy_express_company: _this.data.expressCompany,
          buy_express_number: _this.data.expressNumber,
          id: _this.data.id
        },
        success: function(res){
          console.log('快递信息成功', res);
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000,
            success: function(){
              setTimeout(function(){
                wx.navigateBack();
              }, 1200)
            }
          })
        },
        fail: function(){
          console.log('快递信息失败');
        }
      })
    }else{
      wx.showToast({
        title: '发送失败',
        icon: 'none',
        duration: 1500
      })
    }
  },

  getExpressComp: function(e){
    // 存储快递公司
    this.setData({
      expressCompany: e.detail.value,
    })
  },

  getExpressNum: function(e){
    // 存储快递单号
    this.setData({
      expressNumber: e.detail.value,
    })
  },

  revoke: function(){
    // 撤销申请
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否撤销申请？',
      success(res){
        if(res.confirm) {
          wx.request({
            url: app.globalData.tiltes + 'cancellation_of_application',
            method: 'POST',
            data: {
              after_sale_id: _this.data.id
            },
            success: function(res){
              console.log('撤销成功', res);
              wx.showToast({
                title: '撤销成功',
                icon: 'success',
                duration: 1500,
                success: function(){
                  setTimeout(function(){
                    wx.navigateBack();
                  },1600)
                }
              })
            },
            fail: function(){
              console.log('撤销失败');
            }
          })
        }else if(res.cancel) {
          
        }
      }
    })
  },

  sendReply: function(){
    // 发送回复
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'buyer_replay',
      method: 'POST',
      data: {
        after_sale_id: _this.data.id,
        content: _this.data.replyContent
      },
      success: function(res){
        console.log('回复成功', res);
        if(res.data.status == 1){
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            success: function(){
              _this.onShow();
              _this.setData({
                replyContent: ''
              });
            }
          })
        }
      },
      fail: function(){
        console.log('回复失败', res);
      }
    })
  },

  getReplyCont: function(e){
    var val = e.detail.value;
    this.setData({
      replyContent: val
    })
  },

  switchReplybox: function(e){
    this.setData({
      switchReplyBoxTag: !this.data.switchReplyBoxTag,
      facusTag: !this.data.facusTag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    _this.setData({
      id: options.id,
      status: options.status
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
    var _this = this;
    wx.request({
      url: app.globalData.tiltes + 'after_sale_information_return',
      method: 'POST',
      data: {
        after_sale_id: _this.data.id
      },
      success: function(res){
        console.log('success', res);
        if(res.data.status == 1){
          var data = res.data.data;
          _this.setData({
            dataObj: data,
            whoHandle: data.who_handle,
            operationTime: timeTrans(data.operation_time),
          })
        }
      },
      fail: function(res){
        console.log('fail', res);
      }
    })
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