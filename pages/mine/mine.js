var app = getApp();
//引用外部文件（需要暴露util.js里面的formatNumber()函数）
var TimeUtil = require('../../utils/util.js');
var bannerList = [
  { 'cateid': 12134, 'catename': '职场', 'show': false },
  { 'cateid': 12235, 'catename': '政治', 'show': false },
  { 'cateid': 122316, 'catename': '经济', 'show': false },
  { 'cateid': 112317, 'catename': '文化', 'show': false },
  { 'cateid': 123228, 'catename': '生活', 'show': false },
  { 'cateid': 12134, 'catename': '职场', 'show': false },
  { 'cateid': 12235, 'catename': '政治', 'show': false },
  { 'cateid': 122316, 'catename': '经济', 'show': false },
  { 'cateid': 112317, 'catename': '文化', 'show': false },
  { 'cateid': 123228, 'catename': '生活', 'show': false },
  { 'cateid': 12134, 'catename': '职场', 'show': false },
  { 'cateid': 12235, 'catename': '政治', 'show': false },
  { 'cateid': 122316, 'catename': '经济', 'show': false },
  { 'cateid': 112317, 'catename': '文化', 'show': false },
  { 'cateid': 123228, 'catename': '生活', 'show': false },
]
Page({
  data: {
  },
  onLoad: function (options) {
    //初始化相关参数
    this.setData({
      maxId: 0,
      cateid: 0,
      selections: bannerList
    })
    this.loadNews(0);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    // maxId初始化
    this.setData({
      maxId: 0
    });
    下拉加载新闻
    this.loadNews(0);
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    this.loadNews(2)
  },
  bannerClick: function (e) {
    //刷新新闻类目
    var dataset = e.currentTarget.dataset;
    for (var i in bannerList) {
      bannerList[i].show = false;
    }
    bannerList[dataset.idx].show = true;
    // 数据是双向绑定,直接更新对应数据,页面会加载新数据
    // 新闻类目切换
    this.setData({
      cateid: dataset.cid,
      maxId: 0,
      selections: bannerList
    })
    this.loadNews(1);
  },
  /**
   * loadType 0,初始化/切换新闻类目 1,上拉刷新 2,下拉加载数据
   */
  loadNews: function (loadType) {
    var that = this;
    wx.request({
      url: '此处是查询新闻信息的接口',
      data: {
        format: 'json',
        maxId: this.data.maxId,
        categoryId: this.data.cateid,
        pageCounts: 10
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var newsData = res.data;
        //当数据存在时
        if (newsData.total > 0) {
          var newInfoList = newsData.data;
          var today = new Date();
          //日期以及title长度处理
          for (var i in newInfoList) {
            //日期处理
            newInfoList[i].CreatTime = that.operateDate(today, newInfoList[i].CreatTime);
            //长度处理
            //var title = newInfoList[i].Title;
            //if(title.length>76){
            //newInfoList[i].Title = title.substrings(0,73) + '...';
            //newInfoList[i].Title = title.substring(0,73) + '...';
            //}
          }
          var newList = that.data.newsList;
          //下拉刷新,新增数据
          if (loadType == 2) {
            for (var i in newInfoList) {
              newList.push(newInfoList[i]);
            }
          } else {
            newList = newInfoList;
          }
          //数据展示
          that.setData({
            newsList: newList,
            maxId: newInfoList[9].NewsId
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  newsClick: function (e) {
    //dataset内包含data-*的数据
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?title=' + dataset.ntitle + '&newsId=' + dataset.nid + '&source=' + dataset.nsource + '&pic=' + dataset.nimg
    })
  },
  operateDate: function (today, date) {
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var time = today.getTime();
    //新闻时间
    var newtime = Date.parse(date);
    var newDate = new Date(newtime);
    var newyear = newDate.getFullYear();
    var newmonth = newDate.getMonth();
    var newday = newDate.getDate();
    //不同年
    if (newyear < year) {
      return newyear + '-' + TimeUtil.formatNumber(newmonth + 1) + '-' + TimeUtil.formatNumber(newday);
    } else if (newday < day) { //同年不同天
      //24小时以内
      if (time - newtime < 1000 * 60 * 60 * 24) {
        return "昨天" + TimeUtil.formatNumber(newDate.getHours()) + ':' + TimeUtil.formatNumber(newDate.getMinutes());
      } else {
        return TimeUtil.formatNumber(newmonth + 1) + '-' + TimeUtil.formatNumber(newday);
      }
    } else {
      //1小时以内
      if (time - newtime < 1000 * 60 * 60) {
        return parseInt((time - newtime) / 1000 / 60) + '分钟前';
      } else {
        return TimeUtil.formatNumber(newDate.getHours()) + ':' + TimeUtil.formatNumber(newDate.getMinutes());
      }
    }
  }
})
