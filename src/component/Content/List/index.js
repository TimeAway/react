import React, { Component } from 'react';
import './style.css';

class List extends Component {
	musicClick(id){
		this.props.playerMusic(id);
	}

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
										<td className="over-text">
											<button type="button" title={item.title} onClick={this.musicClick.bind(this, item.id)}>{item.title}</button>
										</td>
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