// EstateManagement/pages/myreportrepairreading/myreportrepairreading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    building: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
      ["1", "2", "3", "4", "5", "6"],
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
    ],
    reportrepairid: "",
    people: "",
    phone: "",
    repairequipment: "",
    description: "",
    launchtime: "",
    appointmenttime: "",
    b: "",
    f: "",
    n: "",
    state: "",
    masterid: "",
    mastername: "",

    // 样式
    inputstyle: false,
    masternamestyle: "",
    buttonstyle: false,
    buttontips: "",
  },

  // 联系人
  peoplechange: function (e) {
    this.setData({
      people: e.detail.value
    })
  },

  // 联系电话
  phonechange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 报修设备
  repairequipmentchange: function (e) {
    this.setData({
      repairequipment: e.detail.value
    })
  },

  // 描述
  descriptionchange: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  //  预约时间
  bindDateChange: function (e) {
    this.setData({
      appointmenttime: e.detail.value
    })
  },

  // 楼栋
  buildingchange: function (e) {
    // console.log(e.detail.value);
    // console.log(e.detail.value[0]);
    // console.log(e.detail.value[1]);
    // console.log(e.detail.value[2]);
    this.setData({
      b: this.data.building[0][e.detail.value[0]]
    })
    this.setData({
      f: this.data.building[1][e.detail.value[1]]
    })
    this.setData({
      n: this.data.building[2][e.detail.value[2]]
    })
  },

  // 提交
  updatereportrepair: function (e) {
    const that = this;
    const b = this.data.b;
    const f = this.data.f;
    const n = this.data.n;
    if (that.data.buttontips == "修改") {
      wx.showModal({
        title: '提示',
        content: '确定修改？',
        success: function (result) {
          if (result.confirm) {
            wx.cloud.callFunction({
              name: "myreportrepairupdate",
              data: {
                reportrepairid: that.data.reportrepairid,
                people: that.data.people,
                phone: that.data.phone,
                repairequipment: that.data.repairequipment,
                description: that.data.description,
                launchtime: that.data.launchtime,
                appointmenttime: that.data.appointmenttime,
                building: b,
                floor: f,
                number: n,
                state: "已创建"
              },
              success(result) {
                console.log("请求云函数成功", result);
                wx.navigateTo({
                  url: '../myreportrepair/myreportrepair',
                })
                wx.showToast({
                  title: '修改成功！',
                  icon: 'success',
                  duration: 1500
                })
              },
              fail(error) {
                console.log("请求云函数失败", error);
              }
            })
          }
        }
      })
    } else if (that.data.buttontips == "待确认") {
      wx.showModal({
        title: '提示',
        content: '确定已完成报修？',
        success: function (result) {
          if (result.confirm) {
            wx.cloud.callFunction({
              name: "myreportrepairupdate",
              data: {
                reportrepairid: that.data.reportrepairid,
                people: that.data.people,
                phone: that.data.phone,
                repairequipment: that.data.repairequipment,
                description: that.data.description,
                launchtime: that.data.launchtime,
                appointmenttime: that.data.appointmenttime,
                building: b,
                floor: f,
                number: n,
                state: "已处理"
              },
              success(result) {
                console.log("请求云函数成功", result);
                wx.navigateTo({
                  url: '../myreportrepair/myreportrepair',
                })
                wx.showToast({
                  title: '提交成功！',
                  icon: 'success',
                  duration: 1500
                })
              },
              fail(error) {
                console.log("请求云函数失败", error);
              }
            })
          }
        }
      })
    }
  },

  // 撤销
  canclereportrepair: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (result) {
        if (result.confirm) {
          wx.cloud.callFunction({
            name: "myreportrepairdelete",
            data: {
              reportrepairid: that.data.reportrepairid,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../myreportrepair/myreportrepair',
              })
              wx.showToast({
                title: '撤销成功！',
                icon: 'success',
                duration: 1500
              })
            },
            fail(error) {
              console.log("请求云函数失败", error);
              wx.showToast({
                title: '撤销失败！',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.stopPullDownRefresh();
    const that = this;
    this.setData({
      reportrepairid: options.reportrepairid
    })

    wx.cloud.callFunction({
      name: "myreportrepairreading",
      data: {
        reportrepairid: that.data.reportrepairid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            people: e.people,
            phone: e.phone,
            repairequipment: e.repairequipment,
            description: e.description,
            launchtime: e.launchtime,
            appointmenttime: e.appointmenttime,
            b: e.building,
            f: e.floor,
            n: e.number,
            state: e.state,
            masterid: e.masterid
          })
          if (that.data.state == "已创建") {
            that.setData({
              inputstyle: false,
              masternamestyle: "none",
              buttonstyle: false,
              buttontips: "修改",
            })
          }
          if (that.data.state == "待处理") {
            that.setData({
              inputstyle: true,
              masternamestyle: "true",
              buttonstyle: false,
              buttontips: "待确认"
            })
          }
          if (that.data.state == "已处理") {
            that.setData({
              inputstyle: true,
              masternamestyle: "true",
              buttonstyle: true,
              buttontips: "已完成"
            })
          }
          wx.cloud.callFunction({
            name: "myreportrepairmastername",
            data: {
              masterid: that.data.masterid,
            },
            success(result) {
              console.log("请求云函数成功", result);
              result.result.data.forEach(function (e) {
                that.setData({
                  mastername: e.name
                })
              })
            },
            fail(error) {
              console.log("请求云函数失败", error);
              wx.showToast({
                title: '加载失败！',
                icon: 'none',
                duration: 1500
              })
            }
          })
        })
        wx.hideLoading();
      },
      fail(error) {
        console.log("请求云函数失败", error);
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})