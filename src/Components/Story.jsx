import React, { Component } from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Tag from './Tag';
import '../styles/story.css';
import { Link } from 'react-router-dom';
import ActionPanel from './ActionPanel';

export class Story extends Component {
	state = { isHovering: false };

	render() {
		dayjs.extend(RelativeTime);

		if (this.props.cardView) {
			return (
				<div className='m-3 px-1 border rounded-lg   flex items-center '>
					<div
						onMouseEnter={(e) => {
							this.setState({ isHovering: true });
						}}
						onMouseLeave={(e) => {
							this.setState({ isHovering: false });
						}}
						className='flex flex-col  flex-wrap justify-center items-start   '>
						<div>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={this.props.url}>
								<img
									// style={{ maxHeight: '300px' }}
									className=' max-w-full border rounded-lg'
									src={this.props.urlToImage}
									alt=''
								/>
							</a>
						</div>
						<div className=' text-lg pt-2 text-gray-900 font-bold hover:underline '>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={this.props.url}>
								{this.props.title}
							</a>
						</div>
						<div>
							<p className=' py-2 self-start text-sm text-gray-700 '>
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
								<ActionPanel
									article={this.props.article}
									isAuthenticated={this.props.isAuthenticated}
									isHovering={this.state.isHovering}
									bookmarked={this.props.bookmarked}
									onBookmarkHandler={
										this.props.onBookmarkHandler
									}
									goToSourceHandler={this.goToSourceHandler}
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
							</p>
						</div>
					</div>
				</div>
			);
		}

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
						className=' custom-grid '>
						<div>
							<h1 className='  text-lg font-bold hover:underline '>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href={this.props.url}>
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
								<ActionPanel
									article={this.props.article}
									isAuthenticated={this.props.isAuthenticated}
									isHovering={this.state.isHovering}
									bookmarked={this.props.bookmarked}
									onBookmarkHandler={
										this.props.onBookmarkHandler
									}
									goToSourceHandler={this.goToSourceHandler}
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
							{this.props.tags && (
								<div className='flex flex-wrap mt-3 '>
									{this.props.tags.map((tag, idx) => (
										<Tag key={idx} tagname={tag} />
									))}
								</div>
							)}
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
