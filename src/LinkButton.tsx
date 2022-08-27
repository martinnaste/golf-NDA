import React, { FC, useState } from 'react'
import './LinkButton.css'
import { Link } from "react-router-dom";

const LinkButton:FC<LinkButton> = (props) => {

    // console.log("HERE" + props.params)
    return (
       

        <div className='linkButton'> 
            <Link  to={props.redirect} state={{from: props.params}}  >
                {props.text}
            </Link>
        </div>
    )
}

export interface LinkButton{
    text: string
    redirect: any
    params?: any
}

export default LinkButton