//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 全局变量的获取
    test: app.data.test,
    motto: 'Hello World',
    image: [
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
      app.globalData.url + '/upload/20181101/66d07e1b7f6e2fb807e02dba5f4cab0b.png',
    ],
    laba:'img/u206.png',
    circular:'true',
    close:'img/close.png',
    more:'img/more.png',
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    routers: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        selling:[
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png'
        
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
     
      {
        name: 'Python',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        selling: [
          '新益号',
          '普洱茶'
        ],
        price_img: 'img/u182.png',
        jiage: '￥120.0/片'
      },
    
    ],
    share: [
      {
        name: '双骄',
        url: '/pages/Course/course',
        icon: 'img/u150.png',
        code: '10',
        hot:'HOT',
        classification: '特点活动',
        share_content:"20180809马连道茶话会报名参加中马连道进......",
        validity:'长期',

      }
    ]

    },

    

 
})
