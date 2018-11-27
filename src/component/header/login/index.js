import React, { Component } from 'react';
import './style.css';

class Login extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			isShowLogin: false,
			data: [
				{ title: '手机号登录', class: 'icon-phone', target: '_blank', href: 'https://music.163.com/#' },
				{ title: '微信登录', class: 'icon-wechat', target: '_blank', href: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxe280063f5fb2528a&response_type=code&redirect_uri=https://music.163.com/back/weichat&forcelogin=true&scope=snsapi_login&state=KCohlYWDck&checkToken=9ca17ae2e6ffcda170e2e6ee94d163a7eb9ccce144f1a88fb2d84f968f9aabb748f193aad9ef64888bbcadd62af0feaec3b92a9bbcf78df645f69c9aa4c55b869f8ab3d45f8ab1af8edc678b93b68cd8538fbdee9e&lang=zh_CN#wechat_redirect' },
				{ title: 'QQ登录', class: 'icon-qq', target: '_blank', href: 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100495085&response_type=code&redirect_uri=https://music.163.com/back/qq&forcelogin=true&state=ESvaRmsutj&checkToken=9ca17ae2e6ffcda170e2e6ee94d163a7eb9ccce144f1a88fb2d84f968f9aabb748f193aad9ef64888bbcadd62af0feaec3b92ab3f083b5d45db498fa8dbb5e879e9fa3d54b9be7a0d4d0669b95bd8fe939b7b7ee9e' },
				{ title: '新浪微博登录', class: 'icon-weibo', target: '_blank', href: 'https://api.weibo.com/oauth2/authorize?client_id=301575942&response_type=code&redirect_uri=http://music.163.com/back/weibo&forcelogin=true&scope=friendships_groups_read,statuses_to_me_read,follow_app_official_microblog&state=rxHZtkWomS&checkToken=9ca17ae2e6ffcda170e2e6ee94d163a7eb9ccce144f1a88fb2d84f968f9aabb748f193aad9ef64888bbcadd62af0feaec3b92a859e979adc79b1b0be8cb45b868b9ea2d15f8aebab8bcc738b90e5b9cc649096ee9e' },
				{ title: '网易邮箱账号登录', class: 'icon-email', target: '_blank', href: 'https://music.163.com/#' }
			]
		}

		this.loginOver = this.loginOver.bind(this);
		this.loginLeave = this.loginLeave.bind(this);
	}

	loginOver(){
		this.setState({
			isShowLogin: true
		})
	}

	loginLeave(){
		this.setState({
			isShowLogin: false
		})
	}

	render(){
		return (
			<div className="header-login" onMouseOver={this.loginOver} onMouseLeave={this.loginLeave}>
				<button type="button">登录</button>
				<div id="inner" className={this.state.isShowLogin ? 'show' : 'hide'}>
					<i className="arrow"></i>
					<ul>
						{
							this.state.data.map((item, index) => {
								return (
									<li key={index} className={index % 2 ? '' : 'ltb'}>
										<a href={item.href} target={item.target}>
											<i className={'icon ' + item.class}></i><em>{item.title}</em>
										</a>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default Login;