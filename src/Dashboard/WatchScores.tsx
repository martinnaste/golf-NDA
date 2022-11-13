import React, { FC } from 'react'

const WatchScores:FC<IWatchScoresProps> = (props) => {
    function returnRows() {
        return (
            props && props.playingTableArray ?
            props.playingTableArray.map((Player: { Name: string; Score: number }) => {
                return (
                    <tr style={{ textAlign: 'center' }} key={Player.Name}>
    
                        <td style={{ textAlign: 'left' }}>
                            {Player.Name}
                        </td>
    
                        <td style={{ paddingRight: '10px' }}>
    
                            <div>
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
