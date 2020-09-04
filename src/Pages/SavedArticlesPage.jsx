import React, { Component } from 'react';
import Stories from '../Components/Stories';

export class SavedArticlesPage extends Component {
	state = { articles: null };

	hideStoryHandler = (id) => {
		this.setState((st) => {
			let x = [...st.articles];
			x.splice(id, 1);
			return { ...st, articles: x };
		});
	};

	componentDidMount = () => {
		this.setState({ articles: this.props.bookmarks });
	};

	render() {
		return (
			<div>
				<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
					Your Bookmarks
				</h1>

				{this.state.articles && (
					<Stories
						hideStoryHandler={this.hideStoryHandler}
						refreshUser={this.props.refreshUser}
						bookmarkURLS={this.props.bookmarkURLS}
						articles={this.state.articles}
					/>
				)}
			</div>
		);
	}
}

export default SavedArticlesPage;
