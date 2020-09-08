import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class SavedSearch extends Component {
	state = { isHovering: false };

	onClickHandler = () => {
		this.props.history.push('/search?q=' + this.props.el);
	};

	render() {
		return (
			<div
				onMouseEnter={() => {
					this.setState({ isHovering: true });
				}}
				onMouseLeave={() => {
					this.setState({
						isHovering: false,
					});
				}}
				style={{ transition: 'all 0.15s ease' }}
				className={` cursor-pointer shadow-md flex flex-grow justify-between  border hover:shadow-lg border-gray-500 hover:border-gray-800  rounded-md p-2 m-2 my-3 w-full  items-center`}>
				<i
					onClick={this.onClickHandler}
					className=' hover:shadow-lg text-gray-700 p-2 pr-3 text-5xl fas fa-search'></i>
				<div onClick={this.onClickHandler} className='pl-2'>
					{this.props.el}
				</div>
				{/* {this.state.isHovering && (
					<i className=' px-3 fas fa-trash'></i>
				)} */}
				<i
					onClick={() => this.props.onDeleteHandler(this.props.el)}
					style={{
						opacity: this.state.isHovering ? '100%' : '0%',
						transition: 'opacity 0.15s ease-in, color 0.1s ease-in',
					}}
					className='hover:text-red-600 z-10 text-gray-700 px-3 fas fa-trash'></i>
			</div>
		);
	}
}

export default withRouter(SavedSearch);
