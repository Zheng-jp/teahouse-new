// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    region: ['省', '市', '区'],
    customItem: "全部",
    info:[]
  },
  

  formSubmit: function (e) {
    var _this=this;
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(e.detail.value.harvester_phone_num==''){
      wx.showToast({
        title:"身份证不能为空",
        icon:'none'
      });
    }else if(e.detail.value.harvester==''){
      wx.showToast({
        title:"姓名不能为空",
        icon:'none'
      });
    }else if (reg.test(e.detail.value.harvester_phone_num) == false) {
      wx.showToast({
        title: "身份证号格式有误",
        icon: 'none'
      });
    }else{
        if(_this.data.status==0){  
          wx.request({
            url: app.globalData.tiltes + 'id_card_add',
            data: {
              member_id :app.globalData.member_id,
              id_card :e.detail.value.harvester_phone_num,
              name :e.detail.value.harvester,
            },
            method: "post",
            success: function (res) {
              
              wx.navigateBack({
                delta:1
              })
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 3000
              })
            },
            fail: function () {
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 3000
              })
            },
            complete: function () {
              // wx.hideLoading()
            }
          });
        }else{
          wx.request({
            url: app.globalData.tiltes + 'id_card_edit',
            data: {
              member_id :app.globalData.member_id,
              id_card :e.detail.value.harvester_phone_num,
              name :e.detail.value.harvester,
            },
            method: "post",
            success: function (res) {
              
              wx.navigateBack({
                delta: 1
              })
              wx.showToast({
                icon: "none",
                title: res.data.info
              })
            },
            fail: function () {
              wx.showToast({
                icon: "none",
                title: res.data.info,
                duration: 3000
              })
            },
            complete: function () {
              // wx.hideLoading()
            }
          });
        }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.request({
      url: app.globalData.tiltes + 'id_card_return',
      data: {
        member_id: app.globalData.member_id,
      },
      method: "post",
      success: function (res) {
        console.log(res)
        if(res.data.status==1){
          res.data.data.ID_card = res.data.data.ID_card.replace(/(\w{6})$/, '******');
          _this.setData({
            status: res.data.status,
            info: res.data.data,
          });
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