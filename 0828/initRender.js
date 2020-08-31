WVue.prototype.mount = function () {
	this.render = this.creatRenderFn()
	this.mountCompontent()
}

WVue.prototype.mountCompontent = function () {
	let mount = () => {
		let _render = this.render()
		this.updata(this.render())
	}
	mount.call(this)
}

// 这里生成 render 函数 目的是缓存抽象语法树 此处我们模拟为 缓存 虚拟 DOM。
WVue.prototype.creatRenderFn = function () {
	let _ast = getVNode(this._template)
	return function render() {
		let _tep = compile(_ast, this._data)
		return _tep
	}
}

// 此处将 虚拟DOM 渲染到页面中 使用 diff 算法
WVue.prototype.updata = function (vnode) {
	let realDOM = parseVNode(vnode);
	this._patent.replaceChild(realDOM, document.querySelector("#root"))
}