// pages/meeting/meeting.js

const app = getApp();
Page({

  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航
    tab: 0,
    url: app.globalData.url,
    nav: [{
      name:"企业",
      tab:0
    },{
      name: "个人",
      tab:1
  },
    
     
    ],
    enterprise:[],
    personal:[],
    shares: [],

 
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
   
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    that.setData({ 
      tab: e.currentTarget.dataset.current 
    });

  },
  go_back:function(e){
    wx.setStorageSync('receipt_id', e.currentTarget.dataset.id );
    wx.navigateBack({
      delta: 2,
    });
  },
 
  bindViewTap: function (event) {
    var that = this;
    // console.log()
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/storage/pages/detail/detail?title=' + event.currentTarget.id,
      success: function (res) {
        // success
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
   delect:function(e){
    var that = this;
     var receipt_id = wx.getStorageSync('receipt_id');
    wx.request({
     url: app.globalData.tiltes + 'bill_delete',
     data: {
      member_id: app.globalData.member_id,
      // member_id: 1049,
       id: e.currentTarget.dataset.id,
     },
     method: "post",
     success: function (res) {
       if (receipt_id == e.currentTarget.dataset.id){
         wx.removeStorageSync("receipt_id");
       }
       wx.showToast({
         title:'删除成功',
         icon: 'none'
       })
       that.onShow()
     },
     fail: function () {

     },
     complete: function () {
     }

   });
   },
   checkboxChange:function(e){
     var that=this;
     var enterpriseco=that.data.enterprise;
     wx.request({
      url: app.globalData.tiltes + 'set_default',
      data: {
       member_id: app.globalData.member_id,
      //  member_id: 1049,
       type:1,
        id: e.detail.value[0],
      },
      method: "post",
      success: function (res) {
        for (var i = 0; i < that.data.enterprise.length;i++){
          if (e.detail.value[0] == that.data.enterprise[i].id){
              enterpriseco[i].label=1;
          }
          else{
           enterpriseco[i].label=0;
          }
        }
        that.setData({
         enterprise:enterpriseco,
        })
     
      },
      fail: function () {
         that.show();
      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon: 'none'
        })
      }
 
    });
   },
   checkboxChange1:function(e){
    var that=this;
    var personalco=that.data.personal;
    wx.request({
     url: app.globalData.tiltes + 'set_default',
     data: {
      member_id: app.globalData.member_id,
      // member_id: 1049,
      type:2,
       id: e.detail.value[0],
     },
     method: "post",
     success: function (res) {
       for (var i = 0; i < that.data.personal.length;i++){
         if (e.detail.value[0] == that.data.personal[i].id){
          personalco[i].label=1;
         }
         else{
          personalco[i].label=0;
         }
       }
       that.setData({
        personal:personalco,
       })
    
     },
     fail: function () {
        that.show();
     },
     complete: function (res) {
       wx.showToast({
         title:res.data.info,
         icon: 'none'
       })
     }

   });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
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
    var  that=this;
    wx.request({
      url:app.globalData.tiltes+ 'corporation',
      data:{
        member_id:app.globalData.member_id,
        // member_id:1049,
      },
      method:"post",
      success:function(res){
        console.log(res);
        that.setData({
          enterprise:res.data.data,
        })
      },
      fail:function(res){

      },
      complete:function(res){

      }
    })
    wx.request({
      url:app.globalData.tiltes+"individual",
      data:{
        member_id:app.globalData.member_id,
        // member_id:1049,
      },
      method:"post",
      success:function(res){
        that.setData({
          personal:res.data.data,
        })
      },
      fail:function(){

      },
      complete:function(){

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