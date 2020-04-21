// pages/home/home.js
import reqData from "../config/config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    sliders:[],
    //九宫格
    nav:[],
    isShowStatic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     reqData("slides").then(res=>{
       this.setData({
         sliders:res.data
       })
     })
     reqData("categories").then(res=>{
      this.setData({
        nav:res.data,
        isShowStatic:true
      })
    })
  },
  toDetails(e){
    wx.navigateTo({
      url:`../list/list?id=${e.currentTarget.dataset.id}`
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