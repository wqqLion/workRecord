/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-05-13 11:28:06
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 12:19:36
 */
import {Dep} from './Dep.js'
export class Watcher{
  constructor(vm,expr,cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.value = this.get();
  }
  /**
   * @name: getVal
   * @for: 
   * @param {object} vm vm对象
   * @param {string} expr v-model 的数据,如: obj.a  
   * @return: 
   */
  getVal(vm,expr){
    expr = expr.split('.');
    return expr.reduce((pre,next)=>{
      return pre[next];
    },vm.$data)
  }
  get(){
    Dep.target = this;
    let value = this.getVal(this.vm,this.expr)
    Dep.target = null;
    return value
  }
  /**
   * @name: update
   * @for: 
   * @param {type} 
   * @return: 
   */
  update(){
    let newValue = this.getVal(this.vm,this.expr);
    let oldValue = this.value;
    if(newValue != oldValue){
      this.cb(newValue)
    }
  }
}