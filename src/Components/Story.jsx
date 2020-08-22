import React, { Component } from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Tag from './Tag';
import '../styles/story.css';

export class Story extends Component {
	render() {
		dayjs.extend(RelativeTime);
		return (
			<div className='m-3 max-w-4xl w-full'>
				<div className='border rounded-lg border-gray-500 shadow-md hover:shadow-lg p-5'>
					<div
						// className='flex justify-between '
						className='custom-grid '>
						<div>
							<h1 className='  text-lg font-bold hover:underline '>
								<a href={this.props.url}>{this.props.title}</a>
							</h1>
							<p className=' py-2 text-sm text-gray-700 '>
								{this.props.source.name} &#183;{' '}
								{dayjs(this.props.publishedAt).fromNow(true)}{' '}
								ago
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
