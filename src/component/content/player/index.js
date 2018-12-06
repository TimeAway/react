import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';

let rotateTimer = 0;		// 图片旋转计时器
let angle = 0;				// 图片旋转的角度
let slideLeft = 20;				// 滑块距离父容器的距离
let slideWidth = 10;			// 滑块的宽度
let maxLeft = 0, minLeft = 0;	// 距离左边最大、最小的距离
let contentLeft = 0;		// 容器到屏幕左边的距离
let progressLeft = 20;		// 进度条到父容器的距离
let progressWidth = 0;		// 进度条的宽度
let curWidth = 0;			// 当前进度的宽度
let $slide = null, $progress = null, $curProgress = null, $content = null, audio = null;

class Player extends Component {
	constructor(props){
		super(props);
		this.state = {
			isMore: false,		// 歌词是否展开状态
			isPlaying: false,	// 是否在播放
			circulate: 1,		// 播放模式,1|随机播放 2|单曲循环 3|列表循环
			curTime: "00:00"	// 当前播放时间
		}

		this.ctrlOrMore = this.ctrlOrMore.bind(this);
		this.playPreMusic = this.playPreMusic.bind(this);
		this.playNextMusic = this.playNextMusic.bind(this);
		this.playOrPauseMusic = this.playOrPauseMusic.bind(this);
		this.switchCirculate = this.switchCirculate.bind(this);
		this.slideClick = this.slideClick.bind(this);
	}

	// 歌词的展示，全部展示或部分展示
	ctrlOrMore(){
		this.setState({
			isMore: this.state.isMore ? false : true
		})
	}

	// 图片旋转
	rotate(){
		this.rotatePause();
		rotateTimer = setInterval(() => {
			if (++angle > 360) angle = 0;

			$("#image").css("transform", `rotate(${angle}deg)`);
		}, 50);
	}

	// 停止图片旋转
	rotatePause(){
		clearInterval(rotateTimer);
		rotateTimer = 0;
	}

	// 上一首
	playPreMusic(id){
		this.props.choseMusic(--id);
	}

	// 播放/暂停
	playOrPauseMusic(){
		if (this.state.isPlaying) {
			this.pause();
		}else {
			this.play();
		}
	}

	play(){
		audio.play();
		this.rotate();
		this.setState({
			isPlaying: true
		})
	}

	pause(){
		audio.pause();
		this.rotatePause();
		this.setState({
			isPlaying: false
		})
	}

	// 下一首
	playNextMusic(id){
		this.props.choseMusic(++id);
	}

	// 切换播放模式
	switchCirculate(){
		let cir = this.state.circulate;
		this.setState({
			circulate: cir === 2 ? 0 : ++cir
		})
	}

	setPosition(event){
		slideLeft = event.clientX - contentLeft + slideWidth;
		slideLeft = slideLeft > maxLeft ? maxLeft : slideLeft;
		slideLeft = slideLeft < minLeft ? minLeft : slideLeft;	// 防止滑块滑出进度条
		curWidth = slideLeft - progressLeft + slideWidth;

		$slide.css("left", slideLeft);
		$curProgress.width(curWidth);

		/*const percent = (diff / contentWidth).toFixed(6) * 100;*/
	}

	// 点击滑块
	slideClick(){
		$(document).bind("mousemove", this.setPosition);
		$(document).bind("mouseup", this.slideStop);
	}

	// 停止拖动
	slideStop(){
		$(document).unbind("mousemove", this.setPosition);
		$(document).unbind("mouseup", this.slideStop);
	}

	render(){
		const { id, title, singer, time, href, album, image, lyric } = this.props.music;
		return (
			<div className="content-player">
				<div className="content-player-top">
					<div className="photo" id="image">
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
							<div className={this.state.isMore ? 'show' : 'hide'} dangerouslySetInnerHTML={{ __html:lyric.more }}></div>
							<button type="button" className="ctrl-more" onClick={this.ctrlOrMore}>
								{this.state.isMore ? '收起' : '展开'}<i className={this.state.isMore ? 'ctrl' : 'more'}></i>
							</button>
						</div>
					</div>
				</div>
				<div className="player-control">
					<div className="player-btn">
						<p className="player-info">{title} - {singer}</p>
						<button type="button" className="pre" title="上一首" onClick={this.playPreMusic.bind(this, id)}>上一首</button>
						<button type="button" 
							className={this.state.isPlaying ? 'pause' : 'play'} 
							title="播放/暂停"
							onClick={this.playOrPauseMusic}>播放/暂停</button>
						<button type="button" className="next" title="下一首" onClick={this.playNextMusic.bind(this, id)}>下一首</button>
						<button type="button" className="volume" title="音量">音量</button>
						<button type="button"
								className={this.state.circulate === 1 ? 'random' : this.state.circulate === 2 ? 'single' : 'order' }
								title={this.state.circulate === 1 ? '随机播放' : this.state.circulate === 2 ? '单曲循环' : '列表循环' }
								onClick={this.switchCirculate}>循环方式</button>
						<audio id="music" src={href}>当前浏览器不支持播放</audio>
					</div>
					<div className="player-progress" id="content">
						<div className="progress" onClick={this.setPosition} id="progress">
							<div className="progress-top" id="curProgress"></div>
						</div>
						<span className="slide" id="slide" onMouseDown={this.slideClick}>
							<i className="slide-inner"></i>
						</span>
						<span className="time">{this.state.curTime}/{time}</span>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount(){
		audio = document.getElementById("music");
		$slide = $("#slide");
		$progress = $("#progress");
		$curProgress = $("#curProgress");
		$content = $("#content");

		slideWidth = $slide.width() / 2;
		progressWidth = $progress.width();
		progressLeft = $progress.position().left;
		contentLeft = $content.offset().left;
		maxLeft = progressWidth + progressLeft - slideWidth;
		minLeft = progressLeft - slideWidth;
	}
}

export default Player;