function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  // 如果el元素存在
  if (this.$el) {
    // 将el中所有子节点转移到fragment中
    this.$fragment = this.node2Fragment(this.$el);
    // 编译fragment中所层次子节点
    this.init();
    // 将fragment中的所有子节点添加回el中
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /*
  编译指定element/fragment的所有子节点
   */
  compileElement: function (el) {
    // 得到最外层的所有子节点
    var childNodes = el.childNodes,
      // 保存compile对象
      me = this;

    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 正则对象: 匹配大括号表达式以及内部包含的表达式
      var reg = /\{\{(.*)\}\}/;

      // 如果是元素点
      if (me.isElementNode(node)) {
        // 编译元素节点的指令
        me.compile(node);
        // 如果是大括号表达式格式的文本点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译文本节点
        me.compileText(node, RegExp.$1);  // name
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 得到所有属性节点
    var nodeAttrs = node.attributes,
      me = this;
    // 遍历所有属性
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 得到属性名: v-on:click
      var attrName = attr.name;
      // 如果是指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值(表达式): test
        var exp = attr.value;
        // 得到指令名: on:click
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          // 处理事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        // 一般指令
        } else {
          // 解析一般指令: 调用对应的工具函数解析
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        // 移除指令属性
        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

/*
编译的工具对象
 */
var compileUtil = {
  // 编译 v-text/{{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  // 编译 v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  // 编译 v-model
  model: function (node, vm, exp) {
    // 初始化显示, 创建对应的watcher为后面更新做准备
    this.bind(node, vm, exp, 'model');

    var me = this,
      // 得到表达式当前的值
      val = this._getVMVal(vm, exp);
    // 给元素节点绑定input事件监听, 一旦输入框的值发生改变就会自动调用
    node.addEventListener('input', function (e) {
      // 得到输入框最新的值
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      // 将最新的值设置到表达式在data对应的属性上 ==> 数据绑定自动更新对应节点
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  // 编译 v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  真正编程的工具方法
  exp: 表达式(name)
  dir: 指令名(text/html/class/model)
   */
  bind: function (node, vm, exp, dir) {
    // 根据指令名得到更新节点的更新函数
    var updaterFn = updater[dir + 'Updater'];
    // 调用更新函数去更新节点
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    // 为表达式创建对应的watcher, 指定了用于更新节点的回调函数
    new Watcher(vm, exp, function (value, oldValue) {
      // 更新节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  /*
  事件处理
  exp: 表达式 test
  dir: 指令名 on:click
   */
  eventHandler: function (node, vm, exp, dir) {
    // 从指令名中取出事件名/类型
    var eventType = dir.split(':')[1],
      // 根据表达式从methods中取出对应的函数(事件回调函数)
      fn = vm.$options.methods && vm.$options.methods[exp];
    // 如果都存在
    if (eventType && fn) {
      // 给元素节点绑定指定事件名和回调函数的事件监听, 回调函数中强制绑定的this为vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  // 得到表达式对应的值
  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

/*
包含n个更新节点的方法的对象
 */
var updater = {
  // 更新节点的textContent
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    node.className = className ? (className + ' ' + value) : value
  },

  // 更新节点的value
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};