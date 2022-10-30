import React, { FC, useEffect, useState } from 'react'
import Button from '../Button'
import './HistoryModal.css'
import PreviousGame from './PreviousGame'


const LoginModal: FC<IHistoryProps> = (props) => {
    const [allLeaderboards, setAllLeaderboards] = useState<ILeaderboardObj[]>()
    const [selectedLeaderboard, setSelectedLeaderboard] = useState<ILeaderboardObj>()
    const [gameSelected, setGameSelected] = useState(-1)

    useEffect(() => {
        getAllLeaderboards()
    }, [])

    async function getAllLeaderboards() {
        const response = await fetch(`http://localhost:5001/leaderboards/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const records = await response.json();
        for(let i = 0; i < records.length; i++){
            records[i].Players.sort((a: any, b: any) => a.Score - b.Score)
        }
        setAllLeaderboards(records)
    }

    function seePreviousGame(index: any) {
        setGameSelected(index);
        if(allLeaderboards){
            setSelectedLeaderboard(allLeaderboards[index])
        }
    }

    function displayAllLeaderboards() {
        if(allLeaderboards){
            return allLeaderboards.map((leaderboard, index) => {
                var date = new Date(leaderboard.dateTime).toDateString()
                return(
                    <tr className='history-item-container' key={index}>
                        <td className='history-item' onClick={() => {seePreviousGame(index)}}>
                            {date}
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <div className='modal' onClick={props.showHistoryModalHandler}>
            <div className='history-content' onClick={e => e.stopPropagation()}>
                <div className='history-content-container'>
                    {gameSelected === -1 && <table className='history-table'>
                        <tbody className='history-tbody'>
                            {displayAllLeaderboards()}
                        </tbody>
                    </table>
                    }
                    {gameSelected >= 0 && 
                    <div>
                        <Button style={{margin: '0px 0px 8px 0px'}} text={'Back'} onClick={() => {setGameSelected(-1)}} />
                        <table style={{width: "100%"}}>
                            <tbody>
                                <tr >
                                    <td >
                                        Name
                                    </td>
                                    <td>
                                        Score
                                    </td>
                                </tr>
                                <PreviousGame leaderboard={selectedLeaderboard} />
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export interface ILeaderboardObj {
    Players: ILeaderboardPlayerObj[],
    dateTime: string
}

export interface ILeaderboardPlayerObj {
    Name: string,
    Player_Id: string,
    Score: string
}

export interface IHistoryProps {
    showHistoryModalHandler: any
}

export default LoginModal