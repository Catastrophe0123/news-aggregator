import React from 'react';
import logo from './logo.svg';
import './styles/app.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SearchResults from './Pages/SearchResults';
import CategoryPage from './Pages/CategoryPage';
import Login from './Components/Login';
import Modal from './Components/Modal';
import BackDrop from './Components/BackDrop';
import Axios from './utils/axiosInstance';
import JwtDecode from 'jwt-decode';
import SavedArticlesPage from './Pages/SavedArticlesPage';
import SavedSearchesPage from './Pages/SavedSearchesPage';
import PersonalizedNewsPage from './Pages/PersonalizedNewsPage';
import Preferences from './Components/Preferences';

import MyContext from './utils/MyContext';
import AuthRoute from './Components/AuthRoute';

class App extends React.PureComponent {
	state = {
		showModal: false,
		authenticated: false,
		email: null,
		token: null,
		bookmarks: [],
		bookmarkURLS: [],
		showPreferences: false,
		country: null,
		layout: 'list',
	};

	// openSidebar = () => {
	// 	this.setState({ isOpen: true });
	// };

	// closeSidebar = () => {
	// 	this.setState({ isOpen: false });
	// };

	// checkBookmarks = (data) => {
	// 	for (const {url} of data) {
	// 		if(this.state.bookmarks.includes(url)){

	// 		}
	// 	}
	// }

	refreshUser = (bookmarks) => {
		let urls = [];
		for (const i of bookmarks) {
			urls.push(i.url);
		}
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		this.setState({ bookmarks: bookmarks, bookmarkURLS: urls });
	};

	setTokenTimer = (time) => () => {
		setTimeout(() => {
			// logout
			// localStorage.removeItem('token');

			// this.setState({
			// 	authenticated: false,
			// 	token: '',
			// });
			console.log('logging out');
			this.logout();

			// window.location.href = '/login';
		}, time);
	};

	getCountry = () => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				let { latitude, longitude } = position.coords;
				try {
					let resp = await Axios.post('/country', {
						lat: latitude,
						lon: longitude,
					});
					this.setState({ country: resp.data.country });
				} catch (err) {
					console.log(err.response);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};

	componentDidMount = () => {
		let email = localStorage.email;
		let token = localStorage.token;
		let bookmarks = localStorage.bookmarks;
		let layout = localStorage.layout;
		let country = localStorage.country;
		if (bookmarks) bookmarks = JSON.parse(bookmarks);

		console.log(bookmarks);
		let authenticated = false;
		if (token && email) {
			const decodedToken = JwtDecode(token);
			if (decodedToken.exp * 1000 < Date.now()) {
				console.log('expired token');
				authenticated = false;
				this.setState({ authenticated });
			} else {
				let endTime = new Date(decodedToken.exp * 1000);
				let startTime = new Date();
				var milliseconds = endTime.getTime() - startTime.getTime();
				this.setTokenTimer(milliseconds);
				authenticated = true;

				Axios.defaults.headers.common['Authorization'] = token;
				let urls = [];
				for (const i of bookmarks) {
					urls.push(i.url);
				}

				if (!country || country === 'null') {
					this.getCountry();
				}

				this.setState({
					authenticated,
					email,
					token,
					bookmarks,
					layout,
					country,
					bookmarkURLS: urls,
				});
			}
		}
	};

	onModalDismissHandler = () => {
		this.setState({ showModal: false });
	};
	onLoginClickHandler = () => {
		this.setState({ showModal: true });
	};

	onPreferencesCloseHandler = () => {
		this.setState({ showPreferences: false });
	};
	onPreferencesOpenHandler = () => {
		this.setState({ showPreferences: true });
	};

	logout = () => {
		localStorage.clear();
		this.setState({
			showModal: false,
			authenticated: false,
			email: null,
			token: null,
			bookmarks: [],
			bookmarkURLS: [],
			showPreferences: false,
			country: null,
			layout: 'list',
		});
	};

	loginSuccessHandler = (
		token,
		email,
		bookmarks = [],
		layout,
		country = null
	) => {
		if (!country) {
			this.getCountry();
		}
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		localStorage.setItem('country', country);
		localStorage.setItem('layout', layout);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		Axios.defaults.headers.common['Authorization'] = token;
		this.setState({
			showModal: false,
			authenticated: true,
			email: email,
			token: token,
			layout,
			country,
		});
		this.refreshUser(bookmarks);
		console.log('authenticated');
	};

