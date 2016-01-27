System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  typescriptOptions: {
    "module": "system",
    "noImplicitAny": false,
    "typeCheck": true,
    "tsconfig": true
  },
  paths: {
    "npm:*": "jspm/npm/*",
    "github:*": "jspm/github/*"
  },

  packages: {
    "app": {
      "main": "main",
      "defaultExtension": "ts"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.9",
    "typescript": "npm:typescript@1.7.5"
  }
});
