import { FC, useEffect } from 'react'
import "./Home.css"
import HomeButtons from './HomeButtons'

const Home:FC = () => {
    const URL = `https://hypnos-dev-api.herokuapp.com`

    useEffect(() => {
        fetchDB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // This call is to intiate a potential wake up for heroku backend
    async function fetchDB() {
        const response = await fetch(URL + `/leaderboard/`);
 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        
        // Uncomment these lines for testing - commented to compile
        // const records = await response.json();
        // console.log(records)
    }

    return (
        <div className='home-container' >
            <div className='home'>
                <div style={{position:"absolute", top:"12%"}}><img className='logo' src={require('../Images/logo.png') } alt="Hypnos Logo"/></div>  
                HYPNOS MOORE RIVER GOLF
                <HomeButtons />
            </div>
        </div>
    )
}

export interface ILeaderboardObj {
    dateTime: any,
    Players: IScoredPlayer[]
}

export interface IScoredPlayer {
    Name: string,
    Player_Id: string,
    Score: string
}

export interface IPlayer {
    Name: string
}

export default Home