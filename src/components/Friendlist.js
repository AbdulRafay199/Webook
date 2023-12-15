import React, { useContext,useEffect} from 'react'
import { friendcontext } from '../Context/Friendstate'
import { usercontext } from '../Context/Userstate'
import FLitem from './FLitem'
import './OnlineFriends.css'

const Friendlist = () => {
  const {users} = useContext(usercontext);
  const {friends,fetchfriends} = useContext(friendcontext)

  useEffect(()=>{
    fetchfriends();
    // eslint-disable-next-line
  },[friends])

  return (
    <>
    <div className="container outer-friendlist">
        <h4 className='fs-5 text-center my-4'>Your Friends</h4>
        <div>
          {users.map((frienditem)=>{
            return <FLitem frienditem={frienditem} key={frienditem._id}/>
          })
          }
        </div>
    </div> 
    </>
  )
}

export default Friendlist
