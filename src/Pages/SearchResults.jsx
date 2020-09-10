import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';

import Stories from '../Components/Stories';
import Loading from '../Components/Loading';
import Button, { PaginationButton } from '../Components/PaginationButton';

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
		buttonText: '',
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
			let qwe = resp.data.data;
			let totalPages = Math.ceil(qwe.totalResults / 20);
			this.setState({
				articles: qwe.articles,
				totalResults: qwe.totalResults,
				loading: false,
				paramString,
				search: search,
				source: source,
				sourceData: qwe.sourceData,
				currentPage: page,
				totalPages,
				buttonText: resp.data.isSaved ? 'Saved' : 'Save',
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
			console.log('im running over ghere');
			this.setState({
				loading: true,
				paramString: paramString,
				articles: [],
			});

			await this.getData();
		}
	};

	hideStoryHandler = (id) => {
		this.setState((st) => {
			let x = [...st.articles];
			x.splice(id, 1);
			return { ...st, articles: x };
		});
	};

	onSaveSearchHandler = async () => {
		// code
		try {
			console.log('hereoiqwjn');
			this.setState({ buttonText: 'Loading' });
			let resp = await Axios.post('/search/save', {
				searchString: this.state.search,
			});
			console.log(resp);
			if (resp.status === 200) {
				// unsave
				//change button text to Save
				this.setState({ buttonText: 'Save' });
			} else {
				// save
				// change button text to Saved
				this.setState({ buttonText: 'Saved' });
			}
		} catch (err) {
			console.log(err);
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
							<div>
								<div className='flex justify-center'>
									<div className=' w-full max-w-lg '>
										<div
											className={`flex items-center justify-${
												this.props.isAuthenticated
													? 'between'
													: 'center'
											} w-full`}>
											<h1 className=' mt-3 text-3xl font-medium font-serif '>
												{this.state.search &&
													this.state.search.toUpperCase()}
											</h1>
											{this.props.isAuthenticated && (
												<button
													disabled={
														this.state
															.buttonText ===
														'Loading'
													}
													style={{
														transition:
															'all 0.1s ease-in',
														outline: 'none',
													}}
													className={`border-2 mt-3 text-gray-600 hover:shadow-lg hover:text-blue-700 hover:border-blue-700 px-3 shadow-md py-1 ${
														this.state
															.buttonText ===
														'Saved'
															? ' text-blue-700 border-blue-500 '
															: ''
													}   rounded-full`}
													onClick={
														this.onSaveSearchHandler
													}>
													<i
														className={`fa${
															this.state
																.buttonText ===
															'Save'
																? 'r'
																: 's text-blue-700'
														} fa-star pr-2 hover:text-blue-700  `}></i>
													{this.state.buttonText}
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						)}

						<Stories
							hideStoryHandler={this.hideStoryHandler}
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

export default SearchResults;
