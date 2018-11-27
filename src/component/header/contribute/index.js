import React, { Component } from 'react';
import './style.css';

class Contribute extends Component {
	render(){
		return (
			<a className="header-contribute"
			   href="https://music.163.com/#/login?targetUrl=%2Fuservideo" 
			   target="_blank" rel="noopener noreferrer">视频投稿</a>
		)
	}
}

export default Contribute;