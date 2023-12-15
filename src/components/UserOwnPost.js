import React, { useContext, useEffect,useState } from 'react'
import './Posts.css'
import './OnlineFriends.css'
import Postitem from './Postitem'
import { postcontext } from '../Context/Poststate'
import { usercontext } from '../Context/Userstate'
import { friendcontext } from '../Context/Friendstate'
import Postcomment from './Postcomment'
import {
    Link
  } from "react-router-dom";

const UserOwnPost = (props) => {

//   const {indpost,induser} = props;
//   let induser = JSON.parse(localStorage.getItem("induser"))
  const {posts,fetchallpost,indpost,dltpost} = useContext(postcontext)
  const {getselfdetails,users,induser,selfdata} = useContext(usercontext)
  const {friends,fetchfriends,addfriends,dltfriends} = useContext(friendcontext)
  const [likelist,setlikelist] = useState([]);
  const [postcommentobj,setpostcommentobj] = useState({pcimg:"",pcpostid:""});
  const fr = friends.filter((each)=>{return each === induser[0]._id})
    // let [indpost,setindpost] = useState([])
    // const [induser,setinduser] = useState([])
    // indpost = indpost.filter((each)=>{return each.shareduserid === "none"})
          
    // let pathname =  window.location.pathname;
    // pathname = pathname.split("/")

    // const addindpost = async ()=>{
    //     const url = `http://localhost:5000/post/getindpost/${pathname[2]}`;

    //     const response = await fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     const json = await response.json();
    //     setindpost(json)
    //   }

    //   const fetchinduser = async ()=>{
    //     const url = `http://localhost:5000/user/getinduser/${pathname[2]}`;
    //     const response = await fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     });
    //     const json = await response.json();
    //     setinduser(json)
    //     console.log(induser)
    //   }

    //   useEffect(()=>{
    //     fetchinduser();
    //     addindpost();
    //   })

  const onsharepost = async (postitem)=>{

      const url = `http://localhost:5000/post/sharepost`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authtoken")
        },
        body: JSON.stringify({userid:postitem.userid,sharedpostid:postitem._id,caption:postitem.caption,img:postitem.img,loc:postitem.loc})
      });
      const json = await response.json();
      console.log(json)

  }

  const ondltpost = (postid)=>{
    dltpost(postid);
    fetchallpost();
  }

  useEffect(()=>{
    fetchallpost();
    getselfdetails();
    fetchfriends();
    // eslint-disable-next-line
  },[posts])

  const getlikelist = async (postid)=>{
    const url = `http://localhost:5000/appreciation/getalllikes/${postid}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setlikelist(json)
  }

  const getpcobj = (poimg,poid)=>[
    setpostcommentobj({pcimg:poimg,pcpostid:poid})
  ]
  
  return (
    <>
      <div className="container">
        <div className="row userouter">
            <div className="col-4 d-flex justify-content-center align-items-center">
                <img src={induser[0]?.userimg !== "none"? induser[0].userimg : "https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png"} alt="" width="160px" style={{borderRadius:"80px"}}/>
            </div>
            <div className="col-8">
                <div className="row mt-3 p-0 d-flex justify-content-center align-items-center">
                    <div className="col-8">
                        <p className='fs-3 m-0 p-0 mx-4 fw-lighter'>{induser[0].name}</p>
                    </div>
                    {induser[0]._id !== selfdata.myid && <div className="col-4">
                    {fr.length ===0? <button className="btn followbtn" onClick={()=>{addfriends(induser[0]._id)}}><i className="bi bi-plus-circle"></i> follow</button> : <button className="btn followbtn" onClick={()=>{dltfriends(induser[0]._id)}}><i className="bi bi-dash-circle"></i> Unfollow</button>}
                    </div>}
                </div>
                <div className="row mt-3 p-0">
                    <div className="col-4 d-flex justify-content-center align-items-center flex-column">
                        <h4 className='m-0 p-0'>{indpost.length}</h4>
                        <p className='m-0 p-0'>Posts</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center flex-column">
                        <h4 className='m-0 p-0'>239</h4>
                        <p className='m-0 p-0'>Followers</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center flex-column">
                        <h4 className='m-0 p-0'>173</h4>
                        <p className='m-0 p-0'>Following</p>
                    </div>
                </div>
                <div className="row m-0 p-0 mt-3">
                    <p className="p-0 m-0 mx-4" style={{fontWeight:"bold"}}>{induser[0].username}</p>
                    <p className="p-0 m-0 mx-4" style={{color:"grey"}}>{induser[0].profession !== "none"?induser[0].profession:""}</p>
                    <p className="p-0 m-0 mx-4">{induser[0].tagline !== "none"? induser[0].tagline: ""}</p>
                    <p className="p-0 m-0 mx-4">{induser[0].discription !== "none"? induser[0].discription: ""}</p>
                </div>
            </div>
        </div>
        <div className="mt-4">
            <ul className="nav nav-tabs d-flex justify-content-around">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/all" style={{color:"black"}}><i className="bi bi-border-all"></i></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/post" style={{color:"black"}}><i className="bi bi-postcard"></i></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/sharedpost" style={{color:"black"}}><i className="bi bi-share"></i></Link>
                </li>
            </ul>
        </div>
        <div className="modal fade" id="alllikesofuser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content likelist">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">All Likes ({likelist.length})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {likelist.map((item)=>{
                            const user = users.filter((each)=>{return each._id === item.userid})
                            return user.length !== 0 && <div className='my-3' key={item._id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-2 d-flex justify-content-center align-items-center">
                                            <img className='img-fluid' src={user.length !== 0 && user[0].userimg} alt="" width="40px" style={{borderRadius:"20px"}}/>
                                        </div>
                                        <div className="col-6 d-flex justify-content-start align-items-center">
                                            <h4 className='fs-6 my-auto'>{user.length === 0? "":user[0].name}</h4>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <img className='img-fluid mx-2' src="https://img.icons8.com/flat-round/64/000000/good-quality--v1.png" alt='' style={{width:"24px",height:"24px"}}/>
                                        </div>
                                    </div>
                                </div>
                                {likelist.length > 1? <hr></hr>:''}
                            </div>
                        })}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
        </div>
        <Postcomment postcommentobj={postcommentobj} postidforlikelist={getlikelist}/>
        <div>
            {indpost.length !== 0 && (fr.length !== 0 || induser[0]._id === selfdata.myid) && indpost.slice(0).reverse().map((postitem)=>{
              // console.log(postitem)
              return <Postitem postitem={postitem} key={postitem._id} ondltpost={ondltpost} postidforlikelist={getlikelist} getpcobj={getpcobj} onsharepost={onsharepost}/>
              // if(fr.length !== 0 || induser[0]._id === selfdata.myid){
              //     return <Postitem postitem={postitem} key={postitem._id} ondltpost={ondltpost} postidforlikelist={getlikelist} getpcobj={getpcobj} onsharepost={onsharepost}/>
              // }
              // else{
              //   return <div className='d-flex justify-content-center align-items-center' style={{marginTop:"100px"}}><h6 className="m-0" style={{padding:"10px",border:"1px dotted purple"}}>Follow to see Posts</h6></div>
              // }
            })}
            {(fr.length === 0 && induser[0]._id !== selfdata.myid)?<div className="d-flex justify-content-center align-items-center" style={{marginTop:"100px"}}><h6 className="m-0" style={{padding:"10px",border:"1px dotted purple"}}>Follow to see Posts</h6></div>:<div className={`d-flex justify-content-center align-items-center ${indpost.length !== 0 && "d-none"}`} style={{marginTop:"100px"}}><h6 className="m-0" style={{padding:"10px",border:"1px dotted purple"}}>No Post Available</h6></div>}
        </div>
      </div>
    </>
  )
}

export default UserOwnPost
