import React,{useContext,useRef,useState} from 'react'
import { postcontext } from '../Context/Poststate';
import Locations from './Locations';

const Postwithpicmodal = () => {
    const close = useRef();
    const {locations,addpost} = useContext(postcontext)
    const [post,setpost] = useState({caption:"",loc:""});
    const [filedata,setfiledata] = useState('');
    const [filepreview,setfilepreview] = useState('');

    const onchangefiledata = (e)=>{
        const file = e.target.files[0];
        setfiledata(file)
        previewfile(file);
    }
    const previewfile = (image)=>{
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = (r)=>{
            setfilepreview(r.target.result)
        }
        console.log(filepreview)
    }
    const addpostwithpic = ()=>{
        uploadimg(filepreview);
    }
    const uploadimg = (base64encodedimage)=>{
        console.log(base64encodedimage)
        addpost({caption: post.caption,loc:post.loc,img: base64encodedimage});
        setpost({caption:"",loc:""})
        document.getElementById('file').value = null;
        setfiledata('')
        setfilepreview('')
        close.current.click();
    }


    const onsetloc = (location)=>{
        setpost({caption: post.caption,loc:location});
        document.getElementById("locationitemspic").classList.add("d-none");
    }

    const textchangehandler = (e)=>{
        document.getElementById("locationitemspic").classList.remove("d-none");
        setpost({...post, [e.target.name] : e.target.value})
    }    

    return (
    <>
    <div className="modal" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* <form action='submit' onSubmit={addpostwithpic}> */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="col-form-label">Caption:</label>
                        <textarea className="form-control postinput d-flex justify-content-center align-items-center" id="exampleFormControlTextarea1" rows="5" placeholder='What&apos;s in your mind' name='caption' value={post.caption} onChange={textchangehandler}></textarea>            
                    </div>
                    <div className="col-8 d-flex justify-content-start align-items-center flex-row position-relative">
                        <label htmlFor="loc" className='mx-2'>Location:</label>
                        <input className="form-control w-100" id='loc' name='loc' placeholder="(optional)" value={post.loc} onChange={textchangehandler}/>
                        <div className="container locations w-100 top-100 px-0" id='locationitemspic'>
                        {locations.slice(0).filter((location) => { return location.slice(0,post.loc.length).toLowerCase() === post.loc.toLowerCase() && post.loc.length !== 0}).map((locitem)=>{
                            return <Locations locitem={locitem} key={locitem} setloc={onsetloc}/>
                        })
                        }  
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Upload Photo:</label>
                        <input type="file" className="form-control" id="file" filename={filedata} onChange={onchangefiledata}/>
                    </div>
                {/* </form> */}
                {previewfile && (<img className='img-fluid' src={filepreview} alt="" width="100px"/>)}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                <button type="button" className={`btn pobtn mx-3 ${filedata === '' && 'disabled'}`} onClick={addpostwithpic}><img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png" alt='' width="30px"/></button>
            </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Postwithpicmodal
