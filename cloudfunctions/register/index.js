// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const user = db.collection("user");
  user.add({
    data: {
      phone: event.phone,
      password: event.password,
      headportraitsrc: event.headportraitsrc,
      nickname: event.nickname,
      truename: event.truename,
      building: event.building,
      floor: event.floor,
      number: event.number,
    }
  })
}