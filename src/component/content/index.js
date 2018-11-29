import React, { Component } from 'react';
import Player from './Player';
import List from './List';
import './style.css';

class Content extends Component {
	constructor(props){
		super(props);

		this.state = {
			musicList: [
				{ id: 1, title: '可能否', time: '03:47', singer: '木小雅', href: 'http://music.163.com/song/media/outer/url?id=569214126.mp3' },
				{ id: 2, title: '纸短情长', time: '03:06', singer: '花粥', href: 'http://music.163.com/song/media/outer/url?id=557581284.mp3' },
				{ id: 4, title: '往后余生', time: '03:51', singer: '王贰浪', href: 'http://music.163.com/song/media/outer/url?id=571338279.mp3' },
				{ id: 5, title: '我们', time: '04:20', singer: '陈奕迅', href: 'http://music.163.com/song/media/outer/url?id=551816010.mp3' },
				{ id: 6, title: '最美的期待', time: '03:30', singer: '周笔畅', href: 'http://music.163.com/song/media/outer/url?id=531295576.mp3' },
				{ id: 7, title: '爱了很久的朋友', time: '04:28', singer: '田馥甄', href: 'http://music.163.com/song/media/outer/url?id=547976490.mp3' },
				{ id: 8, title: '戒烟', time: '04:16', singer: '李荣浩', href: 'http://music.163.com/song/media/outer/url?id=518686034.mp3' },
				{ id: 9, title: '佛西少女', time: '03:14', singer: '冯提莫', href: 'http://music.163.com/song/media/outer/url?id=539941039.mp3' },
				{ id: 10, title: '给陌生的你听', time: '03:16', singer: '张思源', href: 'http://music.163.com/song/media/outer/url?id=562594322.mp3' }
			]
		}
	}

	render(){
		return (
			<div className="content">
				<div className="content-left">
					<Player />
				</div>
				<div className="content-right">
					<List list={this.state.musicList}/>
				</div>
			</div>
		)
	}
}

export default Content;