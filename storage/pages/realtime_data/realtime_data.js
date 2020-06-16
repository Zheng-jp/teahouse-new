// storage/pages/realtime_data/realtime_data.js
import * as echarts from '../../../component/ec-canvas/echarts';
var app = getApp();
//温湿度仪表盘
function wdOption(realValue, type) {
  var data = {
    title: '',
    value: realValue,
    color: {
      wdColor: 'rgb(112,182,3)', //温度
      wdColorTips: 'rgb(2,131,15)', //温度提示
      sdColor: 'rgb(255,163,4)', //湿度
      sdColorTips: 'rgb(224,123,5)', //湿度提示
      value: '#fff', //底部数值颜色
    },
  }
  var option = {

    backgroundColor: "#fff",
    series: [{
      type: 'gauge',
      radius: '79%',
      min: (type == 1 ? -30 : 0), //最小刻度
      max: (type == 1 ? 70 : 100), //最大刻度
      splitNumber: 10, //刻度数量
      startAngle: (type == 1 ? '379.99' : '269.99'),
      endAngle: (type == 1 ? '20' : '-90'),
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: [
            [1, 'rgb(110,112,119)']
          ]
        }
      },
      axisLabel: {
        show: true,
        color: '#000',
        distance: 0,
        fontSize: 12,
        formatter: function (v) {
          if (type == 1) {
            switch (v + '') {
              case '-30':
                return '-30';
              case '-20':
                return '-20';
              case '-10':
                return '-10';
              case '0':
                return '0';
              case '10':
                return '10';
              case '20':
                return '20';
              case '30':
                return '30';
              case '40':
                return '40';
              case '50':
                return '50';
              case '60':
                return '60';
              case '70':
                return '-30';
            }
          } else {
            switch (v + '') {
              case '0':
                return '0';
              case '10':
                return '10';
              case '20':
                return '20';
              case '30':
                return '30';
              case '40':
                return '40';
              case '50':
                return '50';
              case '60':
                return '60';
              case '70':
                return '70';
              case '80':
                return '80';
              case '90':
                return '90';
              case '100':
                return '0';
            }
          }
        }
      }, //刻度标签。
      axisTick: {
        show: false,
        splitNumber: 5,
        lineStyle: {
          color: 'rgb(184,187,199)', //用颜色渐变函数不起作用
          width: 1,
        },
        length: 10
      }, //刻度样式
      splitLine: {
        show: true,
        length: 13,
        lineStyle: {
          color: 'rgb(184,187,199)', //用颜色渐变函数不起作用
          width: 1
        }
      }, //分隔线样式
      itemStyle: {
        normal: {
          show: false
        }
      },
      pointer: {
        show: true,
        length: '60%',
        width: 7, //指针粗细
      },
      z: 12,
      "detail": {
        "formatter": function (value) {
          var num = Math.round(value);
          return parseInt(num).toFixed(0) + (type == 1 ? '℃' : '%');
        },
        // "offsetCenter": ['30%', "60%"],
        "textStyle": {
          padding: [0, 0, 50, 0],
          "fontSize": 25,
          fontWeight: '700',
          "color": (type == 1 ? data.color.wdColorTips : data.color.sdColorTips)
        }
      },
      "title": {
        color: '#000',
        "fontSize": 14,
        //"offsetCenter": ['-20%', "30%"]
      },
      "data": [{
        "name": "",
        "value": data.value,
      }],
    },
    {
      title: {
        show: false
      },
      type: "gauge",
      radius: '79%',
      splitNumber: 10,
      startAngle: (type == 1 ? '379.99' : '269.99'),
      endAngle: (type == 1 ? '20' : '-90'),
      z: 11,
      "axisLine": {
        "lineStyle": {
          "color": [
            [data.value / 100, (type == 1 ? data.color.wdColor : data.color.sdColor)],
            [1, ("rgb(239,240,235)")]
          ],
          "width": 35,
          borderWidth: 5,
          borderColor: 'red'
        }
      },
      axisLabel: {
        show: false,
      },
      "axisTick": {
        show: false,

      },
      "splitLine": {
        "show": false,
      },
      pointer: {
        show: false
      },
      detail: {
        show: false
      },
    },
    {
      name: 'pie',
      type: 'pie',
      clockWise: true,
      startAngle: -270,
      radius: ['0%', '80%'],
      hoverAnimation: false,
      center: ['50%', '50%'],
      data: ['100'],
      z: 1,
      labelLine: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'rgb(230,230,230)',
        }
      }
    },
    ]
  };
  if (type == 1) {
    option.series[1].axisLine.lineStyle.color = [
      [(data.value / 100 > 0 ? 0.3 : 0.3 - Math.abs(data.value / 100)), '#EFF0EB'],
      [(data.value / 100 > 0 ? data.value / 100 + 0.3 : Math.abs(data.value / 100) + Math.abs(0.3 + data.value / 100)), (type == 1 ? data.color.wdColor : data.color.sdColor)],
      [1, ("rgb(239,240,235)")]
    ];
  }
  return option;
}
//24小时对比
function tfDbOption(onList, outList, type) {
  var x_data = ['0', '', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24']

  let option = {
    backgroundColor: "#fff",
    color: "#FF9F7F",
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(67,100,247,0.8)',
      padding: [10, 20],
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(67,100,247,0.08)'
        }
      }
    },
    legend: {
      data: [(type == 1 ? '温度' : '湿度'), (type == 1 ? '室外温度' : '室外湿度')],
      orient: "vertical",
      bottom: 'bottom',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: [{
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      boundaryGap: true,
      type: 'category',
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
        rotate: 0
      },
      data: x_data
    }],
    yAxis: [{
      type: 'value',
      name: (type == 1 ? '温度' : '湿度'),
      min: 0,
      splitNumber: 2,
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLabel: {
        fontSize: 10,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      // max: maxL,
      position: 'left',
    },
    {
      type: 'value',
      name: (type == 1 ? '室外温度' : '室外湿度'),
      min: 0,
      splitNumber: 2,
      nameTextStyle: {
        color: "#666",
        fontSize: 10
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      // max: maxL,
      position: 'right'
    }
    ],
    series: [{
      name: (type == 1 ? '温度' : '湿度'),
      type: 'bar',
      smooth: true,
      barWidth: 8,
      yAxisIndex: 0,
      itemStyle: {
        color: "rgb(112,182,3)"
      },
      data: onList
    },
    {
      name: (type == 1 ? '室外温度' : '室外湿度'),
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 5,
      yAxisIndex: 1,
      itemStyle: {
        color: 'rgb(245,154,35)'
      },
      data: outList
    }
    ]
  };
  return option;
}
//折线图
function zxOption(x_data, bar_data, line_data, type, qb) {
  let option = {
    backgroundColor: "#fff",
    color: "#FF9F7F",
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(67,100,247,0.8)',
      padding: [10, 20],
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(67,100,247,0.08)'
        }
      }
    },
    legend: {
      data: ['设备', '室外'],
      orient: "vertical",
      bottom: "bottom",
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: [{
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      type: 'category',
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: (qb == 1 ? 40 : 0)
      },
      data: x_data
    }],
    yAxis: [{
      type: 'value',
      name: '',
      min: "dataMin",
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      position: 'right'
    },
    {
      type: 'value',
      name: (type == 1 ? '温度' : '湿度'),
      min: "dataMin",
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      position: 'right'
    }
    ],
    series: [{
      name: '设备',
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      color: 'rgb(149,242,4)',
      data: bar_data
    },
    {
      name: '室外',
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      color: 'rgb(245,154,35)',
      data: line_data
    }
    ]
  };
  return option;
}
//对比折线图
function dbOption(dataArr, type) {
  let option = {
    backgroundColor: "#fff",
    color: "#FF9F7F",
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(67,100,247,0.8)',
      padding: [10, 20],
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(67,100,247,0.08)'
        }
      }
    },
    legend: {
      data: ['设备', '室外'],
      orient: "horizontal",
      top: "top",
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: [{
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      type: 'category',
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 40
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
      type: 'value',
      name: '',
      min: "dataMin",
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      position: 'right'
    },
    {
      type: 'value',
      name: '',
      min: "dataMin",
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      position: 'right'
    },
    {
      type: 'value',
      name: (type == 1 ? '温度' : '湿度'),
      min: "dataMin",
      nameTextStyle: {
        color: "#666",
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisLabel: {
        fontSize: 12,
        formatter: '{value}' + (type == 1 ? '℃' : '%'),
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      position: 'right'
    }
    ],
    series: []
  };
  let colors = ['rgb(149,242,4)', 'rgb(245,154,35)', 'rgb(125,34,41)', 'rgb(30,30,30)']
  for (let i = 0; i < dataArr[0].temArr.length; i++) {
    option.series.push({
      name: dataArr[0].name[i],
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      color: colors[i],
      data: dataArr[0].temArr[i]
    })
  }
  option.legend.data = dataArr[0].name;
  return option;
}
// 温度  第一个swiper-item
function setOption(chart, _this) {
  // console.log(option)
  let option = wdOption(0, 1);
  wx.request({
    url: app.globalData.tiltes + "get_humiture_new",
    method: "POST",
    data: {
      store_id: app.globalData.uniacid,
      house_name: _this.data.house_name
    },
    success: function (t) {
      if ("1" == t.data.status) option = wdOption(t.data.data.data.temperature.toFixed(2), 1);
      chart.setOption(option);
    }
  });
}

// 湿度  第一个swiper-item
function setOption2(chart, _this) {
  let option = wdOption(0, 2);
  wx.request({
    url: app.globalData.tiltes + "get_humiture_new",
    method: "POST",
    data: {
      store_id: app.globalData.uniacid,
      house_name: _this.data.house_name
    },
    success: function (t) {
      if ("1" == t.data.status) option = wdOption(t.data.data.data.humidity.toFixed(2), 2);
      chart.setOption(option);
    }
  });
}


// 历史数据温度  第二个swiper-item
function setOption3(chart, _this, date, yArr, temArr) {
  let option = zxOption(date, yArr, temArr, 1, 1);
  chart.setOption(option);
}
// 历史数据湿度
function setOption4(chart, _this, date, yArr, humArr) {
  let option = zxOption(date, yArr, humArr, 2, 1);
  chart.setOption(option);
}
//对比
function setOption5(chart, _this, dataArr) {
  let option;
  option = dbOption(dataArr, 1);
  chart.setOption(option);
}
function setOption6(chart, _this, dataArr) {
  let option;
  option = dbOption(dataArr, 2);
  chart.setOption(option);

}
//24小时
function setOption7(chart, _this, dataArr, temArr) {
  let option;
  var x_data = ['0', '', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24'];
  option = zxOption(x_data, dataArr, temArr, 1, 2);
  chart.setOption(option);

}
function setOption8(chart, _this, dataArr, humArr) {
  let option;
  var x_data = ['0', '', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24'];
  option = zxOption(x_data, dataArr, humArr, 2, 2);
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
      "deviceNo": "1MK7I336AEO708RT",
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
      "instrument": '1MK7I336AEO708RT',
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
    ecTfOne: {},
    ecTfTwo: {},
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
    // multiArray: [years, months, days, hours, minutes, seconds],
    multiArray: [years, months, days],
    // multiIndex: [1, 0, 0, 0, 0, 0],
    multiIndex: [1, 0, 0],
    choose_year: '',
    showText: false,
    isLive: false,
    isTips: false,
    videoUrl: '',
    houseList: [],
    yearArr: [],
    dbHouse: null,
    dbYear: null,
    dbType: 3,
    monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },

  // 查询用户选定日期的历史数据
  bindCheckHistory: function () {
    const etime = new Date(this.data.edate).getTime();
    const stime = new Date(this.data.sdate).getTime();
    // const etime = new Date(this.data.edate).getTime() + 57599000;
    // const stime = new Date(this.data.sdate).getTime() - 28800000;

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
      this.getHistoryData(app.formatDate(new Date(stime) / 1000), app.formatDate(new Date(etime) / 1000), 2);
    }
  },
  // 查询7天、14天历史数据
  bindSelectHist: function (e) {
    const curr = e.target.dataset.current
    this.setData({
      selectHistKey: curr
    })
    if (curr == 0) {
      // 七天数据
      const end = app.formatDate(new Date() / 1000);
      const start = app.formatDate(new Date() / 1000 - 604800 + 86400);
      this.getHistoryData(start, end, 2);
    } else if (curr == 1) {
      // 十四天数据
      const end = app.formatDate(new Date() / 1000);
      const start = app.formatDate(new Date() / 1000 - 1209600 + 86400);
      this.getHistoryData(start, end, 2);
    } else {
      // 三十天数据
      const end = app.formatDate(new Date() / 1000);
      const start = app.formatDate(new Date() / 1000 - 2592000 + 86400);
      this.getHistoryData(start, end, 2);
    }
  },
  getHumitureNew: function (house_name) {
    var a = this;
    wx.request({
      url: app.globalData.tiltes + "get_humiture_new",
      method: "POST",
      data: {
        store_id: app.globalData.uniacid,
        house_name: house_name
      },
      success: function (t) {
        "1" == t.data.status && a.setData({
          inTemp: t.data.data.data.temperature.toFixed(2),
          inHumi: t.data.data.data.humidity.toFixed(2),
          // outTemp: t.data.data.data2.tem,
          // outHumi: t.data.data.data2.humidity,
        });
      }
    });
    app.postData(app.globalData.tiltes + 'get_outside_humiture', { house_name: house_name }).then(res => {
      a.setData({
        outTemp: res.data.tem,
        outHumi: res.data.humidity,
      })
    })
  },
  // 获取设备历史数据
  getHistoryData: function (stime, etime, type) {
    // console.log(stime, etime)
    let _this = this, obArr = new Array(), temArr = new Array(), humArr = new Array();

    wx.request({
      url: app.globalData.tiltes + 'get_humiture_list',
      method: 'POST',
      data: {
        "stime": stime,
        "etime": etime,
        "uniacid": app.globalData.uniacid,
        "house_name": _this.data.house_name
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
          // _this.data.yArr3 = data.data[1];
          // _this.data.yArr4 = data.data[2];

          if (type == 2) { //历史记录

            data.data[0] = _this.unique(data.data[0]);
            for (let e = 0; e < data.data[0].length; e++) { //获取x轴坐标数组
              data.data[0][e] = (data.data[0][e]).split('2020/')[1];
            }
            data.data[1] = _this.selArr(data.data[1], data.data[0].length, 1);
            data.data[2] = _this.selArr(data.data[2], data.data[0].length, 1);
            obArr = _this.selArr(data.data[3], data.data[0].length, 2);
            for (let i = 0; i < obArr.length; i++) {
              temArr.push(obArr[i].tem);
              humArr.push(obArr[i].humidity.split('%')[0]);
            }
            _this.initThree(data.data[0], data.data[1], temArr);
            _this.initFour(data.data[0], data.data[2], humArr);
          } else { //24小时对比
            for (let i = 0; i < data.data[3].length; i++) {
              temArr.push(data.data[3][i].tem);
              humArr.push(data.data[3][i].humidity.split('%')[0]);
            }
            _this.initTfOne(data.data[1], temArr);
            _this.initTfTwo(data.data[2], humArr);
          }


        }
      }
    })
  },
  //数组去重
  unique: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {         //第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  },
  //随机挑选日期
  selArr: function (arr, length, type) {
    let newArr = new Array(), obj = { tem: "", humidity: "%" };
    for (let index = 0; index < length; index++) {
      if (type == 1) newArr.push((arr[(index * 2 + 1) / 2 * 24] != undefined ? arr[(index * 2 + 1) / 2 * 24 - 12] : (arr[(index * 2 + 1) / 2 * 24] == undefined ? '' : arr[(index * 2 + 1) / 2 * 24])));
      else newArr.push((arr[(index * 2 + 1) / 2 * 24] != undefined ? arr[(index * 2 + 1) / 2 * 24 - 12] : (arr[(index * 2 + 1) / 2 * 24] == undefined ? obj : '')));
    }
    return newArr;
  },

  clickTab: function (e) {
    // 切换选项卡
    let current = e.target.dataset.current,
      _this = this, ends = app.formatDate(new Date() / 1000), starts = app.formatDate(new Date(new Date().toLocaleDateString()).getTime() / 1000);
    // console.log(starts)
    if (_this.data.currentTab !== current) {
      _this.setData({
        currentTab: current,
        isLive: false
      })
    }
    if (current == 0) { //温湿度
      _this.initOne();
      _this.initTwo();
    } else if (current == 1) {// 24
      // _this.initTfOne(starts, ends);
      this.getHistoryData(starts, ends, 1);
    } else if (current == 2) { //历史
      let startnew = app.formatDate(new Date(new Date().toLocaleDateString()).getTime() / 1000 - 604800 + 86400);
      this.getHistoryData(startnew, ends, 2);
    } else {// 对比
      _this.startDb();
      // _this.initFive();

      // _this.initSix();
    }
  },

  bindswipermove: function (e) {
    // 滑动切换选项卡
    return;
  },
  close: function () {
    this.setData({
      isTips: !this.data.isTips
    })
  },
  //获取时间日期
  sbindMultiPickerChange: function (e) {
    // console.log(e)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    // const hour = this.data.multiArray[3][index[3]];
    // const minute = this.data.multiArray[4][index[4]];
    // const second = this.data.multiArray[5][index[5]];
    this.setData({
      // sdate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      sdate: year + '-' + month + '-' + day
    })
  },
  ebindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    // const hour = this.data.multiArray[3][index[3]];
    // const minute = this.data.multiArray[4][index[4]];
    // const second = this.data.multiArray[5][index[5]];
    this.setData({
      // edate: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      edate: year + '-' + month + '-' + day
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
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
  getVideo: function (name) {
    let _this = this;
    wx.request({
      url: app.globalData.tiltes + "api/getHouseLiveDetail",
      method: "POST",
      data: {
        store_id: app.globalData.uniacid,
        store_house_name: name
      },
      success: function (res) {
        // console.log(res)
        if (res.data.code == 1) {
          _this.setData({
            videoUrl: res.data.data.urls
          })
        }
      }
    });
  },
  //选择对比元素
  selHouse: function (e) {
    let instrument = (e.currentTarget.dataset.id).toString(),
      index = e.currentTarget.dataset.index,
      type = e.currentTarget.dataset.type,
      houseList = this.data.houseList,
      dbHouse = this.data.dbHouse,
      yearArr = this.data.yearArr,
      dbYear = this.data.dbYear;
    if (type == '1') {
      dbHouse = this.disposeArr(houseList, dbHouse, index, instrument, type);
    } else {
      dbYear = this.disposeArr(yearArr, dbYear, index, instrument, type);
    }

    this.setData({
      dbHouse: dbHouse,
      dbYear: dbYear
    })
  },
  //处理对比元素
  disposeArr: function (arr, dbObj, index, selYs, type) {
    let _this = this, selThisHouse = new Array(), dbType = 3;
    if (_this.data.dbHouse instanceof Array) dbType = 1;
    if (_this.data.dbYear instanceof Array) dbType = 2;
    if (!arr[index].isSel) {
      if (type == "1" && _this.data.dbYear instanceof Array) {
        if (_this.data.dbYear.length > 1 && dbObj != null) {
          wx.showToast({
            title: "年份已选多个，不能再增加仓库",
            icon: 'none',
            duration: 3000
          })
          return false;
        }
      }
      if (type == "2" && _this.data.dbHouse instanceof Array) {
        if (_this.data.dbHouse.length > 1 && dbObj != null) {
          wx.showToast({
            title: "仓库已选多个，不能再增加年份",
            icon: 'none',
            duration: 3000
          })
          return false;
        }
      }
      if (dbObj != null) {
        if (dbObj instanceof Array) dbObj.push(selYs);
        else {
          selThisHouse.push(dbObj);
          selThisHouse.push(selYs);
          dbObj = selThisHouse;
          if (type == "1") dbType = 1;
          else dbType = 2;
        }
      } else {
        dbObj = selYs
      }
    } else {
      if (dbObj instanceof Array) {
        if (dbObj.length > 1) {
          dbObj.splice(_this.contains(dbObj, selYs), 1);
          if (dbObj.length == 1) dbObj = dbObj.toString();
        }
        else dbObj = null;
      }
      else dbObj = null;
    }
    if (type == "1") {
      arr[index].isSel = !arr[index].isSel;
      this.setData({
        houseList: arr,
        dbType: dbType
      })
    } else {
      arr[index].isSel = !arr[index].isSel;
      this.setData({
        yearArr: arr,
        dbType: dbType
      })
    }
    return dbObj;
  },
  //获取元素在数组中的位置
  contains: function (a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return i;
      }
    }
    return false;
  },

  //开始对比
  startDb: function () {
    let t = this;
    if (t.data.dbHouse == null) {
      wx.showToast({
        title: "请选择仓库",
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (t.data.dbYear == null) {
      wx.showToast({
        title: "请选择年份",
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    app.postData(app.globalData.tiltes + "humi_comparison", {
      uniacid: app.globalData.uniacid,
      instrument: t.data.dbHouse,
      type: t.data.dbType,
      year: t.data.dbYear
    }).then(res => {
      // console.log(res)
      let temArr = new Array(),
        totalArr = new Array(),
        humArr = new Array(),
        totalArr1 = new Array(),
        zongArr = new Array(),
        humsArr = new Array(),
        nameArr = new Array();
      if (res.status == "1") {
        if (t.data.dbHouse instanceof Array) { //多仓库对比

          for (let u = 0; u < res.data.length; u++) {
            let unis = false;
            if (res.data[u].length > 0) {
              nameArr.push(res.data[u][0].house_name)
              for (let e = 0; e < t.data.monthsList.length; e++) {
                unis = true;
                for (let i = 0; i < res.data[u].length; i++) {
                  if (res.data[u][i].month == t.data.monthsList[e]) {
                    temArr.push(res.data[u][i].temperature);
                    humArr.push(res.data[u][i].humidity);
                    unis = false;
                  }
                }
                if (unis) temArr.push(""), humArr.push("");
                if (temArr.length == t.data.monthsList.length && humArr.length == t.data.monthsList.length) {
                  zongArr.push(temArr),
                    humsArr.push(humArr),
                    temArr = new Array();
                  humArr = new Array();
                }
              }
            }
          }
          totalArr.push({ temArr: zongArr, name: nameArr })
          totalArr1.push({ temArr: humsArr, name: nameArr })
        } else if (t.data.dbYear instanceof Array) { //多年份对比
          for (let u = 0; u < res.data.length; u++) {
            let unis = false;
            if (res.data[u].length > 0) {
              // console.log(res.data[u])
              nameArr.push(res.data[u][0].year)
              for (let e = 0; e < t.data.monthsList.length; e++) {
                unis = true;
                for (let i = 0; i < res.data[u].length; i++) {
                  if (res.data[u][i].month == t.data.monthsList[e]) {
                    temArr.push(res.data[u][i].temperature);
                    humArr.push(res.data[u][i].humidity);
                    unis = false;
                  }
                }
                if (unis) temArr.push(""), humArr.push("");
                if (temArr.length == t.data.monthsList.length && humArr.length == t.data.monthsList.length) {
                  zongArr.push(temArr),
                    humsArr.push(humArr),
                    temArr = new Array();
                  humArr = new Array();
                }
              }
            }
          }
          totalArr.push({ temArr: zongArr, name: nameArr })
          totalArr1.push({ temArr: humsArr, name: nameArr })

        } else {
          for (let e = 0; e < t.data.monthsList.length; e++) {
            let unis = true;
            for (let u = 0; u < res.data.length; u++) {
              if (res.data[u].month == t.data.monthsList[e]) {
                temArr.push(res.data[u].temperature);
                humArr.push(res.data[u].humidity);
                unis = false;
              }
            }
            if (unis) temArr.push(""), humArr.push("");
          }
          totalArr.push({ temArr: [temArr], name: [res.data[0].house_name] })
          totalArr1.push({ temArr: [humArr], name: [res.data[0].house_name] })
        }
        t.initFive(totalArr);
        t.initSix(totalArr1);
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this, dbStore;
    _this.getVideo(options.store_name);
    wx.setNavigationBarTitle({
      title: '实时详情(' + (options.store_name.length > 5 ? options.store_name.slice(0, 5) + '...' : options.store_name) + ')'
    })
    // 获取设备信息 （用户登录接口）
    // userLogin(this);

    // 时间
    setInterval(function () {
      getCurrentTime(_this);
    }, 1000);
    // 初始化 查看历史日期时间
    _this.getHumitureNew(options.store_name.slice(0, 2));
    app.postData(app.globalData.tiltes + "get_instrument", {
      uniacid: app.globalData.uniacid,
    }).then(t => {
      // console.log(t)
      if (t.status == "1") {
        for (let u = 0; u < t.data.length; u++) {
          if (t.data[u].store_name == options.store_name) t.data[u].isSel = true, dbStore = t.data[u].instrument_number;
          else t.data[u].isSel = false;
        }
        _this.setData({
          houseList: t.data,
          dbHouse: dbStore,
        })
      }

    })

    const date = new Date();
    let tYear = date.getFullYear(), yearArr = new Array();
    for (let i = 2019; i <= tYear; i++) {
      if (i == tYear) yearArr.push({ year: i.toString(), isSel: true });
      else yearArr.push({ year: i.toString(), isSel: false });
    }
    //设置默认的年份
    // 选择picker 初始化日期为当前 年月日时分秒
    _this.setData({
      sdate: app.formatDate(new Date(new Date().toLocaleDateString()).getTime() / 1000),
      edate: app.formatDate(new Date() / 1000),
      house_name: options.store_name.slice(0, 2),
      choose_year: this.data.multiArray[0][0],
      yearArr: yearArr,
      dbYear: tYear.toString(),
      multiIndex: [app.indexValue(years, date.getFullYear()),
      app.indexValue(months, date.getMonth() + 1),
      app.indexValue(days, date.getDate()),
        // app.indexValue(hours, date.getHours()),
        // app.indexValue(minutes, date.getMinutes()),
        // app.indexValue(seconds, date.getSeconds())
      ]
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { //这一步是一定要注意的
    this.oneComponent = this.selectComponent('#mychart-one');
    this.twoComponent = this.selectComponent('#mychart-two');
    this.threeComponent = this.selectComponent('#mychart-three');
    this.fourComponent = this.selectComponent('#mychart-four');
    this.fiveComponent = this.selectComponent('#mychart-five');
    this.sixComponent = this.selectComponent('#mychart-six');
    this.tfOneComponent = this.selectComponent('#mychart-tfOne');
    this.tfTwoComponent = this.selectComponent('#mychart-tfTwo');
    this.initOne();
    this.initTwo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
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
    // clearInterval(this.data.timer);
    // clearInterval(this.data.timer2);
  },
  initOne: function () { //初始化第一个图表
    var _this = this;
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: 200
      });
      setOption(chart, _this);
      this.chart = chart;
      return chart;
    });
  },
  initTwo: function () { //初始化第二个图表
    var _this = this;
    this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: 200
      });
      setOption2(chart, _this);
      this.chart = chart;
      return chart;
    });
  },
  // 查看历史数据  温度
  initThree: function (date, data, temArr) { //初始化第3个图表
    var _this = this;
    this.threeComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption3(chart, _this, date, data, temArr);
      this.chart = chart;
      return chart;
    });
  },

  initFour: function (date, data, humArr) { //初始化第4个图表
    var _this = this;
    this.fourComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption4(chart, _this, date, data, humArr);
      this.chart = chart;
      return chart;
    });
  },
  initFive: function (dataArr) { //初始化第4个图表
    var _this = this;
    this.fiveComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption5(chart, _this, dataArr);
      this.chart = chart;
      return chart;
    });
  },
  initSix: function (dataArr) { //初始化第4个图表
    var _this = this;
    this.sixComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption6(chart, _this, dataArr);
      this.chart = chart;
      return chart;
    });
  },
  initTfOne: function (dataArr, temArr) { //初始化24小时第一个图表
    var _this = this;
    this.tfOneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption7(chart, _this, dataArr, temArr);
      this.chart = chart;
      return chart;
    });
  },
  initTfTwo: function (dataArr, humArr) { //初始化24小时第二图表
    var _this = this;
    this.tfTwoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setOption8(chart, _this, dataArr, humArr);
      this.chart = chart;
      return chart;
    });
  },

  getOneOption: function () { //这一步其实就要给图表加上数据
    var _this = this;
    wx.request({
      url: 'https://api.dtuip.com/qy/device/queryDevMoniData.html', //你请求数据的接口地址
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: { //传的参数，这些都不用多说了吧
        "userApiKey": _this.data.userLogin.userApikey,
        "deviceNo": "1MK7I336AEO708RT",
        "flagCode": _this.data.userLogin.flagCode
      },
      success: function (res) {
        var res = res.data.deviceList[0].sensorList;
        _this.data.yArr.push(+res[0].value);
        _this.data.yArr2.push(+res[1].value);
      }
    })
  },

  showLive: function () {
    this.setData({
      isLive: !this.data.isLive
    })
  }
})