var React = require('react');
var Greeting = require('./components/greeting.jsx');
var CommentBox = require('./components/comment-box');
var ReactDOM = require('react-dom');

// import React from "react";
// import Greeting from "./components/greeting";

React.render(
  <Greeting name="World"/>,
  document.body
);

ReactDOM.render(
  <div>Bonjour!</div>,
  document.getElementById('container')
);

// require('jquery');
// require('comment-box.js');
// // require('file?name=[name].[ext]!../index.html');

// (function() {
// 	require('components/greeting.jsx');
// 	console.log('hello webpack!');
// }());
