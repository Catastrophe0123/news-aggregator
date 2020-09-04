import React, { Component } from 'react';
import Story from './Story';

export class Stories extends Component {
	// we get the articles from the props

	state = { articles: null };

	hideStoryHandler = (id) => {
		this.setState((st) => {
			let x = [...st.articles];
			x.splice(id, 1);
			return { ...st, articles: x };
		});
	};

	// componentDidMount = () => {
	// 	this.setState({ articles: this.props.articles });
	// };

	render() {
		return (
			<div>
				{this.props.articles && (
					<div className='flex flex-wrap  justify-center'>
						{this.props.articles.map((el, idx) => (
							<Story
								hideStoryHandler={this.hideStoryHandler}
								bookmarkURLS={this.props.bookmarkURLS}
								bookmarked={this.props.bookmarkURLS.includes(
									el.url
								)}
								refreshUser={this.props.refreshUser}
								key={idx}
								idkey={idx}
								{...el}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default Stories;
