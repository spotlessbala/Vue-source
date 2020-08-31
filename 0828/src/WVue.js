function WVue(option) {
	this._data = option.data
	let el = document.querySelector(option.el)
	this._template = el;
	this._patent = el.parentNode

	this.initData(); // 将 data 进行响应式转换 且进行代理
	
	this.mount(); // 挂载
}

