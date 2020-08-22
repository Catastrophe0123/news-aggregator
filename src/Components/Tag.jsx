import React, { Component } from 'react';

export class Tag extends Component {
	render() {
		return (
			<div className='border px-2 py-1 font-mono hover:shadow-md border-gray-400 shadow-xs font-hairline text-xs m-1 rounded-lg bg-gray-100 '>
				<div>{this.props.tagname}</div>
			</div>
		);
	}
}

export default Tag;
