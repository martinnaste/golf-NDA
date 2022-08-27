import React, { FC } from 'react'
import { IPlayer } from './PlayGame'

const PlayerRow:FC<IPlayerRowProps> = (props) => {

    function players( ){
        if(props.playerTable){
            return props.playerTable.map((player, index) => {    
                return (
                    <tr  key={index}>
                        { !props.left &&
                            <td  onClick={()=> {props.movePlayer(player, props.left)}}>
                                -
                            </td>
                        }
                        <td >
                            {player.Name}
                        </td>
                        { props.left &&
                            <td onClick={()=> {props.movePlayer(player, props.left)}}>
                                +
                            </td>
                        }
                    </tr>
    
                );
            });
        }
    }

    return (
        <>
            {players()}
        </>
    )
}

export interface IPlayerRowProps{
    playerTable: IPlayer[]
    movePlayer: any
    left: boolean
}

export default PlayerRow