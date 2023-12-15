import React from 'react'

const Locations = (props) => {
    const {locitem,setloc} = props;
  return (
    <>
    <div className="container d-flex justify-content-start align-items-start flex-row my-4 px-0">
        <button type='button' className="btn w-100 d-flex align-items-start" onClick={()=>{setloc(locitem)}}>
            <h6 className='m-0 text-start' style={{fontSize:"small"}}>{locitem}</h6>
        </button>
    </div> 
    </>
  )
}

export default Locations
