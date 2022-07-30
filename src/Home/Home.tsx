import { FC } from 'react'
import "./Home.css"
import HomeButtons from './HomeButtons'

const Home:FC = () => {
    return (
        <div className='home-container'>
            <div className='home'>
                HYPNOS MOORE RIVER GOLF
                <HomeButtons />
            </div>
        </div>
    )
}

export default Home