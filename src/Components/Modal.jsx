import React, { Component } from 'react';

import '../styles/Modal.css';

export default class Modal extends Component {
	// const [showModal, setShowModal] = React.useState(false);
	// return (
	// 	<>
	// 		<button
	// 			className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
	// 			type='button'
	// 			style={{ transition: 'all .15s ease' }}
	// 			onClick={() => setShowModal(true)}>
	// 			Open regular modal
	// 		</button>
	// 		{showModal ? (
	// 			<div>
	// 				<div
	// 					className=' h-full w-full justify-center items-center flex align-middle  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
	// 					// onClick={() => setShowModal(false)}
	// 				>
	// 					<div className='w-full max-w-lg'>
	// 						<Login />
	// 					</div>
	// 				</div>
	// 				<div
	// 					onClick={() => setShowModal(false)}
	// 					className='opacity-25 fixed inset-0 z-40 bg-black'></div>
	// 			</div>
	// 		) : null}
	// 	</>
	// );

	render() {
		return (
			<div className='Modal w-full items-center flex justify-center'>
				<div className=' w-full max-w-lg'>{this.props.children}</div>
			</div>
		);
	}
}
