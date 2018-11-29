import React, { Component } from 'react';
import './style.css';

class List extends Component {
	render(){
		return (
			<div className="music-list">
				<h5>歌曲列表</h5>
				<table className="music-list-table">
					<thead>
						<tr>
							<th width="20"></th>
							<th width="95">歌曲标题</th>
							<th width="40">时长</th>
							<th width="50">歌手</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.list.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.id}</td>
										<td className="over-text"><a href={item.href} title={item.title}>{item.title}</a></td>
										<td>{item.time}</td>
										<td className="over-text">{item.singer}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default List;