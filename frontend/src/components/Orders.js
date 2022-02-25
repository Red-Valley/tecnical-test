import React, {useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios'
import { API_URL } from '../constants';
import { Button } from '@mui/material';
import { useAuth } from '../context/stores/Auth/Auth';
import { TYPES } from '../types';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}





const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
    ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
      ),
    ];
    
    function preventDefault(event) {
      event.preventDefault();
    }
    
    
    export default function Orders() {
      const [users, setUsers] = useState([])
      const { userState, dispatch } = useAuth();

      useEffect(() => {
        getUsers()
      }, [])
      
  async function getUsers() {
    const usersGot = await axios.get(`${API_URL}/users/all-users`)
    const currentFollowers = await axios.get(`${API_URL}/followers/${userState.user._id}`)
    console.log("🚀 ~ file: Orders.js ~ line 92 ~ handleOnclickButton ~ followers", currentFollowers.data)
    dispatch({type: TYPES.UPDATE_FOLLOWERS, payload: {followers: currentFollowers.data}})
    setTimeout(()=>{

      const newUs = usersGot.data.map((user)=> {return {...user, isFollower: userIsFollower(user._id)}} )
      setUsers(newUs)
    },1000)

    // setFollowers(newF)
  };

   async function handleOnclickButton(followerId){
     console.log("🚀 ~ file: Orders.js ~ line 79 ~ handleOnclickButton ~ followerId", followerId)
     console.log("🚀 ~ file: Orders.js ~ line 84 ~ handleOnclickButton ~ userState", userState)
     if(userIsFollower(followerId)) {
       await axios.post(`${API_URL}/followers/unfollow`, {
        userToUnFollowId: followerId,
        userId: userState.user._id
       })
       updateFollower(false, followerId)
     }else {
       await axios.post(`${API_URL}/followers/follow`, {
        userToFollowId: followerId,
        userId: userState.user._id
       })
       updateFollower(true, followerId)
    }

    const currentFollowers = await axios.get(`${API_URL}/followers/${userState.user._id}`)
    console.log("🚀 ~ file: Orders.js ~ line 92 ~ handleOnclickButton ~ followers", currentFollowers.data)
    dispatch({type: TYPES.UPDATE_FOLLOWERS, payload: {followers: currentFollowers.data}})
    localStorage.setItem('userState', JSON.stringify({...userState, followers: currentFollowers.data}));
    setTimeout(()=>{
      const newUs = users.map((user)=> {return {...user, isFollower: userIsFollower(user._id)}} )
      setUsers(newUs)
    }, 2000)

  }

  function updateFollower (isF, followerId) {
    const newFollowers = userState.followers.slice()
    const index = newFollowers.indexOf(f => f.followerId === followerId)
    if(index != -1) {
      newFollowers[index].isFollower = isF
      dispatch({type: TYPES.UPDATE_FOLLOWERS, payload: {followers: newFollowers.data}})
    }
  }

  function userIsFollower(followerId) {
    console.log("🚀 ~ file: Orders.js ~ line 123 ~ userIsFollower ~ followerId", followerId)
    const isFollower = !!userState.followers.find(follower => follower.userFollowerId == followerId)
    console.log("🚀 ~ file: Orders.js ~ line 119 ~ userIsFollower ~ isFollower", isFollower)
    return isFollower 
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Identification Number</TableCell>
            <TableCell>Identification Type</TableCell>
            <TableCell>address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.astName}</TableCell>
              <TableCell>{user.idNumber}</TableCell>
              <TableCell>{user.idType}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>

              {userState && userState._id != user._id &&
              <a href="#" onClick={() => handleOnclickButton(user._id)}>
                  {user.isFollower ? "UnFollow" : "Follow"}
              </a>
              }
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}