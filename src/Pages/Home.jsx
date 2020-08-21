import React, { Component } from 'react';
import '../styles/app.css';
import Stories from '../Components/Stories';
import axios from 'axios';

export class Home extends Component {
	state = { articles: null, totalResults: null, loading: true };

	componentDidMount = async () => {
		// do the api call here
		let resp = await axios.get('/headlines');
		console.log(resp.data);

		this.setState({
			articles: resp.data.articles,
			totalResults: resp.data.totalResults,
			loading: false,
		});
	};

	render() {
		return (
			<div>
				<h1>hello world from home component</h1>
				{this.state.loading && <p>Loading...</p>}
				{this.state.articles && (
					<Stories articles={this.state.articles} />
				)}
			</div>
		);
	}
}

export default Home;
