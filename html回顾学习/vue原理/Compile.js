/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-03-26 17:31:24
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 14:12:59
 */
/*
 * @Descripttion: Compile 编译
 * @version: 
 * @Author: wqq
 * @Date: 2020-03-26 17:31:24
 * @LastEditors: wqq
 * @LastEditTime: 2020-05-13 10:17:47
 */
import {
  Watcher
} from './Watcher.js'
export class Compile {
  // 构造
  constructor(el, vm) {
    //检测传递的元素是否是Dom
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      //如果获取到元素　开始编译
      // １．把真实的ｄｏｍ移入内存
      let fragment = this.node2fragment(this.el);
      // ２．编译　提取想要的元素节点　ｖ－ｍｏｄｅｌ和文本节点｛｛｝｝
      this.compile(fragment)
      // 3.把编译后的ｆｒａｇｍｅｎｔ放回页面
      this.el.appendChild(fragment);
    }
  }
  // 判断节点类型
  isElementNode(node) {
    return node.nodeType === 1
  }
  isDirective(name) {
    return name.includes('v-')
  }
  // 编译 model
  complieElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // 判断属性名称是否包含v-model
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        let expr = attr.value;
        let [, type] = attrName.split('-');
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }
  // 编译文本
  compileText(node) {
    let expr = node.textContent;
    // let reg  = /\{\{([])/g;
    let reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
  }
  // 递归编译
  compile(fragment) {
    let childrenNodes = fragment.childNodes;
    Array.from(childrenNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.complieElement(node);
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }
  // 将真是dom转为虚拟dom
  node2fragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
}

let CompileUtil = {
  // 文本处理
  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, expr);
    expr.replace(/\{\{([^}]+)\}\}/g, (...rest) => {
      new Watcher(vm, rest[1], (newValue) => {
        // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      });
    })
    updateFn && updateFn(node, value);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...reset) => {
      // 依次去去数据对应的值
      return this.getVal(vm, reset[1]);
    })
  },
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentindex) => {
      if (currentindex === expr.length - 1) {
        return prev[next] = value
      }
      return prev[next]
    }, vm.$data);
  },
  //输入框处理
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdate'];
    new Watcher(vm, expr, (newValue => {
      updateFn && updateFn(node, newValue)
    }))

    node.addEventListener('input', (e) => {
      let newValue = e.target.value;
      this.setVal(vm, expr, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value;
    },
    // 输入框更新
    modelUpdate(node, value) {
      node.value = value;
    }
  }
}