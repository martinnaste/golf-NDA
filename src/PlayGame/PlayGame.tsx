import { FC, useState } from 'react'
import Button from '../Button'
import LinkButton from '../LinkButton'
import '../App.css'
import './PlayGame.css'

const PlayGame: FC = () => {
    return (
        <div className='page'>
            <div style={{ position: "absolute" }}>
                <LinkButton text='Back' redirect="../Dash" />
            </div>

            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "75px" }}>
                <p style={{ fontSize: "42px" }}> New game! </p>
                <p style={{ fontSize: "30px", width: "100%", textAlign: "center" }}>Select Character</p>


                <div className='playerTableDiv'>

                    <table className='playerTable' style={{ width: "90%", marginTop: "25px", marginLeft: '15px' }}>
                        <tbody>
                            <tr style={{ textAlign: "left", fontSize: "24px" }} onClick={() => console.log("burh")}>

                                <td style={{ position: 'sticky' }}>
                                    Players
                                </td>
                                <td>

                                </td>

                            </tr>
                            {getPlayers()}
                        </tbody>
                    </table>

                    <table className='playerTable' style={{ width: "90%", marginTop: "25px", marginRight: '15px' }}>
                        <tbody>
                            <tr style={{ textAlign: "left", fontSize: "24px" }}>
                                <td >
                                    #
                                </td>
                                <td>
                                    Name
                                </td>
                            </tr>

                        </tbody>
                    </table>



                </div>
                <Button text='New Player' onClick={addPlayer()}></Button>
            </div>




        </div>
    )

    function addPlayer() {

    }

    function getPlayers() {

        //Database call here instead of dummy data
        const data = dummyData().Game.Players
        const sorted = data.sort((a: any, b: any) => b.Name - a.Name)
return sorted.map((player, index) => {
    
    return (

       // <PlayerRow name= {player.Name} function={MovePlayer({player.Name})}/>
        <tr>

            <td >
                {player.Name}
            </td>
            <td>
                +
            </td>

        </tr>

    );
});
    }

function dummyData() {
    return {
        "Game":
        {
            "Date": "2022-01-15 14:20:000",
            "Players": [{ "Name": "Riley", "Score": "28" },
            { Name: "Jesse", "Score": "26" },
            { Name: "Jono", "Score": "36" },
            { Name: "Martin", "Score": "45" },
            { Name: "Ben", "Score": "26" },
            { Name: "Ali", "Score": "34" },
            { Name: "Madi", "Score": "34" },
            { Name: "Caitlin", "Score": "34" },
            { Name: "Kevin", "Score": "34" },

            ],
            "GameID": "1"
        }
    }

}


}

export default PlayGame
function MovePlayer() {
   //delete from left list
   //insert in righr list
   //
}

