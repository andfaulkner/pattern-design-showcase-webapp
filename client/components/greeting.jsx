var React = require('react');

export var Greeting = React.createClass({
	render: function() {
		return <div className="greeting">Hello, {this.props.name}!</div>;
	}
});

console.log('entered greeting.jsx');
