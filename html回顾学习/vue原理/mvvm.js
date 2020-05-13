/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-03-26 17:29:01
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 11:25:42
 */
/*
 * @Descripttion: MVVM 类初始化
 * @version: 
 * @Author: wqq
 * @Date: 2020-03-26 17:29:01
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 09:57:39
 */
import {Compile} from './Compile.js'
import {Observer} from './Observer.js'
export class MVVM{
  // 构造
  constructor(options){
    // 挂载在实例
    this.$el = options.el;
    this.$data = options.data;
    if(this.$el){
      // 数据劫持
      new Observer(this.$data)
      // 编译模板
      new Compile(this.$el,this);
    }
  }
}