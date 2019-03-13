// aftersale/pages/aftersale_detail/aftersale_detail.js
const app = getApp();
function countDown(endTime, _this){
  var currTime = new Date().getTime(),
      timeDeff = endTime - currTime,
      Day = addZero(parseInt(timeDeff/1000/3600/24)),
      Hour = addZero(parseInt(timeDeff/1000/3600%24)),
      Minutes = addZero(parseInt(timeDeff/1000/60%60)),
      Second = addZero(parseInt(timeDeff/1000%60));
  _this.setData({
    countDownTime: Day + '天' + Hour + '时' + Minutes + '分'
  })
}
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

function addZero(num){
  return num > 10 ? num : '0' + num;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownTime: '',
    id: null,
    status: null,
    dataObj: {},
    operationTime: '',
    whoHandle: null,
    revokeTime: '',
    switchReplyBoxTag: false,
    facusTag: false,
    replyContent: '',
  },

  AmendPetition: function(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/apply_after_sales/apply_after_sales?title=' + id + '&amend=1',
      success: function(res){
        console.log('修改申请跳转成功', res);
      },
      fail: function(res){
        console.log('修改申请跳转失败', res);
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
                    wx.redirectTo({
                      url: '/pages/after_sales/after_sales',
                      success: function(){
                        console.log('撤销成功跳转');
                      },
                      fail: function(){
                        console.log('撤销成功跳转失败');
                      }
                    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      id: options.id,
      status: options.status
    })
    
    setInterval(function(){
      countDown(_this.data.dataObj.future_time*1000, _this);
    }, 300);
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
            operationTime: timeTrans(data.operation_time),
            whoHandle: data.who_handle
          })
          if(data.handle_time){
            _this.setData({
              revokeTime: timeTrans(data.handle_time)
            })
          }
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