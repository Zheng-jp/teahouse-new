//index.js
const app = getApp();

Page({
  data: {
    searchKey: "",
    history: [],
    record: '',
    goods: []
  },
  //获取input文本
  getSearchKey: function (e) {
    if (e.detail.value == '' || e.detail.value == null) {
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
  newRedirectto: function (n, e) {
    switch (e) {
      case "page":
        wx.navigateTo({
          url: n
        });
        break;
      case "pages":
        wx.switchTab({
          url: n
        });
        break;
      case "webs":
        wx.navigateTo({
          url: n
        });
        break;
      case "tel":
        n = n.slice(4), wx.showModal({
          title: "提示",
          content: "是否拨打电话:" + n,
          success: function (e) {
            1 == e.confirm && wx.makePhoneCall({
              phoneNumber: n
            });
          }
        });
        break;

      case "map":
        var a = n.split("##");
        n = a[0].split(","), wx.openLocation({
          latitude: parseFloat(n[0]),
          longitude: parseFloat(n[1]),
          scale: 22,
          name: a[1],
          address: a[2]
        });
        break;

      case "mini":
        var i = n.slice(6);
        wx.navigateToMiniProgram({
          appId: i,
          path: "",
          success: function (e) {
            console.log("打开成功"), console.log(i);
          }
        });
    }
  },
  redirectto: function (t) {
    var a = t.currentTarget.dataset.link,
      e = t.currentTarget.dataset.linktype;
    this.newRedirectto(a, e);
  },
  // 清空page对象data的history数组 重置缓存为[]
  clearHistory: function () {
    this.setData({
      history: []
    })
    wx.setStorageSync("history", [])
  },
  // input失去焦点函数
  routeToSearchResPage: function (e) {
    let _this = this;
    if (e.currentTarget.dataset.record != undefined) {
      _this.setData({
        searchKey: e.currentTarget.dataset.record,
        noshow: true
      })
    }
    //对历史记录的点击事件 已忽略
    let _searchKey = this.data.searchKey;
    if (!this.data.searchKey) {
      _this.onShow();
      return;
    }
    let history = wx.getStorageSync("history") || [], state = true;

    for (let i = 0; i < history.length; i++) {
      if (_searchKey == history[i]) {
        state = false;
      }
      if (e.currentTarget.dataset.record != undefined) {
        if (e.currentTarget.dataset.record == history[i]) {
          state = false;
        }
      }
    }
    if (state) {
      history.push(this.data.searchKey)
      wx.setStorageSync("history", history);
    }
    wx.request({
      url: app.globalData.tiltes + "getSearchGood",
      data: {
        member_id: app.globalData.member_id,
        uniacid: app.globalData.uniacid,
        goods_name: _searchKey
      },
      method: "post",
      success: function (res) {
        // console.log(res.data)
        let goods = res.data.data, arr = [], url = app.globalData.img_url;
        if (res.data.status == 1) {
          // console.log(goods)
          for (let i = 0; i < goods.length; i++) {
            res.data.data[i].linktype = "page";
            res.data.data[i].linkurl = "/pages/goods_detail/goods_detail?title=" + goods[i].id;
            // console.log(res.data.data)
          }
          _this.setData({
            goods: res.data.data,
            url: url
          })
          // console.log(_this.data.goods)
        } else {
          wx.showToast({
            title: '无该商品',
            icon: 'none'
          });
          _this.setData({
            searchKey: '',
            noshow: false
          });
          _this.onShow();
          return;
        }
      },
      fail: function () { },
      complete: function () { }
    })
    // this.onShow()
  },
  //每次显示钩子函数都去读一次本地storage
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  }
})