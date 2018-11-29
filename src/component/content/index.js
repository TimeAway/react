import React, { Component } from 'react';
import Player from './Player';
import List from './List';
import './style.css';

class Content extends Component {
	constructor(props){
		super(props);

		this.state = {
			musicList: [],	// 所有的音乐
			currMusic: 0	// 当前播放的音乐
		}

		this.playerMusic = this.playerMusic.bind(this);
	}

	componentWillMount(){
		fetch('/mock/music.json').then(response => {
			if (response.ok) {
				response.json().then(data => {
					this.setState(data)
				})
			}
		})
	}

	playerMusic(id){
		this.setState({
			currMusic: --id
		})
	}

	render(){
		return (
			<div className="content">
				<div className="content-left">
					<Player music={this.state.musicList[this.state.currMusic]}/>
				</div>
				<div className="content-right">
					<List list={this.state.musicList} playerMusic={this.playerMusic}/>
				</div>
			</div>
		)
	}
}

export default Content;