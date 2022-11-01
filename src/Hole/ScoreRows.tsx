import React, { FC } from 'react'

const ScoreRows:FC<IScoreRowsProps> = (props) => {
    function totalScore(name: string) {
        var score = 0
        for(let i = 0; i < props.holeNumber+1; i++){
            let currentTable = props.playingTableArray[i]
            for(let j = 0; j < currentTable.length; j++){
                if(currentTable[j].Name === name){
                    score += currentTable[j].Score
                }
            }
        }
        return score
    }

    function returnRows() {
        return (
            props && props.playingTableArray[props.holeNumber] ?
            props.playingTableArray[props.holeNumber].map((Player: { Name: string; Score: number }) => {
                return (
                    <tr key={Player.Name}>
    
                        <td >
                            {Player.Name}
                        </td>
    
                        <td >
    
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div onClick={() => {props.decrementScore(Player.Name, Player.Score)}}  >-</div>
                                <div style={{ padding: '0 5px 0 5px' }}>{Player.Score}</div>
                                <div onClick={() => {props.incrementScore(Player.Name)}}>+</div>
                            </div>
    
                        </td>
                        <td>
                            {totalScore(Player.Name)}
                        </td>
    
                    </tr>
                )
            })
            : 
            ''
        )
    }
    
    return (
        <>
            {returnRows()}
        </>
    )
}

export interface IScoreRowsProps{
    incrementScore: any;
    decrementScore: any;
    playingTableArray: any;
    holeNumber: number;
}

export default ScoreRows