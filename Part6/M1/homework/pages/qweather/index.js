// pages/qweather/index.js
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wd: {}, // 未来三天天气情况
    citylist: [], // 城市列表
    aircond: {}, // 空气质量
    indices: [], // 生活指数
    longitude: "", // 经度
    latitude: "", // 纬度
    // markers: [],  //地图参数
    icon: '../../static/images/marker.png'
  },

  doSearch: function(e) {
    if (e.currentTarget.dataset.keyword != "") {
      wx.navigateTo({
        url: '/pages/qweather/map?keyword=' + e.currentTarget.dataset.keyword,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getLocation({
      type:'gcj02',
      success:res => {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          // markers: [{
          //   id: "0",
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   iconPath: "/static/images/location.png",
          //   width: 40,
          //   height: 40,
          //   callout: {
          //     'display': 'ALWAYS', 
          //     'fontSize': '30rpx', 
          //     'content': '我在这',
          //     'padding': '8rpx', 
          //     'boxShadow': '0 0 5rpx #333',
          //     'borderRadius':'4rpx'
          //   }
          // }],
        })
        let data = {
          location: res.longitude+","+res.latitude
        }

        //获取位置城市信息
        API.citylist(data).then((res) => {
          // console.log(res);
          if(res.data.code == 200){
            that.setData({
              citylist:res.data.location[0]
            })
          }else{
            wx.showToast({
              title: '正在获取位置信息',
              icon:'loading',
            })
          }
        })

        //获取位置城市三天天气
        API.threedays(data).then((res) => {
          if(res.data.code == 200){
            that.setData({
              wd:res.data
            })
          }else{
            wx.showToast({
              title: '正在获取天气信息',
              icon:'loading'
            })
          }
        })

        //获取生活指数
        API.indices(data).then((res) => {
          // console.log(res);
          if(res.data.code == 200){
            that.setData({
              indices:res.data.daily
            })
          }else{
            wx.showToast({
              title: '正在获取',
              icon:'loading'
            })
          }
        })

        //获取空气质量
        API.aircond(data).then((res) => {
          if(res.data.code == 200){
            that.setData({
              aircond:res.data.now
            })
          }else{
            wx.showToast({
              title: '正在获取空气质量',
              icon:'loading'
            })
          }
        })


      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})