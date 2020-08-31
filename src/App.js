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
import Axios from 'axios';
import JwtDecode from 'jwt-decode';

// const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
	state = {
		showModal: false,
		authenticated: false,
		email: null,
		token: null,
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

				Axios.defaults.headers['Authorization'] = token;
				this.setState({ authenticated, email, token });
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

	loginSuccessHandler = (token, email) => {
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		Axios.defaults.headers['Authorization'] = token;
		this.setState({
			showModal: false,
			authenticated: true,
			email: email,
			token: token,
		});
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
					<SideBar />
					<Route path='/login' component={Login} />

					<div className='container mx-auto px-2'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/headlines' component={Home} />
							<Route
								exact
								path='/search'
								component={SearchResults}
							/>
							<Route
								exact
								path='/topics'
								component={CategoryPage}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
