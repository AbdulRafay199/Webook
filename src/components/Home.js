import React from 'react'
import Friendlist from './Friendlist'
import Posts from './Posts'
import Onlinefriends from './OnlineFriends'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigation = useNavigate();
  
  useEffect(()=>{
    if(!localStorage.getItem("authtoken")){
      navigation("/login")
    }
  })

  return (
    <>
      <div className='container-fluid'>
        <div className="row my-4">
            <div className="col-3 col-lg-3 col-md-3 col-sm-12 col-xxl-3 d-flex justify-content-center">
                 <Friendlist/>
            </div>
            <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xxl-6 d-flex justify-content-center">
                <Posts/>
            </div>
            <div className="col-3 col-lg-3 col-md-3 col-sm-12 col-xxl-3 d-flex justify-content-center">
                <Onlinefriends/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
