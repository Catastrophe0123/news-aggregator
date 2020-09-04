import React, { Component } from 'react';
import SavedSearch from './SavedSearch';

export class Searches extends Component {
	render() {
		return (
			<div>
				{this.props.savedSearches && (
					<div className='flex justify-center w-full'>
						<div className='flex flex-wrap max-w-5xl '>
							{this.props.savedSearches.map((el) => {
								return (
									<SavedSearch
										onDeleteHandler={
											this.props.onDeleteHandler
										}
										el={el}
									/>
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
