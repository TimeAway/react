import React, { Component, Fragment } from 'react';
import './style.css';

class Player extends Component {
	constructor(props){
		super(props);
		this.state = {
			isMore: false,	// 歌词是否展开状态
			isPlaying: false,	// 是否在播放
			circulate: 1,	// 播放模式,1|随机播放 2|单曲循环 3|列表循环
			isDragging: false,	// 是否正在拖动
			startX: 0,			// 拖动的起始位置
			startPosition: 0,
			currentPosition: 0
		}

		this.ctrlOrMore = this.ctrlOrMore.bind(this);
		this.playPreMusic = this.playPreMusic.bind(this);
		this.playNextMusic = this.playNextMusic.bind(this);
		this.playOrPauseMusic = this.playOrPauseMusic.bind(this);
		this.switchCirculate = this.switchCirculate.bind(this);
		this.processClick = this.processClick.bind(this);
		this.slideClick = this.slideClick.bind(this);
		this.slideDraging = this.slideDraging.bind(this);
	}

	// 歌词的展示，全部展示或部分展示
	ctrlOrMore(){
		this.setState({
			isMore: this.state.isMore ? false : true
		})
	}

	// 上一首
	playPreMusic(id){
		this.props.choseMusic(--id);
	}

	// 播放/暂停
	playOrPauseMusic(){
		const music = document.getElementById("music");
		let isPlaying = this.state.isPlaying;
		if (!isPlaying && music.readyState === 4 ) {
			music.play();
			isPlaying = true;
		}else{
			music.pause();
			isPlaying = false;
		}

		this.setState({
			isPlaying: isPlaying
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

	// 拖动滑块
	slideDraging(clientX){
		if (!this.state.isDragging) return;
		
		this.setPosition(clientX);
	}

	dragStart(event){
		this.setState({
			isDragging: true,
			startX: event.clientX,	// 记录开始滑动时的clientX
			startPosition: this.state.currentPosition	// 记录当前位置为开始值
		});
	}

	dragEnd(){
		const slide = document.getElementById("slide");
		this.setState({
			isDragging: false
		});

		slide.removeEventListener('mousemove', this.slideDraging);
      	slide.removeEventListener('mouseup', this.dragEnd);
	}

	setPosition(clientX){
		const progress = document.getElementById("progress");
		const contentWidth = progress.offsetWidth;
		// 计算当前拖动位置与初始拖动位置的距离
		const diff = clientX - this.state.startX;
		// 计算拖动的距离占精度条的百分比
		const percent = (diff / contentWidth).toFixed(6) * 100;
		console.log(percent);
		this.setState({
			currentPosition: Math.max(0, Math.min(
        		this.state.startPosition + percent, 100))
		});

		this.updateView();
	}

	updateView(){
		const slide = document.getElementById("slide");
		slide.style.left = this.state.currentPosition + "%";
	}

	// 点击滑块
	slideClick(event){
		event.stopPropagation();
		this.dragStart(event);

		const that = this;
		const slide = document.getElementById("slide");
		slide.addEventListener('mousemove', function(event) {
			that.slideDraging(event.clientX);
		});

		slide.addEventListener('mouseup', function() {
			that.dragEnd();
		})
	}

	// 点击进度条
	processClick(e){
		const progress = document.getElementById("progress");
		const slide = document.getElementById("slide");
		const width = e.clientX - this.getOffsetX(progress) + slide.clientWidth/2;
		slide.style.left = width + "px";
	}

	// 获取元素到浏览器左边的距离
	getOffsetX(element){
		let offsetLeft = element.offsetLeft;
		if (element.offsetParent) {
			offsetLeft += element.offsetParent.offsetLeft;
		}
		return offsetLeft;
	}

	render(){
		const musicData = this.props.music;
		if (!musicData) return (<Fragment></Fragment>);
		const { id, title, singer, time, href, album, image, lyric } = musicData;
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
					<div className="player-progress" id="progress">
						<div className="progress" onClick={this.processClick}>
							<div className="progress-top"></div>
						</div>
						<span className="slide" id="slide" onMouseDown={this.slideClick}>
							<i className="slide-inner"></i>
						</span>
						<span className="time"><em>00:00</em>/{time}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Player;