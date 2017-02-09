require.onError = function(err) {
	console.log("error: ", err, err.requireType, err.requireModules);
}

requirejs.config({
  shim: {
    'jasmine-html': {
      deps: [
        'jasmine-core'
      ]
    },
    'jasmine-boot': {
      deps: [
        'jasmine-core',
        'jasmine-html'
      ]
    },
    markdown: {
      exports: 'markdown'
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    }
  },
  paths: {
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery',
    requirejs: '../bower_components/requirejs/require',
    text: '../bower_components/text/text',
    'jasmine-core': '../bower_components/jasmine-core/lib/jasmine-core/jasmine',
    'jasmine-html': '../bower_components/jasmine-core/lib/jasmine-core/jasmine-html',
    'jasmine-boot': '../bower_components/jasmine-core/lib/jasmine-core/boot',
    handlebars: '../bower_components/handlebars/handlebars',
    rxjs: '../bower_components/rxjs/dist/rx.all',
    rx: '../bower_components/rxjs/dist/rx.all',
    'jasmine-ajax': '../bower_components/jasmine-ajax/lib/mock-ajax',
    jasmine: '../bower_components/jasmine/lib/jasmine-core/jasmine',
    promise: '../bower_components/promise-js/promise',
    'jasmine-promise-matchers': '../bower_components/jasmine-promise-matchers/dist/jasmine-promise-matchers',
    moment: '../bower_components/moment/moment',
    'promise-js': '../bower_components/promise-js/promise',
    semver: '../bower_components/semver/semver.browser',
    clipboard: '../bower_components/clipboard/dist/clipboard',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    'markdown-it': '../bower_components/markdown-it/dist/markdown-it'
  },
  packages: [

  ]
});

var scriptTags = document.getElementsByTagName("script");
var bootstrapAttr;
for (var i in scriptTags) {
  var tag = scriptTags[i];
  bootstrapAttr = tag.getAttribute("data-bootstrap");
  if (bootstrapAttr !== null) {
    break;
  }
}

define([bootstrapAttr], function(bootstrap) {
	bootstrap();
});
