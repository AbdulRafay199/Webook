// import React, { useContext } from 'react'
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { usercontext } from '../Context/Userstate';


// const SignupBasicinfo = (props) => {

//     const {activestep} = props;
//     const {newuser, setnewuser} = useContext(usercontext)
//     const handleChange = (event) => {
//         // setAge(event.target.value);
//         setnewuser({...newuser, gender: event.target.value})
//         console.log(newuser)
//     };


//   return (
//     <div className={`container d-flex justify-content-center align-items-center my-5 w-100 ${activestep!==0 && 'd-none'} `}>
//             <div className="row gx-5" style={{padding:"15px",border:"1px dotted purple",boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px"}}>
//               <div className="col-8 d-flex flex-column">
//                 <TextField className='my-2 mx-2' id="standard-basic" label="Name" variant="standard" required/>
//                 <TextField className='my-2 mx-2' id="standard-basic" label="Email" variant="standard"/>
//                 <TextField className='my-2 mx-2' id="standard-basic" label="Password" variant="standard" type="password"/>
//                 <TextField className='my-2 mx-2' id="standard-basic" label="Confirm Password" variant="standard" type="password"/>                            
//               </div>
//               <div className="col-4 d-flex flex-column">
//                 <TextField className='my-2' id="standard-basic" label="Age" variant="standard" type="number"/>
//                 <FormControl sx={{ mt: 3, minWidth: 90 }}>
//                   <InputLabel id="demo-simple-select-autowidth-label" required>Gender</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-autowidth-label"
//                     id="demo-simple-select-autowidth"
//                     autoWidth
//                     value={newuser.gender}
//                     onChange={handleChange}
//                     label="Gender"
//                   >
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                   </Select>
//                 </FormControl>             
//               </div>
//             </div>
//           </div>
//   )
// }

// export default SignupBasicinfo
