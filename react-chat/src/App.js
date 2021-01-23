import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './component/auth/Login';
import NewAccount from './component/auth/NewAccount';
import Chat from './component/page/Chat';

function App() {

  return (
    <Router>
		<Switch>
			<Route exact path='/login' component={Login} />
			<Route exact path='/new-account' component={NewAccount} />	
			<Route exact path='/' component={Chat} />
		</Switch>
	</Router>
  );
}

export default App;