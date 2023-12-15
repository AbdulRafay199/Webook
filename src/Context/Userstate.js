// import { useEffect } from "react";
import { createContext, useState } from "react";
const usercontext = createContext();

const Userstate = (props)=>{

    const initusers = []
    const initnewuser = {
      name:"",
      gender:"",
      age:"",
      email:"",
      password:"",
      username:"",
      userimg:""
    }
    const [users,setusers] = useState(initusers)
    const [selfdata,setselfdata] = useState({myid:"",myimg:"https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png"})
    const [newuser, setnewuser] = useState(initnewuser)

    const fetchalluser = async ()=>{

      const url = "http://localhost:5000/user/getalluser";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      setusers(json)
      
    }

    const getselfdetails = async ()=>{
      const url = "http://localhost:5000/user/getuser";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authtoken")
        },
      });
      const json = await response.json();
      setselfdata({myid:json._id,myimg:json.userimg})
    }

    const [induser,setinduser] = useState([])
    const fetchinduser = async (userid)=>{

      const url = `http://localhost:5000/user/getinduser/${userid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      setinduser(json)
      localStorage.setItem("induser",JSON.stringify(induser))
    }

    // useEffect(()=>{
    //     console.log(induser)
    //     // eslint-disable-next-line
    // },induser)
    

    return(
        <usercontext.Provider value={{users,setusers,fetchalluser,selfdata,getselfdetails,fetchinduser,induser,newuser,setnewuser}}>
            {props.children}
        </usercontext.Provider>
    )
}

export default Userstate;
export {usercontext};