Page({

  /**
   * 页面的初始数据
   */
  data: {
    truename: "",
    nickname: "",
    building: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    floor: ["1", "2", "3", "4", "5", "6"],
    number: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"],
    b: "",
    f: "",
    n: "",
    userid: "",
  },

  // 姓名
  truenamechange: function (e) {
    this.setData({
      truename: e.detail.value
    })
  },

  // 昵称
  nicknamechange: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 楼栋
  buildingchange: function (e) {
    this.setData({
      b: parseInt(e.detail.value) + 1
    })
  },

  // 楼层
  floorchange: function (e) {
    this.setData({
      f: parseInt(e.detail.value) + 1
    })
  },

  // 门牌号
  numberchange: function (e) {
    var that = this
    this.setData({
      n: parseInt(e.detail.value) + 1
    })
    if (that.data.n < 10) {
      this.setData({
        n: "0" + that.data.n.toString()
      })
    }
  },

  // 修改信息
  updatemessage: function (e) {
    const that = this;
    const building = this.data.b.toString();
    const floor = this.data.f.toString();
    const number = this.data.n.toString();
    wx.showModal({
      title: '提示',
      content: '确定修改？',
      success: function (result) {
        if (result.confirm) {
          wx.cloud.callFunction({
            name: "editinformation",
            data: {
              userid: that.data.userid,
              truename: that.data.truename,
              nickname: that.data.nickname,
              building: building,
              floor: floor,
              number: number,
            },
            success(result) {
              console.log("请求云函数成功", result);
              wx.navigateTo({
                url: '../personalhomepage/personalhomepage',
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

    wx.cloud.callFunction({
      name: "login",
      data: {
        phone: app.data.phone,
        password: app.data.password,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            truename: e.truename,
            nickname: e.nickname,
            b: e.building,
            f: e.floor,
            n: e.number,
            userid: e._id
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