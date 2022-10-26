import { FC, useEffect, useState } from 'react'
import '../App.css'
import '../Button.css'
import './EndGame.css'
import './Podium.css'

import { IPlayer } from '../PlayGame/PlayGame'


const Poduim: FC<props> = (props) => {


    return (<div style={{display:"flex", margin:"15px"}}> 
                
                    <div className="podium">
                        <div className='second'></div>
                        <div className='secondPodium'>2</div>
                    </div>
                    <div className="podium">
                        <div className='first'></div>
                        <div className='firstPodium'>1</div>
                    </div>                    
                    <div className="podium">
                        <div className='third'></div>
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



