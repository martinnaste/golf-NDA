import React, { FC } from 'react'

const StaticRows:FC<IStaticRow> = (props) => {

    //Loops through each playing Table array and sums score for one player
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

    //Creates a new playingTable where score = summed score
    function FinalTable() {
        //Copy an empty table to use as the final array
        var finalTable = JSON.parse(JSON.stringify(props.playingTableArray[0]))
       //For Each hole
        props.playingTableArray.forEach((playingTable: any)=>{
           //FOR EACH PLAYER
            for(let i = 0; i < finalTable.length; i++){
                //sum their score 
                finalTable[i].Score += playingTable[i].Score
            }
        })
    
        finalTable.sort((a: any, b: any) => a.Score - b.Score)
        return finalTable
    }

    function returnRows() {
       
       
        return (
            props && props.playingTableArray[props.holeNumber] ?
            FinalTable().map((Player: { Name: string; Score: number }, index: any) => {
                return (
                    <tr key={Player.Name}>
                        <td>
                            {index + 1}.
                        </td>
                        <td >
                            {Player.Name}
                        </td>

                        <td>
                            {Player.Score}
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

export interface IStaticRow{
    playingTableArray: any;
    holeNumber: number;
}

export default StaticRows