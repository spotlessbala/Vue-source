// 根据传入的 node 获取 虚拟DOM
function getVNode(node) {
	let _vnode = null
	let nodeType = node.nodeType

	if (nodeType === 1) {
		let nodeTag = node.nodeName

		let nodeData = {}

		let nodeAttrs = node.attributes
		for (let i = 0; i < nodeAttrs.length; i++) {
			nodeData[nodeAttrs[i].nodeName] = nodeAttrs[i].nodeValue
		}

		_vnode = new VNode(nodeTag, nodeData, undefined, 1)

		for (let i = 0; i < node.childNodes.length; i++) {
			_vnode.appendChild(getVNode(node.childNodes[i]))
		}
	} else if (nodeType === 3) {
		_vnode = new VNode(undefined, undefined, node.nodeValue, 3)
	}

	return _vnode
}

// 解析模板 将 template 中的 {{}} 替换为 data 中的值
let rKuohao = /\{\{(.*?)\}\}/g
function compile(template, data) {
	let _type = template.type;
	let _data = template.data;
	let _value = template.value;
	let _tag = template.tag;
	let _children = template.children;


	let _vnode = null;

	if (_type === 3) { // 文本节点 
		// 对文本处理
		_value = _value.replace(rKuohao, function (_, g) {
			return getValueByPath(data, g.trim()); // 除了 get 读取器
		});

		_vnode = new VNode(_tag, _data, _value, _type)

	} else if (_type === 1) { // 元素节点
		_vnode = new VNode(_tag, _data, _value, _type);
		_children.forEach(_subvnode => _vnode.appendChild(compile(_subvnode, data)));
	}

	return _vnode;
}

// 虚拟DOM转换为真实DOM
function parseVNode(vnode) {
	let type = vnode.type
	let node = null
	// debugger
	if (type === 1) {
		// 创建元素
		node = document.createElement(vnode.tag)

		// 添加元素属性
		let data = vnode.data
		Object.keys(data).forEach(key => {
			attrName = key
			attrValue = data[key]

			node.setAttribute(key, data[key])
		})

		// 添加元素子元素
		vnode.children.forEach(subvnode => {
			node.appendChild(parseVNode(subvnode))
		})
	} else if (type === 3) {
		node = document.createTextNode(vnode.value)
	}

	return node
}