import React from 'react';
// import Sidebar from 'react-sidebar';
import '../styles/sidebar.css';

import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

class SideBar extends React.Component {
	render() {
		return (
			<Menu>
				<NavLink to='/headlines'>Home</NavLink>
				{/* <NavLink>About</NavLink>
				<NavLink>Contact</NavLink>
				<NavLink
				// onClick={this.showSettings}
				>
					Settings
				</NavLink> */}

				<NavLink to='/topics?category=business'>
					{' '}
					<i className='fas fa-money-check-alt'></i> Business
				</NavLink>
				<NavLink to='/topics?category=health'>
					{' '}
					<i className='fas fa-heartbeat'></i> Health
				</NavLink>
				<NavLink to='/topics?category=entertainment'>
					{' '}
					<i class='fas fa-film'></i>Entertainment
				</NavLink>
				<NavLink to='/topics?category=science'>
					{' '}
					<i class='fas fa-atom'></i>Science
				</NavLink>
				<NavLink to='/topics?category=sports'>
					{' '}
					<i class='fas fa-baseball-ball'></i>Sports
				</NavLink>
				<NavLink to='/topics?category=technology'>
					{' '}
					<i class='fas fa-microchip'></i>Technology
				</NavLink>
				{this.props.isAuthenticated && (
					<button onClick={this.props.onLogoutHandler}>
						{' '}
						<i class='fas fa-microchip'></i>Logout
					</button>
				)}
			</Menu>
		);
	}
}

export default SideBar;
