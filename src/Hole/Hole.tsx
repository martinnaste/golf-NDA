import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import LinkButton from '../LinkButton'
import '../App.css'
import './Hole.css'
import { Link, useLocation } from 'react-router-dom'
import ScoreRow from './ScoreRow'
import PlayerRow from '../PlayGame/PlayerRow'

const pars = [2,2,3,2,3,3,5,3,6]

const Hole: FC = () => {

    const location: any = useLocation()
    const { holeProps } = location.state
    

    let rows: any[] = [];
    const [gameTables, setGameTables] = useState([holeProps.playingTable])
    const playingTable = gameTables[holeProps.number-1]

    return (<div className='page'>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }} >

            <p className='title'>Hole Number: {holeProps.number} </p>
            <p className='title'>Par: {pars[holeProps.number-1]} </p>

     
           
            <img src={require(('../Images/' + holeProps.number +  '.png')) } className="holeImg" />

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
                           // return(  <ScoreRow Name={Player.Name} TotalScore={0} />)
                            
                          
                        })}

                        {rows}
                    </tbody>
                </table>
            </div>

            {getNextHoleButton()}
        </div>

    </div>)

    function updateScores(){
        playingTable.forEach((player: { Score: number }, index) => {
            player.Score = rows[index].score
        })
    }
 

    function getNextHoleButton() {
        if(holeProps.number < 9){
            updateScores()
            return(<Link className='button' to={'/Hole'} state={{ holeProps: { playingTable: updateGameTable(), number: holeProps.number + 1 } }}> Next Hole </Link> )
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



