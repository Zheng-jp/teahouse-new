//index.js
Page({
  data: {
    searchKey: "",
    history: []
  },
  //获取input文本
  getSearchKey: function(e) {
    console.log(e.detail.value)
    this.setData({
      searchKey: e.detail.value
    })
  },
  // 清空page对象data的history数组 重置缓存为[]
  clearHistory: function() {
    this.setData({
      history: []
    })
    wx.setStorageSync("history", [])
  },
  // input失去焦点函数
  routeToSearchResPage: function(e) {
    
    console.log(e)
    //对历史记录的点击事件 已忽略
    let _this = this;
    let _searchKey = this.data.searchKey;
    if (!this.data.searchKey) {
      return
    }

    let history = wx.getStorageSync("history") || [], state = true;
    for(let i = 0; i < history.length; i ++) {
      if( _searchKey == history[i]) {
        state = false;
      }
    }
    if(state) {
      history.push(this.data.searchKey)
      wx.setStorageSync("history", history);
    }
    this.onShow()
  },
  //每次显示钩子函数都去读一次本地storage
  onShow: function() {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  }
})