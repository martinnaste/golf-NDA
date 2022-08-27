import React, { FC } from 'react'
import Connect from './Connect'
import './LoginModal.css'
import UserPass from './UserPass';


const LoginModal:FC<ILoginProps> = (props) => {
    return (
        <div className='modal' onClick={props.showLoginModalHandler}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-login'>
                    <div className='login'>
                        {/* <input id='username' className='input' placeholder='USERNAME'></input>
                        <input id='password' className='input' placeholder='PASSWORD'></input> */}
                        <UserPass username={"test"}/>
                        {/* <div className='login-text-container'>
                            <h3 className='login-text'>Login</h3>
                        </div> */}
                    </div>
                </div>
                <hr className='login-hr'></hr>
                {/* f5861e */}
                {/* <h3 className='connect' >Connect Wallet</h3> */}
                <Connect />
            </div>
        </div>
    )
}

export interface ILoginProps {
    showLoginModalHandler: any
}

export default LoginModal