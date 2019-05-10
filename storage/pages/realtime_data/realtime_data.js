// storage/pages/realtime_data/realtime_data.js
import * as echarts from '../../../component/ec-canvas/echarts';
var app = getApp();
function initChart(canvas, width, height){
  var chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);

  var option = {
    title: {
      text: '实时仓储温度(°C)',
      left: 'center'
    },
    color: ['#37A2DA'],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      name: '时间',
      type: 'time',
      boundaryGap: false,
      splitLine: {
        show: false
      },

    },
    yAxis: {
      name: '温度(℃)',
      position: 'right',
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [{
      name: 'temperature',
      type: 'line',
      smooth: false, //曲线是否平滑
      data: [18, 36, 65, 30, 78, 40, 33]
    }]
  }
  chart.setOption(option);
  return chart;
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
      // console.log(res.data);
      _this.setData({
        userLogin: res.data
      })
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
        inTemp: res.data.deviceList[0].sensorList[0].value,
        outTemp: res.data.deviceList[0].sensorList[2].value,
        inHumi: res.data.deviceList[0].sensorList[1].value,
        outHumi: res.data.deviceList[0].sensorList[3].value
      })
    }
  })
} 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    currentTab: 0,
    beijingTime: '',
    userLogin: {},
    inTemp: 26.22,
    outTemp: 26.22,
    inHumi: 79.33,
    outHumi: 79.33,

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