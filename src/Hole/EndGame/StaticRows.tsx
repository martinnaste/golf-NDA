import React, { FC } from 'react'

const StaticRows:FC<IStaticRow> = (props) => {

    function returnRows() {
        return (
            (props && props.finalTable) &&
            props.finalTable.map((Player: { Name: string; Score: number }, index: any) => {
                return (
                    <tr key={Player.Name}>
                        <td>
                            {index + 1}.
                        </td>
                        <td >
                            {Player.Name}
                        </td>

                        <td>
                            {Player.Score}
                        </td>
    
                    </tr>
                )
            })

            
            
        )
    }
    
    return (
        <>
            {returnRows()}
        </>
    )
}

export interface IStaticRow{
    finalTable: any;
}

export default StaticRows