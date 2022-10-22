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
            <h4 className='button' onClick={showLoginModalHandler}>
                LOGIN
            </h4>
            |
            <div >
                <LinkButton text='Guest' redirect={"/Dash"} params={{state:{loggedIn: false}}}/>
            </div>
            {showLoginModal && <LoginModal showLoginModalHandler={showLoginModalHandler}/>}
        </div>
    )
}

export default HomeButtons