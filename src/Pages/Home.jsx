import React, { Component } from 'react';
import '../styles/app.css';
import Stories from '../Components/Stories';
import axios from '../utils/axiosInstance';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';

import PaginationButton from '../Components/PaginationButton';

export class Home extends Component {
	state = {
		articles: null,
		totalResults: null,
		loading: true,
		totalPages: null,
		currentPage: 1,
	};

	diffMinutes(dt2, dt1) {
		var diff = (dt2.getTime() - dt1.getTime()) / 1000;
		diff /= 60;
		return Math.abs(Math.round(diff));
	}

	fetchHeadlines = async () => {
		console.log('fetching from api');
		let paramString = this.props.location.search;
		let params = new URLSearchParams(paramString);
		let page = Number(params.get('page'));

		if (!page) page = 1;

		let resp = await axios.get('/headlines', {
			params: { page: page },
		});
		console.log(resp.data);

		this.setState({
			articles: resp.data.articles,
			totalResults: resp.data.totalResults,
			totalPages: Math.ceil(resp.data.totalResults / 20),
			loading: false,
			currentPage: page,
		});
		let headlines = { data: resp.data, storageTime: new Date() };
		localStorage.setItem('headlines', JSON.stringify(headlines));
	};

	componentDidMount = async () => {
		// do the api call here

		let headlines = localStorage.headlines;
		let paramString = this.props.location.search;

		let params = new URLSearchParams(paramString);
		let page = Number(params.get('page'));
		if (!page) {
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
						totalPages: Math.ceil(
							parsedheadlines.data.totalResults / 20
						),
						currentPage: 1,
					});
				}
			} else {
				await this.fetchHeadlines();
			}
		} else {
			await this.fetchHeadlines();
		}
	};

	componentDidUpdate = async (prevProps, prevState) => {
		let paramString = this.props.location.search;
		if (prevProps.location.search != paramString) {
			this.setState({
				loading: true,
				paramString: paramString,
				articles: [],
			});

			await this.fetchHeadlines();
		}
	};
	render() {
		let [prevDisabled, nextDisabled] = [false, false];
		if (this.state.currentPage >= this.state.totalPages)
			nextDisabled = true;
		if (this.state.currentPage <= 1) prevDisabled = true;
		let nextPage = this.state.currentPage + 1;
		let prevPage = this.state.currentPage - 1;
		let nextLink, prevLink;

		nextLink = `/headlines?page=${nextPage}`;
		prevLink = `/headlines?page=${prevPage}`;

		return (
			<div>
				<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
					Headlines
				</h1>
				{this.state.loading && <Loading />}
				{this.state.articles && (
					<div>
						<Stories
							bookmarkURLS={this.props.bookmarkURLS}
							refreshUser={this.props.refreshUser}
							articles={this.state.articles}
						/>
						<div className='flex justify-center my-5 m-3  w-full'>
							{prevDisabled ? (
								<div className=' flex justify-end px-3 w-full max-w-4xl'>
									<Link to={nextDisabled ? '' : nextLink}>
										<PaginationButton
											direction='right'
											disabled={nextDisabled}>
											Next Page
										</PaginationButton>
									</Link>
								</div>
							) : (
								<div className=' flex justify-between px-3 w-full max-w-4xl'>
									{!prevDisabled && (
										<Link to={prevDisabled ? '' : prevLink}>
											<PaginationButton
												direction='left'
												disabled={prevDisabled}>
												Previous Page
											</PaginationButton>
										</Link>
									)}

									{!nextDisabled && (
										<Link to={nextDisabled ? '' : nextLink}>
											<PaginationButton
												direction='right'
												disabled={nextDisabled}>
												Next Page
											</PaginationButton>
										</Link>
									)}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Home;
