import React, { Component, Fragment } from 'react';
import './style.css';

class Player extends Component {
	constructor(props){
		super(props);
		this.state = {
			isMore: true
		}

		this.ctrlOrMore = this.ctrlOrMore.bind(this);
	}

	ctrlOrMore(){
		this.setState({
			isMore: this.state.isMore ? false : true
		})
	}

	render(){
		const musicData = this.props.music;
		if (!musicData) return (<Fragment></Fragment>);
		const { title, singer, time, album, image, lyric } = musicData;

		return (
			<div className="content-player">
				<div className="content-player-top">
					<div className="photo">
						<img src={image} alt="图像"/>
						<span></span>
					</div>
					<div className="player">
						<div className="player-title">
							<i></i><span>{title}</span>
						</div>
						<p className="singer">歌手：<span>{singer}</span></p>
						<p className="singer">所属专辑：<span>{album}</span></p>
						<div className="handle">
							<button type="button"><i className="collect"></i>收藏</button>
							<button type="button"><i className="share"></i>分享</button>
							<button type="button"><i className="download"></i>下载</button>
							<button type="button"><i className="comment"></i>评论</button>
						</div>
						<div className="lyric">
							<div dangerouslySetInnerHTML={{ __html:lyric.ctrl }}></div>
							<div className={this.state.isMore ? 'hide' : 'show'} dangerouslySetInnerHTML={{ __html:lyric.more }}></div>
							<button type="button" className="ctrl-more" onClick={this.ctrlOrMore}>
								{this.state.isMore ? '展开' : '收起'}<i className={this.state.isMore ? 'more' : 'ctrl'}></i>
							</button>
						</div>
					</div>
				</div>
				<div className="player-control">
					<p className="player-info">{title} - {singer}</p>
					<div className="player-btn">
						<button type="button" className="pre" title="上一首">上一首</button>
						<button type="button" className="play" title="播放/暂停">播放/暂停</button>
						<button type="button" className="next" title="下一首">下一首</button>
						<button type="button" className="volume" title="音量">音量</button>
						<button type="button" className="circulate" title="循环方式">循环方式</button>
					</div>
					<div className="player-progress">
						<div className="progress">
							<div className="progress-top"></div>
							<span className="slide">
								<i className="slide-inner"></i>
							</span>
						</div>
						<span className="time">00:00/{time}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Player;