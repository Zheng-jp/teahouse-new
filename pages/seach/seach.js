// pages/seach/seach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  

  
  input_txt: function(e) {//输入框输入事件
    let that = this;
    that.setData({
      searchTxt: e.detail.value.trim()
    })
  },
  btn_search: function() {//搜索确认事件
    let that = this;
    if (that.data.searchTxt == "") {
      wx.showToast({
        title: '商品名不为空',
        image: '',
        duration: 1000
      })
      return;
    }
    that.buildHistory(that.data.searchTxt)//调用历史记录事件
  },
//建立搜索记录
  buildHistory: function(e) {
    var searchArray = []
    if (wx.getStorageSync("history").length > 0 && wx.getStorageSync("history").length < 8) {//小于指定数量之内
      let index = wx.getStorageSync("history").indexOf(e)
      if (index < 0) {//数据不存在时直接追加
        searchArray = wx.getStorageSync("history").concat(e)
        wx.setStorageSync("history", searchArray)
      } else {//数据已存在时调到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index, 1)
        searchArray = searchArray.concat(e);
        wx.setStorageSync("history", searchArray)
      }
    } else if (wx.getStorageSync("history").length >= 8) {//大于指定数量
      let index1 = wx.getStorageSync("history").indexOf(e)
      if (index1 > -1) {//数据已存在时掉到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index1, 1)
        searchArray = searchArray.concat(e);
        wx.setStorageSync("history", searchArray)
        return;
      }
      //数据不存在时删除第一个后追加
      searchArray = wx.getStorageSync("history")
      searchArray.splice(0, 1)
      searchArray = searchArray.concat(e);
      wx.setStorageSync("history", searchArray)
    } else {//无数据时候直接追加
      searchArray = searchArray.concat(e)
      wx.setStorageSync("history", searchArray)
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