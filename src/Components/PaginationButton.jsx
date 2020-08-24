import React, { Component } from 'react';

export class PaginationButton extends Component {
	render() {
		return (
			<div>
				{this.props.direction === 'left' && (
					<i
						style={{ color: 'dodgerblue' }}
						className={`  px-1 fas fa-angle-${this.props.direction}`}></i>
				)}

				<button
					style={{ color: 'dodgerblue' }}
					className=''
					disabled={this.props.disabled}>
					{this.props.children}
				</button>
				{this.props.direction === 'right' && (
					<i
						style={{ color: 'dodgerblue' }}
						className={` px-1 mr-5 fas fa-angle-${this.props.direction}`}></i>
				)}
			</div>
		);
	}
}

export default PaginationButton;
