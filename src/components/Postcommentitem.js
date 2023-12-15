import React,{useContext, useEffect} from 'react'
import { usercontext } from '../Context/Userstate';
import Replyitem from './Replyitem';

const Postcommentitem = (props) => {
    const {commentitem,setreplystatus,fetchcomment,likeoncommenthandler} = props;
    const {users,fetchalluser,selfdata} = useContext(usercontext)
    const commentuser = users.filter((each)=>{return each._id === commentitem.userid})
    let isliked = commentitem.likes.filter((each)=>{return each.likeuserid === selfdata.myid})

    const deletecomment = async (pcpoid)=>{
        const url = `http://localhost:5000/comments/deletecomment/${pcpoid}`;
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("authtoken")
            },
            body: JSON.stringify({_id:commentitem._id})
        });
        const json = await response.json();
        console.log(json)
        fetchcomment(commentitem.postid);
    }

    useEffect(()=>{
        fetchalluser();
        // eslint-disable-next-line
    },[])
  return (
    <>
    <div className='container'>
        <div className="container d-flex justify-content-start align-items-start flex-row my-3 p-0">
            <img className='img-fluid mx-2' src={commentuser[0].userimg} alt="" width="40px" style={{borderRadius:"20px"}}/>
            <div className='d-flex justify-content-start align-items-center flex-column'>
                <div className='container m-0' style={{backgroundColor:"rgb(241, 241, 241)",borderRadius:"15px"}}>
                    <p className='mt-2 mb-0' style={{fontSize:"smaller",fontWeight:"bold"}}>{commentuser[0].name}</p>
                    <p className='mb-1 p-0' style={{fontSize:"smaller",wordBreak:"break-all"}}>{commentitem.comment}</p>
                </div>
                <div className='container d-flex justify-content-start align-items-center flex-row'>
                    <button className="btn p-0 m-0" style={{fontSize:"smaller",color: isliked.length > 0? 'blue': 'black'}} onClick={()=>{likeoncommenthandler(commentitem.userid,commentitem._id,isliked)}}>like</button>
                    <button className="btn p-0 m-0 mx-3" onClick={()=>{setreplystatus(commentitem.userid,commentitem._id)}} style={{fontSize:"smaller"}}>Reply</button>
                    {selfdata.myid === commentitem.userid && <div class="dropstart">
                    <button class="btn p-0 m-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button class="btn dropdown-item" onClick={()=>{deletecomment(commentitem.postid)}}>Delete Comment</button></li>
                    </ul>
                    </div>}
                    {commentitem.likes.length > 0 && <div className='d-flex justify-content-center align-items-center flex-row' style={{marginLeft:"20px"}}>
                        <p className="text-center p-0 m-0" style={{fontSize:"smaller"}}>{commentitem.likes.length}</p>
                        <img className='img-fluid mx-1' src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png" alt='' style={{width:"16px",height: "16px",borderRadius: "8px"}}/>
                    </div>}
                </div>
            </div>
        </div>
        {commentitem.replies.map((replyitem)=>{
            return <Replyitem replyitem={replyitem}/>
        })}
    </div>
      
    </>
  )
}

export default Postcommentitem
