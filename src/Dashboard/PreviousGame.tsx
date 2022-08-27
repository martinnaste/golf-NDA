import React, { FC } from 'react'

const PreviousGame:FC<IPreviousGameProps> = (props) => {

    function previousGame() {
        return props.leaderboard.Players.map((player: any, index: any) => {
            return (
                <tr key={index}>
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

    return (
        <>
            {previousGame()}
        </>
    )
}

export interface IPreviousGameProps {
    leaderboard: any
}

export default PreviousGame