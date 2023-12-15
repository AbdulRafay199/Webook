import React, { useContext, useEffect } from 'react'
import { friendcontext } from '../Context/Friendstate';
import { usercontext } from '../Context/Userstate';
import { postcontext } from '../Context/Poststate';
import { useNavigate } from 'react-router-dom';

const Useritem = (props) => {
var {useritem,addtofl,dltfromfl,emptysearchbar} = props;
const {friends} = useContext(friendcontext)
const {selfdata,getselfdetails,fetchinduser} = useContext(usercontext)
const {addindpost} = useContext(postcontext);
const fr = friends.filter((item)=>{return item === useritem._id})
const navigation = useNavigate();

useEffect(()=>{
  getselfdetails();
  // eslint-disable-next-line
},[])

const navigatetoUserProfile = async ()=>{
  await addindpost(useritem._id);
  await fetchinduser(useritem._id);
  navigation(`/userProfile/${useritem._id}`)
  emptysearchbar()
}

  return (
    <>
    <div className="container useritem d-flex justify-content-start align-items-start flex-row my-4">
        <img className='img-fluid' onClick={navigatetoUserProfile} src={useritem.userimg !== "none"? useritem.userimg : "https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png"} alt="" width="40px" style={{borderRadius:"20px", cursor:"pointer"}}/>
        <div className="container d-flex flex-column mx-1" style={{width:"max-content",marginRight:"0%"}}>
        <h6 className='m-0' onClick={navigatetoUserProfile} style={{cursor:"pointer"}}>{useritem.name}</h6>
        <p className='m-0' style={{fontSize:"small", color:"gray"}}>{useritem.username}</p>
        </div>
        {selfdata.myid !== useritem._id && <div className="container d-flex justify-content-end align-items-end p-0" style={{width:"max-content",marginRight:"0%"}}>
         {fr.length ===0? <button className="btn followbtn" onClick={()=>{addtofl(useritem._id)}}><i className="bi bi-plus-circle"></i> follow</button> : <button className="btn followbtn" onClick={()=>{dltfromfl(useritem._id)}}><i className="bi bi-dash-circle"></i> Unfollow</button>}
        </div>}
    </div> 
    </>
  )
}

export default Useritem
