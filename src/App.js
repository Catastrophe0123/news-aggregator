import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './styles/app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
	return (
		<div className='container mx-auto px-2'>
			<Router>
				<Route exact path='/' component={Home} />
				{/* <div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'>
						Learn React
					</a>
				</header>
			</div> */}
			</Router>
		</div>
	);
}

export default App;
