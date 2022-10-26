import { FC, useEffect, useState } from 'react'
import '../App.css'
import '../Button.css'
import './EndGame.css'

import { IPlayer } from '../PlayGame/PlayGame'
import Podium from './Podium'
import LinkButton from '../LinkButton'


const EndGame: FC<props> = (props) => {


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
                        <td> Players</td>
                        <td> total </td>
                    </tr>
                </tbody>
            </table>
        </div>
 
        <LinkButton text={"Go Home"} redirect="/" params={[]}/>

    </div>)




}

export interface props {
   
}

export default EndGame;



