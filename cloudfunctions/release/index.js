// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const comment = db.collection("comment");
  comment.add({
    data: {
      noticeid: event.noticeid,
      userid: event.userid,
      date: event.date,
      time: event.time,
      content: event.content,
      headportraitsrc: event.headportraitsrc,
      nickname: event.nickname,
    }
  })
}