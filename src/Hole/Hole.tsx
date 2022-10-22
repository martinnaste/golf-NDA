import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import LinkButton from '../LinkButton'
import '../App.css'
import './Hole.css'
import '../Button.css'
import { Link, useLocation } from 'react-router-dom'
import ScoreRow from './ScoreRow'
import PlayerRow from '../PlayGame/PlayerRow'
import { IPlayer } from '../PlayGame/PlayGame'

const pars = [2,2,3,2,3,3,5,3,6]

const Hole: FC = () => {

    const location: any = useLocation()
    // const { holeProps } = location.state
    const loggedIn = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.loggedIn
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.loggedIn
        }
    })()
    const holeProps = (() => {
        if(typeof location.state?.loggedIn === 'boolean'){
            return location.state?.holeProps
        } else if(typeof location.state?.from === 'object'){
            return location.state?.from.state.holeProps
        }
    })()    

    
    let rows: any[] = [];
    const [holeNumber, setHoleNumber] = useState(1);

    console.log(holeProps)
    const playingTableArray = (() => {
        const nineHoles = []
        holeProps.playingTable.forEach((item: IPlayer) => {
            item.Score = 0
        })
        for(let i = 0; i < 9; i++){
            nineHoles.push(holeProps.playingTable)
        }
        return nineHoles
    })()
    const [gameTables, setGameTables] = useState([holeProps.playingTable])
    const playingTable = gameTables[holeProps.number]

    return (<div className='page'>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }} >

            <p className='title'>Hole Number: {holeNumber} </p>
            <p className='title'>Par: {pars[holeNumber-1]} </p>

     
           
            <img src={require(('../Images/' + holeNumber +  '.png')) } className="holeImg" />

            <div className='playerTableDiv'>

                <table className='playerTable' style={{ width: "90%" }}>
                    <tbody>
                        <tr style={{ textAlign: "left", fontSize: "24px" }} >

                            <td >
                                Players
                            </td>
                            <td>
                                Score
                            </td>
                            <td>
                                total
                            </td>
                        </tr>
                 
                        {playingTable.map((Player: { Name: string; Score: number }) => {
                            rows.push(<ScoreRow Name={Player.Name} TotalScore={0} />)
                            
                          
                        })}

                        {rows}
                    </tbody>
                </table>
            </div>

            {getNextHoleButton()}
        </div>

    </div>)

    function updateScores(){
        playingTable.forEach((player: { Score: number }, index: number) => {
            player.Score = rows[index].score
        })
    }
 

    function getNextHoleButton() {
        if(holeProps.number < 9){
            updateScores()
            return(
                    <div style={{display:"flex",
                    width: '100%',
                    justifyContent: 'space-between',flexDirection: "row-reverse"}}>
                         <div className='button' onClick={()=>{setHoleNumber(holeNumber+1)}}> Next Hole </div>
                         {holeNumber>1 && <div className='button' onClick={()=>{setHoleNumber(holeNumber-1)}}> Back </div>}

                    </div>
                 )
        }
        else{
            return(<Link className='button' to={"/"} state={{ holeProps: { playingTable: holeProps.playingTable, number: holeProps.number + 1 } }}> End Game </Link> )
        }

            
    
    }

    function updateGameTable(){
        console.log(gameTables)
     
        //append playingTable to state
        //setGameTables(newTables)
        return(gameTables.push(playingTable))
    }

}

export default Hole;



