function Observer(data) {
  // 保存data
  this.data = data;
  // 开始进行劫持
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function (key) {
      // 对指定属性实现响应式/劫持/监视
      me.defineReactive(data, key, data[key])
    });
  },

  defineReactive: function (data, key, val) {
    // 为当前属性创建对应的dep对象
    var dep = new Dep();
    // 通过隐式递归, 实现对所有层次属性的劫持
    var childObj = observe(val);
    // 给data重新定义指定属性名的属性
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        // 如果当前dep对应watcher已存在, 建立dep与watcher的相互关系
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        // 保存新的值
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 让dep去通知相关的所有watcher
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  // 如果value是对象, 直接结束
  if (!value || typeof value !== 'object') {
    return;
  }

  // 创建一个observer对象
  return new Observer(value);
};


var uid = 0;

function Dep() {
  // 标识ID
  this.id = uid++;
  // 所有相关的watcher数组
  this.subs = [];
}

Dep.prototype = {
  // 将watcher保存到dep的subs数组中
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    // 找watcher去建立关系
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历所有相关的watcher
    this.subs.forEach(function (sub) {
      // 通知某个watcher去更新界面
      sub.update();
    });
  }
};

Dep.target = null;