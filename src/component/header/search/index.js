import React, { Component } from 'react';
import './style.css';

class Search extends Component {
	constructor(props){
		super(props);

		this.state = {
			isShowLabel: true
		}

		this.inputFocus = this.inputFocus.bind(this);
		this.inputBlur = this.inputBlur.bind(this);
	}

	inputFocus(){
		this.setState({
			isShowLabel: false
		})
	}

	inputBlur(){
		this.setState({
			isShowLabel: true
		})
	}

	render(){
		return (
			<div className="header-search">
				<div className="header-search-wrap">
					<input type="text" id="serach" onFocus={this.inputFocus} onBlur={this.inputBlur}/>
					<label htmlFor="serach" className={this.state.isShowLabel ? 'show' : 'hide'}>音乐/视频/电台/用户</label>
				</div>
			</div>
		)
	}
}

export default Search;