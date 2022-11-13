import React, { FC } from 'react'
import './LinkButton.css'
import { Link } from "react-router-dom";

const LinkButton:FC<ILinkButtonProps> = (props) => {
    return (
        // <div className='linkButton'> 
            <Link className='linkButton' to={props.redirect} state={{from: props.params}}  >
                {props.text}
            </Link>
        // </div>
    )
}

export interface ILinkButtonProps{
    text: string
    redirect: any
    params?: any
}

export default LinkButton