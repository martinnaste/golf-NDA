import React, { useState } from 'react'
import './HomeButtons.css'
import LoginModal from './LoginModal';
import LinkButton from '../LinkButton';

const HomeButtons = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    function showLoginModalHandler() {
        setShowLoginModal(!showLoginModal);
    }

    return (
        <div className='buttons-container'>
            <div className='button' onClick={showLoginModalHandler}>
                LOGIN
            </div>
            
            <div >
                <LinkButton text='Guest' redirect={"/Dash"} params={{state:{loggedIn: false}}}/>
            </div>
            {showLoginModal && <LoginModal showLoginModalHandler={showLoginModalHandler}/>}
        </div>
    )
}

export default HomeButtons