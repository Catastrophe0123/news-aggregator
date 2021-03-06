import React, { Component } from 'react';
import '../styles/ActionPanel.css';
// import Dropdown from './Dropdown';

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { withRouter } from 'react-router-dom';
// import 'rc-menu/assets/index.css';

export class ActionPanel extends Component {
	state = { copied: false, bookmarked: false, loading: false };

	// componentDidMount = () => {
	// 	this.setState({ bookmarked: this.props.bookmarked });
	// };

	copyLink = () => {
		navigator.clipboard.writeText(this.props.articleURL);
		this.setState({ copied: true });
	};

	goToSourceHandler = (source) => {
		this.props.history.push(`/search?sources=${source}`);
	};

	// onBookmarkHandler = async () => {
	// 	try {
	// 		this.setState({ loading: true });
	// 		let resp = await Axios.post('/bookmark', { ...this.props });
	// 		console.log(resp.data);

	// 		let bookmarks = resp.data.userdata.bookmarks;
	// 		console.log('yoyoyo : ', bookmarks);
	// 		this.setState((st) => {
	// 			return {
	// 				loading: false,
	// 				bookmarked: !st.bookmarked,
	// 			};
	// 		});
	// 		// this.props.refreshUser(bookmarks);
	// 	} catch (err) {
	// 		console.log('error');
	// 		console.log(err.response);
	// 	}
	// };

	onSelect = ({ key, ...x }) => {
		switch (key) {
			case '0':
				this.props.hideStoryHandler(this.props.storyId);
				break;
			case '1':
				this.goToSourceHandler(this.props.sourceId);
				break;
			case '2':
				// delete this.props.article.tags;
				this.props.onBookmarkHandler(this.props.article);
				break;
			case '3':
				this.props.removeSourceHandler();
				break;
			default:
				return;
		}
	};

	// onVisibleChange = (visible) => {
	// 	console.log(visible);
	// };

	menu = () => (
		<Menu selectedKeys={[]} onSelect={this.onSelect}>
			<MenuItem key='0'>
				<span className=' cursor-pointer text-base'>
					Hide this story
				</span>
			</MenuItem>
			<MenuItem disabled={!this.props.sourceId} key='1'>
				<span className=' cursor-pointer text-base'>
					{`Go to ${this.props.sourceName}`}
				</span>
			</MenuItem>
			<Divider />
			<MenuItem disabled={!this.props.isAuthenticated} key='2'>
				<span className=' cursor-pointer text-base'>
					save this article
				</span>
			</MenuItem>
			{/* <MenuItem disabled={!this.props.isAuthenticated} key='3'>
				<span className='cursor-pointer text-base'>{`Hide all stories from ${this.props.sourceName}`}</span>
			</MenuItem> */}
		</Menu>
	);

	render() {
		let bookmarkclasses = this.props.bookmarked
			? 'fas px-2 fa-bookmark text-blue-600'
			: 'far px-2 fa-bookmark';
		return (
			<span
				style={{
					opacity: this.props.isHovering ? '100%' : '0%',
					transition: 'all 0.15s ease-in',
				}}
				className='mx-2'>
				{this.props.isAuthenticated && (
					<span
						// disabled={this.state.loading}
						style={{ transition: 'color 0.1s ease-in' }}
						onClick={() =>
							this.props.onBookmarkHandler(this.props.article)
						}
						className='cursor-pointer mx-2 '>
						<i className={bookmarkclasses}></i>
					</span>
				)}

				<span onClick={this.copyLink} className='cursor-pointer      '>
					<i
						style={{ transition: 'color 0.1s ease-in' }}
						className={`fas px-2 fa-link ${
							this.state.copied && 'text-blue-600'
						}  `}></i>
				</span>
				<Dropdown
					trigger={['click']}
					overlay={this.menu}
					animation='slide-up'
					onVisibleChange={this.onVisibleChange}>
					<button className='cursor-pointer mx-2     '>
						<i className='fas px-2 fa-ellipsis-v'></i>
					</button>
				</Dropdown>
				{/* <Dropdown color='white' /> */}
			</span>
		);
	}
}

export default withRouter(ActionPanel);
