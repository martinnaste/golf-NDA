import React, { FC, useState } from 'react'
import Button from '../Button'
import { IPlayer } from './PlayGame';
import './NewPlayerForm.css';

const NewPlayerForm:FC<INewPlayerFormProps> = (props) => {
    const [playerName, setPlayerName] = useState('');
    const [tempPlayerName, setTempPlayerName] = useState('');
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [nameExists, setNameExists] = useState(false);

    function onSubmit(){
        setTempPlayerName(playerName)
        const isMatch = props.allPlayers?.some((player) => {
            if(player.Name.toLowerCase() === playerName.toLowerCase()){
                return true
            } else {
                return false
            }
        })
        if(!isMatch){
            setNameExists(false)
            //Push New Player to db

            //Do these if successful
            setSuccessSubmit(true)
            props.playerAdded()
        } else if(isMatch) {
            setNameExists(true)
            setSuccessSubmit(false)
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
            {nameExists && <h2 style={{"color":"orange"}}>Name already exists, enter a different name</h2>}
            {successSubmit && <h2 style={{"color":"green"}}>Successfully submitted new player: {tempPlayerName}</h2>}
        </div>
    )
}

export interface INewPlayerFormProps {
    allPlayers: IPlayer[] | undefined;
    playerAdded: any;
}

export default NewPlayerForm