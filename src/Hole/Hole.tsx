import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import LinkButton from '../LinkButton'
import '../App.css'
import './Hole.css'
import { Link, useLocation } from 'react-router-dom'
import ScoreRow from './ScoreRow'

const pars = [2,2,3,2,3,3,5,3,6]

const Hole: FC = () => {

    const location: any = useLocation()
    const { holeProps } = location.state

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
                        </tr>
                        {holeProps.playingTable && <ScoreRow playerTable={holeProps.playingTable} />}
                    </tbody>
                </table>
            </div>

            <Link className='button' to="/Hole" state={{ holeProps: { playingTable: holeProps.playingTable, number: holeProps.number + 1 } }}> Next Hole </Link>
        </div>

    </div>)



}
export default Hole;


