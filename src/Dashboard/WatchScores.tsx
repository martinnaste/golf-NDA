import React, { FC } from 'react'

const WatchScores:FC<IWatchScoresProps> = (props) => {
    function returnRows() {
        return (
            props && props.playingTableArray ?
            props.playingTableArray.map((Player: { Name: string; Score: number }) => {
                return (
                    <tr key={Player.Name}>
    
                        <td >
                            {Player.Name}
                        </td>
    
                        <td >
    
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ padding: '0 5px 0 5px' }}>{Player.Score}</div>
                            </div>
    
                        </td>    
                    </tr>
                )
            })
            : 
            ''
        )
    }
    
    return (
        <>
            {returnRows()}
        </>
    )
}

export interface IWatchScoresProps {
    playingTableArray: any;
    holeNumber: number;
}

export default WatchScores
