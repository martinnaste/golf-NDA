import  { FC, useState } from 'react'
import './Dash.css'
import DashButton from './DashButton'


const Dash:FC = () => {

    return (
        <div>
           <div>
              {/* Table get data from DB (stats last game played) */}
              {getPreviousGame()}
            </div>
               
            <div>

            <DashButton/>

            </div>
        </div>

        
    )


    function getPreviousGame(){
        const data  = dummyData().golfScore.Players
        return data.map((player) => {
                return (<div>
                    {player.Name}
                    {player.Score}
                </div>);
        });
    }

    function dummyData(){
        return  {
                    "golfScore": 
                        {
                            "Date": "2022-01-15 14:20:000",
                            "Players":[ {"Name": "Riley", "Score": "25"},
                                        {"Name": "Martin", "Score": "15"} ],
                            "GameID": "1"
                        }
                     }
               
    }
}

export default Dash