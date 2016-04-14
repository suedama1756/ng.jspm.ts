import { HelloWorldController } from '../app/HelloWorldController';
import { expect } from 'chai';

describe('HelloWorldController', () => {
	describe('when created', () => {
		var instance: HelloWorldController,
			scope : any = {};
		
		beforeEach(() => {
			instance = new HelloWorldController(scope);
		});

		it('should set message on scope', () => {
			expect(scope.message).to.equal('Hello world');
		});
	});
});