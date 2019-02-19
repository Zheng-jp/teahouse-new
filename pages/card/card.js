// pages/select_address/select_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     card:[],
     is_select_address:'',
   
  },

  go_add_card: function (event) {
    wx.navigateTo({
      url: '../add_card/add_card?title=' + 0,
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
  go_change_card: function (event) {
    wx.navigateTo({
      url: '../add_card/add_card?title=' + 1+ '&id=' + event.currentTarget.dataset.id,
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
  radioChange: function (e) {
    var that = this;
     console.log(e.detail.value);
     wx.request({
      url: app.globalData.tiltes + 'bank_binding_status',
      data: {
        member_id: app.globalData.member_id,
        id: e.detail.value,
        status:1,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        
      },
      fail: function () {
        

      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon: 'none'
        })
      }

    });

  },
  delect: function (e) {
    var that = this;
     wx.request({
      url: app.globalData.tiltes + 'bank_binding_del',
      data: {
        member_id: app.globalData.member_id,
        id: e.currentTarget.dataset.id,
      },
      method: "post",
      success: function (res) {
        that.onShow()
      },
      fail: function () {
        

      },
      complete: function (res) {
        wx.showToast({
          title:res.data.info,
          icon: 'none'
        })
      }

    });

  },
  // // 当从结算页面进来时触发的事件
  // select:function(event){
  //   var tel=event.currentTarget.dataset.tel;
  //   var name=event.currentTarget.dataset.name;
  //   var address=event.currentTarget.dataset.address;
  //   wx.setStorageSync('tel', tel);
  //   wx.setStorageSync('name', name);
  //   wx.setStorageSync('address', address);
  //    wx.navigateBack({
  //     delta: 1
  //   });
  // },

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
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
       wx.request({
      url: app.globalData.tiltes + 'bank_bingding',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
  
      success: function (res) {
        console.log(res);
        // if(res.data.status!="0"){
              that.setData({
                card:res.data.data
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