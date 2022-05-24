// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const notice = db.collection("notice");
  const message = notice.where({
    _id: event.noticeid,
  }).get()
  return message;
}