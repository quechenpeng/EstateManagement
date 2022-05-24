// pages/noticereading/noticereading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeid: "",
    readingvolume: 0,
    year: "",
    monthday: "",
    title: "",
    content: "",
    comment: [],
    userid: "",
    date: "",
    time: "",
    commentcontent: "",
    headportraitsrc: "",
    nickname: "",

    // 样式
    commentlength: 0,
    tip1: "none",
    tip2: "true",
  },

  // 显示公告
  shownotice: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: "noticereading",
      data: {
        noticeid: that.data.noticeid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        result.result.data.forEach(function (e) {
          that.setData({
            year: e.year,
            monthday: e.monthday,
            title: e.title,
            content: e.content,
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

  // 显示评论
  showcomment: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: "getcomment",
      data: {
        noticeid: that.data.noticeid,
      },
      success(result) {
        console.log("请求云函数成功", result);
        that.setData({
          comment: result.result.data,
          commentlength: result.result.data.length,
        })
        if (that.data.commentlength == 0) {
          that.setData({
            tip1: "none",
            tip2: "true"
          })
        } else {
          that.setData({
            tip1: "true",
            tip2: "none"
          })
        }
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

  // 输入框的内容
  comment: function (e) {
    this.setData({
      commentcontent: e.detail.value
    })
  },

  // 发布评论
  release: function (e) {
    var that = this;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();
    this.setData({
      date: year + "-" + month + "-" + day,
      time: hour + ":" + minute + ":" + second,
    })
    var app = getApp();
    if (app.data.phone == "" || app.data.phone == null || app.data.password == "" || app.data.password == null) {
      wx.switchTab({
        url: '../login/login',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.commentcontent == "" || that.data.commentcontent == null) {
      wx.showToast({
        title: '未填写评论',
        icon: 'none',
        duration: 2000
      })
    } else {
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
              userid: e._id,
              headportraitsrc: e.headportraitsrc,
              nickname: e.nickname,
            })
          })
          wx.cloud.callFunction({
            name: "release",
            data: {
              noticeid: that.data.noticeid,
              userid: that.data.userid,
              date: that.data.date,
              time: that.data.time,
              content: that.data.commentcontent,
              headportraitsrc: that.data.headportraitsrc,
              nickname: that.data.nickname,
            },
            success(result) {
              console.log("请求云函数成功", result);
              that.onLoad();
              wx.showToast({
                title: '评论成功！',
                icon: 'success',
                duration: 1500
              })
              that.showcomment();
            },
            fail(error) {
              console.log("请求云函数失败", error);
            }
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
    this.setData({
      noticeid: options.noticeid,
      readingvolume: options.readingvolume,
    })

    // 增加阅读量
    wx.cloud.callFunction({
      name: "increasereading",
      data: {
        noticeid: that.data.noticeid,
        readingvolume: that.data.readingvolume,
      },
      success(result) {
        console.log("请求云函数成功", result);
      },
      fail(error) {
        console.log("请求云函数失败", error);
      }
    })
    // 显示公告
    that.shownotice();
    // 显示评论
    that.showcomment();
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