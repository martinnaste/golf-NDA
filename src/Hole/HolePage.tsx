import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPlayer } from "../PlayGame/PlayGame"
import ScoreRows from './ScoreRows'

const pars = [2,2,3,2,3,3,5,3,6]

const HolePage:FC<IHolePageProps> = (props) => {
    const [holeNumber, setHoleNumber] = useState(props.hole)
    const [playingTableArray, setPlayingTableArray] = useState(props.playingTableArray)

    function incrementScore(name: string){
        var newScoreTable: any[] = []
        playingTableArray[holeNumber].forEach((Player: IPlayer) => {
            var player = JSON.parse(JSON.stringify(Player))
            newScoreTable.push(player)
            if(Player.Name === name){
                player.Score += 1
            }
        })
        var tempbigarr = JSON.parse(JSON.stringify(playingTableArray))
        tempbigarr[holeNumber] = newScoreTable
        setPlayingTableArray(tempbigarr)
    }

    function decrementScore(name: string, score: number){
        if(score !== 0){
            var newScoreTable: any[] = []
            playingTableArray[holeNumber].forEach((Player: IPlayer) => {
                var player = JSON.parse(JSON.stringify(Player))
                newScoreTable.push(player)
                if(Player.Name === name){
                    player.Score -= 1
                }
            })
            var tempbigarr = JSON.parse(JSON.stringify(playingTableArray))
            tempbigarr[holeNumber] = newScoreTable
            setPlayingTableArray(tempbigarr)
        }
    }

    return (
        <div className='page'>
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }} 
            >
                <p className='title'>Hole Number: {holeNumber+1} </p>
                <p className='title'>Par: {pars[holeNumber]} </p>
                <img src={require(('../Images/' + (holeNumber+1) +  '.png')) } className="holeImg" alt={`Hole Number ${holeNumber+1}`}/>
                <div className='playerTableDiv'>
                    <table className='playerTable' style={{ width: "90%" }}>
                        <tbody>
                            <tr style={{ textAlign: "left", fontSize: "24px" }} >

                                <td >
                                    Players
                                </td>
                                <td>
                                    Score
                                </td>
                                <td>
                                    total
                                </td>
                            </tr>
                            <ScoreRows playingTableArray={playingTableArray} holeNumber={holeNumber} incrementScore={incrementScore} decrementScore={decrementScore} />
                        </tbody>
                    </table>
                </div>
                {getNextHoleButton()}
            </div>
        </div>
    ) 

    function getNextHoleButton() {
        if(holeNumber < 9){
            return(
                <div 
                    style={{
                        display:"flex",
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: "row-reverse"
                    }}
                >
                    <div className='button' onClick={()=>{setHoleNumber(holeNumber+1)}}>
                        Next Hole 
                    </div>
                    {holeNumber > 0 && 
                        <div className='button' onClick={()=>{setHoleNumber(holeNumber-1)}}>
                            Back
                        </div>
                    }
                </div>
            )
        } else{
            return(<Link className='button' to={"/"} state={{ holeProps: { playingTable: props.playingTableArray, number: holeNumber + 1 } }}> End Game </Link> )
        }

            
    
    }
}

export interface IHolePageProps {
    playingTableArray: [IPlayer[]]
    hole: number
}

export default HolePage