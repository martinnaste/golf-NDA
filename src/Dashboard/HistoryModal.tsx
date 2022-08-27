import React, { FC, useEffect, useState } from 'react'
import './HistoryModal.css'


const LoginModal: FC<IHistoryProps> = (props) => {
    const [allLeaderboards, setAllLeaderboards] = useState<ILeaderboardObj[]>()

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
        console.log(records)
        setAllLeaderboards(records)
    }

    function displayAllLeaderboards() {
        if(allLeaderboards){
            return allLeaderboards.map((leaderboard, index) => {
                var date = new Date(leaderboard.dateTime).toDateString()
                return(
                    // <div key={index}>
                    <div className='history-item-container' key={index}> 
                        <p>
                            {date}
                        </p>
                    </div>
                )
            })
        }
    }

    return (
        <div className='modal' onClick={props.showHistoryModalHandler}>
            <div className='history-content' onClick={e => e.stopPropagation()}>
                <div className='history-content-container'>
                    {displayAllLeaderboards()}
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