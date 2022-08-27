import React, { FC } from 'react'
import { IPlayer } from '../PlayGame/PlayGame';

const ScoreRow:FC<IScoreRowProps> = (props) => {

    return (
        <>
            {players()}
        </>
    )

    function players( ){
        if(props.playerTable){
            return props.playerTable.map((player, index) => {    
                return (
                    <tr  key={index}>
                      
                        <td >
                            {player.Name}
                        </td>
                       
                         <td >
                            {player.Score}
                            <div style={{display:'flex', alignItems: 'center'}}>
                                <h4>-</h4>
                                <input type="number" style={{height:'10px', width: '30px', margin: '3px'}}></input>
                                <h4>+</h4>
                            </div>
                           
                          </td>
                        
                    </tr>
    
                );
            });
        }
    }

   
}

export interface IScoreRowProps{
    playerTable: IScorePlayer[]
    
}


export interface IScorePlayer {
    Name: string
    Score: number 
}
export default ScoreRow