import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserPass:FC<IUserPassProps> = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    const navigate = useNavigate();

    const URL = `https://hypnos-dev-api.herokuapp.com`
    
    const onUsernameChangeHandler = (event :any)=> {
        setUsername(event.target.value);
    }

    const onPasswordChangeHandler = (event :any)=> {
        setPassword(event.target.value);
    }

    async function onClickHandler() {
        const response = await fetch(URL + `/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({"Username" : username, "Password" : password})
        });

        let responseText = await response.json()
        if(!responseText.auth){
            setLoginMessage(responseText.Failed)
        } else if(responseText.auth){
            localStorage.setItem("token", responseText.token)
            setLoginMessage(responseText.auth)
            navigate('/Dash', {state:{loggedIn: true}})
        }
    }

    // async function addNewuser() {
    //     const response = await fetch(URL + `/addUser`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    //     });

    //     let responseText = await response.json()
    //     console.log(responseText)
    // }

    return (
        <>
            {loginMessage && <h2 style={{"color":"orange",fontSize: "initial", margin: "0"}}>{loginMessage}</h2>}
            <input id='userpass' className='input' placeholder='USERNAME' onChange={onUsernameChangeHandler}></input>
            <input id='userpass' type='password' className='input' placeholder='PASSWORD' onChange={onPasswordChangeHandler}></input>
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