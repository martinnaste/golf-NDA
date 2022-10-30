import { FC } from 'react'
import LinkButton from '../LinkButton'
import '../App.css'
import './Hole.css'
import '../Button.css'
import { useLocation } from 'react-router-dom'
import { IPlayer } from '../PlayGame/PlayGame'
import HolePage from './HolePage'

const Hole: FC = () => {
    const location: any = useLocation()
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

    
    const holeNumber = holeProps.number
    //Generates 9 copies of the playerTable Array to keep track of each turn
    //Deep copy!!!!
    const playingTableArray = (() => {
        var nineHoles: any[] = []
        holeProps.playingTable.forEach((item: IPlayer) => {
            item.Score = 0
        })
        for(let i = 0; i < 9; i++){
            nineHoles[i] = JSON.parse(JSON.stringify(holeProps.playingTable))
        }
        return nineHoles
    })()


    //If logged in generate a holePage (Player table and image)
    return (
        <>
            {loggedIn ? 
                <HolePage playingTableArray={playingTableArray as [IPlayer[]]} hole={holeNumber}/>                        
                :
                <div className='page'>
                    <div style={{height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{ fontSize: "30px", width: "100%", textAlign: "center" }}>Foolish of you to think you could do a shifty</p>
                        <div >
                            <LinkButton text='Home' redirect="/" />
                        </div>   
                    </div>
                </div>
            }
        </>
    )


}

export default Hole;



