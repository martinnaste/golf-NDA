import { FC, useEffect, useState } from 'react'
import './Dash.css'
import '../App.css'
import './HistoryModal.css'
import Button from '../Button'
import LinkButton  from '../LinkButton'
import HistoryModal from './HistoryModal'
import PreviousGame from './PreviousGame'
import { useLocation } from 'react-router-dom'




const Dash: FC = () => {
    const [loading, setLoading] = useState(true);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [latestGameSimple, setLatestGameSimple] = useState<ILatestLeaderboardSimpleObj>()
    const [latestGameDate, setLatestGameDate] = useState('')

    const URL = `https://hypnos-dev-api.herokuapp.com`
    
    useEffect(() => {
        getLatestLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const location: any = useLocation();
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()
    const guest = !loggedIn

    async function getLatestLeaderboard() {
        const response = await fetch(URL + `/leaderboard/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const records = await response.json();
        var date = new Date(records[0].dateTime).toDateString()
        setLatestGameDate(date)
        var sortedPlayers = records[0].Players.sort((a: any, b: any) => a.Score - b.Score)
        var filtered: ISimplePlayersObj[] = []
        sortedPlayers.forEach((player: any) => {
            var filteredPLayer = {
                Name: player.Name,
                Score: player.Score
            }
            filtered.push(filteredPLayer)
        })
        var filteredLeaderboard: ILatestLeaderboardSimpleObj = {
            Players: filtered
        }
        setLatestGameSimple(filteredLeaderboard)
        setLoading(false);
    }



    return (
        
        <div className='page'>

            <div style={{position:"absolute"}}>
                <LinkButton text='Back' redirect="/" />
            </div>

            <div  style={{ paddingTop:"85px" }}>
                {loading ?  
                    <div style={{width:"100%",display:"flex", flexDirection: 'column', alignItems:"center"}}>
                        <img src={require('../Images/loadingPrimary.svg').default} alt='mySvgImage'  />
                    </div>
                    :
                    <>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        {/* Previous Game HighScore Table */}
                        <p className='fadein' style={{ fontSize: "42px"}}> Previous game: </p>
                        <p className='fadein' style={{ fontSize: "32px", width: "100%", textAlign: "center" }}>{latestGameDate}</p>
                            <table className='fadein' style={{ width: "90%", marginTop:"25px"}}>
                                <tbody>
                                    <tr style={{ textAlign: "left", fontSize: "24px" }}>
                                        <td>
                                            #
                                        </td>
                                        <td >
                                            Name
                                        </td>
                                        <td>
                                            Score
                                        </td>
                                    </tr>
                                    {latestGameSimple &&
                                        <PreviousGame leaderboard={latestGameSimple} />
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* Buttons */}
                        <div className='fadein' style={{display: "flex",justifyContent: "center"}}>
                            <Button text="History" onClick={showHistoryModalHandler}  />
                            { loggedIn &&
                                <LinkButton text="Play" redirect={"../PlayGame"} params={{state:{loggedIn: loggedIn}}}/>
                            }
                            { guest && 
                                <LinkButton text="Watch" redirect={"../Watch"}/>
                            }
                            {/* If Modal is visable (true) show it */}
                            {showHistoryModal && <HistoryModal showHistoryModalHandler={showHistoryModalHandler}/>}
                        </div>
                    </>
                }
            </div>
        </div>
    )

    function showHistoryModalHandler() {
        setShowHistoryModal(!showHistoryModal);
    }
}

export interface ILatestLeaderboardSimpleObj {
    Players: ISimplePlayersObj[]
}

export interface ISimplePlayersObj {
    Name: string,
    Score: string
}

export interface ILatestLeaderboardObj {
    Players: ILastestLeaderboardPlayerObj[],
    dateTime: string
}

export interface ILastestLeaderboardPlayerObj {
    Name: string,
    Player_Id: string,
    Score: string
}

export default Dash