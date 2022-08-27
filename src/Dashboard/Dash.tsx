import { FC, useEffect, useState } from 'react'
import './Dash.css'
import '../App.css'
import './HistoryModal.css'
import Button from '../Button'
import LinkButton  from '../LinkButton'
import HistoryModal from './HistoryModal'
import PreviousGame from './PreviousGame'
import { useLocation, useParams } from 'react-router-dom'

const Dash: FC = () => {
    const [latestGame, setLatestGame] = useState<ILatestLeaderboardObj>()
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [latestGameSimple, setLatestGameSimple] = useState<ILatestLeaderboardSimpleObj>()
    const [latestGameDate, setLatestGameDate] = useState('')

    // const {myThing} = useParams()
    // console.log(myThing)

    const location: any = useLocation()
    const { myThing } = location.state
    

    useEffect(() => {
        getLatestLeaderboard()
    }, [])

    async function getLatestLeaderboard() {
        const response = await fetch(`http://localhost:5001/leaderboard/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const records = await response.json();
        setLatestGame(records[0]);
        var date = new Date(records[0].dateTime).toDateString()
        setLatestGameDate(date)
        console.log(records)
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
    }

    return (
        <div className='page'>

            <div style={{position:"absolute"}}>
                <LinkButton text='Back' redirect="/" />
            </div>

            {/* Previous Game HighScore Table */}
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop:"75px" }}>

                <p style={{ fontSize: "42px"}}> Previous game: </p>
                <p style={{ fontSize: "32px", width: "100%", textAlign: "center" }}>{latestGameDate}</p>

                <table style={{ width: "90%", marginTop:"25px" }}>
                    <tbody>
                        <tr style={{ textAlign: "left", fontSize: "24px" }}>
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
            <div style={{display: "flex",justifyContent: "center"}}>
                <Button text="History" onClick={showHistoryModalHandler} />
                { myThing &&
                    <LinkButton text="New Game" redirect={"../PlayGame"} />
                }
                {/* If Modal is visable (true) show it */}
                {showHistoryModal && <HistoryModal showHistoryModalHandler={showHistoryModalHandler}/>}

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