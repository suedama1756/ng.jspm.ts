interface ITemplate {
	templateURL: string;
}

declare module 'app/templates/HelloWorld.html!ng-template' {
	var template: ITemplate;
	export default template;
}