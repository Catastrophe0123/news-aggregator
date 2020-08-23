import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './styles/app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SearchResults from './Pages/SearchResults';

function App() {
	return (
		<div>
			<Router>
				<Route component={Navbar} />
				<div className='container mx-auto px-2'>
					<Route exact path='/' component={Home} />
					<Route exact path='/search' component={SearchResults} />
				</div>
			</Router>
		</div>
	);
}

export default App;
