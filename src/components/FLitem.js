import React,{useContext, useEffect} from 'react'
import { friendcontext } from '../Context/Friendstate';
import { usercontext } from '../Context/Userstate';
import {
  useNavigate
} from "react-router-dom";
import { postcontext } from '../Context/Poststate';

const FLitem = (props) => {
  useEffect(()=>{
    fetchfriends();
    console.log(friends)
    // eslint-disable-next-line
  },[])
  const {frienditem} = props;
  const {friends,fetchfriends} = useContext(friendcontext);
  const {fetchinduser} = useContext(usercontext);
  const {addindpost} = useContext(postcontext);
  const navigation = useNavigate();
  const fr = friends.filter((item)=>{return item === frienditem._id})

  const navigatetoUserProfile = async ()=>{
    await addindpost(frienditem._id);
    await fetchinduser(frienditem._id);
    navigation(`/userProfile/${frienditem._id}`)
  }
  return (
    <>
    <div className={`container ofitem d-flex justify-content-center align-items-center flex-row my-3 ${fr.length === 0 && "d-none" }`}>
        <img className='img-fluid' onClick={navigatetoUserProfile} src={frienditem?.userimg === "none"? "https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png": frienditem.userimg} alt="" width="30px" style={{borderRadius:"15px",cursor:"pointer"}}/>
        <h4 className='fs-6 text-center mx-3 my-3' onClick={navigatetoUserProfile} style={{cursor:"pointer"}}>{frienditem.name}</h4>
        <div className="bg-warning" style={{width:"10px",height: "10px",borderRadius: "5px"}}>
            <span className="visually-hidden">Loading...</span>
        </div>
        {/* <button className="btn-outline-success">Unfollow</button> */}
    </div> 
    </>
  )
}

export default FLitem
