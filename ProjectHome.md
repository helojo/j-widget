jWidget:
a mini javascript widget library。包括轮播SlideView，TabView等，目前刚刚起步，只有很简单的几个功能，待完善。。。<br />
支持 独立版、qzfl（已完成）、jquery、ext、yui（待完成）。<br />
<h4>SlideView轮播：</h4>
![http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_1.jpg](http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_1.jpg)<br />
![http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_2.jpg](http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_2.jpg)<br />
<h4>代码：</h4>
```
jWidget.ui.SlideView("slider1", {panelWrapper:"slide_panel",navWrapper:"slide_nav"});  
jWidget.ui.SlideView("slider2", {effect: 'scrolly'});  
jWidget.ui.SlideView("slider3", {effect: 'scrolly fade'});  
jWidget.ui.SlideView("slider4", {effect: 'fade', navWrapper : 'slider4_nav'});  
jWidget.ui.SlideView("slider5", {effect: 'fade'});
```
<h4>参数：</h4>
```
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
```
<br /><br />
<h4>TabView切换：</h4>
![http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_3.jpg](http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_3.jpg)<br />
![http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_4.jpg](http://j-widget.googlecode.com/svn/trunk/examples/images/slide_demo_4.jpg)<br />
<h4>代码：</h4>
```
jWidget.ui.TabView("theme", {panelWrapper : 'theme_panel', navWrapper : 'theme_nav'});      
jWidget.ui.TabView("sale", {panelWrapper : 'danpin1_panel', navWrapper : 'danpin1_nav', navClassOn:'tab_on'});
jWidget.ui.TabView("tab2",{"type":"list"});
```
<h4>参数：</h4>
```
/**
 * Tab切换效果
 * @param {json} 配置参数
 *		@param {String|HTMLElement} container 包括id号，或则Html Element对象，Slider容
 *		@param eventType         'mouseover' or 'click'，默认'mouseover'
 *		@param type              'normal'普通 or 'list'间隔形式（参考demo3）
 *		@param panelWrapper      Slide内容item的容器，默认为Slider容器的firstChild
 *		@param navWrapper        Slide导航的容器，默认为Slider容器的secondChild
 *		@param navClassOn        navs鼠标移上后的样式，默认为'on'
 */
```