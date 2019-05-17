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
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: true,
    grid: {
      show: false
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          // res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          res.unshift((now.getHours()<10?'0'+now.getHours():now.getHours())+':'+
          (now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes())+':'+
          (now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()));
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
        formatter: function(value, index){
          return value.toFixed(2);
        }
      },
      name: '温度℃',
      scale: true,
      boundaryGap: [0.2, 0.2]
    },
    series: [{
      type: 'line',
      data: yArr,
    }]
  };
  _this.setData({
    timer: setInterval(function () {
      var now = new Date();
      var axisData = ((now.getHours()<10?'0'+now.getHours():now.getHours())+':'+
      (now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes())+':'+
      (now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()));
      wx.request({
        url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html',    //你请求数据的接口地址
        method: 'POST',
        data: {               //传的参数，这些都不用多说了吧
          "userApiKey": _this.data.userLogin.userApikey,
          "deviceNo": "8606S86YL8295C5Y",
          "flagCode": _this.data.userLogin.flagCode
        },
        success: function (res) {
          var res = res.data.deviceList[0].sensorList;
          var data0 = option.series[0].data;
          data0.shift();
          data0.push(+res[0].value);
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
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: true,
    grid: {
      show: false
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          res.unshift((now.getHours()<10?'0'+now.getHours():now.getHours())+':'+
          (now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes())+':'+
          (now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()));
          now = new Date(now - 2000);
        }
        return res;
      })()
    }],
    yAxis: {
      type: 'value',
      name: '湿度%',
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
    timer2: setInterval(function () {
      var now = new Date();
      var axisData = ((now.getHours()<10?'0'+now.getHours():now.getHours())+':'+
      (now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes())+':'+
      (now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()));
      wx.request({
        url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html',    //你请求数据的接口地址
        method: 'POST',
        data: {               //传的参数，这些都不用多说了吧
          "userApiKey": _this.data.userLogin.userApikey,
          "deviceNo": "8606S86YL8295C5Y",
          "flagCode": _this.data.userLogin.flagCode
        },
        success: function (res) {
          var res = res.data.deviceList[0].sensorList;
          var data0 = option.series[0].data;
          data0.shift();
          data0.push(+res[1].value);
        }
      })
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      chart.setOption(option);
    }, 2100)
  })
}

// 获取当前时间
function getCurrentTime(_this){
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
function addZero(num){
  return num > 10 ? num : '0' + num;
}
// 获取设备信息 （用户登录接口）
function userLogin(_this){
  wx.request({
    url: 'https://api.dtuip.com/qy/user/login.html',
    method: 'POST',
    data: {
      "userName": "18510393696",
      "password": "zhcc63268696"
    },
    success(res){
      console.log(res.data);
      _this.setData({
        userLogin: res.data
      })
      var len = 0;
      while(len < 10){
        _this.getOneOption();
        len++;
      }
      if(len==10){
        _this.initOne();
        _this.initTwo();
      }
      //获取设备监控数据
      queryDevMoniData(res.data, _this);
    }
  })
}
// 获取设备监控数据
function queryDevMoniData(userData, _this){
  wx.request({
    url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html',
    method: 'POST',
    data: {
      "userApiKey": userData.userApikey,
      "deviceNo": "8606S86YL8295C5Y",
      "flagCode": userData.flagCode
    },
    success(res){
      console.log(res.data);
      _this.setData({
        inTemp: (+res.data.deviceList[0].sensorList[0].value).toFixed(2),
        outTemp: (+res.data.deviceList[0].sensorList[2].value).toFixed(2),
        inHumi: (+res.data.deviceList[0].sensorList[1].value).toFixed(2),
        outHumi: (+res.data.deviceList[0].sensorList[3].value).toFixed(2),
      })
      wx.setNavigationBarTitle({
        title: res.data.deviceList[0].deviceName
      })
    }
  })
} 

const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecOne: {
      lazyLoad: true
    },
    ecTwo: {
      lazyLoad: true
    },
    currentTab: 0,
    beijingTime: '',
    userLogin: {},
    inTemp: 26.22,
    outTemp: 26.22,
    inHumi: 79.33,
    outHumi: 79.33,
    timer: '',//因为我要实时刷新，所以设置了个定时器
    timer2: '',
    yArr: [], //init 温度
    yArr2: [], // init湿度
    sdate: '2018-09-01',//开始日期
    edate: '2018-09-01',//结束日期
    selectHistKey: 0,
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: ''
  },
  bindSelectHist: function(e){
    this.setData({
      selectHistKey: e.target.dataset.current
    })
  },

  clickTab: function(e){
    // 切换选项卡
    var current = e.target.dataset.current,
        _this = this;
    if(_this.data.currentTab !== current){
      _this.setData({
        currentTab: current
      })
    }
  },

  swiperTab: function(e){
    // 滑动切换选项卡
    var current = e.detail.current;
    this.setData({
      currentTab: current
    })
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
    this.setData({
      sdate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
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
    this.setData({
      edate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
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
  onLoad: function (options) {
    var _this = this;

    userLogin(this);

    setInterval(function(){
      getCurrentTime(_this);
    }, 1000);
    // 初始化 查看历史日期时间
    _this.setData({
      sdate: new Date().toLocaleDateString().replace(/\//g, '-'),
      edate: new Date().toLocaleDateString().replace(/\//g, '-')
    })

    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {//这一步是一定要注意的
    this.oneComponent = this.selectComponent('#mychart-one');
    this.twoComponent = this.selectComponent('#mychart-two');
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
    clearInterval(this.data.timer);
    clearInterval(this.data.timer2);
  },
  initOne: function () {           //初始化第一个图表
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
  initTwo: function (xdata, ydata) {        //初始化第二个图表
    var _this = this;
    this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption2(chart, _this, _this.data.yArr2)
      this.chart = chart;
      return chart;
    });
  },
  getOneOption: function () {        //这一步其实就要给图表加上数据
    var _this = this;
    wx.request({
      url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html',    //你请求数据的接口地址
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {               //传的参数，这些都不用多说了吧
        "userApiKey": _this.data.userLogin.userApikey,
        "deviceNo": "8606S86YL8295C5Y",
        "flagCode": _this.data.userLogin.flagCode
      },
      success: function (res) {
        var res = res.data.deviceList[0].sensorList;
        _this.data.yArr.push(+res[0].value);
        _this.data.yArr2.push(+res[1].value);
      }
    })
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