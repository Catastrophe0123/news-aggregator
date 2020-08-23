import React, { Component } from 'react';
import Axios from 'axios';

import Stories from '../Components/Stories';
import Loading from '../Components/Loading';

export class SearchResults extends Component {
	state = {
		articles: [],
		totalResults: null,
		loading: true,
		search: null,
		showingSource: null,
	};

	componentDidMount = async () => {
		// code
		try {
			// let params = this.props.match.params;

			let paramString = this.props.location.search;

			let params = new URLSearchParams(paramString);
			console.log(params);
			console.log(params.toString());
			console.log(params);
			let search = params.get('q');
			let source = params.get('sources');

			// const resp = await Axios.get('/search', { params: { ...params } });
			console.log('/search' + paramString);
			const resp = await Axios.get('/search' + paramString);

			if (source) {
				search = source;
			}

			this.setState({
				articles: resp.data.articles,
				totalResults: resp.data.totalResults,
				loading: false,
				paramString,
				search: search,
				sourceData: resp.data.sourceData,
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	componentDidUpdate = async (prevProps, prevState) => {
		console.log(prevProps);
		console.log(prevState);
		let paramString = this.props.location.search;
		if (prevProps.location.search != paramString) {
			console.log('/search' + paramString);
			this.setState({
				loading: true,
				paramString: paramString,
				articles: [],
			});
			try {
				const resp = await Axios.get('/search' + paramString);
				let params = new URLSearchParams(paramString);
				let search = params.get('q');
				this.setState({
					articles: resp.data.articles,
					totalResults: resp.data.totalResults,
					loading: false,
					search,
				});
			} catch (err) {
				console.log(err.response);
			}
		}
	};

	render() {
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
					</div>
				)}
			</div>
		);
	}
}

export default SearchResults;
