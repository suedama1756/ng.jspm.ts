export class TestController {
	constructor(scope) {
		scope.message = 'Hello world';
	}
};

TestController.$inject = ['$scope'];
