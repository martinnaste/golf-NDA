import React, {FC } from 'react'
import './Button.css'


const Button:FC<ButtonProps> = (props) => {
    return (
        <div> 
            <p className='button' onClick={props.onClick} style={props.style}>
                {props.text}
            </p>
        </div>
    )
}

export interface ButtonProps{
    text: string
    onClick: any
    style? : any
}

export default Button