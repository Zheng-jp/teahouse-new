// storage/pages/realtime_data/realtime_data.js
import * as echarts from '../../../component/ec-canvas/echarts';
var app = getApp();
// 温度  第一个swiper-item
function setOption(chart, _this, yArr) {
  const option = {
    title: {
      text: '实时仓储温度(°C)',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    tooltip: {
      trigger: 'axis'
    },
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: true,
    grid: {
      show: false
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: (function() {
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          // res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          res.unshift((now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
            (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
            (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()));
          now = new Date(now - 2000);
        }
        return res;
      })()
    }],
    yAxis: {
      type: 'value',
      position: 'right',
      splitNumber: 3,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 2,
        formatter: function(value, index) {
          return value.toFixed(2);
        }
      },
      // name: '温度℃',
      scale: true,
      boundaryGap: [0.2, 0.2]
    },
    series: [{
      type: 'line',
      data: yArr,
    }]
  };
  _this.setData({
    timer: setInterval(function() {
      var now = new Date();
      var axisData = ((now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
        (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
        (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()));
      wx.request({
        url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html', //你请求数据的接口地址
        method: 'POST',
        data: {
          "userApiKey": _this.data.userLogin.userApikey,
          "deviceNo": "8606S86YL8295C5Y",
          "flagCode": _this.data.userLogin.flagCode
        },
        success: function(res) {
          if (res.data.flag == '00') {
            var res = res.data.deviceList[0].sensorList;
            var data0 = option.series[0].data;
            data0.shift();
            data0.push(+res[0].value);
            // 发送温湿度数据给后台
            setDevMoniData(res[0].value, res[1].value);
          }
        }
      })
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      chart.setOption(option);
    }, 2100)
  })
}

// 湿度  第一个swiper-item
function setOption2(chart, _this, yArr) {
  const option = {
    title: {
      text: '实时仓储湿度(%)',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    tooltip: {
      trigger: 'axis'
    },
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: true,
    grid: {
      show: false
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: (function() {
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          res.unshift((now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
            (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
            (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()));
          now = new Date(now - 2000);
        }
        return res;
      })()
    }],
    yAxis: {
      type: 'value',
      // name: '湿度%',
      position: 'right',
      min: 0,
      max: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 2,
      },
      scale: true,
      boundaryGap: [0.2, 0.2]
    },
    series: [{
      type: 'line',
      data: yArr,
    }]
  };

  _this.setData({
    showText: true,
    timer2: setInterval(function() {
      var now = new Date();
      var axisData = ((now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
        (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
        (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()));
      wx.request({
        url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html', //你请求数据的接口地址
        method: 'POST',
        data: {
          "userApiKey": _this.data.userLogin.userApikey,
          "deviceNo": "8606S86YL8295C5Y",
          "flagCode": _this.data.userLogin.flagCode
        },
        success: function(res) {
          if (res.data.flag == '00') {
            var res = res.data.deviceList[0].sensorList;
            var data0 = option.series[0].data;
            data0.shift();
            data0.push(+res[1].value);
          }
        }
      })
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      chart.setOption(option);
    }, 2100)
  })
}


// 历史数据温度  第二个swiper-item
function setOption3(chart, _this, date, yArr) {
  const option = {
    title: {
      left: 'center',
      text: '历史温度℃',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      position: 'right',
      boundaryGap: [0, '100%']
    },
    dataZoom: [{
      start: 0,
      end: 10,
    }],
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgb(255, 158, 68)'
        }, {
          offset: 1,
          color: 'rgb(255, 70, 131)'
        }])
      },
      data: yArr
    }]
  };
  chart.setOption(option);
}
// 历史数据湿度
function setOption4(chart, _this, date, yArr) {
  console.log('setOption4')
  const option = {
    title: {
      left: 'center',
      text: '历史湿度%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      position: 'right',
      boundaryGap: [0, '100%']
    },
    dataZoom: [{
      start: 0,
      end: 10,
    }],
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgb(255, 158, 68)'
        }, {
          offset: 1,
          color: 'rgb(255, 70, 131)'
        }])
      },
      data: yArr
    }]
  };
  chart.setOption(option);
}

