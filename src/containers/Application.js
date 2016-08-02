import React from 'react';
import {Provider} from 'react-redux';
import createStore from '../store/store';
import {Nav, NavItem} from 'react-bootstrap';
const store = createStore();

export default class Application extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const route = this.props.routes[1].path || 'team'

		return (
			<Provider store = {store}>
				<div>
					<nav className="navbar navbar-default navbar-fixed-top">
					  <div className="container">
					    <div className="navbar-header">
					      <a className="navbar-brand" href="/">
					        Turnip
					      </a>
					    </div>
					  </div>
					</nav>
					<div style={{marginTop: '50px', padding: '30px'}}>
					  	<Nav bsStyle="pills" justified activeKey={route}>
				          <NavItem eventKey="team" href="/team">Team</NavItem>
				          <NavItem eventKey="stats" href="/stats">Stats</NavItem>
			        	</Nav>
			        </div>
					{this.props.children}
				</div>
			</Provider>
		)
	}
}
