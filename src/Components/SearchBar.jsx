import React, { Component } from 'react';

export class SearchBar extends Component {
	state = { searchValue: '' };

	onSearchBarHandler = (event) => {
		let value = event.target.value;

		this.setState({ searchValue: value });
	};

	onKeyDownHandler = (event) => {
		console.log(event.keyCode);

		if (event.keyCode === 13) {
			this.props.history.push(`/search?q=${this.state.searchValue}`);
		}
	};

	render() {
		return (
			<div className='shadow-sm '>
				<div
					// style={{ width: '500px' }}
					class='relative flex  flex-wrap items-stretch mb-3'>
					<span class='z-10 h-full leading-snug font-normal absolute text-center text-gray-600  bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
						<i class='fas fa-search'></i>
					</span>
					<input
						onKeyDown={this.onKeyDownHandler}
						value={this.searchValue}
						onChange={this.onSearchBarHandler}
						style={{ backgroundColor: 'whitesmoke' }}
						type='text'
						placeholder='Search'
						className='px-3 py-3 font-mono font-medium text-base border placeholder-gray-600 text-black relative bg-gray-200 rounded  shadow outline-none focus:outline-none focus:shadow-outline w-full  pl-10'
					/>
				</div>
			</div>
		);
	}
}

export default SearchBar;
