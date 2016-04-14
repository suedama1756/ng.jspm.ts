export class HelloWorldController {
	constructor(scope) {
		scope.message = 'Hello world';
	}
};

HelloWorldController.$inject = ['$scope'];
