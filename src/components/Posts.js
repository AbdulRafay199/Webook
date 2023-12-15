import React, { useContext, useEffect,useState } from 'react'
import './Posts.css'
import './OnlineFriends.css'
import Postitem from './Postitem'
import { postcontext } from '../Context/Poststate'
import { usercontext } from '../Context/Userstate'
import { friendcontext } from '../Context/Friendstate'
import Postwithpicmodal from './Postwithpicmodal'
import Locations from './Locations'
import Postcomment from './Postcomment'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const {posts,fetchallpost,addpost,dltpost,locations,addindpost} = useContext(postcontext)
  const {getselfdetails,selfdata,users,fetchinduser} = useContext(usercontext)
  const {friends} = useContext(friendcontext)
  const [post,setpost] = useState({caption:"",loc:""});
  const [likelist,setlikelist] = useState([]);
  const [postcommentobj,setpostcommentobj] = useState({pcimg:"",pcpostid:""});
  const navigation = useNavigate();

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

  const textchangehandler = (e)=>{
    document.getElementById("locationitems").classList.remove("d-none");
    setpost({...post, [e.target.name] : e.target.value})
  }

  const onaddpost = (e)=>{
    e.preventDefault();
    addpost(post);
    setpost({caption: "",loc:""});
    fetchallpost();
  }
  const ondltpost = (postid)=>{
    dltpost(postid);
    fetchallpost();
  }
  const onsetloc = (location)=>{
    setpost({caption: post.caption,loc:location});
    document.getElementById("locationitems").classList.add("d-none");
  }

  useEffect(()=>{
    fetchallpost();
    getselfdetails();
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

  const getpcobj = (poimg,poid)=>{
    setpostcommentobj({pcimg:poimg,pcpostid:poid})
  }

  const navigatetoUserProfile = async ()=>{
    await addindpost(selfdata.myid);
    await fetchinduser(selfdata.myid);
    navigation(`/userProfile/${selfdata.myid}`)
  }
  
  return (
    <>
      <div className="container main">
        <div className="row outer">
            <div className="col-2 d-flex justify-content-center align-items-start">
            <img src={selfdata.myimg} alt="" width="40px" onClick={navigatetoUserProfile} style={{borderRadius:"20px",cursor:"pointer"}}/>
            </div>
            <div className="col-10">
              <form action="submit" onSubmit={onaddpost}>
                <textarea className="form-control postinput d-flex justify-content-center align-items-center" id="exampleFormControlTextarea1" rows="5" placeholder='What&apos;s in your mind' name='caption' value={post.caption} onChange={textchangehandler} required></textarea>            
                <div className="row mx-auto mt-2">
                    <div className="col-8 d-flex justify-content-start align-items-center flex-row position-relative">
                      <label htmlFor="loc" className='mx-2'>Location:</label>
                      <input className="form-control w-100" id='loc' name='loc' placeholder="(optional)" value={post.loc} onChange={textchangehandler}/>
                      <div className="container locations w-100 top-100 px-0" id='locationitems'>
                      {locations.slice(0).filter((location) => { return location.slice(0,post.loc.length).toLowerCase() === post.loc.toLowerCase() && post.loc.length !== 0}).map((locitem)=>{
                        return <Locations locitem={locitem} key={locitem} setloc={onsetloc}/>
                      })
                      }  
                      </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <button className="btn pobtn" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="https://img.icons8.com/3d-fluency/100/000000/camera.png" alt='' width="30px"/></button>
                        <Postwithpicmodal/>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                      <button className="btn pobtn" type='submit'><img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png" alt='' width="30px"/></button>
                    </div>
                </div>
              </form>
            </div>
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
                                            <img className='img-fluid mx-2' src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png" alt='' style={{width:"24px",height:"24px"}}/>
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
            {friends.length !== 0? posts.slice(0).reverse().map((postitem)=>{
              // console.log(postitem)
              return <Postitem postitem={postitem} key={postitem._id} ondltpost={ondltpost} postidforlikelist={getlikelist} getpcobj={getpcobj} onsharepost={onsharepost}/>
            })
            :<div className='d-flex justify-content-center align-items-center' style={{marginTop:"100px"}}><h6 className="m-0" style={{padding:"10px",border:"1px dotted purple"}}>Start Following People to see their Posts</h6></div>}  
        </div>

      </div>
    </>
  )
}

export default Posts
