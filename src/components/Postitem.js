import React, { useContext, useEffect, useState } from 'react'
import { friendcontext } from '../Context/Friendstate';
import { usercontext } from '../Context/Userstate';
import { postcontext } from '../Context/Poststate';
import './OnlineFriends.css'
import './Posts.css'
import {
    useNavigate
  } from "react-router-dom";

const Postitem = (props) => {
    const {addindpost} = useContext(postcontext)
    const {users,fetchalluser,selfdata,fetchinduser} = useContext(usercontext)
    const [userimg,setuserimg] = useState("")
    const {postitem,ondltpost,postidforlikelist,getpcobj,onsharepost} = props;
    const {friends} = useContext(friendcontext);
    let condition = false
    let fr;
    if(postitem.shareduserid !== "none"){
        fr = friends.filter((item)=>{return item === postitem.shareduserid})
        if(selfdata.myid !== postitem.shareduserid){
            condition = true
        }
    }
    else{
        fr = friends.filter((item)=>{return item === postitem.userid})
        if(selfdata.myid !== postitem.userid){
            condition = true
        }
    }
    const postuser = users.filter((item)=>{return item._id === postitem.userid})
    const shareduserdetails = users.filter((item)=>{return item._id === postitem.shareduserid})
    const [alllikes,setalllikes] = useState([]);
    const [allcomments,setallcomments] = useState([])
    const [allreplies,setallreplies] = useState(null)
    const navigation = useNavigate();

    const countallreplies = ()=>{
        let countreplie = 0
        allcomments.forEach(element => {
            countreplie = countreplie + element.replies.length
        });
        setallreplies(countreplie)
    }

    const fetchcomment = async (pcpoid)=>{
        const url = `http://localhost:5000/comments/fetchcomments/${pcpoid}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        setallcomments(json)
    }


    const getalllikes = async (postid)=>{
        const url = `http://localhost:5000/appreciation/getalllikes/${postid}`;
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setalllikes(json)
      }

    

      const addlike = async (postid,like)=>{

        const url = `http://localhost:5000/appreciation/addlike`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({postid: postid, likes: like})
        });
        const json = await response.json();
        setalllikes(alllikes.concat(json))
      }

      const deletelike = async (postid)=>{

        const url = `http://localhost:5000/appreciation//deletelike/${postid}`;
  
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
        });
        const json = await response.json();
        const tempalllikes = alllikes.filter((item)=>{return item !== json})
        setalllikes(tempalllikes)
        
      }

    useEffect(()=>{
        fetchalluser();
        getalllikes(postitem._id)
        fetchcomment(postitem._id)
        countallreplies();
        // eslint-disable-next-line
    },[])

//     const [posttime,setposttime] = useState({time:"",status:""})
//     const postitemmin= new Date(postitem.date).getMinutes()
//     const currmin= new Date().getMinutes()
//     const postitemhour= new Date(postitem.date).getHours();
//     const currhour= new Date().getHours()
//     const postitemdate= new Date(postitem.date).getDate();
//     const currdate= new Date().getDate()

//     const settime = ()=>{
//         if(Math.max(postitemdate,currdate) - Math.min(postitemdate,currdate) === 0){
//             if(Math.max(postitemhour,currhour) - Math.min(postitemhour,currhour) === 0){
//                 if(Math.max(postitemmin,currmin) - Math.min(postitemmin,currmin) === 0){
//                     setposttime({
//                         time: "Just now",
//                         status:""
//                     })
//                 }
//                 else{
//                     let diff = Math.max(postitemmin,currmin) - Math.min(postitemmin,currmin)
//                     setposttime({
//                         time: diff.toString(),
//                         status:"m ago"
//                     })
//                 }
//             }
//             else{
//                 if((60-postitemmin)+currmin >= 60){

//                     let diff = Math.max(postitemhour,currhour) - Math.min(postitemhour,currhour)
//                         setposttime({
//                             time: diff.toString(),
//                             status:"h ago"
//                         })
//                 }
//                 else{
//                     let diff = (60-postitemmin)+currmin
//                     setposttime({
//                         time: diff.toString(),
//                         status:"m ago"
//                     })

