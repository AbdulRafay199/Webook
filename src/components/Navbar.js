import React, { useContext, useEffect, useState} from "react";
import './Navbar.css'
import logo from '../webook-logo.png'
import Button from '@mui/material/Button';
import Useritem from "./Useritem";
import { usercontext } from "../Context/Userstate";
import { postcontext } from "../Context/Poststate";
import { friendcontext } from "../Context/Friendstate";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {users,fetchalluser,getselfdetails,selfdata,fetchinduser} = useContext(usercontext);
  const {addindpost} = useContext(postcontext);
  const {addfriends,fetchfriends,dltfriends} = useContext(friendcontext);
  const [searchval,setsearchval] = useState("");
  const navigation = useNavigate();
  
  useEffect(()=>{
    fetchalluser();
    getselfdetails();
    // eslint-disable-next-line
  },[])

  const onchangesearch = (e)=>{
    setsearchval(e.target.value);
  }

  const emptysearchbar = ()=>{
    setsearchval("");
  }

  const addtofl = (flid)=>{
    addfriends(flid)
    fetchfriends();
  }

  const dltfromfl = (flid)=>{
    dltfriends(flid)
    fetchfriends();
  }

  const navigatetoUserProfile = async ()=>{
    await addindpost(selfdata.myid);
    await fetchinduser(selfdata.myid);
    navigation(`/userProfile/${selfdata.myid}`)
  }

  const logouthandler = ()=>{
    localStorage.removeItem("authtoken")
    navigation("/Login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top navbar-light navbg justify-content-end">
        <div className="container-fluid">
            <img className="img-fluid mx-2" src={logo} alt="" width="130px"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            {localStorage.getItem("authtoken") && <div className="navbar-nav mx-auto" style={{position:"relative"}}>
                <input className="searchbar" type="search" placeholder="." value={searchval} onChange={onchangesearch}/>
            </div>}
            <div className="navbar-nav">
            {localStorage.getItem("authtoken")? 
            <>
            <i class="bi bi-bell fs-4 mx-3" style={{color:"purple"}}></i>
            <div className="dropstart mx-3">
              <img className="dropdown-toggle" id="dropdownMenuButton1" src={selfdata?.myimg} alt="" width="40px" style={{borderRadius:"20px",cursor:"pointer"}} data-bs-toggle="dropdown" aria-expanded="false"/>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button className="dropdown-item" onClick={navigatetoUserProfile}>View Profile</button></li>
                <li><button className="dropdown-item" onClick={logouthandler}>Logout</button></li>
              </ul>
            </div>
            </>:
            window.location.pathname === "/signup"?<Link to="/login" style={{textDecoration:"none"}}><Button color="secondary" variant="outlined">Login</Button></Link>:<Link to="/signup" style={{textDecoration:"none"}}><Button color="secondary" variant="outlined">SignUp</Button></Link>
            }
            </div>
            </div>
        </div>
        </nav>
        <div className="container searchitem w-25">
            {users.slice(0).filter((username) => { return username.name.slice(0,searchval.length).toLowerCase() === searchval.toLowerCase() && searchval.length !== 0}).map((useritem)=>{
              return <Useritem useritem={useritem} key={useritem._id} addtofl={addtofl} dltfromfl={dltfromfl} emptysearchbar={emptysearchbar}/>
            })
            }  
        </div>
    </>
    
    
  );
};

export default Navbar;
