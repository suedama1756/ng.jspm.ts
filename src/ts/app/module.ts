import * as angular from 'angular';
import {coreModule} from 'core/module';
import {HelloWorldController} from './HelloWorldController';

// import template
import 'app/templates/HelloWorld.html!ng-template';

// define module dependent on core module
export var appModule = angular.module('appname/app', [
	'ng',
	coreModule.name
]).controller('TestController', HelloWorldController);