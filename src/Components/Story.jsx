import React, { Component } from 'react';

export class Story extends Component {
	render() {
		return (
			<div className='m-3 p-3 '>
				<div className='border rounded border-gray-500 shadow-sm'>
					<h1 className=' text-center text-lg font-bold '>
						{this.props.title}
					</h1>
					<p className='text-sm text-gray-700 '>
						{this.props.source.name} &#183; {this.props.publishedAt}
					</p>
					<p>{this.props.description}</p>
				</div>
			</div>
		);
	}
}

export default Story;
