// EstateManagement/pages/reportrepairupdate/reportrepairupdate.js
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
    master: ["薛师傅", "徐师傅", "肖师傅", "汤师傅"],
    reportrepairid: "",
    truename: "",
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
    mastername: "待分配",
    monadicnumber: 0,

    // 样式
    inputstyle: false,
    statestyle: false,
    buttontips: "",
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
      description: e.detail.value
    })
  },

  //  预约时间
  bindDateChange: function (e) {
    // console.log(e.detail.value);
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

  // 师傅
  masterchange: function (e) {
    var that = this;
    this.setData({
      mastername: this.data.master[e.detail.value]
    })
    const db = wx.cloud.database();
    const master = db.collection("master");
    master.where({
      name: that.data.mastername
    }).get().then(result => {
      result.data.forEach(function (e) {
        that.setData({
          masterid: e._id,
          monadicnumber: e.monadicnumber,
        })
      })
    })
  },

  // 确认
  submit: function (e) {
    const that = this;
    const building = that.data.b;
    const floor = that.data.f;
    const number = that.data.n;
    if (that.data.buttontips == "分配") {
      wx.showModal({
        title: '提示',
        content: '确定分配？',
        success: function (result) {
          if (result.confirm) {
            if (that.data.mastername == "待分配") {
              wx.showToast({
                title: '未分配师傅！',
                icon: 'none',
                duration: 1500
              })
            } else {
              wx.cloud.callFunction({
                name: "reportrepairdistribution",
                data: {
                  reportrepairid: that.data.reportrepairid,
                  people: that.data.truename,
                  phone: that.data.phone,
                  repairequipment: that.data.repairequipment,
                  description: that.data.description,
                  appointmenttime: that.data.appointmenttime,
                  building: building,
                  floor: floor,
                  number: number,
                  state: "待处理",
                  masterid: that.data.masterid,
                },
                success(result) {
                  console.log("请求云函数成功", result);
                  wx.navigateTo({
                    url: '../reportrepairadminister/reportrepairadminister',
                  })
                  wx.showToast({
                    title: '分配成功！',
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
        }
      })
    }
    if (that.data.buttontips == "删除") {
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
                  url: '../reportrepairadminister/reportrepairadminister',
                })
                wx.showToast({
                  title: '删除成功！',
                  icon: 'success',
                  duration: 1500
                })
              },
              fail(error) {
                console.log("请求云函数失败", error);
                wx.showToast({
                  title: '删除失败！',
                  icon: 'none',
                  duration: 1500
                })
              }
            })
          }
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
            truename: e.people,
            phone: e.phone,
            repairequipment: e.repairequipment,
            description: e.description,
            launchtime: e.launchtime,
            appointmenttime: e.appointmenttime,
            b: e.building,
            f: e.floor,
            n: e.number,
            state: e.state,
            masterid: e.masterid,
          })
          if (that.data.state == "已创建") {
            that.setData({
              inputstyle: false,
              statestyle: true,
              buttontips: "分配",
            })
          }
          if (that.data.state == "待处理") {
            that.setData({
              inputstyle: true,
              statestyle: true,
              buttontips: "删除"
            })
          }
          if (that.data.state == "已处理") {
            that.setData({
              inputstyle: true,
              statestyle: true,
              buttontips: "删除"
            })
          }
        })
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
  onPullDownRefresh: function () {},

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