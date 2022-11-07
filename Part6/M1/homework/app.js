// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    //获取位置信息
    wx.getLocation({
      type:"gcj02",
      success:res => {
        wx.setStorageSync('longitude', res.longitude)
        wx.setStorageSync('latitude', res.latitude)
      }
    })

    //设置默认城市
    wx.setStorageSync('city', '廊坊市')
  },

  

  globalData: {
    userInfo: null
  }
})
