import React, { FC, useRef, useState } from 'react'
import { IPlayer } from '../PlayGame/PlayGame';

const ScoreRow: FC<IScoreRowProps> = (props) => {

    const [score, setScore] = useState(0)


    return (

        
            <tr key={props.Name}>

                <td >
                    {props.Name}
                </td>

                <td >
                 
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div onClick={decereaseScore} >-</div>
                        <div style={{ padding: '0 5px 0 5px' }}>{score}</div>
                        <div onClick={(incrementScore)}>+</div>
                    </div>

                </td>
                <td>
                {props.TotalScore}

                </td>

            </tr>

       

    );
    
function incrementScore() {

    if (score < 10) {
        setScore(score + 1)
    }


}

function decereaseScore() {

    if (score > 0) {
        setScore(score - 1)
    }


}


}

export interface IScoreRowProps {
    Name: string
    TotalScore: number

}


export interface IScorePlayer {
    Name: string
    Score: number
}
export default ScoreRow