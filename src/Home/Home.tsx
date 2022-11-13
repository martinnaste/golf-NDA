import { FC, useEffect } from 'react'
import "./Home.css"
import HomeButtons from './HomeButtons'

const Home:FC = () => {
    // var dummyLeaderboard: ILeaderboardObj = {
    //     dateTime: '',
    //     Players: []
    // }

    // var dummyPlayer: IPlayer = {
    //     Name: ''
    // }

    // const [records, setRecords] = useState([]);
    // const [allPlayers, setAllPlayers] = useState([dummyPlayer]);
    // const [allLeaderboards, setAllLeaderboards] = useState([dummyLeaderboard]);
    
    
    const URL = `https://hypnos-dev-api.herokuapp.com`


    useEffect(() => {
        fetchDB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchDB() {
        const response = await fetch(URL + `/leaderboard/`);
 
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
    
        const records = await response.json();
        console.log(records)
        // setRecords(records);
    }

    // async function addHandler() {
    //     var newObj = {
    //         Players: [
    //             {Player_Id: "62e5e5a875351dce721836af", 
    //             Score: "99"},
    //             {Player_Id: "62e5022fa9bddf5b05fed3ea",
    //             Score: "69"}
    //         ]
    //     }
    //     await fetch(URL + "leaderboard/add", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newObj),
    //         })
    //         .catch(error => {
    //         window.alert(error);
    //         return;
    //     });
    // }

    // async function getAllLeaderboards() {
    //     const response = await fetch(URL + `/leaderboards/`);
 
    //     if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    //     }
    
    //     const leaderboards: ILeaderboardObj[] = await response.json();
    //     console.log(leaderboards)
    //     setAllLeaderboards(leaderboards);
    //     console.log("allLeaderboards: ", allLeaderboards);
    // }

    // function returnAllLeaderboards(){
    //     return allLeaderboards.map((leaderboard, index) => {
    //             return (<div key={index}>
    //                 {leaderboard.dateTime}
    //             </div>);
    //     });
    // }

    // async function addNewPlayer() {
    //     var newObj = {
    //         Name: "newNAME"
    //     }
    //     await fetch(URL + "/players/add", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newObj),
    //         })
    //         .catch(error => {
    //         window.alert(error);
    //         return;
    //     });
    // }

    // async function getAllPlayers() {
    
    //     const response = await fetch(URL + `/players/`);
 
    //     if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    //     }
    
    //     const players: IPlayer[] = await response.json();
    //     // setAllPlayers(players);
    // }

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