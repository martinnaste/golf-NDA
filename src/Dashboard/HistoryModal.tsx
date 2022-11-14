import React, { FC, useEffect, useState } from 'react'
import Button from '../Button'
import './HistoryModal.css'
import PreviousGame from './PreviousGame'


const LoginModal: FC<IHistoryProps> = (props) => {
    const [allLeaderboards, setAllLeaderboards] = useState<ILeaderboardObj[]>()
    const [selectedLeaderboard, setSelectedLeaderboard] = useState<ILeaderboardObj>()
    const [gameSelected, setGameSelected] = useState(-1)
    const [loading, setLoading] = useState(true);
    const URL = `https://hypnos-dev-api.herokuapp.com`
    
    useEffect(() => {
        getAllLeaderboards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getAllLeaderboards() {
        const response = await fetch(URL + `/leaderboards/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            // window.alert(message);
            console.warn(message)
            return;
        }
    
        const records = await response.json();
        for(let i = 0; i < records.length; i++){
            records[i].Players.sort((a: any, b: any) => a.Score - b.Score)
        }
        setAllLeaderboards(records)
        setLoading(false);
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
                        <td className='history-item' style={{animation:"fadein " + 0.2*index + "s"}}  onClick={() => {seePreviousGame(index)}}>
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
                {loading ?
                    <div>
                        <img src={require('../Images/loadingPrimary.svg').default} alt='mySvgImage' />
                    </div>
                    :
                    <>
                        <div className='history-content-container fadein'>
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
                    </>
                }
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