import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';

let rotateTimer = 0,		// 图片旋转计时器
	angle = 0,				// 图片旋转的角度
	musicTimer = 0,			// 音乐播放计时器
	slideLeft = 20,				// 滑块距离父容器的距离
	slideWidth = 10,			// 滑块的宽度
	maxLeft = 0, minLeft = 0,	// 距离左边最大、最小的距离
	contentLeft = 0,		// 容器到屏幕左边的距离
	progressLeft = 20,		// 进度条到父容器的距离
	progressWidth = 0,		// 进度条的宽度
	curWidth = 0,			// 当前进度的宽度
	duration = 0,			// 音频总长度
	currentTime = 0,		// 当前播放时间
	percent = 0,			// 当前进度百分比
	$slide = null, $progress = null, $curProgress = null, $content = null, audio = null;

class Player extends Component {
	constructor(props){
		super(props);
		this.state = {
			isMore: false,		// 歌词是否展开状态
			isPlaying: false,	// 是否在播放
			circulate: 1,		// 播放模式,1|随机播放 2|单曲循环 3|列表循环
			currentTime: "00:00"	// 当前播放时间
		}

		this.ctrlOrMore = this.ctrlOrMore.bind(this);
		this.playPreMusic = this.playPreMusic.bind(this);
		this.playNextMusic = this.playNextMusic.bind(this);
		this.playOrPauseMusic = this.playOrPauseMusic.bind(this);
		this.switchCirculate = this.switchCirculate.bind(this);
		this.slideMouseDown = this.slideMouseDown.bind(this);
		this.slideMouseUp = this.slideMouseUp.bind(this);
		this.canplay = this.canplay.bind(this);
		this.jump = this.jump.bind(this);
		this.playing = this.playing.bind(this);
		this.dragging = this.dragging.bind(this);
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

	// 当前播放时间的计算（由秒转为mm:ss格式）
	timeFormat(){
		 let seconds = 0, minutes = 0;
		 seconds = parseInt(currentTime % 60);
		 minutes = parseInt((currentTime / 60) % 60);
		 seconds = ("0" + seconds).slice(-2);
		 minutes = ("0" + minutes).slice(-2);
		 return minutes + ":" + seconds;
	}

	musicTimer(){
		this.musicTimerStop();
		musicTimer = setInterval(this.playing, 1000);
	}

	musicTimerStop(){
		clearInterval(musicTimer);
		musicTimer = 0;
	}

	// 当音频能够播放时，触发该事件，用于初始化audio对象的相关数据
	canplay(){
		duration = audio.duration;
	}

	play(){
		this.musicTimer();
		this.rotate();
		this.setState({
			isPlaying: true
		}, () => {
			audio.play();
		});
	}

	setCurrentTime(){
		if ("fastSeek" in audio) {
			audio.fastSeek(currentTime);	// 谷歌浏览器不支持该方法
		}else{
			audio.currentTime = currentTime;
		}

		if (audio.paused) {
			this.play();	
		}
	}

	// 持续播放
	playing(){
		if (audio.ended) {	// 如果播放结束
			this.pause();
			return;
		}
		curWidth = progressWidth * percent;
		slideLeft = curWidth + progressLeft - slideWidth;
		percent = (currentTime / duration).toFixed(6);
		currentTime = audio.currentTime;
		this.updateView();
	}

	// 跳转播放
	jump(event){
		this.setPosition(event);
		this.updateView();
		this.setCurrentTime();
	}

	// 拖动播放
	dragging(event){
		this.setPosition(event);
		this.updateView();
	}

	setPosition(event){
		slideLeft = event.clientX - contentLeft + slideWidth;
		curWidth = slideLeft - progressLeft + slideWidth;
		percent = (curWidth / progressWidth).toFixed(6);
		currentTime = duration * percent;
	}

	updateView(){
		slideLeft = Math.max(minLeft, Math.min(maxLeft, slideLeft));	// 防止滑块滑出进度条
		currentTime = Math.max(0, Math.min(duration, currentTime));		// 防止时间超出
		curWidth = Math.max(0, Math.min(progressWidth, curWidth));		// 已播放进度
		$slide.css("left", slideLeft);	// 更新滑块位置
		$curProgress.width(curWidth);	// 更新进度条
		this.setState({					// 更新时间
			currentTime: this.timeFormat()
		});
	}

	pause(){
		audio.pause();
		this.musicTimerStop();
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

	// 点击拖动滑块
	slideMouseDown(){
		$(document).bind("mousemove", this.dragging);
		$(document).bind("mouseup", this.slideMouseUp);
	}

	// 停止拖动
	slideMouseUp(){
		this.setCurrentTime();
		$(document).unbind("mousemove", this.dragging);
		$(document).unbind("mouseup", this.slideMouseUp);
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
						<audio id="music" src={href} onCanPlay={this.canplay}>当前浏览器不支持播放</audio>
					</div>
					<div className="player-progress" id="content">
						<div className="progress" onClick={this.jump} id="progress">
							<div className="progress-top" id="curProgress"></div>
						</div>
						<span className="slide" id="slide" onMouseDown={this.slideMouseDown}>
							<i className="slide-inner"></i>
						</span>
						<span className="time">{this.state.currentTime}/{time}</span>
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