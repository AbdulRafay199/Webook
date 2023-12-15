import React from 'react'
import './OnlineFriends.css'

const OFitems = () => {
  return (
    <>
    <div className="container ofitem d-flex justify-content-center align-items-center flex-row my-3">
        <img className='img-fluid' src="https://img.icons8.com/office/40/000000/circled-user-male-skin-type-4.png" alt="" width="24px"/>
        <h4 className='fs-6 text-center mx-3 my-3'>Abdul Rafay</h4>
        <div className="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div> 
    </>
  )
}

export default OFitems
