import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

export class AuthRoute extends Component {
	render() {
		let { isAuthenticated, ...props } = this.props;
		if (!isAuthenticated) {
			props.history.push('/headlines');
		}
		return (
			<Route
				{...props}
				path={isAuthenticated ? props.path : '/headlines'}
			/>
		);
	}
}

export default withRouter(AuthRoute);
