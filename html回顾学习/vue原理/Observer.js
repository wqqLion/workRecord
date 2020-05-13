/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-05-13 10:45:16
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 12:30:56
 */
import {Dep} from './Dep.js'
export class Observer{
  constructor(data){
    this.observer(data)
  }
  observer(data){
    if(!data || typeof data !== 'object'){
      return
    }
    Object.keys(data).forEach(key=>{
      // 定义相应变化
      this.defineReactive(data,key,data[key])
      // 递归
      this.observer(data[key]);
    })
  }
  defineReactive(obj,key,value){
    let that = this;
    let dep = new Dep();
    Object.defineProperty(obj,key,{
      enumerable:true,
      configurable:true,
      get(){
        Dep.target && dep.addSub(Dep.target);
        return value
      },
      set(newValue){
        if(newValue != value){
          that.observer(newValue)//如果设置的是对象继续劫持
          value = newValue;
          dep.notify(); //通知数据更新了
        }
      }
    })
  }
}