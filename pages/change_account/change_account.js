// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    customItem: "全部",
    address:[],
    title:'',
    btntext: '获取验证码'


  },
 
  formSubmit: function (e) {
    var that=this;
    var id=that.data.title
    console.log(id);
    wx.request({
      url: app.globalData.tiltes + 'member_address_edit',
      data: {
        harvester: e.detail.value.harvester,
        harvester_phone_num : e.detail.value.harvester_phone_num,
        address_name: that.data.region,
        harvester_real_address : e.detail.value.harvester_real_address,
        status : 1,
        open_id: app.globalData.gmemberid,
        id:id
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
          wx.navigateTo({
            url: '../select_address/select_address',
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
  },
  send_cold: function (e) {
      //这里是要调api接口的，我这里就假装已经调成功了，返回200了
      var _this = this 
        var coden = 60    // 定义60秒的倒计时
        var codeV = setInterval(function () {    
            _this.setData({    // _this这里的作用域不同了
              btntext: '重新获取' + (--coden) + 's'
            })
            if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
              clearInterval(codeV)
              _this.setData({
                btntext: '获取验证码'
              })
            }
          }, 1000)  //  1000是1秒
      
  
    // wx.request({
    //   url: app.globalData.tiltes + 'member_address_edit',
    //   data: {
      
    //   },
    //   method: "post",
    //   // header: {
    //   //   "Content-Type": "json" // 默认值

    //   // },
    //   success: function (res) {
    //     console.log(res);
     
    //   },
    //   fail: function () {

    //   },
    //   complete: function () {
    //     wx.hideLoading()
    //   }

    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // var title = options.title;
    // that.setData({
    //   title: title,
    // });
    // wx.request({
    //   url: app.globalData.tiltes + 'member_address_edit_information',
    //   data: {
    //     id:title,
    //   },
    //   method: "post",
    //   // header: {
    //   //   "Content-Type": "json" // 默认值

    //   // },
    //   success: function (res) {
    //    console.log(res);
    //    that.setData({
    //     address:res.data.data,
    //     region:res.data.data.address_name.split(","),
    //    })
  
    //   },
    //   fail: function () {

    //   },
    //   complete: function () {
    //     wx.hideLoading()
    //   }

    // });

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