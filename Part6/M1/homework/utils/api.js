const BASE_URL = "https://devapi.qweather.com/v7"

const KRY = "f45506aa0a98480fa7b57b2c5197c801"

const request = (url,method,data) => {
  data.key = KRY
  return new Promise((resolve,reject) => {
    wx.request({
      url: url,
      method:method,
      data:data,

      success:res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = {
  // 未来三天天气预报
  threedays: (data) => {
    return request(BASE_URL + '/weather/3d', 'get', data)
  },
  // 根据关键字，获取城市列表，例如：输入 山东，会查找山东省下的城市
  citylist: (data) => {
    return request('https://geoapi.qweather.com/v2/city/lookup', 'get', data)
  },
  // 空气质量
  aircond: (data) => {
    return request(BASE_URL + '/air/now', 'get', data)
  },
  // 生活指数
  indices: (data) => {
    // 1.运动指数，2.洗车指数，3.穿衣指数，4.钓鱼指数，5.紫外线指数，6.旅游指数，7.过敏指数
    data.type = "1,2,3,4,5,6,7"
    return request(BASE_URL + '/indices/1d', 'get', data)
  }
}