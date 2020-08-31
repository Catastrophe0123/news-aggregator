import React, { Component } from 'react';
import '../styles/ActionPanel.css';

export class ActionPanel extends Component {
	state = { copied: false };

	copyLink = () => {
		navigator.clipboard.writeText(this.props.articleURL);
		this.setState({ copied: true });
	};

	render() {
		return (
			<span className='mx-2'>
				<span
					style={{ transition: 'color 0.1s ease-in' }}
					onClick={this.props.onBookmarkHandler}
					className='cursor-pointer mx-2 '>
					<i className='far px-2 fa-bookmark  '></i>
				</span>
				<span onClick={this.copyLink} className='cursor-pointer      '>
					<i
						style={{ transition: 'color 0.1s ease-in' }}
						class={`fas px-2 fa-link ${
							this.state.copied && 'text-blue-600'
						}  `}></i>
				</span>
				<span
					onClick={this.props.onBookmarkHandler}
					className='cursor-pointer mx-2     '>
					<i class='fas px-2 fa-ellipsis-v'></i>
				</span>
			</span>
		);
	}
}

export default ActionPanel;
