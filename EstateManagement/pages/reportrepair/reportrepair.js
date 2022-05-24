// pages/reportrepair/reportrepair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: "",
    userid: "",
    phone: "",
    password: "",
    truename: "",
    repairequipment: "",
    description: "",
    b: "",
    f: "",
    n: "",
    building: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
      ["1", "2", "3", "4", "5", "6"],
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
    ],
    descriptionlength: "0",
  },

  // 联系人
  truenamechange: function (e) {
    this.setData({
      truename: e.detail.value
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
      description: e.detail.value,
      descriptionlength: e.detail.value.length,
    })
  },

  //  预约时间
  bindDateChange: function (e) {
    // console.log(e.detail.value);
    this.setData({
      dates: e.detail.value
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
  submit: function (e) {
    const that = this;
    const userid = this.data.userid;
    const people = this.data.truename;
    const phone = this.data.phone;
    const repairequipment = this.data.repairequipment;
    const description = this.data.description;
    const appointmenttime = this.data.dates;
    const building = this.data.b;
    const floor = this.data.f;
    const number = this.data.n;
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    if (parseInt(month) < 10) {
      month = "0" + month.toString();
    }
    if (parseInt(day) < 10) {
      day = "0" + day.toString();
    }
    const launchtime = year + "-" + month + "-" + day;

    if (people == "" || people == null) {
      wx.showToast({
        title: '未填写联系人！',
        icon: 'none',
        duration: 1500
      })
    } else if (phone == "" || phone == null) {
      wx.showToast({
        title: '未填写联系电话！',
        icon: 'none',
        duration: 1500
      })
    } else if (repairequipment == "" || repairequipment == null) {
      wx.showToast({
        title: '未填写报修设备！',
        icon: 'none',
        duration: 1500
      })
    } else if (description == "" || description == null) {
      wx.showToast({
        title: '未填写描述！',
        icon: 'none',
        duration: 1500
      })
    } else {

      wx.cloud.callFunction({
        name: "reportrepair",
        data: {
          userid: userid,
          people: people,
          phone: phone,
          repairequipment: repairequipment,
          description: description,
          launchtime: launchtime,
          appointmenttime: appointmenttime,
          building: building.toString(),
          floor: floor.toString(),
          number: number.toString(),
          state: "已创建",
          masterid: "",
        },
        success(result) {
          console.log("请求云函数成功", result);
          that.setData({
            repairequipment: "",
            description: ""
          })
          wx.navigateTo({
            url: '../personalhomepage/personalhomepage',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.stopPullDownRefresh();
    var that = this;
    var app = getApp();
    this.setData({
      phone: app.data.phone
    })
    this.setData({
      password: app.data.password
    })

    if (this.data.phone == "" || this.data.phone == null || this.data.password == "" || this.data.password == null) {
      wx.switchTab({
        url: '../login/login',
      })
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000
      })
    } else {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate() + 1;
      if (parseInt(month) < 10) {
        month = "0" + month.toString();
      }
      if (parseInt(day) < 10) {
        day = "0" + day.toString();
      }
      this.setData({
        dates: year + "-" + month + "-" + day
      })
    }

    wx.cloud.callFunction({
      name: "login",
      data: {
        phone: that.data.phone,
        password: that.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            userid: e._id,
            truename: e.truename,
            b: e.building,
            f: e.floor,
            n: e.number
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
    this.onLoad();
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