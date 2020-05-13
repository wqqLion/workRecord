/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-05-13 11:58:48
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 12:00:42
 */
export class Dep{
  constructor(){
    //订阅的数组
    this.subs = [];
  }
  addSub(watcher){
    this.subs.push(watcher)
  }
  notify(){
    this.subs.forEach(watcher=>{
      watcher.update()
    })
  }
}