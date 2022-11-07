import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '../Button'
import LinkButton from '../LinkButton'
import PlayerRow from './PlayerRow'
import NewPlayer from './NewPlayerModal'

import '../App.css'
import './PlayGame.css'


export interface ScoreTable {
    playerName: string,
    score: number
}

const PlayGame: FC = () => {
    const [newPlayerModal, setShowNewPlayerModal] = useState(false);
    const [playerAdded, setPlayerAdded] = useState(false);
    const [allPlayers, setAllPlayers]= useState<IPlayer[]>()
    const [playerTable, setPlayerTable]= useState<IPlayer[]>()
    const [playingTable, setPlayingTable]= useState<IPlayer[]>()
    var URL ='http://'+ window.location.hostname+':5001'
    useEffect(() => {
        getAllPlayers()
    }, [])
    
    const location: any = useLocation();
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()

    return (
        <>
        {loggedIn ?
            <div className='page'>
                <div style={{ position: "absolute" }}>
                    <LinkButton text='Back' redirect="../Dash" params={{state:{loggedIn: loggedIn}}}/>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "75px" }}>
                    <p style={{ fontSize: "42px" }}> New game! </p>
                    <p style={{ fontSize: "30px", width: "100%", textAlign: "center" }}>Select Players</p>

                    <div className='playerTableDiv'>

                        <table className='playerTable' style={{ width: "90%", marginTop: "25px", marginLeft: '15px' }}>
                            <tbody>
                                <tr style={{ textAlign: "left", fontSize: "24px" }} >
                                    <td >
                                        Players
                                    </td>
                                </tr>

                                {playerTable && <PlayerRow playerTable={playerTable} movePlayer={(e: any, l: any)=> movePlayer(e, l)} left={true}/>}
                            </tbody>
                        </table>

                        <table className='playerTable' style={{ width: "90%", marginTop: "25px", marginRight: '15px' }}>
                            <tbody>
                                <tr style={{ textAlign: "left", fontSize: "24px" }}>
                                    <td>
                                        Name
                                    </td>
                                </tr>
                                {playingTable && <PlayerRow playerTable={playingTable} movePlayer={(e: any, l: any)=> movePlayer(e, l)} left={false}/>}
                            </tbody>
                        </table>
                    </div>
                    <div style={{display:'flex'}}>
                        <Button text='New Player' onClick={() => {showNewPlayerModalHandler()}}></Button>
                        {newPlayerModal && <NewPlayer allPlayers={allPlayers} showNewPlayerModal={showNewPlayerModalHandler} playerAdded={playerWasAdded}/>}
                        {
                            playingTable && playingTable.length > 0 ?
                            <LinkButton text="Play!" redirect="/Hole" params={{state:{holeProps: {playingTable: playingTable, number: 0}, loggedIn: loggedIn}}}/>
                            :
                            <LinkButton text="Play!" redirect="/PlayGame" params={{state:{loggedIn: loggedIn}}}/>
                        }
                    </div>
                </div>
            </div>
            : 
            <div className='page'>
                <div style={{height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{ fontSize: "30px", width: "100%", textAlign: "center" }}>Foolish of you to think you could do a shifty</p>
                    <div >
                        <LinkButton text='Home' redirect="/" />
                    </div>   
                </div>
            </div>
        }
        </>
    )

    async function getAllPlayers() {
        const response = await fetch(URL + `/players/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const players: IPlayer[] = await response.json();
        players.sort((a: any, b: any) => a.Name - b.Name)
        players.forEach(player =>{
            player.Score = 0;
        });
        setAllPlayers(players);
        setPlayerTable(players);
    }


    function movePlayer(player: IPlayer, left: boolean) {
        var tempPlayerTable: IPlayer[]
        var tempPlayerIndex: number
        var tempPlayingTable: IPlayer[]
        var tempPlayingIndex: number
        if(left){
            tempPlayerTable = playerTable ? playerTable : []
            tempPlayerIndex = tempPlayerTable.indexOf(player)
            tempPlayerTable.splice(tempPlayerIndex,1)
            setPlayerTable([...tempPlayerTable])

            tempPlayingTable = playingTable ? playingTable : []
            tempPlayingTable.push(player)
            setPlayingTable([...tempPlayingTable])
        } else if(!left){
            tempPlayingTable = playingTable ? playingTable : []
            tempPlayingIndex= tempPlayingTable.indexOf(player)
            tempPlayingTable.splice(tempPlayingIndex, 1)
            setPlayingTable([...tempPlayingTable])

            tempPlayerTable = playerTable ? playerTable : []
            tempPlayerTable.push(player);
            setPlayerTable([...tempPlayerTable])
        }   
    }

    function showNewPlayerModalHandler() {
        if(newPlayerModal && playerAdded){
            getAllPlayers()
            setPlayerAdded(false)
        }
        setShowNewPlayerModal(!newPlayerModal);
    }

    function playerWasAdded() {
        setPlayerAdded(true)
    }
}

export interface IPlayer {
    Name: string
    Score: number
}

export default PlayGame


