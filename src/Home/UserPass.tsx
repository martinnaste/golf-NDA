import React, { FC, useState } from 'react'

const UserPass:FC<IUserPassProps> = (props) => {
    const [username, setUsername] = useState("")

    const onchangeHandler=(event :any)=> {
        //same thing you do now
        setUsername(event.target.value);
        console.log("one behind here: ", username)
    }

    function onClickHandler() {
        console.log("SUBMIT BUTTON CLICKED: ")
        console.log("Not Behind: ", username)
    }
    return (
        <>
            <input id='username' className='input' placeholder='USERNAME' onChange={onchangeHandler}></input>
            <input id='password' className='input' placeholder='PASSWORD'></input>
            <div className='login-text-container' onClick={()=>{onClickHandler()}}>
                <h3 className='login-text'>Login</h3>
            </div>
        </>
    )
}

export interface IUserPassProps {
    username? :any
}

export default UserPass