//                 }
//             }
//     }
//     else{
//         let diff = Math.max(postitemdate,currdate) - Math.min(postitemdate,currdate)
//         setposttime({
//             time: diff.toString(),
//             status:"d ago"
//         })
//     }
// }
    const navigatetoUserProfile_shared = async ()=>{
        await addindpost(shareduserdetails[0]._id);
        await fetchinduser(shareduserdetails[0]._id);
        navigation(`/userProfile/${shareduserdetails[0]._id}`)
    }

    const navigatetoUserProfile_orig = async ()=>{
        await addindpost(postuser[0]._id);
        await fetchinduser(postuser[0]._id);
        navigation(`/userProfile/${postuser[0]._id}`)
    }

    useEffect(()=>{
        // settime();
        if(postuser.length === 0){
            setuserimg("none")
        }
        else if(postuser[0].userimg === "none"){
            setuserimg("https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png")
        }
        else{
            setuserimg(postuser[0].userimg)
        }
        // eslint-disable-next-line
    },[users])

    const onaddlike = ()=>{
        if(alllikes.slice(0).filter((item)=>{return item.userid === selfdata.myid}).length === 0){
            addlike(postitem._id,'like');
            getalllikes(postitem._id);    
        }
        else if(alllikes.slice(0).filter((item)=>{return item.userid === selfdata.myid}).length !== 0){
            deletelike(postitem._id);
            getalllikes(postitem._id);    
        }
    }
    
  return (
    <>
    <div className={`container poitem my-3 py-3 ${(fr.length === 0 && condition)? "d-none": ""}`}>
        {postitem.shareduserid !== "none" && 
        <div className="d-flex justify-content-start align-items-center flex-row my-3">
            <div className="col-10 d-flex align-items-center flex-row mx-2">
                <img className='img-fluid' src={shareduserdetails[0].userimg} alt="" width="30px" onClick={navigatetoUserProfile_shared} style={{borderRadius:"15px",cursor:"pointer"}}/>
                <p className="m-0 p-0 mx-2" style={{fontSize:"smaller",cursor:"pointer"}}><b onClick={navigatetoUserProfile_shared}>{shareduserdetails[0].name}</b> shared this post</p>
            </div>
            <div className="col-2 d-flex justify-content-center flex-row">
                {selfdata.myid === postitem.shareduserid && <div className="dropdown">
                    <a className="btn mx-1" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button className="dropdown-item" onClick={()=>{ondltpost(postitem._id)}}>Delete</button></li>
                    </ul>
                </div>}
            </div>
        </div>
        }
        <div className={`${postitem.shareduserid !== "none" && 'sharedpost'}`} style={{borderRadius:"30px"}}>
            <div className="row d-flex justify-content-center align-items-center my-2">
                <div className={`col-2 d-flex justify-content-end`}>
                    <div className='position-relative'>
                        <img className='img-fluid' src={userimg} onClick={navigatetoUserProfile_orig} alt="" width="40px" style={{borderRadius:"20px",cursor:"pointer"}}/>
                        <div className="position-absolute translate-middle bg-success" style={{width:"16px",height: "16px",border:"2px solid white",borderRadius: "8px", top:"85%",left:"90%"}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                {/* // {postuser[0].userimg !== "none"? postuser[0].userimg : "https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png"}*/}
                <div className="col-6">
                    <h4 className='fs-6 my-auto' onClick={navigatetoUserProfile_orig} style={{cursor:"pointer"}}>{postuser.length === 0? "":postuser[0].name}</h4>
                    <p className='my-auto' style={{color:"grey"}}>{postitem.loc !== "none"? postitem.loc: ""}</p>
                </div>
                
                <div className="col-4 d-flex justify-content-center align-items-center flex-row">
                    <p className='fs-6 my-auto text-end' style={{color:"grey", width:"100%"}}>1m ago</p>
                    {selfdata.myid === postitem.userid && <div className="dropdown">
                        <a className="btn mx-1" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><button className="dropdown-item" onClick={()=>{ondltpost(postitem._id)}}>Delete</button></li>
                        </ul>
                    </div>}
                </div>
                
            </div>
            <div className="row d-flex justify-content-start align-items-center flex-column px-2">
                <p className='fs-6' style={{margin:"0px",marginTop:"20px", marginBottom:"10px",wordBreak:"break-all"}}>{postitem.caption}</p>
                <img className={`img-fluid ${postitem.img !== "none" && 'mb-2'}`} src={postitem.img} alt="" data-bs-toggle="modal" data-bs-target="#postcomment" onClick={()=>{postitem.sharedpostid !== "none"? getpcobj(postitem.img,postitem.sharedpostid) : getpcobj(postitem.img,postitem._id)}}/>
            </div>
        </div> 
            <div className='d-flex justify-content-start align-items-center flex-row'>
                {alllikes.length > 0 && <div className='container d-flex justify-content-start align-items-center flex-row px-2 my-2'>
                    <button className='btn d-flex justify-content-center align-items-center flex-row p-0' data-bs-toggle="modal" data-bs-target="#alllikesofuser" onClick={()=>{postidforlikelist(postitem._id)}}><img className='img-fluid mx-2' src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png" alt='' style={{width:"22px",height:"22px"}}/>
                    <p className='m-0' style={{fontSize:"smaller"}}>{alllikes.length}</p></button>
                </div>}
                {allcomments.length > 0 && <div className='container d-flex justify-content-end align-items-center flex-row px-2 my-2'>
                    <button className='btn d-flex justify-content-center align-items-center flex-row p-0 mx-2' data-bs-toggle="modal" data-bs-target="#postcomment" onClick={()=>{getpcobj(postitem.img,postitem._id)}}>
                    <p className='m-0' style={{fontSize:"smaller"}}>{allcomments.length + allreplies} comment</p></button>
                    <button className='btn d-flex justify-content-center align-items-center flex-row p-0' data-bs-toggle="modal" data-bs-target="#alllikesofuser" onClick={()=>{postidforlikelist(postitem._id)}}>
                    <p className='m-0' style={{fontSize:"smaller"}}>{alllikes.length} share</p></button>
                </div>}
            </div>
                   
            <hr className='my-2'/>
            <div className="row flex-row">
                <div className="col-4 d-flex justify-content-center align-items-center" style={{borderRight:"1px solid #b3b3b3"}}>
                    <button className="btn pobtn1 p-0" id='likebtn' onClick={onaddlike} style={{color: `${alllikes.slice(0).filter((item)=>{return item.userid === selfdata.myid}).length === 0? 'black':'rgb(64, 64, 235)'}`}}><i className={`bi ${alllikes.slice(0).filter((item)=>{return item.userid === selfdata.myid}).length === 0? 'bi-hand-thumbs-up':'bi-hand-thumbs-up-fill'} fs-6 mx-1`}></i>Like</button>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                <button className="btn pobtn1 p-0" data-bs-toggle="modal" data-bs-target="#postcomment" onClick={()=>{getpcobj(postitem.img,postitem._id)}}><i className="bi bi-chat-left-text fs-6 mx-1"></i>Comment</button>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center" style={{borderLeft:"1px solid #b3b3b3"}}>
                <button className="btn pobtn1 p-0" onClick={()=>{onsharepost(postitem)}}><i className="bi bi-share fs-6 mx-1"></i>Share</button>
                </div>
            </div>
    </div>
    </>
  )
}

export default Postitem
