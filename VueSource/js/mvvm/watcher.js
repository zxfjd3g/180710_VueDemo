function Watcher(vm, exp, cb) {
  this.cb = cb; // 用于更新的回调函数
  this.vm = vm;
  this.exp = exp;  // 表达式
  this.depIds = {}; // 保存n个相关dep的对象容器: 属性名: dep的id值, 属性值: dep
  this.value = this.get(); // 表达式的值
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到 表达式最新的值
    var value = this.get();
    // 得到老值
    var oldVal = this.value;
    // 如果发生了变化
    if (value !== oldVal) {
      // 保存新值
      this.value = value;
      // 调用回调函数去更新界面上对应的节点
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 如果dep与watcher的关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 建立dep到watcher关系
      dep.addSub(this);
      // 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    // 将当前watcher保存到Dep函数对象的target属性上
    Dep.target = this;
    // 从vm的data中取表达式对应的值, 会触发getter调用
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};