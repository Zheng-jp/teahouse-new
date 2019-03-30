

Page({

  /**
   * 页面的初始数据
   */
  data:{
    textM:0,
    textN:'元旦快乐！元旦快乐！元旦快乐！元旦快乐！',
    textW:0,
    textL:50, 
  },
  onLoad: function (options) {
    var that = this;
    var textM = 20;
    //获取屏幕宽度的封装方法
    var phoneWidth = util.nowPhoneWH()[0];
    //文字宽度=文字长度+字体大小
    var textW = parseInt(Number(that.data.textN.length)*12);
    that.setData({textW:textW,textL:phoneWidth});
    if(phoneWidth>textW){
      var centerL = Number(phoneWidth/2)-(Number(textW)/2)
      that.setData({textL:centerL});
    }else{
      var textTime = setInterval(function(){
        var textL = that.data.textL;
        if(textL<-(textW-20)){
          that.setData({textL:phoneWidth})
          return
        }
        textL-=2;
        that.setData({textL:textL})
      },30)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.startMarquee();
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})