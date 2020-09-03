import React, { Component } from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Tag from './Tag';
import '../styles/story.css';
import { Link } from 'react-router-dom';
import ActionPanel from './ActionPanel';
import Axios from '../utils/axiosInstance';

export class Story extends Component {
	state = { isHovering: false };

	onBookmarkHandler = async () => {
		try {
			let resp = await Axios.post('/bookmark', { ...this.props });
			console.log(resp.data);
			let bookmarks = resp.data.userdata.bookmarks;
			console.log('yoyoyo : ', bookmarks);
			this.props.refreshUser(bookmarks);
		} catch (err) {
			console.log('error');
			console.log(err.response);
		}
	};

	render() {
		dayjs.extend(RelativeTime);
		return (
			<div className='m-3 max-w-4xl w-full'>
				<div
					onMouseEnter={(e) => {
						this.setState({ isHovering: true });
					}}
					onMouseLeave={(e) => {
						this.setState({ isHovering: false });
					}}
					className='border rounded-lg border-gray-500 shadow-md hover:shadow-lg p-5'>
					<div
						// className='flex justify-between '
						className='custom-grid '>
						<div>
							<h1 className='  text-lg font-bold hover:underline '>
								<a target='_blank' href={this.props.url}>
									{this.props.title}
								</a>
							</h1>
							<p className=' py-2 text-sm text-gray-700 '>
								{this.props.source.id ? (
									<Link
										to={`/search?sources=${this.props.source.id}`}>
										{this.props.source.name}
									</Link>
								) : (
									this.props.source.name
								)}{' '}
								&#183;{' '}
								{dayjs(this.props.publishedAt).fromNow(true)}{' '}
								ago{' '}
								{this.state.isHovering && (
									<ActionPanel
										bookmarked={this.props.bookmarked}
										onBookmarkHandler={
											this.onBookmarkHandler
										}
										goToSourceHandler={
											this.goToSourceHandler
										}
										hideStoryHandler={
											this.props.hideStoryHandler
										}
										storyId={this.props.idkey}
										sourceId={this.props.source.id}
										sourceName={this.props.source.name}
										userCopied={this.userCopied}
										articleURL={this.props.url}
										removeSourceHandler={() => {}}
									/>
								)}
							</p>
							{this.props.description !== '' ? (
								<p className='font-sans'>
									{this.props.description}
								</p>
							) : (
								<p className='font-sans'>
									{this.props.content}
								</p>
							)}
							<div className='flex flex-wrap mt-3 '>
								{this.props.tags.map((tag) => (
									<Tag tagname={tag} />
								))}
							</div>
						</div>
						<img
							style={{ width: '100px', height: '100px' }}
							className='object-cover border shadow-xl rounded-lg m-auto '
							src={this.props.urlToImage}
							alt=''
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Story;
