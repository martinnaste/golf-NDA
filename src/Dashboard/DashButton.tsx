import React, { useState } from 'react'
import './DashButton.css'
import { Link } from "react-router-dom";


const DashButton = () => {

    function startNewGame() {
               
    }

    return (
        <div> 
            <h4 className='button' onClick={startNewGame}>
                Play Game
            </h4>
        </div>
    )
}

export default DashButton