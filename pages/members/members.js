// pages/members/members.js
var app = getApp();
Page({
  test: app.data.test,

  /**
   * 页面的初始数据
   */
  data: {
    tab: '0',
    url: app.globalData.img_url,
    level:[],
    information:[ ]

  },
  /**
 * radio监听事件
 */

  // tab_slide: function (e) {//滑动切换tab 
  //   var that = this;
   
  //   that.setData({ tab: e.detail.current });
  //   console.log(that);
  // },
 
  radioChange: function (e) {
    var that = this;
     console.log(that)
    //  点击添加类
    if (that.data.level.tab === e.detail.value) {
      return false;
    } else {
      that.setData({
        tab: e.detail.value
      })
    }
   
  },
  stopTouchMove: function () {
    console.log(111);
    return false;
  },
  bindViewTap: function () {
    var that = this;
    console.log()
    wx.navigateTo({
      url: '../code/code?title=' + app.globalData.gmemberid,
      success: function (res) {
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
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
    var gmemberid=app.globalData.gmemberid;
    var that = this;
    console.log(that);
    wx.request({
      url: app.globalData.tiltes + 'my_show_grade',
      data: {
        open_id: gmemberid
      },
      method: "POST",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          level: res.data.data.member_grade,
          information: res.data.data.information
          
        });
        //  添加字段到等级数组
        for (var index in that.data.level) {
          var sexParam = "level[" + index + "].tab";
          that.setData({
            [sexParam]: index,
          })

        }
        console.log(that)
       
  


      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
     
    
  
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