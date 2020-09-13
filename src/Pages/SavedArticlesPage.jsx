import React, { Component } from 'react';
import Stories from '../Components/Stories';
import Axios from '../utils/axiosInstance';
import Loading from '../Components/Loading';

export class SavedArticlesPage extends Component {
	state = { articles: [], bookmarks: [], bookmarkURLS: [], loading: true };

	hideStoryHandler = (id) => {
		this.setState((st) => {
			let x = [...st.articles];
			x.splice(id, 1);
			return { ...st, articles: x };
		});
	};

	componentDidMount = async () => {
		try {
			this.setState({ loading: true });

			const resp = await Axios.get('/bookmarks');

			let bookmarks = resp.data.bookmarks;

			let urls = [];
			for (const i of bookmarks) {
				urls.push(i.url);
			}

			console.log('herjsad?');
			console.log(resp.data);

			this.setState({
				articles: resp.data.bookmarks,
				bookmarkURLS: urls,
				loading: false,
			});
		} catch (err) {
			console.log(err.response);
		}

		// this.setState({ articles: this.props.bookmarks });
	};

	onBookmarkHandler = async (article) => {
		try {
			console.log('in the bookmark handler back home');
			let cpyarticles = { ...article };
			delete cpyarticles.tags;
			console.log(article);
			let resp = await Axios.post('/bookmark', { ...cpyarticles });
			console.log(resp.data);

			let bookmarks = resp.data.userdata.bookmarks;
			let urls = [];
			console.log('boyoboy');
			for (const i of bookmarks) {
				urls.push(i.url);
			}
			this.setState((st) => {
				return {
					articles: bookmarks,
					bookmarkURLS: urls,
				};
			});
			// this.props.refreshUser(bookmarks);
		} catch (err) {
			console.log('error');
			console.log(err.response);
		}
	};

	render() {
		return (
			<div>
				<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
					Your Bookmarks
				</h1>
				{this.state.loading && <Loading />}
				{this.state.articles.length >= 1 ? (
					<Stories
						onBookmarkHandler={this.onBookmarkHandler}
						hideStoryHandler={this.hideStoryHandler}
						refreshUser={this.props.refreshUser}
						bookmarkURLS={this.state.bookmarkURLS}
						articles={this.state.articles}
						// articles={this.state.bookmarks}
					/>
				) : (
					<p>your bookmarks are shown here</p>
				)}
			</div>
		);
	}
}

export default SavedArticlesPage;
