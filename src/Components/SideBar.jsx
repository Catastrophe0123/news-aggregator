import React from 'react';
// import Sidebar from 'react-sidebar';
import '../styles/sidebar.css';

import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import BackDrop from './BackDrop';
import Modal from './Modal';

class SideBar extends React.Component {
	state = { isOpen: false, isPreferencesOpen: false };

	onPreferencesClickHandler = () => {
		this.setState({ isPreferencesOpen: true });
	};

	closePreferencesHandler = () => {
		this.setState({ isPreferencesOpen: false });
	};

	render() {
		return (
			<div>
				{/* <button
					onClick={() => {
						this.setState({ isOpen: true });
					}}>
					open
				</button> */}

				<div
					// class='w3-sidebar w3-bar-block w3-border-right'
					className='sidenav'
					style={{ width: this.props.isOpen ? '250px' : '0px' }}>
					{/* <button
						onClick={this.props.closeSidebar}
						className='closebtn'>
						Close &times;
					</button> */}

					<NavLink to='/headlines'>Home</NavLink>
					{this.props.isAuthenticated && (
						<NavLink to='/user/foryou'>
							{' '}
							<i class='fas fa-user'></i>For you
						</NavLink>
					)}
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
						<i class=' fas fa-microchip'></i>Technology
					</NavLink>
					{this.props.isAuthenticated && (
						<NavLink to='/user/bookmarks'>
							{' '}
							<i class='fas fa-microchip'></i>Saved Articles
						</NavLink>
					)}
					{this.props.isAuthenticated && (
						<NavLink to='/user/searches'>
							{' '}
							<i class='fas fa-microchip'></i>Saved Searches
						</NavLink>
					)}

					{this.props.isAuthenticated && (
						<button onClick={this.props.onPreferencesOpenHandler}>
							{' '}
							<i class='fas fa-microchip'></i>Preferences
						</button>
					)}

					{this.props.isAuthenticated && (
						<button onClick={this.props.onLogoutHandler}>
							{' '}
							<i class='fas fa-microchip'></i>Logout
						</button>
					)}
				</div>
				{this.props.isOpen && (
					<BackDrop onclick={this.props.closeSidebar} />
				)}
			</div>
		);
	}
}

export default SideBar;
