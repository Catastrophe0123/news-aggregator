import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';

import Stories from '../Components/Stories';
import Loading from '../Components/Loading';
import { PaginationButton } from '../Components/PaginationButton';

import { Link } from 'react-router-dom';
import HorizontalTabs from '../Components/HorizontalTabs';

export class CategoryPage extends Component {
	state = {
		articles: [],
		totalResults: null,
		loading: true,
		search: null,
		currentPage: 1,
		totalPages: null,
		currentTopic: 'Latest',
		loadingSubTopic: false,
		subtopicList: null,
		bookmarks: [],
		bookmarkURLS: [],
	};

	onBookmarkHandler = async (article) => {
		try {
			let cpyarticles = { ...article };
			delete cpyarticles.tags;
			let resp = await Axios.post('/bookmark', { ...cpyarticles });

			let bookmarks = resp.data.userdata.bookmarks;
			let urls = [];
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
			console.log(err.response);
		}
	};

	businessSubTopics = [
		{ name: 'Latest' },
		{ name: 'Economy' },
		{ name: 'Markets' },
		{ name: 'Jobs' },
		{ name: 'Personal Finance' },
		{ name: 'Entrepreneurship' },
	];

	technologySubTopics = [
		{ name: 'Latest' },
		{ name: 'Mobile' },
		{ name: 'Gadgets' },
		{ name: 'Internet' },
		{ name: 'Artificial Intelligence' },
		{ name: 'Virtual Reality' },
	];

	entertainmentSubTopics = [
		{ name: 'Latest' },
		{ name: 'Movies' },
		{ name: 'Music' },
		{ name: 'TV' },
		{ name: 'Books' },
		{ name: 'Art' },
		{ name: 'Celebrities' },
	];

	sportsSubTopics = [
		{ name: 'Latest' },
		{ name: 'Cricket' },
		{ name: 'Hockey' },
		{ name: 'Tennis' },
		{ name: 'Football' },
		{ name: 'Badminton' },
		{ name: 'Basketball' },
	];

	scienceSubTopics = [
		{ name: 'Latest' },
		{ name: 'Environment' },
		{ name: 'Outer Space' },
		{ name: 'Physics' },
		{ name: 'Genetics' },
		{ name: 'Wildlife' },
	];

	healthSubTopics = [
		{ name: 'Latest' },
		{ name: 'Medicine' },
		{ name: 'Healthcare' },
		{ name: 'Mental health' },
		{ name: 'Nutrition' },
		{ name: 'Fitness' },
	];

	getData = async () => {
		try {
			// let params = this.props.match.params;

			let paramString = this.props.location.search;

			let params = new URLSearchParams(paramString);

			let search = params.get('category');
			let page = Number(params.get('page'));
			if (!page) page = 1;
			// const resp = await Axios.get('/search', { params: { ...params } });
			const resp = await Axios.get('/headlines' + paramString);
			let totalPages = Math.ceil(resp.data.data.totalResults / 20);

			let bookmarks = resp.data.bookmarks;

			let urls = [];
			for (const i of bookmarks) {
				urls.push(i.url);
			}

			this.setState({
				articles: resp.data.data.articles,
				totalResults: resp.data.data.totalResults,
				loading: false,
				paramString,
				search: search,
				currentPage: page,
				totalPages,
				bookmarks,
				bookmarkURLS: urls,
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	componentDidMount = async () => {
		let paramString = this.props.location.search;

		let params = new URLSearchParams(paramString);

		// switch (search) {
		// 	case 'business':
		// 		this.setState({ subtopicList: businessSubTopics });
		// 		break;
		// 	case "technology":
		// 		this.setState({subtopicList: technologySubTopics})
		// }

		await this.getData();
	};

	componentDidUpdate = async (prevProps, prevState) => {
		let paramString = this.props.location.search;
		if (prevProps.location.search !== paramString) {
			this.setState({
				loading: true,
				paramString: paramString,
				articles: [],
			});

			await this.getData();
		}
	};

	changeTopic = async (topic) => {
		this.setState({
			currentTopic: topic,
			loadingSubTopic: true,
		});
		// fetch the data and store in the state

		try {
			const resp = await Axios.get('/search', {
				params: { sortBy: 'publishedAt', q: topic },
			});

			let totalPages = Math.ceil(resp.data.data.totalResults / 20);
			this.setState({
				articles: resp.data.data.articles,
				totalResults: resp.data.data.totalResults,
				loadingSubTopic: false,
				// search: search,
				// currentPage: page,
				totalPages,
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	hideStoryHandler = (id) => {
		this.setState((st) => {
			let x = [...st.articles];
			x.splice(id, 1);
			return { ...st, articles: x };
		});
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
						<HorizontalTabs
							changeTopic={this.changeTopic}
							// list={this.businessSubTopics}
							list={this[`${this.state.search}SubTopics`]}
						/>
						{!this.state.loadingSubTopic ? (
							<div>
								<Stories
									onBookmarkHandler={this.onBookmarkHandler}
									hideStoryHandler={this.hideStoryHandler}
									bookmarkURLS={this.state.bookmarkURLS}
									refreshUser={this.props.refreshUser}
									articles={this.state.articles}
								/>
								<div className='flex justify-center my-5 m-3  w-full'>
									{prevDisabled ? (
										<div className=' flex justify-end px-3 w-full max-w-4xl'>
											<Link
												to={
													nextDisabled ? '' : nextLink
												}>
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
												<Link
													to={
														prevDisabled
															? ''
															: prevLink
													}>
													<PaginationButton
														direction='left'
														disabled={prevDisabled}>
														Previous Page
													</PaginationButton>
												</Link>
											)}

											{!nextDisabled && (
												<Link
													to={
														nextDisabled
															? ''
															: nextLink
													}>
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
						) : (
							<Loading />
						)}
					</div>
				)}
			</div>
		);
	}
}

export default CategoryPage;
