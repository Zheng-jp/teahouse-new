// pages/select_address/select_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     addresss:[],
     is_select_address:'',
   
  },
  add_address: function (event) {
    wx.navigateTo({
      url: '../add_address/add_address',
    
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
  go_change_address: function (event) {
    wx.navigateTo({
      url: '../change_address/change_address?title=' + event.currentTarget.dataset.id,
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
      url: app.globalData.tiltes + 'member_address_status',
      data: {
        open_id: app.globalData.gmemberid,
        id: e.detail.value,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title:'修改成功',
          icon: 'none'
        })
      },
      fail: function () {

      },
      complete: function () {
      }

    });

  },
  // 当从结算页面进来时触发的事件
  select:function(event){
    var tel=event.currentTarget.dataset.tel;
    var name=event.currentTarget.dataset.name;
    var address=event.currentTarget.dataset.address;
    wx.setStorageSync('tel', tel);
    wx.setStorageSync('name', name);
    wx.setStorageSync('address', address);
     wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    var title = options.title;
    // 判读从哪个页面进来
    var  pages = getCurrentPages();
    var  prevpage = pages[pages.length - 2];
    console.log(prevpage.route)
   if(prevpage.route=='pages/settlement/settlement'){
    that.setData({
      is_select_address: 'select',
    });
    console.log(that)
   }
    wx.request({
      url: app.globalData.tiltes + 'member_address_information',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          address: res.data.data,
        });
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