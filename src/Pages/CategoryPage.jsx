import React, { Component } from 'react';
import Axios from 'axios';

import Stories from '../Components/Stories';
import Loading from '../Components/Loading';
import Button, { PaginationButton } from '../Components/PaginationButton';

import { Link } from 'react-router-dom';

export class CategoryPage extends Component {
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
			let search = params.get('category');
			let page = Number(params.get('page'));
			if (!page) page = 1;
			// const resp = await Axios.get('/search', { params: { ...params } });
			console.log('/search' + paramString);
			const resp = await Axios.get('/headlines' + paramString);
			let totalPages = Math.ceil(resp.data.totalResults / 20);
			this.setState({
				articles: resp.data.articles,
				totalResults: resp.data.totalResults,
				loading: false,
				paramString,
				search: search,
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
		nextLink = `/topics?category=${this.state.search}&page=${nextPage}`;
		prevLink = `/topics?category=${this.state.search}&page=${prevPage}`;

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

export default CategoryPage;
