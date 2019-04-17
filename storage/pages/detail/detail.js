// pages/detail/detail.js
const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    releaseFocus: false,
    clickDay: 0,
    show_start_time: 0,
    show_end_time: 0,
    mengShow: false,
    aniStyle: true,
    start_time:0,
    end_time:0,
    Label: [
      {
        name: '仅限会员',
        color: '#93291E'
      },
      {
        name: '需要预约',
        color: '#669900'
      }
    ],
    information: [],
    // 输入框内容
    repay_content: '',
    apply: null,
    repay_informatiom: [],
    title: null,
    collectionimg: false,
  },
  /**
* 点击回复
*/
  bindReply: function (e) {
    var that = this;
    that.setData({
      releaseFocus: true
    })
  },
  // 输入框输入事件
  bindinputs: function (e) {
    var that = this;
    that.setData({
      repay_content: e.detail.value
    })
  },
  onShareAppMessage: function () {
    console.log("分享")
    let that = this;
    return {
      title: '简直走别拐弯', // 转发后 所显示的title
      path: '/pages/logs/logs', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },


  // 评论输入框发送事件
  comments: function (e) {
    var that = this;
    that.setData({
      releaseFocus: false
    })
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment',
      data: {
        user_id: app.globalData.gmemberid,
        comment_details: that.data.repay_content,
        teahost_id: that.data.information.id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        that.setData({
          repay_content: ''
        });
        that.onShow();
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  good: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment_updata',
      data: {
        user_id: app.globalData.gmemberid,
        teahost_id: that.data.information.id,
        id: e.currentTarget.dataset.id
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        // var lists=that.data.repay_informatiom;
        // for (var i = 0; i <lists.length;i++){
        //   if(lists[i].id==e.currentTarget.dataset.id){
        //     lists[i].status=1;
        //   }

        //  }
        //  that.setData({
        //   repay_informatiom: lists
        // }) 
        that.onShow();
      },
      fail: function () {

      },
      complete: function () {
      }

    });
  },
  close: function (e) {
    var that = this;
    that.setData({
      releaseFocus: false
    })
    that.setData({
      repay_content: ''
    })
  },
  //日历显示控制
  showMeng: function(e) {
    this.setData({
      mengShow: true, //蒙层显示
      aniStyle: true　　　　　　　//设置动画效果为slideup
      
    })

  },
  outbtn: function (e) {
   // 这是日历外部的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
    var that = this;
    this.setData({
      aniStyle: false　
    })
    setTimeout(function () {
      //延时设置蒙层的隐藏，这个定时器的时间,不设置定时器会导致动画效果看不见
      that.setData({
        mengShow: false
      })
    }, 500)
  },
  inbtn: function (e) {
  }, 

  collection: function (e) {
    var that = this;
    var id = that.data.title;
    wx.request({
      url: app.globalData.tiltes + 'collect',
      data: {
        member_id: app.globalData.member_id,
        activity_id: id,
      },
      method: "post",

      success: function (res) {
        if (res.data.status == "1") {
          that.setData({
            collectionimg: true,
          })

        }
      },
      fail: function () {

      },
      complete: function (res) {
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        });
      }

    });
  },
  delect_collection: function (e) {
    var that = this;
    var id = that.data.title;

    wx.request({
      url: app.globalData.tiltes + 'collect_updata',
      data: {
        member_id: app.globalData.member_id,
        activity_id: id,
      },
      method: "post",

      success: function (res) {
        that.setData({
          collectionimg: false,
        })

      },
      fail: function () {

      },
      complete: function (res) {
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        });
      }

    });
  },
    

  /*
   * 时间戳转换为yyyy-MM-dd hh:mm:ss 格式  formatDate()
   * inputTime   时间戳
   */

  formatDate: function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;
  },
  formatDay: function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y  + m  + d;
  },
  
  
  dateInit: function (setYear, setMonth) {
    // console.log(that.data.information);
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;
    let months = month;
    let state = false;
    let weight;
    let todayTime;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    
    months = months + 1;
    if (months < 10) {
      months = '0' + months;
    }

    var start_time = this.data.information.start_time * 1000;
    var end_time = this.data.information.end_time * 1000;
    // console.log(this.formatDay(end_time))
    start_time = Number(this.formatDay(start_time));
    end_time = Number(this.formatDay(end_time));
    var timeDiff = this.data.information.end_time - this.data.information.start_time;
    timeDiff = Number(timeDiff / 86400);

    var ins;
    var timeArr = [];
    var timeC = [this.data.information.start_time];

    for(let j = 0; j < timeDiff; j++) {
      timeC.push(Number(timeC[j]) + 86400);
    }
    for (let u = 0; u < timeC.length; u++) {
      ins = this.formatDay(timeC[u] * 1000);
      timeArr.push(ins);
    }
    // console.log(timeArr)
    // console.log(this.data.information)
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        if(num < 10) {
          num = '0' + num;
        }
    
        //已预约的时间
        todayTime = parseInt('' + year + months + num);
        state = false;
        var indexId;
        for (let r = 0; r < timeArr.length; r++) {
          if (Number(timeArr[r]) == Number(todayTime)) {
            // console.log(r)
            state = true;
            weight = this.data.information.day_array[r];
            indexId = r;
          }
          // console.log(weight)
        }
        
        // console.log(parseInt('' + year + (month + 1) + num))
        obj = {
          isToday: todayTime,
          dateNum: num,
          weight: weight || '',
          state: state,
          start_time: start_time,
          end_time: end_time,
          indexId: indexId
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }

   


    //  console.log(dateArr)
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  // 选中日期
  changeColor: function (e) {
    var that = this;
    var data = e.currentTarget;
    var clickDate;
    var dateArr = that.data.dateArr;
    clickDate = data.dataset.date;
    
    // console.log(e)
    // console.log(clickDate)
    if (dateArr[data.id].state == true) {
      that.setData({
        clickDay: clickDate
    })
      console.log(clickDate)
    console.log(Number(Date.parse(clickDate)));
      //选中调起支付
      wx.request({
        url: app.globalData.tiltes + 'activity_order',
        data: {
          open_id: app.globalData.gmemberid,
          activity_id: that.data.information.id,
          start_time: clickDate
        },
        method: "post",
        // header: {
        //   "Content-Type": "application/json" // 默认值

        // },
        success: function (res) {
          console.log(res)
          var order_number = res.data.data;
          wx.request({
            // url: app.globalData.tiltes + 'wxpay',
            url: app.globalData.tiltes + 'wx_index',
            data: {
              open_id: app.globalData.gmemberid,
              cost_moneny: that.data.information.cost_moneny,
              activity_name: that.data.information.activity_name,
              order_number: order_number
            },
            dataTypr: 'json',
            method: "post",
            // header: {
            //   "Content-Type": "application/json" // 默认值
            // },
            success: function (res) {
              var result = res;
              if (result) {
                wx.requestPayment({
                  timeStamp: String(result.data.timeStamp),
                  nonceStr: result.data.nonceStr,
                  package: result.data.package,
                  signType: result.data.signType,
                  paySign: result.data.paySign,
                  'success': function (successret) {
                    console.log('支付成功');
                    that.setData({
                      apply: 1,
                    });
                  },
                  'fail': function (res) {
                    wx.request({
                      url: app.globalData.tiltes + 'activity_order_delete',
                      data: {
                        parts_order_number: order_number
                      },
                      method: "post",
                      success: function (res) {

                      },
                      fail: function () {

                      },
                      complete: function () {
                        wx.hideLoading()
                      }

                    });
                  }
                })
              }
            },
            fail: function () {

            },
            complete: function () {
              wx.hideLoading()
            }
          });
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
    var that = this;
    var title = options.title;
    that.setData({
      title: title,
    });
    wx.request({
      url: app.globalData.tiltes + 'activity_status',
      data: {
        id: options.title,
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        that.setData({
          apply: res.data.status,
        });

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'teacenter_detailed',
      data: {
        id: options.title
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {
        that.setData({
          information: res.data.data
        });
        // console.log(res.data.data)
        var article = res.data.data.commodity;
        WxParse.wxParse('article', 'html', article, that, 5);
        // console.log(res.data.data)
        if (res.data.data.requirements == 1 && res.data.data.open_request == 1) {
          that.setData({
            Label: [
              {
                name: '仅限会员',
                color: '#93291E'
              },
              {
                name: '需要预约',
                color: '#669900'
              }
            ]})
          
        }
        if (res.data.data.requirements == 1 && res.data.data.open_request == 0) {
          that.setData({
            Label: [
              {
                name: '需要预约',
                color: '#669900'
              }
            ]
          })
          
        }
        if (res.data.data.requirements == 0 && res.data.data.open_request == 1) {
          that.setData({
            Label: [
              {
                name: '仅限会员',
                color: '#93291E'
              }
            ]
          })
         
        }
        if (res.data.data.requirements == 0 && res.data.data.open_request == 0) {
          that.setData({
            Label: []
          })
        }

        var show_start_time =  that.formatDate(res.data.data.start_time * 1000);
        var show_end_time = that.formatDate(res.data.data.end_time * 1000);
        that.setData({
          show_start_time: show_start_time,
          show_end_time: show_end_time
        })

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    wx.request({
      url: app.globalData.tiltes + 'collect_judge',
      data: {
        activity_id: options.title,
        member_id: app.globalData.member_id,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {

        if (res.data.status == "0") {
          that.setData({
            collectionimg: false,
          })
        }
        else {
          that.setData({
            collectionimg: true,
          })
        }

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let months = month;
    
    
    setTimeout(function () {
      that.dateInit();
    }, 500)

    if (months < 10) {
      months = '0' + months;
    }
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + months + now.getDate()
    })
    //缓存当日时间戳
    this.setData({
      clickDay: that.data.isToday
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

    var that = this;
   
    wx.request({
      url: app.globalData.tiltes + 'teacenter_comment_show',
      data: {
        teahost_id: that.data.title,
      },
      method: "post",
      // header: {
      //   "Content-Type": "application/json" // 默认值

      // },
      success: function (res) {

        that.setData({
          repay_informatiom: res.data.data,
        });
        var list = that.data.repay_informatiom;
        for (var i = 0; i < list.length; i++) {
          list[i].create_time = that.formatDate(list[i].create_time * 1000)
        }
        that.setData({
          repay_informatiom: list,
        });
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

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