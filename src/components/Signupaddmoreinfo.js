import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import { usercontext } from '../Context/Userstate';
import Button from '@mui/material/Button';


const Signupaddmoreinfo = (props) => {

    const {activestep} = props;
    const {newuser, setnewuser} = useContext(usercontext)
    const handleChange = (event) => {
        // setAge(event.target.value);
        setnewuser({...newuser, gender: event.target.value})
        console.log(newuser)
    };


  return (
    <div className={`container d-flex justify-content-center align-items-center my-5 ${activestep!==2 && 'd-none'} `}>
            <div className="row d-flex justify-content-center align-items-center" style={{padding:"15px",border:"1px dotted purple",boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px"}}>
                <TextField className='my-3' label="Profession" variant="standard"/>
                <TextField className='my-3 mx-2' label="Description" variant="standard"/>                           
                <Button sx={{my:4}} color="secondary" variant="outlined" onClick={handleChange}>SignUp</Button>                          
            </div>
          </div>
  )
}

export default Signupaddmoreinfo
