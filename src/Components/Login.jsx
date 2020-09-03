import React, { Component } from 'react';
import Axios from '../utils/axiosInstance';

export class Login extends Component {
	state = { isLoggingIn: true, email: '', password: '', errors: null };

	onSwitchHandler = () => {
		// /login and /signup

		this.setState((st) => {
			return {
				...st,
				isLoggingIn: !st.isLoggingIn,
			};
		});
	};

	onLoginHandler = async () => {
		try {
			const { email, password } = this.state;
			let resp = await Axios.post('/login', { email, password });
			console.log(resp.data);
			let token = resp.data.token;
			let { bookmarks } = resp.data.user;
			let mail = resp.data.user.email;
			this.setState({ errors: null }, () => {
				this.props.loginSuccessHandler(token, mail, bookmarks);
			});

			console.log('login successful');
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	onSignupHandler = async () => {
		try {
			const { email, password } = this.state;
			let resp = await Axios.post('/signup', { email, password });
			console.log(resp.data);
			let token = resp.data.token;
			let { bookmarks } = resp.data.user;
			let mail = resp.data.user.email;
			this.setState({ errors: null }, () => {
				this.props.loginSuccessHandler(token, mail, bookmarks);
			});
			console.log('signup successful');
		} catch (err) {
			console.log(err.response);
			this.setState({ errors: err.response.data.errors[0].message });
		}
	};

	onChangeHandler = (event) => {
		let value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	render() {
		return (
			<div>
				<div className=' w-full h-full '>
					<div className='flex w-full content-center items-center justify-center h-full'>
						<div className='w-full'>
							<div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0'>
								<div className='rounded-t mb-0 px-6 py-6'>
									<div className='text-center mb-3'>
										<h6 className='text-gray-600 text-sm font-bold'>
											Sign in with Credentials
										</h6>
									</div>

									<hr className='mt-6 border-b-1 border-gray-400' />
								</div>
								<div className='flex-auto px-4 py-10 pt-0'>
									<form>
										<div className='relative w-full mb-3'>
											<label
												className='block uppercase text-gray-700 text-xs font-bold mb-2'
												htmlFor='grid-password'>
												Email
											</label>
											<input
												onChange={this.onChangeHandler}
												value={this.state.email}
												name='email'
												type='email'
												className='px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
												placeholder='Email'
												style={{
													transition: 'all .15s ease',
												}}
											/>
										</div>

										<div className='relative w-full mb-3'>
											<label
												className='block uppercase text-gray-700 text-xs font-bold mb-2'
												htmlFor='grid-password'>
												Password
											</label>
											<input
												name='password'
												value={this.state.password}
												onChange={this.onChangeHandler}
												type='password'
												className='px-3  py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
												placeholder='Password'
												style={{
													transition: 'all .15s ease',
												}}
											/>
										</div>
										{this.state.errors && (
											<p className=' text-red-600'>
												{this.state.errors}
											</p>
										)}
										<div className='text-center mt-6'>
											{this.state.isLoggingIn ? (
												<button
													onClick={
														this.onLoginHandler
													}
													className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
													type='button'
													style={{
														transition:
															'all .15s ease',
													}}>
													Sign In
												</button>
											) : (
												<button
													onClick={
														this.onSignupHandler
													}
													className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
													type='button'
													style={{
														transition:
															'all .15s ease',
													}}>
													Sign Up
												</button>
											)}
										</div>
									</form>
									{this.state.isLoggingIn ? (
										<p
											onClick={this.onSwitchHandler}
											className='text-center pt-2 hover:underline cursor-pointer '>
											Create a new Account
										</p>
									) : (
										<p
											onClick={this.onSwitchHandler}
											className='text-center pt-2 hover:underline cursor-pointer '>
											Already have an Account?
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
