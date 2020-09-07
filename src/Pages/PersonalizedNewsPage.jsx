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
				<h1>HELLO FROM THIS PAGE</h1>
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
