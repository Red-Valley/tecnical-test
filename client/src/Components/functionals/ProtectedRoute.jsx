import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { delete_cookie, read_cookie } from 'sfcookies';

const ProtectedRoute = ({children}) => {
  const {user} = useSelector(state=>state)
  if(!user._id && read_cookie('userToken').length){  
    delete_cookie('userToken')
    return <Navigate to="/"/>
  }
  if(user._id && read_cookie('userToken').length){
    return children
  }else{
  return <Navigate to="/"/>
}
}

export default ProtectedRoute;