import React, { FC, useState, useEffect} from 'react'
import WatchScores from './WatchScores'
import LinkButton from '../LinkButton'
import WatchEndGame from './WatchEndGame'
import { socket } from '../index'
//Essentially a copy of holePage
const Watch:FC<IWatchProps> = (props) => {
    const pars = [2,2,3,2,3,3,5,3,6]

    const [holeNumber, setHoleNumber] = useState(0)
    const [playingTableArray, setPlayingTableArray] = useState([])
    const [finalTable, setFinalTable] = useState([])

    useEffect(() => {
        socket.emit("load")
    }, [])
    
    useEffect(() => {
        socket.on('messageResponse', (data: any) => {
            setHoleNumber(data.holeNum)
            setPlayingTableArray(data.array)
            if(data.finalTable) {
                setFinalTable(data.finalTable)
            }
        });

        socket.on("EndGameResponse", (data: any) => {
            setFinalTable(data.finalTable)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return (
        <div className='page'>
            {holeNumber === 0 && playingTableArray.length === 0 ?
                <div style={{height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{ fontSize: "30px", width: "100%", textAlign: "center" }}>The page will reload when the game starts</p> 
                    <LinkButton text='Back' redirect="/Dash" />
                </div>
                : 
                finalTable.length === 0 ?
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }} 
                >
                    <p className='title'>Hole Number: {holeNumber+1} </p>
                    <p className='title'>Par: {pars[holeNumber]} </p>
                    <div className='holeImg'><img src={require(('../Images/' + (holeNumber+1) +  '.png')) } style={{width:"90%"}} alt={`Hole Number ${holeNumber+1}`}/></div>
                    <div className='playerTableDiv'>
                        <table className='playerTable' style={{ width: "90%", paddingLeft:"35px", paddingTop: "10px" }}>
                            <tbody>
                                <tr style={{ textAlign: "left", fontSize: "24px" }} >

                                    <td style={{paddingRight: '75px', textDecoration:"underline 3px solid "}}>
                                        Players
                                    </td>
                                    <td style={{paddingRight: '22px',textDecoration:"underline 3px solid"}}>
                                        Score
                                    </td>
                                </tr>
                                {playingTableArray.length > 0 && <WatchScores playingTableArray={playingTableArray} holeNumber={holeNumber} />}
                            </tbody>
                        </table>
                    </div>
                    <LinkButton text='Back' redirect="/Dash" />
                </div>
                :
                <WatchEndGame finalTable={finalTable}/>
            }
        </div>
    ) 
}

export interface IWatchProps {
    
}

export default Watch
