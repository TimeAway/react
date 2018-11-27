import React, { Component } from 'react';
import './style.css';

const navLi = [
	{ title: '发现音乐', href: 'https://music.163.com/#', target: '_self'},
	{ title: '我的音乐', href: 'https://music.163.com/#/my/', target: '_self'},
	{ title: '朋友', href: 'https://music.163.com/#/friend', target: '_self'},
	{ title: '商城', href: 'https://music.163.com/store/product', target: '_blank'},
	{ title: '音乐人', href: 'https://music.163.com/nmusician/web/index', target: '_blank'},
	{ title: '下载客户端', href: 'https://music.163.com/#/download', target: '_self'}
];
const length = navLi.length - 1;

class Nav extends Component {
	render(){
		return (
			<ul className="header-nav">
				{
					navLi.map((item, index) => {
						return (
							<li key={index}>
								<a href={item.href} target={item.target}>{item.title}</a> { index === length ? <sub className="hot">&nbsp;</sub> : '' }
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default Nav;