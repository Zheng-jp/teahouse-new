// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typea:true,
    typeb:true,
    type1:true,
    type2:true,
    valuea:null,

  },
 
  formSubmit: function (e) {
    var that=this;
   if(e.detail.value.harvester==''){
    wx.showToast({
      title:"请输入密码",
      icon:'none',
    });
   }
   else if( e.detail.value.harvester_phone_num.lenght!=6){
    wx.showToast({
      title:"密码有且只有6位",
      icon:'none',
    });
   }
   else if( e.detail.value.harvester_phone_num==''){
    wx.showToast({
      title:"请再次输入密码",
      icon:'none',
    });
   }
   else if( e.detail.value.harvester_phone_num!=e.detail.value.harvester){
    wx.showToast({
      title:"两次密码不一致",
      icon:'none',
    });
   }
   else{
      wx.request({
      url: app.globalData.tiltes + 'pay_password_add',
      data: {
        password: e.detail.value.harvester,
        password_repeat : e.detail.value.harvester_phone_num,
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        if(res.data.status==1){
          wx.showToast({
            title:res.data.info,
            icon:'none',
          });
          
          setTimeout(function () {
            wx.navigateBack();
          }, 2000)
         
        }
       
        console.log(res);
     
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });

   }
   
  },
  to_see:function (e) {
    var that=this;
    if(e.currentTarget.dataset.id=="type1"){
       that.setData({
         type1:false,
         typea:false,
       })
    }
    else{
      that.setData({
         type2:false,
         typeb:false,
      })
    }
   

  },
  typea:function(e){
    var that=this;
    that.setData({
      valuea:e.detail.value
    })
  },
  typeb:function(e){
    var that=this;
    that.setData({
      valueb:e.detail.value
    })
  },
  to_nosee:function (e) {
    var that=this;

    if(e.currentTarget.dataset.id=="type1"){
       that.setData({
         type1:true,
         typea:true,
       })
    }
    else{
      that.setData({
         type2:true,
         typeb:true,
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