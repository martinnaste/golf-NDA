import { FC, useEffect, useState } from 'react'
import "./Home.css"
import HomeButtons from './HomeButtons'

const Home:FC = () => {
    var dummyLeaderboard: ILeaderboardObj = {
        dateTime: '',
        Players: []
    }

    var dummyPlayer: IPlayer = {
        Name: ''
    }

    const [records, setRecords] = useState([]);
    const [allPlayers, setAllPlayers] = useState([dummyPlayer]);
    const [allLeaderboards, setAllLeaderboards] = useState([dummyLeaderboard]);

    useEffect(() => {
        fetchDB()
    }, [])

    async function fetchDB() {
        const response = await fetch(`http://localhost:5001/leaderboard/`);
 
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
    
        const records = await response.json();
        console.log(records)
        setRecords(records);
    }

    async function addHandler() {
        var newObj = {
            Players: [
                {Player_Id: "62e5e5a875351dce721836af", 
                Score: "99"},
                {Player_Id: "62e5022fa9bddf5b05fed3ea",
                Score: "69"}
            ]
        }
        await fetch("http://localhost:5001/leaderboard/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj),
            })
            .catch(error => {
            window.alert(error);
            return;
        });
    }

    async function getAllLeaderboards() {
        const response = await fetch(`http://localhost:5001/leaderboards/`);
 
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
    
        const leaderboards: ILeaderboardObj[] = await response.json();
        console.log(leaderboards)
        setAllLeaderboards(leaderboards);
        console.log("allLeaderboards: ", allLeaderboards);
    }

    function returnAllLeaderboards(){
        return allLeaderboards.map((leaderboard) => {
                return (<div>
                    {leaderboard.dateTime}
                </div>);
        });
    }

    async function addNewPlayer() {
        var newObj = {
            Name: "newNAME"
        }
        await fetch("http://localhost:5001/players/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj),
            })
            .catch(error => {
            window.alert(error);
            return;
        });
    }

    async function getAllPlayers() {
        const response = await fetch(`http://localhost:5001/players/`);
 
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
    
        const players: IPlayer[] = await response.json();
        console.log(players)
        setAllPlayers(players);
    }

    return (
        <div className='home-container'>
            <div className='home'>
                HYPNOS MOORE RIVER GOLF
                <HomeButtons />
                <button onClick={() => addHandler()}>add to db</button>
                <button onClick={() => getAllLeaderboards()}>get All Leaderboards</button>
                {allLeaderboards !== [dummyLeaderboard] && returnAllLeaderboards()}
                <button onClick={() => getAllPlayers()}>get All Players</button>
                <button onClick={() => addNewPlayer()}>add new player</button>
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