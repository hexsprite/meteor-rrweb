Package.describe({
  name: 'hexsprite:rrweb',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.9.2')
  api.use('ecmascript')
  api.mainModule('./client.js', 'client')
  api.mainModule('./server.js', 'server')
})

// Package.onTest(function(api) {
//   api.use('ecmascript')
//   api.use('tinytest')
//   api.use('meteor-rrweb')
//   api.mainModule('meteor-rrweb-tests.js')
// })
