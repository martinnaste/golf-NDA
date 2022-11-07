import React, { FC, useState } from 'react'
import Button from '../Button'
import { IPlayer } from './PlayGame';
import './NewPlayerForm.css';
const URL = `http://${window.location.hostname}:5001`


const NewPlayerForm:FC<INewPlayerFormProps> = (props) => {
    const [playerName, setPlayerName] = useState('');
    const [tempPlayerName, setTempPlayerName] = useState('');
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [nameExists, setNameExists] = useState(false);
    const [emptyName, setEmptyName] = useState(false);
    const [authError, setAuthError] = useState('');
    const [addedPlayersList, setAddedPlayersList] = useState([''])
    var URL ='http://'+ window.location.hostname+':5001'

    async function onSubmit(){
        setTempPlayerName(playerName)
        const isMatch = props.allPlayers?.some((player) => {
            if(player.Name.toLowerCase() === playerName.toLowerCase()){
                return true
            } else {
                return false
            }
        })
        const isEmpty = (() => {
            if(playerName.length === 0){
                return true;
            } else {
                return false;
            }
        })()

        if(isEmpty) {
            setEmptyName(true)
            setNameExists(false)
        } else {
            setEmptyName(false)
        }

        const exists = addedPlayersList.some((name) => {
            if(name.toLowerCase() === playerName.toLowerCase()){
                return true;
            } else {
                return false;
            }
        })

        if(!isMatch && !isEmpty && !exists){
            setNameExists(false)
            //Auth
            const authed = await fetch(URL + `/isUserAuth/`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("token") || ''
                },
            }).then(async (response) => {
                return await response.json();
            }).catch((err) => {
                var message = `There was an error with your authentication: ${err}`
                alert(message);
            });

            if(authed.authed) {
                //Push player to database
                await fetch(URL + "/players/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({Name: playerName})
                }).then((response) => {
                    if(response.ok){
                        //Do these if successful
                        setSuccessSubmit(true)
                        props.playerAdded()
                        var tempAddedPlayersList = addedPlayersList
                        tempAddedPlayersList.push(playerName)
                        setAddedPlayersList(tempAddedPlayersList)
                    }
                }).catch(error => {
                    window.alert(error);
                    return;
                });
            } else {
                setAuthError(authed.message)
            }
        } else if(isMatch) {
            setNameExists(true)
            setEmptyName(false)
            setSuccessSubmit(false)
            setAuthError('')
        }
    }

    function inputHandler(e: any) {
        if(e.target.value.length === 0){
            setSuccessSubmit(false)
        }
        setPlayerName(e.target.value)
    }

    return (
        <div className='newPlayerContainer'>
            <h2>Insert New Player Name</h2>
            <input
                className='input'
                name='PlayerName'
                type='text'
                placeholder='Jimmy Neutron'
                onChange={(e)=> {inputHandler(e)}}
            />
            <Button text='Submit' onClick={() => {onSubmit()}}/>
            <br></br>
            {authError && <h2 style={{"color": "orange"}}>{authError}</h2>}
            {nameExists && <h2 style={{"color":"orange"}}>Name already exists, enter a different name</h2>}
            {emptyName && <h2 style={{"color":"orange"}}>Empty names not accepted</h2>}
            {successSubmit && <h2 style={{"color":"green"}}>Successfully submitted new player: {tempPlayerName}</h2>}
        </div>
    )
}

export interface INewPlayerFormProps {
    allPlayers: IPlayer[] | undefined;
    playerAdded: any;
}

export default NewPlayerForm