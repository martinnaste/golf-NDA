import React, { useState } from 'react'
import './HomeButtons.css'
import LoginModal from './LoginModal';
import { Link } from "react-router-dom";


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
            <h4 className='button' >
                {/* THIS GOTTA GET CHANGED */}
                <Link to="/Dash" state={{loggedIn: true}}> GUEST </Link>
                {/* <Link to="/Dash" state={{myThing: "yeehaw"}}> GUEST </Link> */}
            </h4>
            {showLoginModal && <LoginModal showLoginModalHandler={showLoginModalHandler}/>}
        </div>
    )
}

export default HomeButtons