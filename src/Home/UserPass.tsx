import React, { FC, useState } from 'react'
import Button from '../Button'

const UserPass:FC<IUserPassProps> = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onUsernameChangeHandler = (event :any)=> {
        //same thing you do now
        setUsername(event.target.value);
        console.log("one behind here: ", username)
    }

    const onPasswordChangeHandler = (event :any)=> {
        //same thing you do now
        setPassword(event.target.value);
        console.log("one behind here: ", password)
    }

    function onClickHandler() {
        console.log("SUBMIT BUTTON CLICKED: ")
        console.log("Not Behind: ", username, " ", password)
    }

    return (
        <>
            <input id='userpass' className='input' placeholder='USERNAME' onChange={onUsernameChangeHandler}></input>
            <input id='userpass' className='input' placeholder='PASSWORD' onChange={onPasswordChangeHandler}></input>
            <div className='login-text-container' onClick={()=>{onClickHandler()}}>
                <h3 className='login-text'>Login</h3>
            </div>
            {/* <Button text="Login" onClick={()=>{onClickHandler()}} /> */}
        </>
    )
}

export interface IUserPassProps {
    username? :any
}

export default UserPass