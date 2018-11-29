import React, { Component } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Search from './Search';
import Login from './Login';
import Contribute from './Contribute';
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