// aftersale/pages/aftersale_detail/aftersale_detail.js
function countDown(endTime, _this){
  var currTime = new Date().getTime(),
      timeDeff = endTime - currTime,
      Day = addZero(parseInt(timeDeff/1000/3600/24)),
      Hour = addZero(parseInt(timeDeff/1000/3600%24)),
      Minutes = addZero(parseInt(timeDeff/1000/60%60)),
      Second = addZero(parseInt(timeDeff/1000%60));
  _this.setData({
    countDownTime: Day + '天' + Hour + '时' + Minutes + '分' + Second + '秒'
  })
}

function addZero(num){
  return num > 10 ? num : '0' + num;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: 1553164429000,
    countDownTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    setInterval(function(){
      countDown(_this.data.endTime, _this);
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