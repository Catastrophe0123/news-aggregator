import React, { Component } from 'react';
import SavedSearch from './SavedSearch';

import '../styles/searches.css';

export class Searches extends Component {
	render() {
		return (
			<div>
				{this.props.savedSearches && (
					<div className=' justify-center w-full'>
						<div className='search-grid gap-3 '>
							{this.props.savedSearches.map((el) => {
								return (
									<div className='w-auto'>
										<SavedSearch
											onDeleteHandler={
												this.props.onDeleteHandler
											}
											el={el}
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Searches;
