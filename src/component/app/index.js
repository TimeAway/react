import React, { Component } from 'react';
import './style.css';
import Header from '../header';
import Content from '../content';

class App extends Component {
	render(){
		return (
			<div>
				<Header />
				<Content />
			</div>
		)
	}
}

export default App;