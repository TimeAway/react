import React, { Component } from 'react';
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
		return (
			<div className="content-player">
				<div className="photo">
					<div>
						<img src="http://p2.music.126.net/n4rCFiFFxb81OrJ8Bl9PXA==/109951163076302415.jpg?param=130y130" alt="图像"/>
						<span></span>
					</div>
					<div className="player-btn">
						<button type="button" className="pre">上一首</button>
						<button type="button" className="play">播放/暂停</button>
						<button type="button" className="next">下一首</button>
					</div>
				</div>
				<div className="player">
					<div className="player-title">
						<i></i><span>梦一场</span>
					</div>
					<p className="singer">歌手：<span>萧敬腾</span></p>
					<p className="singer">所属专辑：<span>爱的时刻自选辑</span></p>
					<div className="handle">
						<button type="button"><i className="collect"></i>收藏</button>
						<button type="button"><i className="share"></i>分享</button>
						<button type="button"><i className="download"></i>下载</button>
						<button type="button"><i className="comment"></i>评论</button>
					</div>
					<div className="lyric">
						作曲 : 袁惟仁<br/>
						作词 : 袁惟仁<br/>
						我们都曾经寂寞而给对方承诺<br/>
						我们都因为折磨而厌倦了生活<br/>
						只是这样的日子 同样的方式还要多久<br/><br/>
						我们改变了态度而接纳了对方<br/>
						我们委屈了自己成全谁的梦想<br/>
						只是这样的日子 还剩下多少已不重要<br/><br/>
						时常想起过去的温存<br/>
						它让我在夜里不会冷<br/>
						你说一个人的美丽是认真<br/>
						<div className={this.state.isMore ? 'hide' : 'show'}>
							两个人能在一起是缘份<br/><br/>
							早知道是这样 像梦一场<br/>
							我才不会把爱都放在同一个地方<br/>
							我能原谅 你的荒唐<br/>
							荒唐的是我没有办法遗忘<br/>
							早知道是这样 如梦一场<br/>
							我又何必把泪都锁在自己的眼眶<br/>
							让你去疯让你去狂<br/>
							让你在没有我的地方坚强<br/><br/>
							时常想起过去的温存<br/>
							它让我在夜里不会冷<br/>
							你说一个人的美丽是认真<br/>
							两个人能在一起是缘份<br/>
							早知道是这样 像梦一场<br/>
							我才不会把爱都放在同一个地方<br/>
							我能原谅 你的荒唐<br/>
							荒唐的是我没有办法遗忘<br/>
							早知道是这样 如梦一场<br/>
							我又何必把泪都锁在自己的眼眶<br/>
							让你去疯 让你去狂<br/>
							让你在没有我的地方坚强<br/><br/>
							让我在没有你的地方疗伤<br/>
						</div>
						<button type="button" className="ctrl-more" onClick={this.ctrlOrMore}>
							{this.state.isMore ? '展开' : '收起'}<i className={this.state.isMore ? 'more' : 'ctrl'}></i>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Player;