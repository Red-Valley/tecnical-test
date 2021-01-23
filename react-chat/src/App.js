import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Chat from './components/page/Chat';

function App() {

  return (
    <Router>
		<Switch>
			<Route exact path='/login' component={Login} />
			<Route exact path='/new-account' component={Signup} />	
			<Route exact path='/' component={Chat} />
		</Switch>
	</Router>
  );
}

export default App;