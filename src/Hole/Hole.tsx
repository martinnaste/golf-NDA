import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import LinkButton from '../LinkButton'
import '../App.css'
import './Hole.css'

const Hole: FC <IHoleProps> = (props) => {
   
    
    return props.players.map((player, index) => {    
        return (
            <tr  key={index}>
                
                <td >
                    {player.Name}
                </td>
                
            </tr>

        );
    });

    
    }


    export interface IHoleProps{
        players: IPlayer[]
        hole: any
    }

    export interface IPlayer {
        Name: string
        
    }
    
export default Hole;


