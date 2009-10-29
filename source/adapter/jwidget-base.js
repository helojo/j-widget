
/**
 * @fileoverview jWidget:a mini javascript widget library
 * @version 1.0
 * @author jessezhang <jianguang.qq@gmail.com>
 * Released under the MIT Licenses. 
 * More information: http://code.google.com/p/j-widget/
 */

(function(){
	jWidget = {
		version : '1.0.0',
		each : function(obj, fn){
			var i = 0, k, _fn = fn;	
			if (Object.prototype.toString.call(obj) === "[object Array]") {
				if (!!obj.forEach) {
					obj.forEach(fn);
				} else {
					var len = obj.length
					while (i < len) {
						_fn(obj[i], i, obj);
						++i;
					}
				}
			} else {
				for (k in obj) {
					_fn(obj[k], k, obj);
				}
			}
			return true;
		},
		extend : function(obj, ext) {
			if(obj && ext && typeof ext == 'object'){
				this.each(ext, function(v, k) {
					obj[k] = v;
				});
			}
		}
	};
	
	var _isW3cMode = document.defaultView && document.defaultView.getComputedStyle;
	
	jWidget.dom = {	
		get : function(e){
			if(typeof e == "string")
				return document.getElementById(e);
			return e;
		},
		
		/**
		 * 得到第一个子节点（element），firefox会得到到文本节点等。这里统一得到element。
		 * 
		 * @param {HTMLElement} node 对象
		 *            @example
		 *            var element=QZFL.dom.getFirstChild(QZFL.dom.get("el_id"));
		 * @return HTMLElement
		 */
		getFirstChild : function(el) {
			el = this.get(el);
			var child = !!el.firstChild && el.firstChild.nodeType == 1 ? el.firstChild : null;
			return child || this.getNextSibling(el.firstChild);
		},
		
		/**
		 * 得到下一个兄弟节点（element），firefox会得到到文本节点等。这里统一得到element。
		 * 
		 * @param {HTMLElement} el 对象
		 *            @example
		 *            QZFL.dom.getNextSibling(QZFL.dom.get("el_id"));
		 * @return HTMLElement
		 */
		getNextSibling : function(el) {
			el = this.get(el);
			while (el) {
				el = el.nextSibling;
				if (!!el && el.nodeType == 1) {
					return el;
				}
			}
			return null;
		},
		
		getChildren : function(el) {
			var _arr = [];
			var el = this.getFirstChild(el);
			while (el) {
				if (!!el && el.nodeType == 1) {
					_arr.push(el);
				}
				el = el.nextSibling;
			}	
			return _arr;
		},
		
		/**
		 * 获取对象尺寸
		 * 
		 * @param {HTMLElement} el
		 * @return Array [width,height]
		 * @type Array
		 *       @example
		 *       var size=QZFL.dom.getSize(QZFL.dom.get("div_id"));
		 * @return Array
		 */
		getSize : function(el) {
			var _fix = [0,0];
			if (el) {
				//修正 border 和 padding 对 getSize的影响
				jWidget.each(["Left", "Right", "Top", "Bottom"], function(v){ 
					_fix[v == "Left" || v == "Right" ? 0 : 1] += (parseInt(jWidget.dom.getStyle(el, "border" + v + "Width"), 10) || 0) + (parseInt(jWidget.dom.getStyle(el, "padding" + v), 10) || 0);
				});
				return [el.offsetWidth - _fix[0], el.offsetHeight - _fix[1]];
			}
			return [-1, -1];
		},
		
		/**
		 * 获取对象渲染后的样式规则
		 * 
		 * @param {String|HTMLElement} el 对象id或则dom
		 * @param {String} property 样式规则
		 *            @example
		 *            var width=QZFL.dom.getStyle("div_id","width");//width=163px;
		 * @return 样式值
		 */
		getStyle : function(el, property) {
			el = this.get(el);
	
			if (!el || el.nodeType == 9) {
				return null;
			}
			
			var computed = !_isW3cMode ? null : document.defaultView.getComputedStyle(el, '');
			var value = "";
			switch (property) {
				case "float" :
					property = _isW3cMode ? "cssFloat" : "styleFloat";
					break;
				case "opacity" :
					if (!_isW3cMode) { // IE Mode
						var val = 100;
						try {
							val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
						} catch (e) {
							try {
								val = el.filters('alpha').opacity;
							} catch (e) {}
						}
						return val / 100;
					}else{
						return parseFloat((computed || el.style)[property]);
					}
					break;
			}
	
			if (_isW3cMode) {
				return (computed || el.style)[property];
			} else {
				return (el.currentStyle[property] || el.style[property]);
			}
		},
		
		/**
		 * 设置样式规则
		 * 
		 * @param {String|HTMLElement} el 对象id或则dom
		 * @param {String} property 样式规则
		 *            @example
		 *            QZFL.dom.setStyle("div_id","width","200px");
		 * @return 成功返回 true
		 */
		setStyle : function(el, property, value) {
			el = this.get(el);
			if (!el || el.nodeType == 9) return false;
			switch (property) {
				case "float" :
					property = _isW3cMode ? "cssFloat" : "styleFloat";
				case "opacity" :
					if (!_isW3cMode) { // for ie only
						if (value >= 1) {
							el.style.filter = "";
							return;
						}
						el.style.filter = 'alpha(opacity=' + (value * 100) + ')';
						return true;
					} else {
						el.style[property] = value;
						return true;
					}
					break;
				default :
					if (typeof el.style[property] == "undefined")return false;
					el.style[property] = value;
					return true;
			}
		},
		
		/**
		 * 是否有指定的样式类名称
		 * @param {Object} el 指定的HTML元素
		 * @param {String} cname 指定的类名称
		 * @example QZFL.css.hasClass($("div_id"),"cname");
		 * @return Boolean
		 */
		hasClass : function(el, cname) {
			return (el && cname) ? new RegExp('\\b' + cname + '\\b').test(el.className) : false;
		},
		
		/**
		 * 增加一个样式类名
		 * @param {Object} el 指定的HTML元素
		 * @param {Object} cname 指定的类名称
		 * @example QZFL.css.addClass($("ele"),"cname");
		 * @return Boolean
		 */
		addClass : function(el, cname) {
			if (el && cname) {
				if (el.className) {
					if (jWidget.dom.hasClass(el, cname)) {
						return false;
					} else {
						el.className += ' ' + cname;
					}
				} else {
					el.className = cname;
				}
				return true;
			}
			return false;
		},
	
		/**
		 * 除去一个样式类名
		 * @param {Object} el 指定的HTML元素
		 * @param {String} cname 指定的类名称
		 * @example QZFL.css.removeClass($("ele"),"cname");
		 * @return Boolean
		 */
		removeClass : function(el, cname) {
			if (el && cname && el.className) {
				var old = el.className;
				el.className = (el.className.replace(new RegExp('\\b' + cname + '\\b'), ''));
				return el.className != old;
			} else {
				return false;
			}
		}
	}	 
        
    jWidget.ui = jWidget.ui || {};
})()