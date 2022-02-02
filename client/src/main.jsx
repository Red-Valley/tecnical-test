import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store/index' 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './Components/Layouts/SignIn'
import SignUp from './Components/Layouts/SignUp'
import Messenger from './Components/Layouts/Messenger'
import ProtectedRoute from './Components/functionals/ProtectedRoute'

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<SignIn/>}/>
        <Route path='register' element={<SignUp/>}/>
        <Route path='messenger' element={<ProtectedRoute><Messenger/></ProtectedRoute>}/>
      </Route>
      </Routes>
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
