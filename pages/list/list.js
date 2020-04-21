// pages/details/details.js
import reqData from "../config/config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    limit:20,
    list:[],
    id:"",
    isLoading:true,
    showMore:false,
    inputText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      id:options.id
    })
 
    let {page,limit} = this.data
    reqData(`/categories/${this.data.id}/shops?page=${page}&_limit=${limit}`).then(res=>{
      this.setData({
        list:res.data,
        showMore:true
      })
      wx.hideLoading()
    })
   
  },

  /*
    页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    if(this.data.isLoading){
      this.data.page+=1
      this.setData({
        page: this.data.page,
        isLoading:false
      })
      let {page,limit,list} = this.data
      reqData(`/categories/${this.data.id}/shops?page=${page}&_limit=${limit}`).then(res=>{
        list.push(...res.data)
        console.log(list)
        this.setData({
          list:list,
          isLoading:true
        })
        wx.hideLoading()
      })
    }
   },
   //下拉
   onPullDownRefresh(){
     wx.showLoading({
       title:"正在刷新.."
     })
      this.setData({
        page:1
      })
    let {page,limit} = this.data
    reqData(`/categories/${this.data.id}/shops?page=${page}&_limit=${limit}`).then(res=>{
       this.setData({
         list:res.data,
         inputText:""
       })
       wx.hideLoading()
       wx.stopPullDownRefresh()
    })
  },
  toDetails(e){
    wx.navigateTo({
      url: `../details/details?id=${e.currentTarget.dataset.id}`,
    });
  },
  //输入文本框
  inputHandle(e){
    this.setData({
      inputText:e.detail.value
    })
  },
  //搜索
  searchHandle(){
    let {id,page,inputText} = this.data
    wx.showLoading({
      title:"正在搜索"
    })
    reqData(`/categories/${id}/shops?page=${page}&_limit=10&q=${inputText}`)
    .then(res=>{
     this.setData({
       list:res.data
     })
     wx.hideLoading()
    })
  },
  onReady(options){
    reqData(`/categories/${this.data.id}`).then(res=>{
      wx.setNavigationBarTitle({
        title:res.data.name
      })
     })
  }
})