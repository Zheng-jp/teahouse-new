// pages/change/change.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'img/1.png',
    user_phone:'',
    user_name:'null'

  },
  // 调用摄像头
  // pic: function (options) {
  //   var that=this;
  //    wx.chooseImage({ 
  //      count: 1, // 默认9 
  //      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
  //      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
  //      success: function (res) { 
  //        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
  //        var tempFilePaths = res.tempFilePaths; 
  //        that.setData({
  //         img: tempFilePaths,
  //       });
        
  //       } 
  //     })
  //    },
  //      fail: function (res) { 
  //        console.log(res.errMsg) 
  //  },
   go_change_account: function (event) {

    var that = this;
    if(!app.globalData.judge_phone){
      wx.navigateTo({
        url: '../change_account/change_account?judge_phone='+0,
      })
    }
    else{
      wx.navigateTo({
        url: '../change_account/change_account?judge_phone='+1,
      })
    }
  
  },
  go_change_name: function (event) {

    var that = this;
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../change_name/change_name?title=' + event.currentTarget.dataset.id,
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
    app.judge_phone();
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
       wx.request({
      url: app.globalData.tiltes + 'user_phone_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
  
      success: function (res) {
       
        if(res.data.status!="0"){
              that.setData({
                user_phone:res.data.data
              });
        }
        else{
          that.setData({
            user_phone:res.data.status
          });
        }
        console.log(that);
        // wx.showToast({
        //   title:'修改成功',
        //   icon: 'none'
        // })
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'user_name_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
  
      success: function (res) {
       
        // if(res.data.status!="0"){
              that.setData({
                user_name:res.data.data
              });
        // }
        // wx.showToast({
        //   title:'修改成功',
        //   icon: 'none'
        // })
      },
      fail: function () {

      },
      complete: function () {
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'user_phone_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
  
      success: function (res) {
       
        // if(res.data.status!="0"){
              that.setData({
                user_phone:res.data.data
              });
        // }
        // wx.showToast({
        //   title:'修改成功',
        //   icon: 'none'
        // })
      },
      fail: function () {

      },
      complete: function () {
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
    var that=this;
    that.onLoad();
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