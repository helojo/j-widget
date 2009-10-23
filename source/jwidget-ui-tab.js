
/**
 * @fileoverview jWidget:a mini javascript widget library
 * @version 1.0
 * @author jessezhang <jianguang.qq@gmail.com>
 * Released under the MIT Licenses. 
 * More information: http://code.google.com/p/j-widget/
 */
 
(function(){	
	var $ = jWidget,
		$D = $.dom;	
	
	/**
	 * Slide轮播效果
	 * @param {json} 配置参数
	 *		@param {String|HTMLElement} container 包括id号，或则Html Element对象，Slider容
	 *		@param eventType         'mouseover' or 'click'，默认'mouseover'
	 *		@param autoPlay          是否自动播放,默认自动播放
	 *		@param autoPlayInterval  自动播放间隔时间，默认3秒
	 *		@param effect            播放效果 'none','scrollx', 'scrolly', 'fade'
	 *		@param panelWrapper     Slide内容item的容器，默认为Slider容器的firstChild
	 *		@param navWrapper        Slide导航的容器，默认为Slider容器的secondChild
	 *		@param navClassOn        navs鼠标移上后的样式，默认为'on'
	 *		@param slideTime         滑动时延
	 *		@param width             宽度（srcollx）,如样式中已有，会自动获取，一般无需填写
	 *		@param height            高度（scrolly）,如样式中已有，会自动获取，一般无需填写
	 */
	_Tab = function(conf) {
		var defaultCfg = {
			}
		conf = conf || {};	
		
		this.eventType = conf.eventType || 'mouseover', 

		this._container = $D.get(conf.container);
		this._panelWrapper = $D.get(conf.panelWrapper) || $D.getFirstChild(this._container);
		this._sliders = $D.getChildren(this._panelWrapper);
		this._navWrapper = $D.get(conf.navWrapper) || $D.getNextSibling(this._panelWrapper);
		this._navs = $D.getChildren(this._navWrapper);
        this._count = conf.count || $D.getChildren(this._panelWrapper).length;
		this._navClassOn = conf.navClassOn || "on";           
        this.oldIndex = 0;              
        this.curIndex = 0;  	
		this.init();
	} 
	
	_Tab.prototype = {  
		init : function(){				
			var _this = this;
			$.each(this._navs, function(el, i){
				el['on'+_this.eventType] = (function(_this){return function(){
					
                    $D.removeClass(_this._navs[_this.curIndex], _this._navClassOn);
                    _this._sliders[_this.curIndex].style.display = 'none';
                    _this.curIndex = i;                    
                    $D.addClass(el, _this._navClassOn);
                    _this._sliders[_this.curIndex].style.display = '';
				}})(_this)
			})
		}
	}
	
	jWidget.ui = jWidget.ui || {};
	
	jWidget.ui.TabView = function(el, conf){
		conf = conf || {};
		conf.container = $D.get(el);
		conf.navWrapper = $D.get(conf.navWrapper) || $D.getFirstChild(conf.container);
		conf.panelWrapper = $D.get(conf.panelWrapper) || $D.getNextSibling(conf.navWrapper);
		return new _Tab(conf);
	}
})()