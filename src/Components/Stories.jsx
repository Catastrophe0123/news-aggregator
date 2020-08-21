import React, { Component } from 'react';
import Story from './Story';

export class Stories extends Component {
	// we get the articles from the props
	render() {
		return (
			<div>
				<h1>hell oowlrd</h1>
				{this.props.articles.map((el, idx) => (
					<Story key={idx} {...el} />
				))}
			</div>
		);
	}
}

export default Stories;
