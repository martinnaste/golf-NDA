import React, { FC, useState } from 'react'
// import { useLocation } from 'react-router-dom'
import LinkButton from '../LinkButton'
import { IPlayer } from "../PlayGame/PlayGame"
import ScoreRows from './ScoreRows'
import { socket } from '../index'

const pars = [2,2,3,2,3,3,5,3,6]

const HolePage:FC<IHolePageProps> = (props) => {
    const [holeNumber, setHoleNumber] = useState(props.hole)
    const [playingTableArray, setPlayingTableArray] = useState(props.playingTableArray)

    // const location: any = useLocation();
    // const loggedIn = (() => {
    //     if(typeof location.state?.loggedIn === 'boolean'){
    //         return location.state?.loggedIn
    //     } else if(typeof location.state?.from === 'object'){
    //         return location.state?.from.state.loggedIn
    //     }
    // })()

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
                    alignItems: 'center'
                    
                }} 
            >
                <p className='title'>Hole Number: {holeNumber+1} </p>
                <p className='title'>Par: {pars[holeNumber]} </p>
                <div className='holeImg'><img src={require(('../Images/' + (holeNumber+1) +  '.png')) } style={{width:"90%"}} alt={`Hole Number ${holeNumber+1}`}/></div>
                <div className='playerTableDiv'>
                    <table className='playerTable' style={{ width: "90%" }}>
                        <tbody>
                            <tr style={{ textAlign: "left", fontSize: "24px" }} >
                                <td style={{paddingRight: '12px',textDecoration:"underline 3px solid" }} >
                                    Players
                                </td>
                                <td style={{paddingRight: '12px',textDecoration:"underline 3px solid"}}>
                                    Score
                                </td>
                                <td style={{textDecoration:"underline 3px solid"}}>
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
            if(Player.Score === 0){
                disabled = true
            }
        });
        console.log(disabled)
        
        return disabled
        //return false //TESTING
    }

    //Generates the button templates for back and next hole w/ disabled opacity functionality
    function generateButton(increment: number , text:string){
        let disabled = false;

        //Dont Run on Back button
        if(text !== "Back"){
            disabled = isNextHoleDisabled();
        }
        
        let styling = {'fontFamily': 'ThaLeah', 'border': 'none', 'opacity':'1'}
        //Set opacity to half on disabled buttons
        if(disabled){
            styling = {'fontFamily': 'ThaLeah', 'border': 'none','opacity':'0.5'}
        }
        
        return (
            <button 
                className='button' style={styling}
                disabled={disabled} 
                onClick={() => {
                    sendUpdate(playingTableArray[holeNumber+increment], holeNumber+increment)
                    setHoleNumber(holeNumber + increment)
                }}
            >
                {text}
            </button>
        )
    }

    function getButtons() {
        return(
            <div  style={{display:"flex",width: '100%',justifyContent: 'space-between', flexDirection: "row-reverse", maxWidth:"650px"}}>
                {holeNumber + 1 < 9 ?
                    generateButton(1,'Next Hole')
                    :
                    isNextHoleDisabled() ?
                    generateButton(1,'Next Hole')
                    :
                    <LinkButton  text='End Game...' redirect={'/EndGame'}  params={{state:{holeProps: {playingTable: playingTableArray, number: 0}}}}/>
                }
                {holeNumber > 0 && generateButton(-1, "Back")}
            </div>
        )
    }
}


export interface IHolePageProps {
    playingTableArray: [IPlayer[]]
    hole: number
}

export default HolePage