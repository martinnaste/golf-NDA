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

    const [gameTable, setGameTable] = useState(holeProps.playingTable)

    return (<div className='page'>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }} >

            <p className='title'>Hole Number: {holeProps.number} </p>
            <p className='title'>Par: {pars[holeProps.number-1]} </p>
    
            <img src={require('../Images/hole1.png')} className="holeImg" />

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
                 
                        {holeProps.playingTable.map((Player: { Name: string; Score: number }) => {
                         
                            return(  <ScoreRow Name={Player.Name} TotalScore={0} />)
                          
                        })}
                    </tbody>
                </table>
            </div>

            {getNextHoleButton()}
        </div>

    </div>)

    function validateScores(){
        if(true){

        }
        return "/Hole"
    }


    function getNextHoleButton() {
        if(holeProps.number < 9){
            return(<Link className='button' onClick={updateGameTable} to={validateScores()} state={{ holeProps: { playingTable: holeProps.playingTable, number: holeProps.number + 1 } }}> Next Hole </Link> )
        }
        else{
            return(<Link className='button' to={"/"} state={{ holeProps: { playingTable: holeProps.playingTable, number: holeProps.number + 1 } }}> End Game </Link> )
        }

            
    
    }

    function updateGameTable(){
        console.log(gameTable)
    }

}
export default Hole;



