// pages/route/bus.js
var amapFile = require('../../utils/amap-wx');
var myAmapFun = new amapFile.AMapWX({key:'fd586be05b42b4368a7341b5ae45f9eb'});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectType: "最便捷"
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
        city: wx.getStorageSync('city'),
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

      // 调用公交出行接口(0: 最便捷)
      that.getTransitRoute(0)
    } else {
      console.log('参数错误')
    }
  },

  changeNav: function(e) {
    wx.navigateTo({
      url: '/pages/route/'+e.currentTarget.dataset.type+'?poilocation='+this.data.poilocation,
    })
  },
  
  transferOpts: function() {
    var that = this
    var itemList = ['最便捷', '最经济', '少换乘', '少步行', '不乘地铁']
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        console.log(res)
        // 不乘地铁的类型是 5 （但是对应的索引是 4）
        var type = (res.tapIndex == 4) ? (res.tapIndex + 1) : res.tapIndex;
        // 调用公交接口
        that.getTransitRoute(type)
        that.setData({
          selectType: itemList[res.tapIndex]
        })
      }
    })
  },

  /**
   * 公交接口
   * 
   * @param {Number} type 出行策略
   */
  getTransitRoute: function(type) {
    var that = this
    myAmapFun.getTransitRoute({
      origin: wx.getStorageSync('longitude')+","+wx.getStorageSync('latitude'),
      destination: that.data.poilocation,
      strategy: type, // 出行策略
      city: that.data.city, // 所在城市
      success: function(data) {
        console.log('bus', data)
        if (data && data.transits) {
          var transits = data.transits
          for (let i = 0; i < transits.length; i++) {
            var segments = transits[i].segments
            transits[i].transport = []
            for (var j = 0; j < segments.length; j++) {
              if (
                segments[j].bus 
                && segments[j].bus.buslines 
                && segments[j].bus.buslines[0] 
                && segments[j].bus.buslines[0].name
              ){
                var name = segments[j].bus.buslines[0].name
                if (j!==0) {
                  name = ' -> ' + name;
                }
                transits[i].transport.push(name);
              }
            }
            transits[i].transportname = transits[i].transport.join('')
            transits[i].minute = parseInt(transits[i].duration / 60) // 时间
            transits[i].distance = parseFloat(transits[i].distance / 1000).toFixed(2) // 距离
          }
        }

        that.setData({
          transits: transits
        })
      },
      fail: function(info) {
        // 失败
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