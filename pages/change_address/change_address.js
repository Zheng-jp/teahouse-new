// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['省', '市', '区'],
    customItem: "全部",
    address:[],
    title:'',
    select_address:null

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that=this;
    var id=that.data.title;
      // 上俩级为结算页面
   if(that.data.select_address=="0"){
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
        // var ids=res.data.data;
        //
        if(res.data.status==1){
          wx.showToast({
            title:res.data.info,
            icon:'none',
          });
          // TODO:给我生成的地址id
        setTimeout(function () {
          wx.setStorageSync('id', id);
          wx.navigateBack({
            delta: 2
          });
        }, 2000)
         
        }
       
     
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
   }
   else{
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
          wx.navigateBack({
            delta: 1
           })
        }, 2000)
         
        }
     
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
   }
   
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var title = options.title;
    var id=options.id;
    that.setData({
      select_address:id
    })
    that.setData({
      title: title,
    });
    wx.request({
      url: app.globalData.tiltes + 'member_address_edit_information',
      data: {
        id:title,
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
      
       that.setData({
        address:res.data.data,
        region:res.data.data.address_name.split(","),
       })
  
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
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
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
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