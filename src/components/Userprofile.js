import {React} from 'react'
import UserOwnPost from './UserOwnPost'

const Userprofile = () => {

    
  return (
    <div className='container-fluid'>
        <div className="row justify-content-center my-4">
            <div className="col-6 col-lg-6 col-md-6 col-sm-12 col-xxl-6 d-flex justify-content-center">
                <UserOwnPost/>
            </div>
        </div>
      </div>
  )
}

export default Userprofile
