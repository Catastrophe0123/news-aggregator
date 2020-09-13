import React, { Component } from 'react';
import Story from './Story';

import '../styles/Stories.css';
import MyContext from '../utils/MyContext';

import Axios from '../utils/axiosInstance';

export class Stories extends Component {
	constructor(props) {
		super(props);
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		if (this.props.articles.length <= 0) {
			return (
				<p>Nothing to show here. Please try a different search term</p>
			);
		}

		return (
			<MyContext.Consumer>
				{({ layout, isAuthenticated }) => {
					let cardView = layout === 'grid';

					// cardView = false;
					if (this.state.width <= 520) cardView = true;

					if (cardView === false) {
						return (
							<div>
								{this.props.articles && (
									<div className='flex flex-wrap  justify-center'>
										{this.props.articles.map((el, idx) => (
											<Story
												isAuthenticated={
													isAuthenticated
												}
												hideStoryHandler={
													this.props.hideStoryHandler
												}
												bookmarkURLS={
													this.props.bookmarkURLS
												}
												bookmarked={this.props.bookmarkURLS.includes(
													el.url
												)}
												onBookmarkHandler={
													this.props.onBookmarkHandler
												}
												refreshUser={
													this.props.refreshUser
												}
												key={idx}
												idkey={idx}
												{...el}
												article={el}
											/>
										))}
									</div>
								)}
							</div>
						);
					}

					return (
						<div>
							{this.props.articles && (
								<div className=''>
									<div
										className={
											'   flex flex-wrap justify-center customGrid'
										}>
										{this.props.articles.map((el, idx) => (
											<div
												className='flex xl:max-w-sm lg:max-w-xs md:max-w-xs sm:max-w-lg '
												// className=' '
											>
												<Story
													isAuthenticated={
														isAuthenticated
													}
													hideStoryHandler={
														this.props
															.hideStoryHandler
													}
													cardView={cardView}
													bookmarkURLS={
														this.props.bookmarkURLS
													}
													bookmarked={this.props.bookmarkURLS.includes(
														el.url
													)}
													onBookmarkHandler={
														this.props
															.onBookmarkHandler
													}
													refreshUser={
														this.props.refreshUser
													}
													key={idx}
													idkey={idx}
													{...el}
													article={el}
												/>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					);
				}}
			</MyContext.Consumer>
		);
	}
}

export default Stories;
