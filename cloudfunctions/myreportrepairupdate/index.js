// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const reportrepair = db.collection("reportrepair");
  reportrepair.doc(event.reportrepairid).update({
    data: {
      people: event.people,
      phone: event.phone,
      repairequipment: event.repairequipment,
      description: event.description,
      launchtime: event.launchtime,
      appointmenttime: event.appointmenttime,
      building: event.building,
      floor: event.floor,
      number: event.number,
      state: event.state,
    }
  })
}