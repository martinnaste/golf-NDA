import React, { FC } from 'react'
import NewPlayerForm from './NewPlayerForm'
import { IPlayer } from './PlayGame'

const NewPlayerModal:FC<INewPlayerModalProps> = (props) => {
    function addPlayerBool() {
        props.playerAdded()
    }

    return (
        <div className='modal' onClick={props.showNewPlayerModal}>
            <div className='history-content' onClick={e => e.stopPropagation()}>
                <div>
                    <NewPlayerForm allPlayers={props.allPlayers} playerAdded={addPlayerBool}/>
                </div>
            </div>
        </div>
    )
}

export interface INewPlayerModalProps {
    allPlayers: IPlayer[] | undefined;
    showNewPlayerModal: any;
    playerAdded: any;
}

export default NewPlayerModal