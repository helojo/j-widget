
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
	_Slide = function(conf) {
		var defaultCfg = {
			}
		conf = conf || {};	
		
		this.eventType = conf.eventType || 'mouseover' , 
		this.autoPlayInterval = conf.autoPlayInterval || 3 * 1000;
	
		this._play = true; 
		this._timer = null;	
		this._fadeTimer = null;
		this._container = $D.get(conf.container);
		this._panelWrapper = $D.get(conf.panelWrapper) || $D.getFirstChild(this._container);
		this._sliders = $D.getChildren(this._panelWrapper);
		this._navWrapper = $D.get(conf.navWrapper) || $D.getNextSibling(this._panelWrapper);
		this._navs = $D.getChildren(this._navWrapper);
		this._effect = conf.effect || 'scrollx';
		this._panelSize = (this._effect.indexOf("scrolly") == -1 ?  conf.width : conf.height) || $D.getSize($D.getFirstChild(this._panelWrapper))[this._effect.indexOf("scrolly") == -1 ? 0 : 1 ];
		this._count = conf.count || $D.getChildren(this._panelWrapper).length;
		this._navClassOn = conf.navClassOn || "on"; 	
		this._target = 0;	
		this._changeProperty  = this._effect.indexOf("scrolly") == -1 ? "left" : "top" ;	
		
		this.curIndex = 0;
		this.step = this._effect.indexOf("scroll") == -1 ? 1 : (conf.Step || 5);
		this.slideTime = conf.slideTime || 10;
		
		this.init();
		this.run(true);
	} 
	
	_Slide.prototype = {  
		init : function(){	
			$D.setStyle(this._container, "overflow", "hidden");
			$D.setStyle(this._container, "position", "relative");
			$D.setStyle(this._panelWrapper, "position", "relative");
			
			if(this._effect.indexOf("scrolly") == -1){ 
				$D.setStyle(this._panelWrapper, "width", this._count * (this._panelSize+200) + "px");
				$.each(this._sliders,function(el){			
					el.style.styleFloat = el.style.cssFloat = "left";
				})
			}
			var _this = this;
			if(_this.eventType == 'click'){  //onclick
				$.each(this._navs, function(el, i){
					el.onclick = (function(_this){return function(){
						$D.addClass(el, _this._navClassOn);
						_this._play = false;
						_this.curIndex = i;
						_this._play = true;
						_this.run();
					}})(_this)
				})	
			} else {  //onmouseover
				$.each(this._navs, function(el, i){
					el.onmouseover = (function(_this){return function(){
						$D.addClass(el, _this._navClassOn);
						_this._play = false;
						_this.curIndex = i;
						_this.run();
					}})(_this)
					el.onmouseout = (function(_this){return function(){
						$D.removeClass(el, _this._navClassOn);
						_this._play = true;
						_this.run();
					}})(_this)
				})	
			}					
		},  
		
		run : function(isInit) {
			if(this.curIndex < 0){
				this.curIndex = this._count - 1;
			} else if (this.curIndex >= this._count){
				this.curIndex = 0; 
			}			
			this._target = -1 * this._panelSize * this.curIndex;
			var _this = this;
			$.each(this._navs, function(el, i){
				_this.curIndex == (i) ? $D.addClass(el, _this._navClassOn) : $D.removeClass(el, _this._navClassOn);
			})	
			
			this.scroll();
			
			if(this._effect.indexOf("fade") >= 0){
				$D.setStyle(this._panelWrapper, "opacity", isInit ? 0.5 : 0.1);
				this.fade();
			}
		},
		
		scroll : function() {
			clearTimeout(this._timer);
			var _this = this, 
				_cur_property = parseInt(this._panelWrapper.style[this._changeProperty]) || 0, 
				_distance = (this._target - _cur_property) / this.step;
			if (Math.abs(_distance) < 1 && _distance != 0) {
				_distance = _distance > 0 ? 1 : -1;
			}				
			if (_distance != 0) {
				this._panelWrapper.style[this._changeProperty] = (_cur_property + _distance) + "px";
				this._timer = setTimeout(function(){_this.scroll();}, this.slideTime);
			} else {
				this._panelWrapper.style[this._changeProperty] = this._target + "px";
				if (this._play) { 
					this._timer = setTimeout(function(){_this.curIndex++; _this.run();}, this.autoPlayInterval); 
				}
			}
		},
		
		fade : function() {
			var _opacity = $D.getStyle(this._panelWrapper, "opacity");
			var _this = this;
			if(_opacity < 1){
				$D.setStyle(this._panelWrapper, "opacity", parseFloat(_opacity) + 0.02);
				setTimeout(function(){_this.fade();}, 1);
			}
		}
	}
	
	jWidget.ui = jWidget.ui || {};
	
	jWidget.ui.SlideView = function(el, conf) {
		conf = conf || {};
		conf.container = el;
		return new _Slide(conf);	
	}
	
	jWidget.ui.TabView = function(el, conf){
		conf = conf || {};
		conf.container = el;
		conf.effect = conf.effect || "none";
		conf.container = $D.get(el);
		conf.navWrapper = $D.get(conf.navWrapper) || $D.getFirstChild(conf.container);
		conf.panelWrapper = $D.get(conf.panelWrapper) || $D.getNextSibling(conf.navWrapper);
		return new _Slide(conf);
	}
})()