// 获取当前时间
function getCurrentTime(_this) {
  var newDate = new Date();
  var currentTime = app.formatDate(newDate.getTime() / 1000),
    h = newDate.getHours(),
    m = newDate.getMinutes(),
    s = newDate.getSeconds(),
    m = addZero(m),
    s = addZero(s);
  _this.setData({
    beijingTime: currentTime
  })
}
// 给各位数时间加上0
function addZero(num) {
  return num > 10 ? num : '0' + num;
}
// 获取设备信息 （用户登录接口）
function userLogin(_this) {
  wx.request({
    url: 'https://api.dtuip.com/qy/user/login.html',
    method: 'POST',
    data: {
      "userName": "18510393696",
      "password": "zhcc63268696"
    },
    success(res) {
      _this.setData({
        userLogin: res.data
      })
      var len = 0;
      while (len < 10) {
        _this.getOneOption();
        len++;
      }
      if (len == 10) {
        _this.initOne();
        _this.initTwo();
      }
      //获取设备监控数据
      queryDevMoniData(res.data, _this);
    }
  })
}
// 获取设备监控数据
function queryDevMoniData(userData, _this) {
  wx.request({
    url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html',
    method: 'POST',
    data: {
      "userApiKey": userData.userApikey,
      "deviceNo": "8606S86YL8295C5Y",
      "flagCode": userData.flagCode
    },
    success(res) {
      // console.log(res.data);
      _this.setData({
        queryDevMoniData: res.data.deviceList[0],
        inTemp: (+res.data.deviceList[0].sensorList[0].value).toFixed(2),
        outTemp: (+res.data.deviceList[0].sensorList[2].value).toFixed(2),
        inHumi: (+res.data.deviceList[0].sensorList[1].value).toFixed(2),
        outHumi: (+res.data.deviceList[0].sensorList[3].value).toFixed(2),
      })
      // wx.setNavigationBarTitle({
      //   title: res.data.deviceList[0].deviceName
      // })
    }
  })
}
// 给后台发送温湿度数据
function setDevMoniData(temper, humidity) {
  wx.request({
    url: app.globalData.tiltes + 'get_humiture',
    method: 'POST',
    data: {
      "uniacid": app.globalData.uniacid,
      "instrument": '8606S86YL8295C5Y',
      "temperature": temper,
      "humidity": humidity,
    },
    success(res) {
      // console.log(res);
    }
  })
}


const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
const seconds = [];
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
// 获取秒
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  seconds.push("" + i);
}

