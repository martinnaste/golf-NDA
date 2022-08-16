import React, { FC } from 'react'



const LoginModal: FC<IHistoryProps> = (props) => {
    return (
        <div className='modal' onClick={props.showHistoryModalHandler}>
            <div className='history-content' onClick={e => e.stopPropagation()}>
              <p> bruh</p>
            </div>
        </div>
    )
}

export interface IHistoryProps {
    showHistoryModalHandler: any
}

export default LoginModal