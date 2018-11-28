import React, { Component } from 'react';
import Player from './player'
import './style.css';

class Content extends Component {
	render(){
		return (
			<div className="content">
				<div className="content-left">
					<Player />
				</div>
				<div className="content-right">
					
				</div>
			</div>
		)
	}
}

export default Content;