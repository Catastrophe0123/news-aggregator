import React, { Component } from 'react';
import Axios from 'axios';

import Stories from '../Components/Stories';
import Loading from '../Components/Loading';

import { Link } from 'react-router-dom';

export class SearchResults extends Component {
	state = {
		articles: [],
		totalResults: null,
		loading: true,
		search: null,
		source: null,
		currentPage: 1,
		totalPages: null,
	};

	getData = async () => {
		try {
			// let params = this.props.match.params;

			let paramString = this.props.location.search;

			let params = new URLSearchParams(paramString);
			console.log(params);
			console.log(params.toString());
			console.log(params);
			let search = params.get('q');
			let source = params.get('sources');
			let page = Number(params.get('page'));
			if (!page) page = 1;
			// const resp = await Axios.get('/search', { params: { ...params } });
			console.log('/search' + paramString);
			const resp = await Axios.get('/search' + paramString);
			let totalPages = Math.ceil(resp.data.totalResults / 20);
			this.setState({
				articles: resp.data.articles,
				totalResults: resp.data.totalResults,
				loading: false,
				paramString,
				search: search,
				source: source,
				sourceData: resp.data.sourceData,
				currentPage: page,
				totalPages,
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	componentDidMount = async () => {
		await this.getData();
	};

	componentDidUpdate = async (prevProps, prevState) => {
		let paramString = this.props.location.search;
		if (prevProps.location.search != paramString) {
			this.setState({
				loading: true,
				paramString: paramString,
				articles: [],
			});

			await this.getData();

			// try {
			// 	const resp = await Axios.get('/search' + paramString);
			// 	let params = new URLSearchParams(paramString);
			// 	let search = params.get('q');
			// 	let source = params.get('sources');
			// 	let currentPage = Number(params.get('page'));
			// 	if (!currentPage) currentPage = 1;
			// 	this.setState({
			// 		articles: resp.data.articles,
			// 		totalResults: resp.data.totalResults,
			// 		loading: false,
			// 		search,
			// 		source,
			// 		sourceData: resp.data.sourceData,
			// 		currentPage,
			// 	});
			// } catch (err) {
			// 	console.log(err.response);
			// }
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
		if (this.state.source) {
			nextLink = `/search?sources=${this.state.source}&page=${nextPage}`;
			prevLink = `/search?sources=${this.state.source}&page=${prevPage}`;
		} else {
			nextLink = `/search?q=${this.state.search}&page=${nextPage}`;
			prevLink = `/search?q=${this.state.search}&page=${prevPage}`;
		}

		return (
			<div>
				{this.state.loading && <Loading />}

				{this.state.articles.length > 0 && (
					<div>
						{this.state.sourceData ? (
							<div>
								<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
									{this.state.sourceData.name}
								</h1>
								<p className='text-center my-4 '>
									{this.state.sourceData.description}
								</p>
							</div>
						) : (
							<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
								{this.state.search &&
									this.state.search.toUpperCase()}
							</h1>
						)}

						<Stories articles={this.state.articles} />
						<div className='flex justify-center '>
							<button
								className='border p-5 bg-red-700'
								disabled={prevDisabled}>
								<Link to={prevDisabled ? '' : prevLink}>
									Previous Page
								</Link>
							</button>
							<button
								className='border p-5 bg-red-700'
								disabled={nextDisabled}>
								<Link to={nextDisabled ? '' : nextLink}>
									Next Page
								</Link>
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default SearchResults;
