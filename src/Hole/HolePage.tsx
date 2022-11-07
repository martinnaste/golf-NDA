import { isDisabled } from '@testing-library/user-event/dist/utils'
import React, { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LinkButton from '../LinkButton'
import { IPlayer } from "../PlayGame/PlayGame"
import ScoreRows from './ScoreRows'
import { socket } from '../index'

const pars = [2,2,3,2,3,3,5,3,6]

const HolePage:FC<IHolePageProps> = (props) => {
    const [holeNumber, setHoleNumber] = useState(props.hole)
    const [playingTableArray, setPlayingTableArray] = useState(props.playingTableArray)

    const location: any = useLocation();
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()

    // Function to update the server items for clients
    function sendUpdate(arr: any, holeNum: any) {
        socket.emit("update", {
            array: arr,
            holeNum: holeNum,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id
        })
    }

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
        sendUpdate(tempbigarr[holeNumber], holeNumber)
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
            sendUpdate(tempbigarr[holeNumber], holeNumber)
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
                {getButtons()}
            </div>
        </div>
    ) 

    function isNextHoleDisabled(){

        let disabled = false;
        playingTableArray[holeNumber].forEach((Player: IPlayer) => {
            if(Player.Score == 0){
                disabled = true
            }
        });
        
        return disabled
    }


    //Generates the button templates for back and next hole w/ disabled opacity functionality
    function generateButton(increment: number , text:String){

        if(increment == -1)
        {
            return <button className='button' style={{fontFamily: 'ThaLeah', border: 'none'}} onClick={() => {setHoleNumber(holeNumber + increment)}}>{text}</button>
        }
        else{
            return (<button className='button' style={{fontFamily: 'ThaLeah', border: 'none', opacity: (isNextHoleDisabled() ? "0.5" : 1)}} 
                    disabled={isNextHoleDisabled()}
                    onClick={() => {setHoleNumber(holeNumber + increment)}}>{text}</button>)
        }
        
    }

    //
    function getButtons() {
            return(
                <div  style={{display:"flex",width: '100%',justifyContent: 'space-between', flexDirection: "row-reverse"}}>
                    {holeNumber + 1 < 9?
                         generateButton(1,'Next Hole')
                    :
                    isNextHoleDisabled() ?
                          generateButton(1,'Next Hole')
                    :
                     <LinkButton  text='End Game...' redirect={'/EndGame'}  params={{state:{holeProps: {playingTable: playingTableArray, number: 0}}}}/>

                }
                    {holeNumber > 0 && 
                        generateButton(-1,'Back')
                    }
                </div>
            )
        }    
    }


export interface IHolePageProps {
    playingTableArray: [IPlayer[]]
    hole: number
}

export default HolePage