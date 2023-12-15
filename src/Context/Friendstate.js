// import { useEffect } from "react";
import { createContext, useState } from "react";
const friendcontext = createContext();

const Friendstate = (props)=>{

    // const initfriends = []
    // "6346f00eebe3177c9d5392e0"
    const [friends,setfriends] = useState([])

    const fetchfriends = async ()=>{

        const url = "http://localhost:5000/friend/getfriend";
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': await localStorage.getItem("authtoken")
          },
        });
        const json = await response.json();
        setfriends(json) 
      }

      const addfriends = async (id)=>{

        const url = "http://localhost:5000/friend/addfriend";
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({friendid:id})
        });
        const json = await response.json();
        console.log(json)
        
      }

      const dltfriends = async (id)=>{

        const url = "http://localhost:5000/friend/deletefriend";
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({friendid:id})
        });
        const json = await response.json();
        console.log(json)
        
      }

      // useEffect(()=>{
      //   fetchfriends();
      // },[])

    return(
        <friendcontext.Provider value={{friends,setfriends,fetchfriends,addfriends,dltfriends}}>
            {props.children}
        </friendcontext.Provider>
    )
}

export default Friendstate;
export {friendcontext};