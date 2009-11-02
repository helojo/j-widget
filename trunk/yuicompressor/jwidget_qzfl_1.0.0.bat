del ..\build\release\jwidget_qzfl_1.0.1.js
for /f %%i in (jwidget_qzfl_1.0.0.conf) do type %%i >> ..\build\release\jwidget_qzfl_1.0.0.js 
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -o ..\build\release\jwidget_qzfl_1.0.0-min.js ..\build\release\jwidget_qzfl_1.0.0.js

