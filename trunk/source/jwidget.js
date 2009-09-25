
/**
  * @fileoverview Slider�ֲ�Ч��
  * @version 1.0
  * @author jessezhang
  * @date: 2009-9-25
  */


QZFL.widget = QZFL.widget || {};

/**
 * Slide�ֲ�Ч��
 * 
 * @param {String|HTMLElement} el ����id�ţ�����Html Element����Slider����
 * @param {json} ���ò���
 *            @eventType         'mouseover' or 'click'��Ĭ��'mouseover'
 *            @autoPlay          �Ƿ��Զ�����,Ĭ���Զ�����
 *            @autoPlayInterval  �Զ����ż��ʱ�䣬Ĭ��3��
 *            @effect            ����Ч�� 'none','scrollx', 'scrolly', 'fade'
 *            @sliderWrapper     Slide����item��������Ĭ��ΪSlider������firstChild
 *            @sliderNav         Slide������������Ĭ��ΪSlider������secondChild
 *            @navClassOn        sliderNav������Ϻ����ʽ��Ĭ��Ϊ'on'
 *            @slideTime         ����ʱ��
 *            @panelSize         ��ȣ�srcollx���� �߶ȣ�scrolly��,����ʽ�����У����Զ���ȡ��һ��������д
 */
QZFL.widget.Slide = function(el, conf) {
	var $D = QZFL.dom;	
	conf = conf || {};	
	
	this.eventType = conf.eventType || 'mouseover' , 
	this.autoPlayInterval = Math.abs(conf.autoPlayInterval || 3) * 1000;

	this._play = true; 
	this._timer = null;	
	this._sliderContainer = $D.get(el);
	this._sliderWrapper = $D.get(conf.sliderWrapper) || $D.getFirstChild(this._sliderContainer);
	this._sliderWrapperCon = $e(this._sliderWrapper).getChildren().elements;
	this._sliderNav = $D.get(conf.sliderNav) || $D.getNextSibling(this._sliderWrapper);
	this._sliderNavCon = $e(this._sliderNav).getChildren().elements;
	this._effect = conf.effect || 'scrollx', 
	this._panelSize = conf.panelSize || $D.getSize($D.getFirstChild(this._sliderWrapper))[this._effect == "scrolly" ? 1 : 0 ];
	this._count = conf.count || $e(this._sliderWrapper).getChildren().elements.length;
	this._navClassOn = conf.navClassOn || "on"; 	
	this._target = 0;	
	this._changeProperty  = this._effect == "scrolly" ? "top" : "left";	
	
	this.curIndex = 0;
	this.step = Math.abs(this._effect == "none" ? 1 : (conf.Step || 5));
	this.slideTime = Math.abs(conf.slideTime || 10);
	
	this.init();
	this.run();
}

QZFL.widget.Slide.prototype = (function(){
	function each(obj, fn){//��ʱʹ�ã�ԭQZFL��each�и�bug�����޸�
		for (var i=0, len=obj.length; i<len; i++) {
			fn(obj[i], i);
		}
	}
	return {  
		init : function(){
			var $D = QZFL.dom;	
			$D.setStyle(this._sliderContainer, "overflow", "hidden");
			$D.setStyle(this._sliderContainer, "position", "relative");
			$D.setStyle(this._sliderWrapper, "position", "relative");
			
			if(this._effect == "scrollx" || this._effect == "none"){
				$D.setStyle(this._sliderWrapper, "width", this._count * (this._panelSize+200) + "px");
				QZFL.object.each(this._sliderWrapperCon,function(el){			
					el.style.styleFloat = el.style.cssFloat = "left";
				})
			}
			var _this = this;
			if(_this.eventType == 'click'){  //onclick
				each(this._sliderNavCon, function(el, i){
					el.onclick = (function(_this){return function(){
						QZFL.css.addClassName(el, _this._navClassOn);
						_this._play = false;
						_this.curIndex = i;
						_this._play = true;
						_this.run();
					}})(_this)
				})	
			} else {  //onmouseover
				each(this._sliderNavCon, function(el, i){
					el.onmouseover = (function(_this){return function(){
						QZFL.css.addClassName(el, _this._navClassOn);
						_this._play = false;
						_this.curIndex = i;
						_this.run();
					}})(_this)
					el.onmouseout = (function(_this){return function(){
						QZFL.css.removeClassName(el, _this._navClassOn);
						_this._play = true;
						_this.run();
					}})(_this)
				})	
			}			
			this._sliderWrapper.onmouseover = (function(_this){return function(){
				_this.stop();
			}})(this)  
			this._sliderWrapper.onmouseout = (function(_this){return function(){
				_this.run();
			}})(this)			
		},  
		
		run : function() {
			if(this.curIndex < 0){
				this.curIndex = this._count - 1;
			} else if (this.curIndex >= this._count){
				this.curIndex = 0; 
			}			
			this._target = -1 * this._panelSize * this.curIndex;
			var _this = this;
			each(this._sliderNavCon, function(el, i){
				_this.curIndex == (i) ? QZFL.css.addClassName(el, _this._navClassOn) : QZFL.css.removeClassName(el, _this._navClassOn);
			})	
			this.move();
		},
		
		move : function() {
			clearTimeout(this._timer);
			var _this = this, 
				_cur_property = parseInt(this._sliderWrapper.style[this._changeProperty]) || 0, 
				_distance = (this._target - _cur_property) / this.step;
			if (Math.abs(_distance) < 1 && _distance != 0) {
				_distance = _distance > 0 ? 1 : -1;
			}				
			if (_distance != 0) {
				this._sliderWrapper.style[this._changeProperty] = (_cur_property + _distance) + "px";
				this._timer = setTimeout(function(){_this.move();}, this.slideTime);
			} else {
				this._sliderWrapper.style[this._changeProperty] = this._target + "px";
				if (this._play) { 
					this._timer = setTimeout(function(){_this.curIndex++; _this.run();}, this.autoPlayInterval); 
				}
			}
		},
	
		stop : function() {
			clearTimeout(this._timer);
		}
	}
})();
