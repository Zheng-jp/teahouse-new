// storage/pages/realtime_data/realtime_data.js
import * as echarts from '../../../component/ec-canvas/echarts';
var app = getApp();
// 温度
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
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    }],
    yAxis: {
      type: 'value',
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
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
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
// 湿度
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
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    }],
    yAxis: {
      type: 'value',
      name: '湿度%',
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
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
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
      console.log(res.data.deviceList[0].sensorList);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    userLogin(this);

    setInterval(function(){
      getCurrentTime(_this);
    }, 1000);
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
    clearInterval(this.data.timer)
    clearInterval(this.data.timer2)
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