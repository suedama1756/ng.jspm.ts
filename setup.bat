@ECHO OFF

SET PATH=%~dp0build;%~dp0node_modules\.bin;%PATH%

IF /i "%1"=="install" (
	npm install
  	jspm install
    typings install
)