Page({
  data: {
    ecOne: {
      lazyLoad: true
    },
    ecTwo: {
      lazyLoad: true
    },
    ecThree: {},
    ecFour: {},
    currentTab: 0,
    beijingTime: '',
    userLogin: {}, //设备用户登录信息
    queryDevMoniData: {}, //设备数据
    inTemp: 0.00,
    outTemp: 0.00,
    inHumi: 0.00,
    outHumi: 0.00,
    timer: '', //因为要实时刷新，所以设置了个定时器
    timer2: '',
    yArr: [], //init 温度
    yArr2: [], // init湿度
    yArr3: [], // 历史数据温度
    yArr4: [], // 历史数据湿度
    sdate: '', //开始日期
    edate: '', //结束日期
    selectHistKey: 0,
    multiArray: [years, months, days, hours, minutes, seconds],
    multiIndex: [1, 0, 0, 0, 0, 0],
    choose_year: '',
    showText: false,
  },

  // 查询用户选定日期的历史数据
  bindCheckHistory: function() {
    const etime = new Date(this.data.edate).getTime();
    const stime = new Date(this.data.sdate).getTime();
    if (etime - stime > 1209600000) {
      wx.showToast({
        title: '查询区间不能超过14天',
        icon: 'none',
        duration: 2000
      })
    } else if (etime - stime <= 0) {
      wx.showToast({
        title: '查询区间错误',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.getHistoryData(this.data.sdate, this.data.edate);
    }
  },
  // 查询7天、14天历史数据
  bindSelectHist: function(e) {
    const curr = e.target.dataset.current
    this.setData({
      selectHistKey: curr
    })
    if (curr == 0) {
      // 七天数据
      const end = app.formatDate(new Date() / 1000);
      const start = app.formatDate(new Date() / 1000 - 604800);
      this.getHistoryData(start, end);
    } else if (curr == 1) {
      // 十四天数据
      const end = app.formatDate(new Date() / 1000);
      const start = app.formatDate(new Date() / 1000 - 1209600);
      this.getHistoryData(start, end);
    }
  },
  // 获取设备历史数据
  getHistoryData: function(stime, etime) {
    console.log(stime, etime)
    let _this = this;
    wx.request({
      url: app.globalData.tiltes + 'get_humiture_list',
      method: 'POST',
      data: {
        "stime": stime,
        "etime": etime,
        "uniacid": app.globalData.uniacid
      },
      success(res) {
        let data = res.data;
        console.log(111, data)
        if (data.status != '1') {
          wx.showToast({
            icon: 'none',
            title: data.info
          })
          return false;
        } else {
          _this.data.yArr3 = data.data[1];
          _this.data.yArr4 = data.data[2];
          _this.initThree(data.data[0], data.data[1]);
          _this.initFour(data.data[0], data.data[2]);
        }
      }
    })
  },

  clickTab: function(e) {
    // 切换选项卡
    var current = e.target.dataset.current,
      _this = this;
    if (_this.data.currentTab !== current) {
      _this.setData({
        currentTab: current
      })
    }
    if (current == 0) {
      _this.initOne();
      _this.initTwo();
    } else {
      clearInterval(this.data.timer);
      clearInterval(this.data.timer2);
      // if (current == 1) {
      //   this.getHistoryData();
      // } else if (current == 2) {

      // }
    }
  },

  bindswipermove: function(e){
    // 滑动切换选项卡
    return;
  },

  //获取时间日期
  sbindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    const second = this.data.multiArray[5][index[5]];
    this.setData({
      sdate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    })
  },
  ebindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    const second = this.data.multiArray[5][index[5]];
    this.setData({
      edate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      this.setData({
        choose_year
      })
    }
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;

    // 获取设备信息 （用户登录接口）
    userLogin(this);

    // 时间
    setInterval(function() {
      getCurrentTime(_this);
    }, 1000);
    // 初始化 查看历史日期时间
    _this.setData({
      sdate: app.formatDate(new Date() / 1000 - 3600),
      edate: app.formatDate(new Date() / 1000)
    })

    const date = new Date();
    //设置默认的年份
    // 选择picker 初始化日期为当前 年月日时分秒
    this.setData({
      choose_year: this.data.multiArray[0][0],
      multiIndex: [app.indexValue(years, date.getFullYear()),
        app.indexValue(months, date.getMonth() + 1),
        app.indexValue(days, date.getDate()),
        app.indexValue(hours, date.getHours()),
        app.indexValue(minutes, date.getMinutes()),
        app.indexValue(seconds, date.getSeconds())
      ]
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() { //这一步是一定要注意的
    this.oneComponent = this.selectComponent('#mychart-one');
    this.twoComponent = this.selectComponent('#mychart-two');
    this.threeComponent = this.selectComponent('#mychart-three');
    this.fourComponent = this.selectComponent('#mychart-four');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer);
    clearInterval(this.data.timer2);
  },
  initOne: function() { //初始化第一个图表
    var _this = this;
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, _this, _this.data.yArr);
      this.chart = chart;
      return chart;
    });
  },
  initTwo: function() { //初始化第二个图表
    var _this = this;
    this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption2(chart, _this, _this.data.yArr2);
      this.chart = chart;
      return chart;
    });
  },
  // 查看历史数据  温度
  initThree: function(date, data) { //初始化第3个图表
    var _this = this;
    this.threeComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption3(chart, _this, date, data);
      this.chart = chart;
      return chart;
    });
  },

  initFour: function (date, data) { //初始化第4个图表
    var _this = this;
    this.fourComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption4(chart, _this, date, data);
      this.chart = chart;
      return chart;
    });
  },

  getOneOption: function() { //这一步其实就要给图表加上数据
    var _this = this;
    wx.request({
      url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html', //你请求数据的接口地址
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: { //传的参数，这些都不用多说了吧
        "userApiKey": _this.data.userLogin.userApikey,
        "deviceNo": "8606S86YL8295C5Y",
        "flagCode": _this.data.userLogin.flagCode
      },
      success: function(res) {
        var res = res.data.deviceList[0].sensorList;
        _this.data.yArr.push(+res[0].value);
        _this.data.yArr2.push(+res[1].value);
      }
    })
  },
})