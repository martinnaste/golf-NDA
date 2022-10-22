import React, { FC, useRef, useState } from 'react'
import { IPlayer } from '../PlayGame/PlayGame';

type rowProps = {
    Name: string;
    TotalScore: number;
}

type rowState = {
    score: number
}
export class ScoreRow extends React.Component<rowProps, rowState>  {

    //const [score, setScore] = useState(0)

    constructor(props: any) {
        super(props);
        this.state = { score: 0};
        let ref = React.createRef() 
    }

    render() {

        return (
            
            <tr key={this.props.Name}>

                <td >
                    {this.props.Name}
                </td>

                <td >

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div onClick={this.decereaseScore.bind(this)} >-</div>
                        <div style={{ padding: '0 5px 0 5px' }}>{this.state.score}</div>
                        <div onClick={(this.incrementScore.bind(this))}>+</div>
                    </div>

                </td>
                <td>
                    {this.props.TotalScore}

                </td>

            </tr>
            
            )



    };

  
    incrementScore() {
        
        if (this.state.score < 10) {
            this.setState({ score: this.state.score + 1});

        }


    }

    decereaseScore() {

        if (this.state.score > 0) {
            this.setState({ score: this.state.score - 1 });

        }


    }


}

export interface IScoreRowProps {
    Name: string
    TotalScore: number


}


export interface IScorePlayer {
    Name: string
    Score: number
}
export default ScoreRow