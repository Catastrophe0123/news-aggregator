import React from 'react';
import '../styles/sidebar.css';

import { NavLink } from 'react-router-dom';
import BackDrop from './BackDrop';

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
					style={{ width: this.props.isOpen ? '270px' : '0px' }}>
					{/* <button
						onClick={this.props.closeSidebar}
						className='closebtn'>
						Close &times;
					</button> */}

					<NavLink to='/headlines'>
						<i className=' pr-4 fas fa-home'></i>Home
					</NavLink>

					{this.props.isAuthenticated && (
						<NavLink to='/user/foryou'>
							{' '}
							<i className=' pr-4 fas fa-user'></i>For you
						</NavLink>
					)}
					<NavLink to='/topics?category=business'>
						{' '}
						<i className=' pr-4 fas fa-money-check-alt'></i>{' '}
						Business
					</NavLink>
					<NavLink to='/topics?category=health'>
						{' '}
						<i className=' pr-4 fas fa-heartbeat'></i> Health
					</NavLink>
					<NavLink to='/topics?category=entertainment'>
						{' '}
						<i className=' pr-4 fas fa-film'></i>Entertainment
					</NavLink>
					<NavLink to='/topics?category=science'>
						{' '}
						<i className=' pr-4 fas fa-atom'></i>Science
					</NavLink>
					<NavLink to='/topics?category=sports'>
						{' '}
						<i className=' pr-4 fas fa-baseball-ball'></i>Sports
					</NavLink>
					<NavLink to='/topics?category=technology'>
						{' '}
						<i className=' pr-4  fas fa-microchip'></i>Technology
					</NavLink>
					{this.props.isAuthenticated && (
						<NavLink to='/user/bookmarks'>
							{' '}
							<i className=' pr-4 fas fa-bookmark'></i>Saved
							Articles
						</NavLink>
					)}
					{this.props.isAuthenticated && (
						<NavLink to='/user/searches'>
							{' '}
							<i className=' pr-4 fas fa-search'></i>Saved
							Searches
						</NavLink>
					)}

					{this.props.isAuthenticated && (
						<button
							className='sidebar-button'
							onClick={this.props.onPreferencesOpenHandler}>
							{' '}
							<i className=' pr-4 fas fa-cog'></i>Preferences
						</button>
					)}

					{!this.props.isAuthenticated && (
						<button
							className='sidebar-button'
							onClick={this.props.onLoginClickHandler}>
							{' '}
							<i className=' pr-4 fas fa-sign-in-alt'></i>Login
						</button>
					)}

					{this.props.isAuthenticated && (
						<button
							className='sidebar-button'
							onClick={this.props.onLogoutHandler}>
							{' '}
							<i className=' pr-4 fas fa-sign-out-alt'></i>Logout
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
