/*
相当于Vue的构造函数
 */
function MVVM(options) {
  // 保存配置对象到vm中
  this.$options = options;
  // 保存data数据对象到vm和data变量
  var data = this._data = this.$options.data;
  // 保存vm到me变量
  var me = this;

  // 遍历data中所有属性
  Object.keys(data).forEach(function (key) { // 属性名: name
    // 对指定属性实现代理
    me._proxy(key);
  });

  observe(data, this);

  // 创建一个compile对象: 编译模板
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加指定属性名的属性(使用属性描述符)
    Object.defineProperty(me, key, {
      configurable: false, // 防止外部重新定义修改
      enumerable: true, // 可以枚举
      // 当通过vm.xxx读取属性值自动调用
      get: function proxyGetter() {
        // 读取data中对应属性值返回
        return me._data[key];
      },
      // 当通过vm.xxx = value设置新的值时自动调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data对应的属性上
        me._data[key] = newVal;
      }
    });
  }
};