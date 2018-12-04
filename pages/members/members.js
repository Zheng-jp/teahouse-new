// pages/members/members.js
var app = getApp();
Page({
  test: app.data.test,

  /**
   * 页面的初始数据
   */
  data: {
    tab: '0',
    is: true, 
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
   console.log(e);
    //  点击添加类
    if (that.data.level.tab === e.detail.value) {
      return false;
    } else {
      that.setData({
        tab: e.detail.value
      })
    }
    var member_grade_name = that.data.information.member_grade_name;
    var tab=that.data.tab;
    console.log(tab);
    if (member_grade_name == that.data.level[tab].member_grade_name) {    
        that.setData({
          is: true,
        })
      }
      else{
        that.setData({
          is: false,
        })
      }
    
    console.log(that);
  },
  stopTouchMove: function () {
    return false;
  },
  bindViewTap: function () {
    var that = this;
    wx.navigateTo({
      url: '../code/code?title=' + app.globalData.gmemberid,
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
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
        for (var index in that.data.level) {
          var sexParam = "level[" + index + "].check";
          that.setData({
            [sexParam]: false,
          })

        }
        var member_grade_name = that.data.information.member_grade_name;
        for (var index in that.data.level){
          if (member_grade_name == that.data.level[index].member_grade_name){
            var check = "level[" + index + "].check";
           
            that.setData({
              tab: that.data.level[index].tab,
              [check]:true,
            })
          }
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