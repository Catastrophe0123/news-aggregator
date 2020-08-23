import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Tag extends Component {
	render() {
		return (
			<Link to={`/search?q=${this.props.tagname}`}>
				<div className=' cursor-pointer border px-2 py-1 font-mono hover:shadow-md border-gray-400 shadow-xs font-hairline text-xs m-1 rounded-lg bg-gray-100 '>
					<div>{this.props.tagname}</div>
				</div>
			</Link>
		);
	}
}

export default Tag;
