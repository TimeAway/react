import React, { Component } from 'react';
import Logo from './logo';
import Nav from './nav';
import Search from './search';
import Login from './login';
import Contribute from './contribute';
import './style.css';

class Header extends Component {
	render(){
		return (
			<div className="header">
				<div className="header-wrap">
					<Logo />
					<Nav />
					<Login />
					<Contribute />
					<Search />
				</div>
			</div>
		)
	}
}

export default Header;