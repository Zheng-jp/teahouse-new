// pages/good_lv/good_lv.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    on: 1,
    old_id: '',
    style: 0
  },

  //跳转商品
  toGoods: function(event){
    var goodId = event.currentTarget.dataset.id, urls;
    urls = "../goods_detail/goods_detail?title=";
    wx.navigateTo({
      url: urls + goodId,
      success: function (res) {},
      fail: function () {},
      complete: function () {}
    })
  },
  //导航切换
  switch: function(event) {
    let id = event.currentTarget.dataset.id, that = this;
    if(id < 5 && id > 2 && that.data.old_id == 3) id = 4
    else if(id < 5 && id > 2 && that.data.old_id == 4) id = 3
    else if(id > 4 && that.data.old_id == 5) id = 6
    else if(id > 4 && that.data.old_id == 6) id = 5
    this.getGood(that.data.pid, id)
    that.setData({on: id, old_id: id})
  },
  //样式切换
  changStyle: function() {
    if(this.data.style == 0) this.setData({style: 1})
    else this.setData({style: 0})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({pid: options.pid})
    wx.setNavigationBarTitle({ title: options.name })
    this.getGood(options.pid, 1)
  },
  //获取商品信息
  getGood: function(pid, order) {
    let that = this;
    wx.request({
      url: app.globalData.tiltes + 'get_second_type_list',
      data: {
        open_id:app.globalData.gmemberid,
        uniacid: app.globalData.uniacid,
        pid: pid,
        order: order
      },
      method: "post",
      success: function (res) {
        if(res.data.status == "1") {
          that.setData({
            goods: res.data.data
          })
        }
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
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