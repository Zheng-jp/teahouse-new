// pages/meeting/meeting.js
import templates from '../../utils/template'
const app = getApp();
Page({

  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航
   tab:0,
   
  nav:[],
  shares:[
    {
       share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
        code: '10',
        hot: 'HOT',
        classification: '特点活动',
           share_content: "20180809马连道茶话话会报名参加中马连道201参加中马连道中马连道中马连道进......",
        validity: '长期',


      }
       
    ],
    },
    {
      share: [
        {
          name: '双骄',
          url: '/pages/Course/course',
          icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
          code: '10',
          hot: 'HOT',
          classification: '特点活动',
          share_content: "20180809马连道茶话话会报名参加中马连道201参加中马连道中马连道中马连道进......",
          validity: '长期',


        },
      ],
    },
    {
      share: [
        {
          name: '双骄',
          url: '/pages/Course/course',
          icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
          code: '10',
          hot: 'HOT',
          classification: '特点活动',
          share_content: "20180809马连道茶话话会报名参加中马连道201参加中马连道中马连道中马连道进......",
          validity: '长期',


        },
      ],
    },
    {
      share: [
        {
          name: '双骄',
          url: '/pages/Course/course',
          icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
          code: '10',
          hot: 'HOT',
          classification: '特点活动',
          share_content: "20180809马连道茶话话会报名参加中马连道201参加中马连道中马连道中马连道进......",
          validity: '长期',


        },
      ],
    },
  ],
  // 分享
    // share: [
    //   {
    //     name: '双骄',
    //     url: '/pages/Course/course',
    //     icon: app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
    //     code: '10',
    //     hot: 'HOT',
    //     classification: '特点活动',
    //     share_content: "20180809马连道茶话会报名参加中马连道进......",
    //     validity: '长期',
       

    //   }
    // ],
    // 搜索列表
    showView: true,
    seach_list:[
      '未过期',
      '未过期',
      '未过期'
    ]
  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    console.log(e);
    //  点击添加类
    if (that.data.nav.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },
  // 点击搜索
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  bindViewTap: function (event) {
    console.log("nihao////" + event)
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
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
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title);
    wx.request({
      url: app.globalData.tiltes + 'teacenter_display',
      data: {
        id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        that.setData({
          nav: res.data.data,
        });
        //  添加字段到等级数组
        for (var index in that.data.nav) {
          var sexParam = "nav[" + index + "].tab";
          that.setData({
            [sexParam]: index,
          })

        }
       

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'teacenter_activity',
      data: {
        // id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
        console.log(res);
        // that.setData({
        //   nav: res.data.data,
        // });
        //  添加字段到等级数组
        // for (var index in that.data.nav) {
        //   var sexParam = "nav[" + index + "].tab";
        //   that.setData({
        //     [sexParam]: index,
        //   })

        // }


      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res )
        console.log("屏幕的高和宽：" + res.windowHeight + "===" + res.windowWidth, )
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    showView: (options.showView == "true" ? true : false)
    
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