import React, {FC, useState } from 'react'
import './Button.css'
import { Link } from "react-router-dom";


const Button:FC<ButtonProps> = (props) => {
    return (
        <div> 
            <p className='button' onClick={props.onClick}>
                {props.text}

             
               
               
            </p>
        </div>
    )
}

export interface ButtonProps{
    text: string
    onClick: any 
}

export default Button