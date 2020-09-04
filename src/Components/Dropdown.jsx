import React from 'react';
import Popper from 'popper.js';

const Dropdown = ({ color }) => {
	// dropdown props
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: 'bottom-start',
		});
		setDropdownPopoverShow(true);
	};
	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};
	// bg colors
	let bgColor;
	color === 'white'
		? (bgColor = 'bg-gray-800')
		: (bgColor = 'bg-' + color + '-500');
	return (
		<>
			<span className='flex flex-wrap'>
				<span className='w-full sm:w-6/12 md:w-4/12 px-4'>
					<span className='relative inline-flex align-middle w-full'>
						<i
							className={
								' fas px-2 fa-ellipsis-v text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ' +
								bgColor
							}
							style={{ transition: 'all .15s ease' }}
							type='button'
							ref={btnDropdownRef}
							onClick={() => {
								dropdownPopoverShow
									? closeDropdownPopover()
									: openDropdownPopover();
							}}></i>
						<div
							ref={popoverDropdownRef}
							className={
								(dropdownPopoverShow ? 'block ' : 'hidden ') +
								(color === 'white'
									? 'bg-white '
									: bgColor + ' ') +
								'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
							}
							style={{ minWidth: '12rem' }}>
							<a
								href='#pablo'
								className={
									'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
									(color === 'white'
										? ' text-gray-800'
										: 'text-white')
								}
								onClick={(e) => e.preventDefault()}>
								Action
							</a>
							<a
								href='#pablo'
								className={
									'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
									(color === 'white'
										? ' text-gray-800'
										: 'text-white')
								}
								onClick={(e) => e.preventDefault()}>
								Another action
							</a>
							<a
								href='#pablo'
								className={
									'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
									(color === 'white'
										? ' text-gray-800'
										: 'text-white')
								}
								onClick={(e) => e.preventDefault()}>
								Something else here
							</a>
							<div className='h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25' />
							<a
								href='#pablo'
								className={
									'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
									(color === 'white'
										? ' text-gray-800'
										: 'text-white')
								}
								onClick={(e) => e.preventDefault()}>
								Seprated link
							</a>
						</div>
					</span>
				</span>
			</span>
		</>
	);
};

export default Dropdown;
