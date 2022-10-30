import { FC } from 'react'
import "./Home.css"
import HomeButtons from './HomeButtons'

const Home:FC = () => {
    return (
        <div className='home-container' >
            <div className='home'>
               <div><img className='logo' src={require('../Images/logo.png') } alt='logo'/></div> 
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