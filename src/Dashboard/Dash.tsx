import { FC, useState } from 'react'
import './Dash.css'
import '../App.css'
import './HistoryModal.css'
import Button from '../Button'
import LinkButton  from '../LinkButton'
import HistoryModal from './HistoryModal'



const Dash: FC = () => {
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    return (
        <div className='page'>

            <div style={{position:"absolute"}}>
            <LinkButton text='Back' redirect="/" />
            </div>

            {/* Previous Game HighScore Table */}
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop:"75px" }}>

                <p style={{ fontSize: "42px"}}> Previous game: </p>
                <p style={{ fontSize: "32px", width: "100%", textAlign: "center" }}>2022/04/2</p>

                <table style={{ width: "90%", marginTop:"25px" }}>
                    <tbody>
                        <tr style={{ textAlign: "left", fontSize: "24px" }}>
                            <td >
                                Name
                            </td>
                            <td>
                                Score
                            </td>
                        </tr>
                        {getPreviousGame()}
                    </tbody>
                </table>

            </div>

            {/* Buttons */}
            <div style={{display: "flex",justifyContent: "center"}}>
                
                <Button text="History" onClick={showHistoryModalHandler} />
                <LinkButton text="Play" redirect={"../PlayGame"} />
                {/* If Modal is visable (true) show it */}
                {showHistoryModal && <HistoryModal showHistoryModalHandler={showHistoryModalHandler}/>}

            </div>
        </div>


    )


    function showHistoryModalHandler() {

        setShowHistoryModal(!showHistoryModal);
    }

    function getPreviousGame() {

        //Database call here instead of dummy data
        const data = dummyData().Game.Players
        const sorted = data.sort((a, b) => parseInt(a.Score) - parseInt(b.Score))

        return sorted.map((player, index) => {
            return (

                <tr>

                    <td>
                        {(index + 1) + '. ' + player.Name}
                    </td>
                    <td>
                        {player.Score}
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
                { "Name": "Jesse", "Score": "26" },
                { "Name": "Jono", "Score": "36" },
                { "Name": "Martin", "Score": "45" },
                { "Name": "Ben", "Score": "26" },
                { "Name": "Ali", "Score": "34" },
                ],
                "GameID": "1"
            }
        }

    }
}

export default Dash