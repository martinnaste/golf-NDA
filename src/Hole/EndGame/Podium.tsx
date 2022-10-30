import { FC } from 'react'
import '../../App.css'
import '../../Button.css'
import './EndGame.css'
import './Podium.css'

const Poduim: FC<props> = (props) => {
    return (
        <div style={{display:"flex", margin:"15px"}}> 
            <div className="podium">
                <img className='player' src={require('../../Images/character.png') } alt='2nd'/>
                <div className='secondPodium'>2</div>
            </div>
            <div className="podium">
                <img className='player' src={require('../../Images/character.png') } alt='1st'/>
                <div className='firstPodium'>1</div>
            </div>                    
            <div className="podium">
                <img className='player' src={require('../../Images/character.png') } alt='3rd'/>
                <div className='thirdPodium'>3</div>
            </div>               
        </div>
    )
}

export interface props {
    First: String,
    Second: String,
    Third: String
}
export default Poduim;

