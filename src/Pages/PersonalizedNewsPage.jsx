import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import Loading from '../Components/Loading';
import Stories from '../Components/Stories';

export class PersonalizedNewsPage extends Component {
	state = { articles: null, loading: true };

	componentDidMount = async () => {
		try {
			const resp = await Axios.get('/foryou');
			console.log(resp);
			this.setState({ articles: resp.data.data, loading: false });
		} catch (err) {
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
						hideStoryHandler={this.props.hideStoryHandler}
						bookmarkURLS={this.props.bookmarkURLS}
						refreshUser={this.props.refreshUser}
						articles={this.state.articles}
					/>
				)}
			</div>
		);
	}
}

export default PersonalizedNewsPage;
