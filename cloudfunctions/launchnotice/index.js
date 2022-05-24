// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const notice = db.collection("notice");
  notice.add({
    data: {
      title: event.title,
      content: event.content,
      year: event.year,
      monthday: event.monthday,
      readingvolume: event.readingvolume,
    }
  })
}