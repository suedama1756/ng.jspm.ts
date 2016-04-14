System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "modules/npm/*",
    "github:*": "modules/github/*"
  },

  packages: {
    "app": {
      "main": "main",
      "defaultExtension": "js"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.9",
    "ng-template": "npm:plugin-ng-template@0.1.1"
  }
});
