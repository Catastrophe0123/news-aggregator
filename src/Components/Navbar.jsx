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

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar({ fixed, ...props }) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	return (
		// <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-500 mb-3'>
		// 	<div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
		// 		<div
		// 		// className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'
		// 		>
		// 			<Link
		// 				to='/'
		// 				className='text-sm font-bold leading-relaxed  mr-4  whitespace-no-wrap uppercase text-white'
		// 				href='#'>
		// 				News Aggregator
		// 			</Link>
		// 			{/* <button
		// 					className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
		// 					type='button'
		// 					onClick={() => setNavbarOpen(!navbarOpen)}>
		// 					<i className='fas fa-bars'></i>
		// 				</button> */}
		// 		</div>
		// 		<div>
		// 			<SearchBar />
		// 		</div>
		// 		<button>Login</button>
		// 		{/* <div
		// 				className={
		// 					'lg:flex flex-grow items-center' +
		// 					(navbarOpen ? ' flex' : ' hidden')
		// 				}
		// 				id='example-navbar-danger'>
		// 				<ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
		// 					<li className='nav-item'>
		// 						<a
		// 							className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
		// 							href='#pablo'>
		// 							<i className='fab fa-facebook-square text-lg leading-lg text-white opacity-75'></i>
		// 							<span className='ml-2'>Share</span>
		// 						</a>
		// 					</li>
		// 					<li className='nav-item'>
		// 						<a
		// 							className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
		// 							href='#pablo'>
		// 							<i className='fab fa-twitter text-lg leading-lg text-white opacity-75'></i>
		// 							<span className='ml-2'>Tweet</span>
		// 						</a>
		// 					</li>
		// 					<li className='nav-item'>
		// 						<a
		// 							className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
		// 							href='#pablo'>
		// 							<i className='fab fa-pinterest text-lg leading-lg text-white opacity-75'></i>
		// 							<span className='ml-2'>Pin</span>
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</div> */}
		// 	</div>
		// </nav>

		<nav className='relative shadow-lg h-20 navbar-expand-lg bg-gray-100 '>
			<div className=' h-full flex flex-wrap items-center justify-between container mx-auto px-4 '>
				<div>
					<Link
						to='/'
						className='text-sm text-black font-bold leading-relaxed  mr-4  whitespace-no-wrap uppercase'
						href='#'>
						News Aggregator
					</Link>
				</div>
				<div className='w-full pt-2 max-w-2xl '>
					<SearchBar history={props.history} />
				</div>
				<button className='border font-medium font-sans bg-blue-500 text-white px-5  py-3 rounded-md  '>
					Sign in
				</button>
			</div>
		</nav>
	);
}
