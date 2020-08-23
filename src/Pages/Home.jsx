import React, { Component } from 'react';
import '../styles/app.css';
import Stories from '../Components/Stories';
import axios from 'axios';

export class Home extends Component {
	state = { articles: null, totalResults: null, loading: true };

	diffMinutes(dt2, dt1) {
		var diff = (dt2.getTime() - dt1.getTime()) / 1000;
		diff /= 60;
		return Math.abs(Math.round(diff));
	}

	fetchHeadlines = async () => {
		console.log('fetching from api');
		let resp = await axios.get('/headlines');
		console.log(resp.data);

		this.setState({
			articles: resp.data.articles,
			totalResults: resp.data.totalResults,
			loading: false,
		});
		let headlines = { data: resp.data, storageTime: new Date() };
		localStorage.setItem('headlines', JSON.stringify(headlines));
	};

	componentDidMount = async () => {
		// do the api call here

		let headlines = localStorage.headlines;

		if (headlines) {
			let parsedheadlines = JSON.parse(headlines);
			let time = new Date(parsedheadlines.storageTime);
			let currentTime = new Date();
			let diff = this.diffMinutes(currentTime, time);
			if (diff > 60) {
				await this.fetchHeadlines();
			} else {
				console.log('loading from local storage');
				this.setState({
					articles: parsedheadlines.data.articles,
					totalResults: parsedheadlines.data.totalResults,
					loading: false,
				});
			}
		} else {
			await this.fetchHeadlines();
		}
	};

	render() {
		return (
			<div>
				<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
					Headlines
				</h1>
				{this.state.loading && <p>Loading...</p>}
				{this.state.articles && (
					<Stories articles={this.state.articles} />
				)}
			</div>
		);
	}
}

export default Home;
