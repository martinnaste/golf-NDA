import { FC, useEffect, useState } from 'react'
import '../../App.css'
import '../../Button.css'
import './EndGame.css'

import { IPlayer } from '../../PlayGame/PlayGame'
import Podium from './Podium'
import LinkButton from '../../LinkButton'
import { useLocation } from 'react-router-dom'
import ScoreRows from '../ScoreRows'
import StaticRows from './StaticRows'


const EndGame: FC = () => {
    const location: any = useLocation()
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()
    const holeProps = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.holeProps
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.holeProps
        }
    })() 

    return (<div className='page'>
        
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }} >
            <p className='title'>Winner!</p>
            <p className='title'>Player: Score</p>
            <Podium First="Riley" Second = "martin" Third="Phil"></Podium>
        </div>

       

        <div className='playerTableDiv'>
            <table className='playerTable' style={{ width: "90%" }}>
                <tbody>
                    <tr>
                        <td> # </td>
                        <td> Player</td>
                        <td> total </td>
                        
                    </tr>
                    <StaticRows playingTableArray={holeProps.playingTable} holeNumber={8}  /> 

                </tbody>
            </table>
        </div>
 
        <LinkButton text={"Go Home"} redirect="/Dash" params={loggedIn}/>

    </div>)




}

export interface IEndGame {
    playingTableArray: [IPlayer[]]

}

export default EndGame;



