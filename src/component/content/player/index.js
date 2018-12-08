import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';

let musicList = [],			// 音乐列表
	musicLength = 10,		// 音乐列表的总长度
	isDrgging = false,		// 是否在拖动
	rotateTimer = 0,		// 图片旋转计时器
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
			isMore: false,				// 歌词是否展开状态
			isPlaying: false,			// 是否在播放
			circulate: 1,				// 播放模式,1|随机播放 2|单曲循环 3|列表循环
			currentTime: "00:00",		// 当前播放时间
			duration: "00:00",			// 总的播放时间
			currentMusic: 0, 			// 当前播放的音乐
			hasVolume: true				// 是否有声音
		}

		musicList = props.list;
		musicLength = musicList.length;
		this.ctrlOrMore = this.ctrlOrMore.bind(this);
		this.setCurrentMusic = this.setCurrentMusic.bind(this);
		this.playOrPauseMusic = this.playOrPauseMusic.bind(this);
		this.switchCirculate = this.switchCirculate.bind(this);
		this.switchVolume = this.switchVolume.bind(this);
		this.slideMouseDown = this.slideMouseDown.bind(this);
		this.slideMouseUp = this.slideMouseUp.bind(this);
		this.onCanplay = this.onCanplay.bind(this);
		this.jump = this.jump.bind(this);
		this.playing = this.playing.bind(this);
		this.dragging = this.dragging.bind(this);
		this.onError = this.onError.bind(this);
	}

	// 设置当前播放的音乐
	setCurrentMusic(id, model){
		if (model) {
			let index = 0;

			musicList.map((item, i) => {
				if (item.id === id) {
					index = i;
					return false;
				}
			});

			// 如果是随机播放
			if (this.state.circulate === 1 || model === "random") {
				while( id === musicList[index]['id']){
					index = Math.floor(Math.random() * musicLength);
				}
			}else{
				index = model === "pre" ? --index : ++index;				
			}

			// 如果是顺序播放，且是最后一首歌曲，停止播放
			if (this.state.circulate === 3 && index > musicLength - 1) {
				return;
			}

			index = index > musicLength - 1 ? 0 : index < 0 ? musicLength - 1 : index;
			id = musicList[index]['id'];
		}
		
		this.setState({
			currentMusic: id
		}, this.play);
	}

	// 当前播放时间的计算（由秒转为mm:ss格式）
	timeFormat(time){
		 let seconds = 0, minutes = 0;
		 seconds = parseInt(time % 60);
		 minutes = parseInt((time / 60) % 60);
		 seconds = ("0" + seconds).slice(-2);
		 minutes = ("0" + minutes).slice(-2);
		 return `${minutes}:${seconds}`;
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

	// 播放音乐
	play(){
		audio.play();
		this.playing();
		this.musicTimer();
		this.rotate();
		this.setState({
			isPlaying: true
		});
	}

	// 暂停播放
	pause(){
		audio.pause();
		this.musicTimerStop();
		this.rotatePause();
		this.setState({
			isPlaying: false
		})
	}

	// 播放/暂停
	playOrPauseMusic(){
		if (this.state.isPlaying) {
			this.pause();
		}else {
			this.play();
		}
	}

	// 音乐播放时的计时器
	musicTimer(){
		this.musicTimerStop();
		musicTimer = setInterval(this.playing, 1000);
	}

	// 停止计时器
	musicTimerStop(){
		clearInterval(musicTimer);
		musicTimer = 0;
	}

	// 设置当前播放时间
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

	// 更新视图
	updateView(){
		slideLeft = Math.max(minLeft, Math.min(maxLeft, slideLeft));	// 防止滑块滑出进度条
		currentTime = Math.max(0, Math.min(duration, currentTime));		// 防止时间超出
		curWidth = Math.max(0, Math.min(progressWidth, curWidth));		// 已播放进度
		$slide.css("left", slideLeft);	// 更新滑块位置
		$curProgress.width(curWidth);	// 更新进度条
		this.setState({					// 更新时间
			currentTime: this.timeFormat(currentTime)
		});
	}

	// 设置位置
	setPosition(event){
		slideLeft = event.clientX - contentLeft + slideWidth;
		curWidth = slideLeft - progressLeft + slideWidth;
		percent = (curWidth / progressWidth).toFixed(6);
		currentTime = Math.ceil(duration * percent);
	}

	// 持续播放
	playing(){
		if (isDrgging) return;	// 如果正在拖动，那么不在此更新视图

		if (audio.ended) {	// 当前音频播放结束
			this.pause();
			switch(this.state.circulate){
				case 1: 	// 随机播放
					this.setCurrentMusic(this.state.currentMusic, "random");
					break;

				case 2: 	// 单曲循环
					this.play();
					break;

				case 3: 	// 列表循环
					this.setCurrentMusic(this.state.currentMusic, 'next');
					break;

				default:
					break;
			}
			return;
		}
		currentTime = Math.ceil(audio.currentTime);
		percent = (currentTime / duration).toFixed(6);
		curWidth = progressWidth * percent;
		slideLeft = curWidth + progressLeft - slideWidth;
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
		isDrgging = true;
		this.setPosition(event);
		this.updateView();
	}

	// 切换播放模式
	switchCirculate(){
		let cir = this.state.circulate;
		this.setState({
			circulate: cir === 3 ? 1 : ++cir
		})
	}

	// 切换声音模式
	switchVolume(){
		this.setState({
			hasVolume: !this.state.hasVolume
		}, () => {
			audio.volume = this.state.hasVolume ? 1 : 0;	// 1最大声音，0是最小声音
		})
	}

	// 点击拖动滑块
	slideMouseDown(){
		$(document).bind("mousemove", this.dragging);
		$(document).bind("mouseup", this.slideMouseUp);
	}

	// 停止拖动
	slideMouseUp(){
		isDrgging = false;
		this.setCurrentTime();
		$(document).unbind("mousemove", this.dragging);
		$(document).unbind("mouseup", this.slideMouseUp);
	}

	// 当音频能够播放时，用于初始化audio对象的相关数据（在加载音频或重新加载音频都会触发此事件）
	onCanplay(){
		duration = audio.duration;
		angle = 0;	// 重置图片旋转角度
		this.setState({
			duration: this.timeFormat(duration)
		});
	}

	onError(){
		this.pause();
		console.log("加载错误");
	}

	render(){
		const { id, title, singer, href, album, image, lyric } = musicList[this.state.currentMusic];
		$("title").text(`${title} - ${singer} - 网易云音乐`);
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
						<button type="button" className="pre" title="上一首" onClick={this.setCurrentMusic.bind(this, id, 'pre')}>上一首</button>
						<button type="button" 
							className={this.state.isPlaying ? 'pause' : 'play'} 
							title="播放/暂停"
							onClick={this.playOrPauseMusic}>播放/暂停</button>
						<button type="button" className="next" title="下一首" onClick={this.setCurrentMusic.bind(this, id, 'next')}>下一首</button>
						<button type="button"
								onClick={this.switchVolume}
								className={this.state.hasVolume ? 'volume' : 'no-volume'} 
								title="音量">音量</button>
						<button type="button"
								className={this.state.circulate === 1 ? 'random' : this.state.circulate === 2 ? 'single' : 'order' }
								title={this.state.circulate === 1 ? '随机播放' : this.state.circulate === 2 ? '单曲循环' : '列表循环' }
								onClick={this.switchCirculate}>循环方式</button>
						<audio id="music" src={href} onError={this.onError} onCanPlay={this.onCanplay}>当前浏览器不支持播放</audio>
					</div>
					<div className="player-progress" id="content">
						<div className="progress" onClick={this.jump} id="progress">
							<div className="progress-top" id="curProgress"></div>
						</div>
						<span className="slide" id="slide" onMouseDown={this.slideMouseDown}>
							<i className="slide-inner"></i>
						</span>
						<span className="time">{this.state.currentTime}/{this.state.duration}</span>
					</div>
				</div>
			</div>
		)
	}

	// 当组件加载完成后，初始化相关的数据
	componentDidMount(){
		audio = document.getElementById("music");	// jquery获取的audio不能直接使用，这里使用原生的
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