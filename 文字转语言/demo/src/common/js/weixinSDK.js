/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-05-11 16:09:17
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-11 16:10:08
 */
import {httpGet} from 'api/api' // 引入axios的http请求
import address from '../../api/apiAdd.js' // 引入请求的url路径
import wx from 'weixin-js-sdk' // 引入微信SDK
// import {commFunc} from "./util";引入工具函数

/**
 * @param {data} 后端返回的基本配置数据
 * @param {param} 页面传过来的数据
 */
function initAPIs(data,param) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: param.APIs // 必填，需要使用的JS接口列表
  })
}