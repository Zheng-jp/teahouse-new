const app = getApp();
Component({
  data: {
    // selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [],
    baseUrl: app.globalData.img_url
  },
  attached() {
    const _this = this;
    wx.request({
      url: app.globalData.baseurl + "doPageGetFoot",
      cachetime: "30",
      data: {
        uniacid: app.globalData.uniacid,
        foot: 2
      },
      success: function (res) {
        var data = res.data.data;
        var nowUrl = '/'+getCurrentPages()[0].route;
        for(let prop in data.data){
          if(data.data[prop].linkurl.indexOf('pages') == -1){
            data.data[prop].linkurl = '/pages' + data.data[prop].linkurl;
          }
          console.log(data.data[prop].linkurl, nowUrl, nowUrl.indexOf(data.data[prop].linkurl))
          if(data.data[prop].linkurl.indexOf(nowUrl) != -1){
            data.data[prop].change = true;
          }else{
            data.data[prop].change = false;
          }
        }
        _this.setData({
          list: data
        })
        // console.log(_this.data.list);
      }
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      console.log(this.data.list)
      wx.switchTab({
        url: url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})