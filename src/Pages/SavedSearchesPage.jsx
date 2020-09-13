import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';
import Loading from '../Components/Loading';
import Searches from '../Components/Searches';

export class SavedSearchesPage extends Component {
	state = { savedSearches: null };

	componentDidMount = async () => {
		try {
			let resp = await Axios.get('/search/save');
			this.setState({ savedSearches: resp.data.savedSearches });
		} catch (err) {
			console.log(err);
		}
	};

	onDeleteHandler = async (savedSearch) => {
		try {
			const resp = await Axios.post('/search/save', {
				searchString: savedSearch,
			});
			this.setState({ savedSearches: resp.data.userData.savedSearches });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<div>
					<h1 className=' mt-3 text-3xl font-medium font-serif flex justify-center w-full'>
						Saved Searches
					</h1>
				</div>
				{this.state.savedSearches ? (
					<Searches
						onDeleteHandler={this.onDeleteHandler}
						savedSearches={this.state.savedSearches}
					/>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default SavedSearchesPage;
