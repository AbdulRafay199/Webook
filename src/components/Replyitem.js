import React,{useContext,useEffect} from 'react'
import { usercontext } from '../Context/Userstate';

const Replyitem = (props) => {
    const {users,fetchalluser} = useContext(usercontext)
    const {replyitem} = props;
    const replyuser = users.filter((each)=>{return each._id === replyitem.id})

    useEffect(()=>{
        fetchalluser();
        // eslint-disable-next-line
    },[])
  return (
    <>
    <div className="container d-flex justify-content-start align-items-start flex-row my-2 p-0" style={{marginLeft:"20%"}}>
        <img className='img-fluid mx-2' src={replyuser[0].userimg} alt="" width="30px" style={{borderRadius:"15px"}}/>
        <div className='d-flex justify-content-start align-items-center flex-column'>
            <div className='container m-0' style={{width:"220px",backgroundColor:"rgb(241, 241, 241)",borderRadius:"15px"}}>
                <p className='mt-2 mb-0' style={{fontSize:"smaller",fontWeight:"bold"}}>{replyuser[0].name}</p>
                <p className='mb-1 p-0' style={{fontSize:"smaller"}}>{replyitem.msg}</p>
            </div>
            <div className='container d-flex justify-content-start align-items-center flex-row my-1'>
                <button className="btn p-0 m-0" style={{fontSize:"smaller"}}>like</button>
                {/* <button className="btn p-0 m-0 mx-3" style={{fontSize:"smaller"}}>Reply</button> */}
                <div className='d-flex justify-content-end align-items-center flex-row' style={{marginLeft:"120px"}}>
                    <p className="text-center p-0 m-0" style={{fontSize:"smaller"}}>15</p>
                    <img className='img-fluid mx-1' src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png" alt='' style={{width:"16px",height: "16px",borderRadius: "8px"}}/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Replyitem
