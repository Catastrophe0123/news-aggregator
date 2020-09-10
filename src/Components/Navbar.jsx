// import React, { Component } from 'react';

// export class Navbar extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>hello from navbar component</h1>
// 			</div>
// 		);
// 	}
// }

// export default Navbar;

// coooooooooooooooooooooooooooooooooo

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import { Component } from 'react';

export default class Navbar extends Component {
	// const [navbarOpen, setNavbarOpen] = React.useState(false);
	// const [isOpen, setIsOpen] = useState(false);

	constructor(props) {
		super(props);
		this.state = { navbarOpen: false, isOpen: false, width: 0, height: 0 };
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

	// return (
	// 	<nav className='relative shadow-lg h-20 navbar-expand-lg bg-gray-100 '>
	// 		<div className=' h-full flex flex-wrap items-center justify-between container mx-auto px-4 '>
	// 			<div className='w-40'>
	// 				<Link
	// 					to='/'
	// 					className='text-sm text-black font-bold leading-relaxed  mr-4  whitespace-no-wrap uppercase'
	// 					href='#'>
	// 					News Aggregator
	// 				</Link>
	// 			</div>
	// 			<div className='w-full pt-2 max-w-2xl '>
	// 				<SearchBar history={props.history} />
	// 			</div>
	// 			{props.authenticated ? (
	// 				<button>{props.email}</button>
	// 			) : (
	// 				<button
	// 					onClick={props.onLoginClickHandler}
	// 					className='border font-medium font-sans bg-blue-500 text-white px-5  py-3 rounded-md  '>
	// 					Sign in
	// 				</button>
	// 			)}
	// 		</div>
	// 	</nav>
	// );

	openSidebar = () => {
		this.setState({ isOpen: true });
	};

	closeSidebar = () => {
		this.setState({ isOpen: false });
	};

	Hamburger = (
		<div
			className='cursor-pointer mr-2 '
			onClick={this.openSidebar}
			style={{ zIndex: 100, paddingLeft: '20px' }}>
			<div
				style={{
					width: '30px',
					height: '5px',
					backgroundColor: 'black',
					margin: '4px 0',
				}}></div>
			<div
				style={{
					width: '30px',
					height: '5px',
					backgroundColor: 'black',
					margin: '4px 0',
				}}></div>
			<div
				style={{
					width: '30px',
					height: '5px',
					backgroundColor: 'black',
					margin: '4px 0',
				}}></div>
		</div>
	);

	render() {
		return (
			<div className=' overflow-x-hidden h-16'>
				<SideBar
					showPreferences={this.props.showPreferences}
					onPreferencesOpenHandler={
						this.props.onPreferencesOpenHandler
					}
					isOpen={this.state.isOpen}
					openSidebar={this.openSidebar}
					closeSidebar={this.closeSidebar}
					onLogoutHandler={this.props.logout}
					isAuthenticated={this.props.authenticated}
				/>
				<div className=' shadow-md top-0 fixed bg-white z-50 w-full border-b-2 '>
					<div className=' flex  h-16  items-center  justify-between container mx-auto'>
						<div className='flex items-center '>
							{this.Hamburger}
							{this.state.width >= 660 && (
								<Link
									to='/'
									className=' ml-10 text-sm text-black font-bold leading-relaxed  mr-4  whitespace-no-wrap uppercase'>
									News Aggregator
								</Link>
							)}
						</div>
						<div className='w-full pt-3 max-w-2xl '>
							<SearchBar history={this.props.history} />
						</div>

						{this.props.authenticated ? (
							<div>
								{this.state.width >= 520 && (
									<button
										onClick={this.openSidebar}
										className='border mx-2 font-medium font-sans  bg-blue-500 text-white px-5  py-3 rounded-lg  '>
										{this.props.email
											.slice(0, 2)
											.toUpperCase()}
									</button>
								)}
							</div>
						) : (
							<div>
								{this.state.width >= 520 && (
									<button
										onClick={this.props.onLoginClickHandler}
										className='border ml-2 font-medium font-sans  bg-blue-500 text-white px-5  py-3 rounded-md  '>
										<i class='fas fa-sign-in-alt mr-2  '></i>
										{this.state.width > 1280 && 'Login'}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		);

		// 660
	}
}
