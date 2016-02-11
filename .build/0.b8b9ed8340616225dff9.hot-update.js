webpackHotUpdate(0,{

/***/ 75:
/***/ function(module, exports) {

	/* REACT HOT LOADER */ if (module.hot) { (function () { var ReactHotAPI = require("/home/andrew/projects/own-projects/pattern-design-showcase-webapp/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/andrew/projects/own-projects/pattern-design-showcase-webapp/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var React = require('react');
	var Greeting = require('./components/greeting');

	// import React from "react";
	// import Greeting from "./components/greeting";

	React.render(React.createElement(Greeting, { name: 'World' }), document.body);

	// require('jquery');
	// require('comment-box.js');
	// // require('file?name=[name].[ext]!../index.html');

	// (function() {
	// 	require('components/greeting.jsx');
	// 	console.log('hello webpack!');
	// }());

	/* REACT HOT LOADER */ }).call(this); } finally { if (module.hot) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/andrew/projects/own-projects/pattern-design-showcase-webapp/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }

})