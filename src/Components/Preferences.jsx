import React, { Component } from 'react';
import Select from 'react-select';

import Axios from '../utils/axiosInstance';

export class Preferences extends Component {
	// countries = [
	// 	{ value: 'qwesadzc', label: 'qwe1223' },
	// 	{ value: 'qwexvbed', label: 'lkn ' },
	// ];

	state = {
		countryValue: 'ar',
		countryLabel: 'Argentina',
		layoutValue: 'list',
		layoutLabel: 'List',
	};

	componentDidMount = () => {
		let defaultCountry = this.countries[0];
		let defaultLayout = this.layouts[0];

		for (let i of this.countries) {
			if (i.value === this.props.country) {
				defaultCountry = i;
			}
		}

		for (let i of this.layouts) {
			if (i.value === this.props.layout) {
				defaultLayout = i;
			}
		}

		this.setState({
			countryValue: defaultCountry.value,
			countryLabel: defaultCountry.label,
			layoutValue: defaultLayout.value,
			layoutLabel: defaultLayout.label,
		});
	};

	countries = [
		{ value: 'ar', label: 'Argentina' },
		{ value: 'au', label: 'Australia' },
		{ value: 'at', label: 'Austria' },
		{ value: 'be', label: 'Belgium' },
		{ value: 'br', label: 'Brazil' },
		{ value: 'bg', label: 'Bulgaria' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'cn', label: 'China' },
		{ value: 'co', label: 'Colombia' },
		{ value: 'cu', label: 'Cuba' },
		{ value: 'cz', label: 'Czech Republic' },
		{ value: 'eg', label: 'Egypt' },
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' },
		{ value: 'gr', label: 'Greece' },
		{ value: 'hk', label: 'Hong Kong' },
		{ value: 'hu', label: 'Hungary' },
		{ value: 'in', label: 'India' },
		{ value: 'id', label: 'Indonesia' },
		{ value: 'ie', label: 'Ireland' },
		{ value: 'il', label: 'Israel' },
		{ value: 'it', label: 'Italy' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'lv', label: 'Latvia' },
		{ value: 'lt', label: 'Lithuania' },
		{ value: 'my', label: 'Malaysia' },
		{ value: 'mx', label: 'Mexico' },
		{ value: 'ma', label: 'Morocco' },
		{ value: 'nl', label: 'Netherlands' },
		{ value: 'nz', label: 'New Zealand' },
		{ value: 'ng', label: 'Nigeria' },
		{ value: 'no', label: 'Norway' },
		{ value: 'ph', label: 'Philippines' },
		{ value: 'pl', label: 'Poland' },
		{ value: 'pt', label: 'Portugal' },
		{ value: 'ro', label: 'Romania' },
		{ value: 'ru', label: 'Russia' },
		{ value: 'sa', label: 'Saudi Arabia' },
		{ value: 'rs', label: 'Serbia' },
		{ value: 'sg', label: 'Singapore' },
		{ value: 'sk', label: 'Slovakia' },
		{ value: 'si', label: 'Slovenia' },
		{ value: 'za', label: 'South Africa' },
		{ value: 'kr', label: 'South Korea' },
		{ value: 'se', label: 'Sweden' },
		{ value: 'ch', label: 'Switzerland' },
		{ value: 'tw', label: 'Taiwan' },
		{ value: 'th', label: 'Thailand' },
		{ value: 'tr', label: 'Turkey' },
		{ value: 'ae', label: 'UAE' },
		{ value: 'ua', label: 'Ukraine' },
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'us', label: 'United States' },
		{ value: 've', label: 'Venuzuela' },
	];

	layouts = [
		{
			value: 'list',
			label: 'List',
		},
		{ value: 'grid', label: 'Grid' },
	];

	onSaveHandler = async () => {
		try {
			const resp = await Axios.post('/user', {
				country: this.state.countryValue,
				layout: this.state.layoutValue,
			});
			let { country, layout } = resp.data.userData;
			this.props.setPreferences(country, layout);
		} catch (err) {
			console.log(err.response);
		}
	};

	render() {
		// in

		return (
			<div>
				<div className='w-full  bg-white border border-black rounded-lg '>
					<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
						<h3 className='text-3xl font-semibold'>Preferences</h3>
					</div>
					<div className='relative p-6 flex-auto'>
						<div className='flex flex-wrap '>
							<p className='my-4 flex max-w-md justify-between w-full text-gray-600 text-lg leading-relaxed'>
								Change Country :{' '}
								<span className='w-40 '>
									<Select
										onChange={(el) => {
											this.setState({
												countryValue: el.value,
												countryLabel: el.label,
											});
										}}
										value={{
											label: this.state.countryLabel,
											value: this.state.countryValue,
										}}
										className='basic-single'
										classNamePrefix='select'
										// defaultValue={defaultCountry}
										isSearchable={true}
										name='country'
										options={this.countries}
									/>
								</span>
							</p>
							<p className='my-4 flex max-w-md justify-between w-full text-gray-600 text-lg leading-relaxed'>
								Change Layout :{' '}
								<span className='w-40 '>
									<Select
										onChange={(el) => {
											this.setState({
												layoutValue: el.value,
												layoutLabel: el.label,
											});
										}}
										value={{
											label: this.state.layoutLabel,
											value: this.state.layoutValue,
										}}
										className='basic-single'
										classNamePrefix='select'
										// defaultValue={defaultLayout}
										isSearchable={true}
										name='layout'
										options={this.layouts}
									/>
								</span>
							</p>
						</div>
					</div>
					<div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
						<button
							className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
							type='button'
							onClick={this.props.onPreferencesCloseHandler}
							style={{ transition: 'all .15s ease' }}>
							Close
						</button>
						<button
							className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
							type='button'
							onClick={this.onSaveHandler}
							style={{ transition: 'all .15s ease' }}>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Preferences;
