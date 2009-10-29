
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
		//QZFL早期版本each函数有个bug，故未直接使用，如果使用新版本，可以直接调用 each : QZFL.object.each;
		each : function(array, fn){
			if(typeof array.length == "undefined" || typeof array == "string"){
				array = [array];
			}
			for(var i = 0, len = array.length; i < len; i++){
				if(fn.call(array[i], array[i], i, array) === false){ return i; };
			}
		},
		extend : QZFL.object.extend
	};	
	
	jWidget.dom = QZFL.dom;
	jWidget.extend(QZFL.dom, {
		hasClass : QZFL.css.hasClassName,
		addClass : QZFL.css.addClassName,
		removeClass : QZFL.css.removeClassName
	});
	
	//QZFL.dom没有getChildren，但是其Element下有，可以修改本函数，通过调用Element来获取children
	jWidget.dom.getChildren = function(el) {
		var _arr = [];
		var el = jWidget.dom.getFirstChild(el);
		while (el) {
			if (!!el && el.nodeType == 1) {
				_arr.push(el);
			}
			el = el.nextSibling;
		}	
		return _arr;
	}		 
        
    jWidget.ui = jWidget.ui || {};
})();