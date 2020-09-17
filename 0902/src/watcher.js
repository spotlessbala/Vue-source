// watcher 观察者 用于发射更新的行为
class Warcher {
  /**
   * @param {Object} vm vue 实例
   * @param {String|Funtion} expOrfn 
   */
  constructor(vm, expOrfn) {
    this.vm = vm
    this.getter = {}
    
    this.deps = []
    this.depIds = {}

    this.get()
  }

  get() {
    this.getter.call(this.vm, this.vm)
  }

  run() {
    this.get()
  }

  updata() {
    this.run()
  }

  cleanupDep() {
    
  }
}
