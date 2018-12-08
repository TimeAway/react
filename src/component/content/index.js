import React, { Component } from 'react';
import $ from 'jquery';
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

		this.choseMusic = this.choseMusic.bind(this);
	}

	componentWillMount(){
		const $this = this;
		$.ajax({
			type: 'get',
			dataType: 'json',
			async: false,	// 这里使用同步的方式
			url: '/mock/music.json',
			success(data){
				$this.setState(data)
			}
		})
	}

	choseMusic(id){
		this.refs.player.setCurrentMusic(id);
	}

	render(){
		return (
			<div className="content">
				<div className="content-left">
					<Player list={this.state.musicList} ref="player" />
				</div>
				<div className="content-right">
					<List list={this.state.musicList} choseMusic={this.choseMusic} />
				</div>
			</div>
		)
	}
}

export default Content;