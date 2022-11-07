// pages/route/bike.js
var amapFile = require('../../utils/amap-wx');
var myAmapFun = new amapFile.AMapWX({key:'fd586be05b42b4368a7341b5ae45f9eb'});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: "50px",
    listShowed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this

    if (options.poilocation != "") {
      // 将 poilocation 设置到 data 中
      that.setData({
        poilocation: options.poilocation,
        markers: [
          {
            longitude: wx.getStorageSync('longitude'),
            latitude: wx.getStorageSync('latitude'),
            iconPath: '../../static/images/nav_s.png'
          },
          {
            longitude: parseFloat(options.poilocation.split(',')[0]),
            latitude: parseFloat(options.poilocation.split(',')[1]),
            iconPath: '../../static/images/nav_e.png'
          }
        ]
      })

      // 当前位置
      const origin = wx.getStorageSync('longitude')+","+wx.getStorageSync('latitude')

      // 调用 骑行 导航接口
      myAmapFun.getRidingRoute({
        origin: origin,
        destination: options.poilocation,
        success: function(data) {
          console.log(data)
          var points = []
          if (data.paths && data.paths[0] && data.paths[0].steps) {
            var steps = data.paths[0].steps
            for (let i = 0; i < steps.length; i++) {
              var poLen = steps[i].polyline.split(';')
              for (let j = 0; j < poLen.length; j++) {
                points.push({
                  longitude: parseFloat(poLen[j].split(',')[0]),
                  latitude: parseFloat(poLen[j].split(',')[1])
                })
              }
            }
          }

          that.setData({
            polyline: [{
              points: points,
              color: "#0091ff",
              width: 6
            }],
            steps: data.paths[0].steps
          })

          if (data.paths[0] && data.paths[0].distance) {
            that.setData({
              distance: parseFloat(data.paths[0].distance / 1000).toFixed(2) + ' 公里'
            })
          }
          if (data.paths[0] && data.paths[0].duration) {
            that.setData({
              duration: parseFloat(data.paths[0].duration / 60).toFixed(2) + ' 分钟'
            })
          }
        }
      })
    } else {
      console.log('参数错误')
    }
  },

  checkDetail: function() {
    if (this.data.listShowed) {
      this.setData({
        listShowed: false,
        listHeight: '50px'
      })
    } else {
      this.setData({
        listShowed: true,
        listHeight: '80vh'
      })
    }
  },

  changeNav: function(e) {
    wx.navigateTo({
      url: '/pages/route/'+e.currentTarget.dataset.type+'?poilocation='+this.data.poilocation,
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