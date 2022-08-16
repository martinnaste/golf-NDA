import React, { FC, useState } from 'react'
import './LinkButton.css'
import { Link } from "react-router-dom";

const LinkButton:FC<LinkButton> = (props) => {
    return (
        <div className='linkButton'> 
            <Link  to={props.redirect} >
                {props.text}
            </Link>
        </div>
    )
}

export interface LinkButton{
    text: string
    redirect: any
}

export default LinkButton