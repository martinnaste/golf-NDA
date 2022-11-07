import React, { FC } from 'react'
import Podium from '../Hole/EndGame/Podium'
import StaticRows from '../Hole/EndGame/StaticRows'
import LinkButton from '../LinkButton'

const WatchEndGame:FC<IWatchEndGameProps> = (props) => {
    return (
        <div className='page'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }} >
                <p className='title'>Winner!</p>
                <p className='title'>{props.finalTable[0].Name} : {props.finalTable[0].Score}</p>
                <Podium First="Riley" Second = "Martin" Third="Phil"></Podium>
            </div>

            <div className='playerTableDiv'>
                <table className='playerTable' style={{ width: "90%" }}>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td>Player</td>
                            <td>Total</td>
                        </tr>
                        <StaticRows finalTable={props.finalTable} /> 

                    </tbody>
                </table>
            </div>
    
            <LinkButton text={"Go Home"} redirect="/Dash" />
        </div>
    )
}

export interface IWatchEndGameProps {
    finalTable: any;
}

export default WatchEndGame