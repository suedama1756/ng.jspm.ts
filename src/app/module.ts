import {module} from 'angular';
import {TestController} from './TestController';

export var appModule = module('appname/app', ['ng'])
	.controller('TestController', TestController).name;