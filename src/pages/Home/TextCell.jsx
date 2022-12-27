import React, { useContext, useState } from 'react'

const TextCell = (props) => {
    console.log(props)
    const { data, rowIndex, columnKey } = props
    return (<div>
        {data[rowIndex][columnKey]}
    </div>)
}

export default TextCell