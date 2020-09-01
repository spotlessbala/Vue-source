let ARRAY_METHOD = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
]

let arr_method = Object.create(Array.prototype)

ARRAY_METHOD.forEach(method => {
  arr_method[method] = function () {
    console.log(`调用的是被拦截之后的 ${method} 方法`)

    for (let i = 0; i < arguments.length; i++) {
      observe(arguments[i]);
    }

    let res = Array.prototype[method].apply(this, arguments)
    return res
  }
})

function defineReactive (object, key, value, enumerable) {
  let _that = this

  if (typeof value === 'object' && value != null) {
    observe(value)
  }

  Object.defineProperty(object, key, {
    configurable: true, 
    enumerable: !!enumerable,
    get () {
      console.log(`读取 ${key} 的值为 ${value}`)
      return value
    },
    set (newValue) {
      if (typeof newValu === 'object' && newValue != null) {
        observe(newValue)
      }

      console.log(`设置值为 ${newValue}`)
      value = newValue

      typeof _that.mountCompontent === 'function' && _that.mountCompontent()
    }
  })
}

// 将对象 obj 变成响应式的
function observe(obj, vm) {
  if (Array.isArray(obj)) {
    // 对于每一个元素处理
    obj.__proto__ = arr_method
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i], vm)
    }
  } else {
    // 对其成员进行处理
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      let prop = keys[i];
      defineReactive.call(vm, obj, prop, obj[prop], true)
    }
  }
}

function proxy (target, prop, key) {
  Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get () {
        return target[prop][key]
      },
      set (newval) {
        target[prop][key] = newval
      }
    })
}

WVue.prototype.initData = function () {
  let keys = Object.keys(this._data)

  observe(this._data, this)

  for (let i = 0; i < keys.length; i++) {
    proxy(this, '_data', keys[i])
  }
}