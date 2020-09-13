import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import Loading from '../Components/Loading';
import Stories from '../Components/Stories';

export class PersonalizedNewsPage extends Component {
	state = { articles: null, loading: true, bookmarks: [], bookmarkURLS: [] };

	componentDidMount = async () => {
		try {
			const resp = await Axios.get('/foryou');
			console.log(resp);
			let bookmarks = resp.data.bookmarks;

			let urls = [];
			for (const i of bookmarks) {
				urls.push(i.url);
			}

			this.setState({
				articles: resp.data.data,
				loading: false,
				bookmarks: bookmarks,
				bookmarkURLS: urls,
			});
		} catch (err) {
			console.log(err.response);
		}
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
					bookmarks: bookmarks,
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
				<div className='flex justify-center w-full'>
					<h1 className=' mt-3 text-3xl font-medium font-serif '>
						For You
					</h1>
				</div>

				<div className='flex justify-center text-gray-700 pb-3 '>
					Recommended based on your interests
				</div>

				{this.state.loading && <Loading />}

				{this.state.articles && (
					<Stories
						onBookmarkHandler={this.onBookmarkHandler}
						hideStoryHandler={this.props.hideStoryHandler}
						bookmarkURLS={this.state.bookmarkURLS}
						refreshUser={this.props.refreshUser}
						articles={this.state.articles}
					/>
				)}
			</div>
		);
	}
}

export default PersonalizedNewsPage;
