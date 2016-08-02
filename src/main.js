import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect} from 'react-router'
import Application from './containers/Application'

import Team from './containers/Team'
import Stats from './containers/Stats'

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
        
ReactDOM.render((
	<Router history={browserHistory}>
    	<Route path="/" component={Application}>
      	  <IndexRedirect to="team"/>
    		<Route path="team" component={Team}/>
		    <Route path="stats" component={Stats}/>
		</Route>
	</Router>
  ), document.getElementById('app')
)