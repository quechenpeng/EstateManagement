// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const activity = db.collection("activity");
  const message = activity.where({
    _id: event.activityid,
  }).get()
  return message;
}