	setPreferences = (country, layout) => {
		this.setState({ country, layout }, () => {
			localStorage.setItem('layout', layout);
			localStorage.setItem('country', country);
			this.onPreferencesCloseHandler();
		});
	};

	render() {
		return (
			<MyContext.Provider
				value={{
					layout: this.state.layout,
					isAuthenticated: this.state.authenticated,
				}}>
				<div style={{ overflowX: 'hidden' }}>
					{this.state.showModal && !this.state.authenticated && (
						<div>
							<Modal>
								<Login
									loginSuccessHandler={
										this.loginSuccessHandler
									}
									onLoginHandler={this.onLoginHandler}
									onSignupHandler={this.onSignupHandler}
								/>
							</Modal>
							<BackDrop onclick={this.onModalDismissHandler} />
						</div>
					)}

					{this.state.showPreferences && (
						<div>
							<Modal>
								<Preferences
									country={this.state.country}
									layout={this.state.layout}
									setPreferences={this.setPreferences}
									onPreferencesCloseHandler={
										this.onPreferencesCloseHandler
									}
								/>
							</Modal>
							<BackDrop
								onclick={this.onPreferencesCloseHandler}
							/>
						</div>
					)}
					{/* <Sidebar
						sidebar={<b>Sidebar content</b>}
						open={this.state.sidebarOpen}
						docked={this.state.sidebarDocked}
						onSetOpen={this.onSetSidebarOpen}>
						<b>Main content</b>
					</Sidebar> */}
					<Router>
						<Route
							component={(props) => (
								<Navbar
									{...props}
									showPreferences={this.state.showPreferences}
									onPreferencesOpenHandler={
										this.onPreferencesOpenHandler
									}
									authenticated={this.state.authenticated}
									email={this.state.email}
									onLoginClickHandler={
										this.onLoginClickHandler
									}
									logout={this.logout}
								/>
							)}
						/>
						{/* <SideBar
						// isOpen={this.state.isOpen}
						// openSidebar={this.openSidebar}
						// closeSidebar={this.closeSidebar}
						isAuthenticated={this.state.authenticated}
						onLogoutHandler={this.logout}
					/> */}
						<Route path='/login' component={Login} />

						<div className='container mx-auto px-2'>
							<Switch>
								<Route
									exact
									path='/'
									component={(props) => (
										<Home
											{...props}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											refreshUser={this.refreshUser}
										/>
									)}
								/>
								<Route
									exact
									path='/headlines'
									component={(props) => (
										<Home
											{...props}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											refreshUser={this.refreshUser}
										/>
									)}
								/>
								<AuthRoute
									exact
									path='/user/bookmarks'
									isAuthenticated={this.state.authenticated}
									component={(props) => (
										<SavedArticlesPage
											{...props}
											refreshUser={this.refreshUser}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											bookmarks={this.state.bookmarks}
										/>
									)}
								/>
								<AuthRoute
									isAuthenticated={this.state.authenticated}
									exact
									path='/user/foryou'
									component={(props) => (
										<PersonalizedNewsPage
											{...props}
											refreshUser={this.refreshUser}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											bookmarks={this.state.bookmarks}
										/>
									)}
								/>
								<AuthRoute
									isAuthenticated={this.state.authenticated}
									exact
									path='/user/searches'
									component={(props) => (
										<SavedSearchesPage
											{...props}
											isAuthenticated={
												this.state.authenticated
											}
											refreshUser={this.refreshUser}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											bookmarks={this.state.bookmarks}
										/>
									)}
								/>
								<Route
									exact
									path='/search'
									component={(props) => (
										<SearchResults
											{...props}
											isAuthenticated={
												this.state.authenticated
											}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											refreshUser={this.refreshUser}
										/>
									)}
								/>
								<Route
									exact
									path='/topics'
									component={(props) => (
										<CategoryPage
											{...props}
											bookmarkURLS={
												this.state.bookmarkURLS
											}
											refreshUser={this.refreshUser}
										/>
									)}
								/>
							</Switch>
						</div>
					</Router>
				</div>
			</MyContext.Provider>
		);
	}
}

export default App;
