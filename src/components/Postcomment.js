import React,{useContext, useEffect,useState} from 'react'
import { usercontext } from '../Context/Userstate';
import Postcommentitem from './Postcommentitem';

const Postcomment = (props) => {
    const {postcommentobj,postidforlikelist} = props;

    const [alllikes,setalllikes] = useState([]);
    const [commentval,setcommentval] = useState("")
    const [allcomments,setallcomments] = useState([])
    const [replydetails,setreplydetails] = useState({usercommentid:"",commentid:"",status:false})
    const {users} = useContext(usercontext)
    const commentuser = users.filter((each)=>{return each._id === replydetails.usercommentid})


    const commentvalchange = (e)=>{
        setcommentval(e.target.value);
    }

    const setreplystatus = (usercommentid,commentid)=>{
        setreplydetails({usercommentid:usercommentid,commentid:commentid,status:true})
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
    
    const addcomment = async (pcpoid)=>{
        const url = `http://localhost:5000/comments/addcomment`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({postid:pcpoid,comment:commentval})
        });
        const json = await response.json();
        setallcomments(allcomments.concat(json))
        fetchcomment(postcommentobj.pcpostid);
        setcommentval("");
      }

    const addreply = async (usercoid,coid,pcpoid)=>{
        const url = `http://localhost:5000/comments//addreply/${pcpoid}`;
  
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({userid:usercoid,_id:coid,replies:{msg:commentval}})
        });
        const json = await response.json();
        console.log(json)
        fetchcomment(postcommentobj.pcpostid);
        setcommentval("");
      }

      const commentdecider = ()=>{
        if(replydetails.status === false){
            addcomment(postcommentobj.pcpostid)
        }
        else{
            addreply(replydetails.usercommentid,replydetails.commentid,postcommentobj.pcpostid);
            setreplydetails({usercommentid:"",commentid:"",status:false})
        }
      }

    const getalllikes = async (pcpoid)=>{
        const url = `http://localhost:5000/appreciation/getalllikes/${pcpoid}`;
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setalllikes(json)
      }

      const replystatusoff = ()=>{
        setreplydetails({usercommentid:"",commentid:"",status:false})
      }

      const likeoncommenthandler = (couserid,coid,isliked,setallcolike)=>{

        const addliketocomment = async (pcpoid)=>{
          const url = `http://localhost:5000/comments/addliketocomment/${pcpoid}`;
          
          const response = await fetch(url, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem("authtoken")
              },
              body: JSON.stringify({userid:couserid,_id:coid})
          });
          const json = await response.json();
          console.log(json)
        }

        // const showalllike = async (pcpoid)=>{
        //   const url = `hhttp://localhost:5000/comments/showlike/${pcpoid}`;
          
        //   const response = await fetch(url, {
        //       method: 'GET',
        //       headers: {
        //           'Content-Type': 'application/json',
        //           'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0YWI4NjE2NThhM2NkZTVlYzE1ZDc5In0sImlhdCI6MTY2NTkyMjA2OX0.KyW8-zIVCgXmpScvkEfvhpq7bYOPhZvEJUq1jDrPvN0"
        //       },
        //       body: JSON.stringify({userid:couserid,_id:coid})
        //   });
        //   const json = await response.json();
        //   setallcolike(json[0].likes)
        //   console.log(json)
        // }

        const dltlikefromcomment = async (pcpoid)=>{
          const url = `http://localhost:5000/comments/dltlikefromcomment/${pcpoid}`;
          
          const response = await fetch(url, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem("authtoken")
              },
              body: JSON.stringify({userid:couserid,_id:coid})
          });
          const json = await response.json();
          console.log(json)
        }

        if(isliked.length > 0){
          dltlikefromcomment(postcommentobj.pcpostid)
          // showalllike(postcommentobj.pcpostid)
          fetchcomment(postcommentobj.pcpostid)
        }
        else{
          addliketocomment(postcommentobj.pcpostid)
          // showalllike(postcommentobj.pcpostid)
          fetchcomment(postcommentobj.pcpostid)
        }
  
  
      }

      useEffect(()=>{
        if(postcommentobj.pcpostid){
          getalllikes(postcommentobj.pcpostid)
          fetchcomment(postcommentobj.pcpostid)
        }
        // eslint-disable-next-line
    },[postcommentobj.pcpostid])

  return (
    <>
    <div className="modal fade" id="postcomment" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-fullscreen outer-postcomment">
        <div className="modal-content" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-header" style={{border:"none"}}>
            <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row d-flex justify-content-center align-items-center">
                        {postcommentobj.pcimg !== "none" && <div className="col-6 d-flex justify-content-end align-items-center flex-column">
                            <img className='img-fluid' src={postcommentobj.pcimg} alt="" width="630px"/>
                            {alllikes.length > 0 && <div className='container d-flex justify-content-start align-items-center flex-row px-2 my-2'>
                                <button className='btn d-flex justify-content-center align-items-center flex-row p-0' data-bs-toggle="modal" data-bs-target="#alllikesofuser" onClick={()=>{postidforlikelist(postcommentobj.pcpostid)}}><img className='img-fluid mx-2' src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png" alt='' style={{width:"24px",height:"24px"}}/>
                                <p className='m-0' style={{fontSize:"smaller",color:"white"}}>{alllikes.length}</p></button>
                            </div>}
                        </div>}
                        <div className={postcommentobj.pcimg !== "none"? 'col-6':'col-12'}>
                            <div className='container outer-comments position-relative p-0'>
                                <h4 className='fs-5 text-center my-auto p-3'>Comments</h4>
                                <div className="inner-comments">
                                {allcomments.length > 0? allcomments.map((commentitem)=>{
                                    return <Postcommentitem commentitem={commentitem} setreplystatus={setreplystatus} fetchcomment={fetchcomment} likeoncommenthandler={likeoncommenthandler}/>
                                }): <h6 className="fs-6 text-center" style={{paddingTop:"50%", fontWeight:"lighter"}}>Be first to comment here</h6>}
                                </div>
                                <div className='container d-flex justify-content-center align-items-center flex-column position-absolute' style={{bottom:"15px", backgroundColor:"white"}}>
                                    {replydetails.status === true && <div className='container row d-flex justify-content-center align-items-center' style={{width:"400px",backgroundColor:"rgba(86,29,94,0.1)"}}>
                                        <div className="col-2 d-flex justify-content-start align-items-center p-0">
                                            <button type="button" className="btn-close btn-close-sm" id='replystatusbtn' data-bs-dismiss="#replystatusbtn" aria-label="Close" onClick={replystatusoff}></button>
                                        </div>
                                        <div className="col-10 d-flex justify-content-start align-items-center">
                                            <h6 className='fs-6 text-center my-2 mx-2' style={{fontSize:"smaller",fontWeight:"lighter"}}>Replying to <b>{commentuser[0].name}</b></h6>
                                        </div>
                                    </div>}
                                    <div className='d-flex justify-content-center align-items-center flex-row my-2'>
                                        <input className="form-control form-control-sm mx-3" type="text" placeholder="Type your comment" value={commentval} onChange={commentvalchange} aria-label="default input example" style={{width:"300px"}}/>
                                        <button className="btn pobtn" type='btn' onClick={commentdecider}><img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png" alt='' width="30px"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
      
    </>
  )
}

export default Postcomment
