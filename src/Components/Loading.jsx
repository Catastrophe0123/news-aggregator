import React, { Component } from 'react';

export class Loading extends Component {
	render() {
		return (
			<div className=' mt-16 justify-center w-full h-full flex '>
				<i className='  fas fa-spinner fa-5x fa-pulse'></i>
			</div>
		);
	}
}

export default Loading;
