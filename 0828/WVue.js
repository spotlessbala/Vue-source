function WVue(option) {
	this._data = option.data
	let el = document.querySelector(option.el)
	this._template = el;
	this._patent = document.querySelector(option.el).parentNode

	this.initData()
	// reactiveOfObject(this._data, this)

	this.mount()
}

