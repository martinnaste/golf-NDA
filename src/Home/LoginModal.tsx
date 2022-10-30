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
                        <UserPass/>
                    </div>
                </div>
                <hr className='login-hr'></hr>
                <Connect />
            </div>
        </div>
    )
}

export interface ILoginProps {
    showLoginModalHandler: any
}

export default LoginModal