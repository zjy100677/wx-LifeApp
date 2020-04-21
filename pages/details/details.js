// pages/details/details.js
import reqData from "../config/config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliders:[],
    name:"",
    address:"",
    phone:"",
    businessHours:"",
    comments:[],
    isShow:false,
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    reqData(`/shops/${options.id}`).then(res=>{
        this.setData({
        sliders:res.data.images,
        name:res.data.name,
        address:res.data.address,
        phone:res.data.phone,
        businessHours:res.data.businessHours,
        comments:res.data.comments,
        isShow:true
      })
      console.log(res.data)
    })
  },
  tap(e){
    wx.previewImage({
      current:e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.sliders // 需要预览的图片http链接列表
     
    })
    console.log(e.currentTarget.dataset.url)
  },
  thumbnail(e){
    wx.previewImage({
      current:e.currentTarget.dataset.item.replace("w.h/",""),
      urls:this.data.comments[this.data.id].images
    })
   console.log(this.data.comments[this.data.id].images)
  },
  getId(e){
    this.setData({
      id:e.currentTarget.dataset.id
    })
  },
})