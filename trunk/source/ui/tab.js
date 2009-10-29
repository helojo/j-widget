
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
	 * Tab切换效果
	 * @param {json} 配置参数
	 *		@param {String|HTMLElement} container 包括id号，或则Html Element对象，Slider容
	 *		@param eventType         'mouseover' or 'click'，默认'mouseover'
	 *		@param type           
	 *		@param panelWrapper      Slide内容item的容器，默认为Slider容器的firstChild
	 *		@param navWrapper        Slide导航的容器，默认为Slider容器的secondChild
	 *		@param navClassOn        navs鼠标移上后的样式，默认为'on'
	 */
	_Tab = function(conf) {		
		this.eventType = conf.eventType || 'mouseover', 
		this._container = conf.container;		 
        this._type = conf.type || "normal";         
        this._navClassOn = conf.navClassOn || "on"; 
        var _this = this;
        if(this._type == "list"){		
        	var cons = $D.getChildren(this._container);
        	this._panels = [];
            this._navs = [];    
            $.each(cons, function(el, i){
                if(i%2){
                    _this._panels.push(el);
                } else {
                    _this._navs.push(el);
                } 
            }) 
        }else{
            this._navWrapper = $D.get(conf.navWrapper) || $D.getFirstChild(this._container);
            this._navs = $D.getChildren(this._navWrapper);   
            this._panelWrapper = $D.get(conf.panelWrapper) || $D.getNextSibling(this._navWrapper);
            this._panels = $D.getChildren(this._panelWrapper);           
        }
                     
        this.curIndex = 0;  	
        $.each(this._panels, function(el, i){
            if(el.style.display != "none"){
                _this.curIndex = i;
            } 
        })

		this._panels[this.curIndex].style.display = '';
		this._panels[this.curIndex].style.display = '';
		$D.removeClass(this._navs[this.curIndex], this._navClassOn);
		$D.addClass(this._navs[this.curIndex], this._navClassOn);

		$.each(this._navs, function(el, i){
            el['on'+_this.eventType] = (function(_this){return function(){                  
                $D.removeClass(_this._navs[_this.curIndex], _this._navClassOn);
                _this._panels[_this.curIndex].style.display = 'none';
                _this.curIndex = i;                    
                $D.addClass(el, _this._navClassOn);
                _this._panels[_this.curIndex].style.display = '';
                try{QZFL.lazyLoad.loadHideImg(_this._panels[_this.curIndex])}catch(e){}//loadLoad隐藏的图片
            }})(_this)
        })
	}
	
	jWidget.ui.TabView = function(el, conf){
		conf = conf || {};
		conf.container = $D.get(el);
		return new _Tab(conf);
	}
})();