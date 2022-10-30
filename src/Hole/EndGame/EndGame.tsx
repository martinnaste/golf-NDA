import { FC, useEffect, useState } from 'react'
import '../../App.css'
import '../../Button.css'
import './EndGame.css'

import { IPlayer } from '../../PlayGame/PlayGame'
import Podium from './Podium'
import LinkButton from '../../LinkButton'
import { useLocation } from 'react-router-dom'
import StaticRows from './StaticRows'


const EndGame: FC = () => {
    const [uploadMessage, setUploadMessage] = useState('')

    const location: any = useLocation()
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()
    const holeProps = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.holeProps
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.holeProps
        }
    })() 

    //Creates a new playingTable where score = summed score
    function makeFinalTable() {
        //Copy an empty table to use as the final array
        var finalTable = JSON.parse(JSON.stringify(holeProps.playingTable[0]))
        finalTable.forEach((table: { Score: number }) => {
            table.Score = 0
        })
        //For Each hole
        holeProps.playingTable.forEach((playingTable: IPlayer[])=>{
            //FOR EACH PLAYER
            for(let i = 0; i < finalTable.length; i++){
                //sum their score 
                finalTable[i].Score += playingTable[i]?.Score
            }
        })
        finalTable.sort((a: any, b: any) => a.Score - b.Score)
        return finalTable
    }

    async function uploadLeaderboard(leaderboard: any) {
        const authed = await fetch(`http://localhost:5001/isUserAuth/`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token") || ''
            },
        }).then(async (response) => {
            return await response.json();
        }).catch((err) => {
            var message = `There was an error with your authentication: ${err}`
            alert(message);
        });

        if(authed.authed) {
            //Push player to database
            await fetch("http://localhost:5001/leaderboard/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Players: leaderboard})
            }).then((response) => {
                if(response.ok){
                    //Do these if successful
                    setUploadMessage("Successfully uploaded this game!")
                }
            }).catch(error => {
                window.alert(error);
                setUploadMessage("Error uploading this game :(")
                return;
            });
        } else {
            setUploadMessage("Error uploading this game :(")
        }
            
    }

    useEffect(() => {
        const finalTable = makeFinalTable()
        uploadLeaderboard(finalTable)
    }, [])

    return (
        <div className='page'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }} >
                <p className='title'>Winner!</p>
                <p className='title'>{makeFinalTable()[0].Name} : {makeFinalTable()[0].Score}</p>
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
                        <StaticRows finalTable={makeFinalTable()} /> 

                    </tbody>
                </table>
            </div>
    
            <LinkButton text={"Go Home"} redirect="/Dash" params={{state:{loggedIn: loggedIn}}}/>
            {uploadMessage && 
                <h4
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        fontSize: '24px',
                        color: 'antiquewhite'
                    }}
                >
                    {uploadMessage}
                </h4>
            }
        </div>
    )
}

export interface IEndGame {
    playingTableArray: [IPlayer[]]

}

export default EndGame;


