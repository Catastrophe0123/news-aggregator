import React, { Component } from 'react';
import Story from './Story';

import '../styles/Stories.css';

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
		let cardView = this.props.cardView || false;

		// cardView = false;
		if (this.state.width <= 520) cardView = true;

		if (cardView === false) {
			return (
				<div>
					{this.props.articles && (
						<div className='flex flex-wrap  justify-center'>
							{this.props.articles.map((el, idx) => (
								<Story
									hideStoryHandler={
										this.props.hideStoryHandler
									}
									bookmarkURLS={this.props.bookmarkURLS}
									bookmarked={this.props.bookmarkURLS.includes(
										el.url
									)}
									refreshUser={this.props.refreshUser}
									key={idx}
									idkey={idx}
									{...el}
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
								<div className='flex xl:max-w-sm lg:max-w-xs md:max-w-xs sm:max-w-lg '>
									<Story
										cardView={cardView}
										hideStoryHandler={
											this.props.hideStoryHandler
										}
										bookmarkURLS={this.props.bookmarkURLS}
										bookmarked={this.props.bookmarkURLS.includes(
											el.url
										)}
										refreshUser={this.props.refreshUser}
										key={idx}
										idkey={idx}
										{...el}
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Stories;
