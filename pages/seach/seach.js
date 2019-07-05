//index.js
Page({
  data: {
    searchKey: "",
    history: [],
    record: '',
    goods:[{
      goods_selling: "茶叶特惠",
      linktype: "page",
      linkurl: "/pages/goods_detail/goods_detail?title=295",
      market_price: 22,
      price: 0.5,
      pro_kc: 321,
      // sale_end_time: "1564502400",
      sale_num: 0,
      // sale_time: "1561996800",
      thumb: "https://teahouse.siring.com.cn//uploads/20190627/807cac6d8e70d27d45d3fab4b24a2b3f.jpg",
      title: "丁香花",
      video_link: ""}]
  },
  //获取input文本
  getSearchKey: function(e) {
    if(e.detail.value == '' || e.detail.value == null) {
      this.setData({
        noshow: false,
        searchKey: e.detail.value
      })
    } else {
      this.setData({
        noshow: true,
        searchKey: e.detail.value
      })
    }
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
    let _this = this;
    if(e.currentTarget.dataset.record != undefined) {
      _this.setData({
        searchKey: e.currentTarget.dataset.record,
        noshow: true
      })
    }
    //对历史记录的点击事件 已忽略
    let _searchKey = this.data.searchKey;
    if (!this.data.searchKey) {
      return
    }
    let history = wx.getStorageSync("history") || [], state = true;
    if(e.currentTarget.dataset.record != undefined) {
      for(let i = 0; i < history.length; i ++) {
        if( _searchKey == history[i]) {
          state = false;
        }
        if(e.currentTarget.dataset.record == history[i]) {
          state = false;
        }
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