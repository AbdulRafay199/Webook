import {React,useContext, useRef, useState} from 'react'
import { usercontext } from '../Context/Userstate';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/Cropimage.js'

const Signupaddprofilepic = (props) => {

let inputref = useRef(null)
const {newuser, setnewuser} = useContext(usercontext);
const {activestep} = props;
let cropref = useRef(null)
const [imagesrc, setimagesrc] = useState(null);
const [croppedimgsrc, setcroppedimgsrc] = useState(null);
const [zoom,setzoom] = useState(1)
const [croppedArea,setcroppedArea] = useState()
const [crop,setcrop] = useState({x:0,y:0})


const inputHandle = ()=>{
  inputref.current.click();
}

const displayImage = (event)=>{
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', () => {
    setimagesrc(reader.result);
    document.getElementById("cropbtn").disabled = false;
    cropref.current.click();
  });
  
}

const cropcomplete = (croppedArea,croppedAreaPixels)=>{
  setcroppedArea(croppedAreaPixels)
}

const closecropper = ()=>{
  setcroppedimgsrc(null)
}



const getcroppedimg = async (image, croppedAreapx)=>{
  try {
    const crpimg = await getCroppedImg(image,croppedAreapx);
    setcroppedimgsrc(crpimg)
    const tempnewuser = {...newuser, userimg:crpimg}
    setnewuser(tempnewuser)
    console.log(newuser)
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div className={`container d-flex justify-content-center align-items-center my-5 flex-column ${activestep!==1 && 'd-none'} `}>
        <img src={croppedimgsrc !== null? croppedimgsrc:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} alt="" height="200px" width="200px" style={{borderRadius:"100px"}}/> 
        <input className="form-control form-control-sm d-none" id="formFileSm" type="file" ref={inputref} onChange={displayImage}></input>

        <div className="container d-flex justify-content-center align-items-center flex-row">
          <Button color="secondary" variant="outlined" sx={{m:1,mt:4}} onClick={closecropper}  id="rmvimg" disabled={croppedimgsrc?false:true}>
            <i className="bi bi-trash"></i>
          </Button>
          <Button color="secondary" variant="outlined" sx={{m:1,mt:4}} onClick={inputHandle}>Choose Profile Picture</Button>
          <Button color="secondary" variant="outlined" sx={{m:1,mt:4}} data-bs-toggle="modal" ref={cropref} id="cropbtn" data-bs-target="#exampleModal" disabled={croppedimgsrc?false:true}>
            <i className="bi bi-crop"></i>
          </Button>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Crop Profile Picture</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={{height:"60vh"}}>
                  <Cropper image={imagesrc} crop={crop} zoom={zoom} onCropChange={setcrop} onZoomChange={setzoom} onCropComplete={cropcomplete} aspect={1} style={{height:"70vh"}}/>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div className="container">
                   <Slider defaultValue={1} min={1} max={5} value={zoom} onChange={(e,zoom)=>{setzoom(zoom)}}/>
                </div>
                <div className="container d-flex flex-row">
                  <Button color="error" variant="outlined" sx={{m:1}} data-bs-dismiss="modal">Close</Button>
                  <Button color="success" variant="contained" size="small" sx={{m:1}} onClick={()=>{getcroppedimg(imagesrc,croppedArea)}} data-bs-dismiss="modal">Save changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Signupaddprofilepic
