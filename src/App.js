import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './styles/app.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SearchResults from './Pages/SearchResults';
import SideBar from './Components/SideBar';
import CategoryPage from './Pages/CategoryPage';
import Login from './Components/Login';
import Modal from './Components/Modal';
import BackDrop from './Components/BackDrop';
import Axios from './utils/axiosInstance';
import JwtDecode from 'jwt-decode';

// const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
	state = {
		showModal: false,
		authenticated: false,
		email: null,
		token: null,
		bookmarks: [],
		bookmarkURLS: [],
	};

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

	componentDidMount = () => {
		let email = localStorage.email;
		let token = localStorage.token;
		let bookmarks = localStorage.bookmarks;
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

				this.setState({
					authenticated,
					email,
					token,
					bookmarks,
					bookmarkURLS: urls,
				});
				console.log('authenicated boi');
			}
		}
	};

	onModalDismissHandler = () => {
		this.setState({ showModal: false });
	};
	onLoginClickHandler = () => {
		this.setState({ showModal: true });
	};

	logout = () => {
		localStorage.clear();
		this.setState({
			authenticated: false,
		});
	};

	loginSuccessHandler = (token, email, bookmarks = []) => {
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		Axios.defaults.headers.common['Authorization'] = token;
		this.setState({
			showModal: false,
			authenticated: true,
			email: email,
			token: token,
		});
		this.refreshUser(bookmarks);
		console.log('authenticated');
	};

	render() {
		return (
			<div>
				{this.state.showModal && !this.state.authenticated && (
					<div>
						<Modal>
							<Login
								loginSuccessHandler={this.loginSuccessHandler}
								onLoginHandler={this.onLoginHandler}
								onSignupHandler={this.onSignupHandler}
							/>
						</Modal>
						<BackDrop onclick={this.onModalDismissHandler} />
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
								authenticated={this.state.authenticated}
								email={this.state.email}
								onLoginClickHandler={this.onLoginClickHandler}
							/>
						)}
					/>
					<SideBar
						isAuthenticated={this.state.authenticated}
						onLogoutHandler={this.logout}
					/>
					<Route path='/login' component={Login} />

					<div className='container mx-auto px-2'>
						<Switch>
							<Route
								exact
								path='/'
								component={(props) => (
									<Home
										{...props}
										bookmarkURLS={this.state.bookmarkURLS}
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
										bookmarkURLS={this.state.bookmarkURLS}
										refreshUser={this.refreshUser}
									/>
								)}
							/>
							<Route
								exact
								path='/search'
								component={(props) => (
									<SearchResults
										{...props}
										bookmarkURLS={this.state.bookmarkURLS}
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
										bookmarkURLS={this.state.bookmarkURLS}
										refreshUser={this.refreshUser}
									/>
								)}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
